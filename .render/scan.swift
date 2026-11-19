import AppKit
import Foundation

let path = CommandLine.arguments[1]
let url = URL(fileURLWithPath: path)
guard let img = NSImage(contentsOf: url) else { fputs("no image\n", stderr); exit(1) }
var rect = NSRect(origin: .zero, size: img.size)
guard let cg = img.cgImage(forProposedRect: &rect, context: nil, hints: nil) else { exit(1) }
let w = cg.width
let h = cg.height
print("size \(w)x\(h)")
let bpp = 4
let rowBytes = w * bpp
var data = [UInt8](repeating: 0, count: h * rowBytes)
let cs = CGColorSpaceCreateDeviceRGB()
guard let ctx = CGContext(data: &data, width: w, height: h, bitsPerComponent: 8, bytesPerRow: rowBytes, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))

// find rows below y=780 (in image px) that have bright pixels (text)
let startY = 750
for y in startY..<h {
    var bright = 0
    var maxL = 0
    let row = y * rowBytes
    for x in stride(from: 40, to: w-40, by: 2) {
        let i = row + x * 4
        let r = Int(data[i]), g = Int(data[i+1]), b = Int(data[i+2])
        let l = (r+g+b)/3
        if l > maxL { maxL = l }
        if l > 160 { bright += 1 }
    }
    if bright > 8 {
        print("bright row y=\(y) count=\(bright) max=\(maxL)")
    }
}
