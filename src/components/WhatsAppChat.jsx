import { useState } from 'react'

const WHATSAPP = '923101339029'

const prompts = [
  'I would like to talk about a role.',
  'I would like to walk through a case study.',
  'I have a product that needs a designer.',
]

function openWhatsApp(message) {
  const text = message.trim()
  if (!text) return
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  function send(event) {
    event.preventDefault()
    openWhatsApp(message)
  }

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <form
          onSubmit={send}
          className="w-[min(100vw-2.5rem,22rem)] rounded-2xl border border-mistLine bg-paper p-4 shadow-2xl dark:border-white/10 dark:bg-midnight2"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg text-ink dark:text-[#F6F2FC]">Message Komal</p>
              <p className="mt-1 text-[0.78rem] leading-5 text-inkSoft dark:text-[#C8BFE3]">
                This opens WhatsApp. Komal receives the message on her phone.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-inkSoft hover:bg-paperTint dark:text-[#C8BFE3] dark:hover:bg-white/10"
            >
              ×
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => openWhatsApp(prompt)}
                className="rounded-full border border-[#E4D8F6] px-3 py-1.5 text-start text-[0.78rem] text-violet hover:bg-[#F7F3FC] dark:border-white/10 dark:text-lilac dark:hover:bg-white/5"
              >
                {prompt}
              </button>
            ))}
          </div>
          <label className="mt-3 block text-[0.75rem] text-inkSoft dark:text-[#C8BFE3]" htmlFor="wa-message">
            Your message
          </label>
          <textarea
            id="wa-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            placeholder="Write a short note"
            className="mt-1 w-full resize-none rounded-xl border border-mistLine bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet dark:border-white/10 dark:bg-midnight dark:text-[#F6F2FC]"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1DAA54]"
          >
            Send on WhatsApp
          </button>
        </form>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#1DAA54]"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3zm0 2a7 7 0 110 14 6.9 6.9 0 01-3.5-.9l-.3-.2-2.8.7.7-2.7-.2-.3A7 7 0 0112 5zm-2.8 3.6c.1 0 .3 0 .4.3.2.4.7 1.4.7 1.5.1.1 0 .3 0 .4-.1.2-.2.3-.3.4l-.2.3c-.1.1-.2.2-.1.4.2.3.7 1.1 1.5 1.5.7.4 1.2.5 1.4.4.2-.1.4-.3.6-.6.1-.2.2-.2.4-.1l1.3.6c.2.1.3.2.4.3.1.2 0 .6-.2 1-.2.4-1.2.8-1.7.8-.4 0-.9.1-2.1-.4-1.3-.6-2.2-1.8-2.5-2.1-.3-.4-1.1-1.5-1.1-2.8 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3z" />
          </svg>
        </span>
        WhatsApp
      </button>
    </div>
  )
}
