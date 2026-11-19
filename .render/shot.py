#!/usr/bin/env python3
"""Headless Chrome CDP screenshot of the SVG page."""
import base64, json, os, socket, subprocess, time, urllib.request, sys

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9334
HOST = "127.0.0.1"
HTML = "file:///Users/macbook/Desktop/komal-portfolio-refined-whatsapp/.render/bars.html"
USER_DIR = "/tmp/chrome-bars-svg-render"

def recv_until(sock, marker, initial=b""):
    buf = bytearray(initial)
    while marker not in buf:
        chunk = sock.recv(65536)
        if not chunk:
            raise SystemExit("socket closed waiting for %r" % marker)
        buf.extend(chunk)
    i = buf.index(marker) + len(marker)
    return bytes(buf[:i]), bytes(buf[i:])

def send_text(sock, text):
    data = text.encode("utf-8")
    n = len(data)
    mask = os.urandom(4)
    hdr = bytearray([0x81])
    if n < 126:
        hdr.append(0x80 | n)
    elif n < 65536:
        hdr.append(0x80 | 126)
        hdr += n.to_bytes(2, "big")
    else:
        hdr.append(0x80 | 127)
        hdr += n.to_bytes(8, "big")
    masked = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
    sock.sendall(bytes(hdr) + mask + masked)

class WS:
    def __init__(self, sock, leftover=b""):
        self.sock = sock
        self.buf = bytearray(leftover)

    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(1 << 20)
            if not chunk:
                raise SystemExit("socket closed")
            self.buf.extend(chunk)
        out = bytes(self.buf[:n])
        del self.buf[:n]
        return out

    def recv(self):
        # reassemble continuation frames
        payload = bytearray()
        while True:
            b0, b1 = self._read(2)
            opcode = b0 & 0x0F
            fin = b0 & 0x80
            length = b1 & 0x7F
            if length == 126:
                length = int.from_bytes(self._read(2), "big")
            elif length == 127:
                length = int.from_bytes(self._read(8), "big")
            if b1 & 0x80:
                mask = self._read(4)
                data = bytes(x ^ mask[i % 4] for i, x in enumerate(self._read(length)))
            else:
                data = self._read(length)
            if opcode == 0x8:
                raise SystemExit("ws close")
            if opcode == 0x9:  # ping
                # pong
                continue
            if opcode in (0x1, 0x0):
                payload.extend(data)
            if fin:
                return payload.decode("utf-8")

def main():
    out_path = sys.argv[1]
    clip_h = float(sys.argv[2]) if len(sys.argv) > 2 else 5387
    scale = float(sys.argv[3]) if len(sys.argv) > 3 else (2560 / 5387)
    fmt = sys.argv[4] if len(sys.argv) > 4 else "jpeg"
    quality = int(sys.argv[5]) if len(sys.argv) > 5 else 90
    clip_y = float(sys.argv[6]) if len(sys.argv) > 6 else 0

    subprocess.run(["pkill", "-f", "chrome-bars-svg-render"], check=False)
    time.sleep(0.4)
    os.makedirs(USER_DIR, exist_ok=True)
    proc = subprocess.Popen(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            "--allow-file-access-from-files",
            "--disable-extensions",
            "--no-first-run",
            "--no-default-browser-check",
            f"--remote-debugging-port={PORT}",
            f"--user-data-dir={USER_DIR}",
            "--window-size=1280,900",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        info = None
        for _ in range(50):
            try:
                with urllib.request.urlopen(f"http://{HOST}:{PORT}/json", timeout=1) as r:
                    tabs = json.loads(r.read().decode())
                pages = [t for t in tabs if t.get("type") == "page"]
                if pages:
                    info = pages[0]
                    break
            except Exception:
                time.sleep(0.2)
        if not info:
            raise SystemExit("no debug tab")
        wsurl = info["webSocketDebuggerUrl"]
        # ws://127.0.0.1:PORT/devtools/page/ID
        path = wsurl.split(f"{HOST}:{PORT}", 1)[1]
        sock = socket.create_connection((HOST, PORT), timeout=120)
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {HOST}:{PORT}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {base64.b64encode(os.urandom(16)).decode()}\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        sock.sendall(req.encode())
        head, rest = recv_until(sock, b"\r\n\r\n")
        if b" 101 " not in head:
            raise SystemExit("handshake failed: " + head.decode(errors="replace")[:400])
        ws = WS(sock, rest)
        msg_id = 0

        def call(method, params=None, wait=True):
            nonlocal msg_id
            msg_id += 1
            mid = msg_id
            send_text(sock, json.dumps({"id": mid, "method": method, "params": params or {}}))
            if not wait:
                return None
            while True:
                raw = ws.recv()
                data = json.loads(raw)
                if data.get("id") == mid:
                    if "error" in data:
                        raise SystemExit(json.dumps(data["error"])[:800])
                    return data.get("result")

        call("Page.enable")
        call("Runtime.enable")
        # set metrics BEFORE navigate so first paint is correct
        scale_css = scale
        call("Emulation.setDeviceMetricsOverride", {
            "width": 1280,
            "height": 5387,
            "deviceScaleFactor": 1,
            "mobile": False,
        })
        call("Page.navigate", {"url": HTML})
        # wait for load
        deadline = time.time() + 30
        loaded = False
        while time.time() < deadline:
            raw = ws.recv()
            data = json.loads(raw)
            if data.get("method") == "Page.loadEventFired":
                loaded = True
                break
        if not loaded:
            print("WARN load event not seen", file=sys.stderr)
        time.sleep(0.8)
        # confirm svg size
        size = call("Runtime.evaluate", {
            "expression": "(() => { const s = document.querySelector('svg'); const r = s.getBoundingClientRect(); return JSON.stringify({w:r.width,h:r.height,dw:document.documentElement.scrollWidth,dh:document.documentElement.scrollHeight}); })()",
            "returnByValue": True,
        })
        print("layout", size["result"]["value"], flush=True)
        params = {
            "format": fmt,
            "fromSurface": True,
            "captureBeyondViewport": True,
            "clip": {
                "x": 0,
                "y": clip_y,
                "width": 1280,
                "height": clip_h,
                "scale": scale,
            },
        }
        if fmt == "jpeg":
            params["quality"] = quality
        print("capturing...", flush=True)
        result = call("Page.captureScreenshot", params)
        raw_img = base64.b64decode(result["data"])
        with open(out_path, "wb") as f:
            f.write(raw_img)
        print("wrote", out_path, "bytes", len(raw_img), "magic", raw_img[:3].hex(), flush=True)
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    main()
