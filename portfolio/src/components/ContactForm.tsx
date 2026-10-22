import { useState, type FormEvent } from 'react'
import { SendIcon } from './Icons'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!accessKey) {
      setStatus('error')
      setErrorMessage('Contact form is not configured yet.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          subject: 'New message from portfolio contact form',
        }),
      })

      const result = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-5 text-left">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          disabled={status === 'submitting'}
          className="contact-field"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === 'submitting'}
          className="contact-field"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          disabled={status === 'submitting'}
          className="contact-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
        <SendIcon />
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-muted" role="status">
          Thanks — your message was sent successfully.
        </p>
      )}

      {status === 'error' && (
        <p className="text-center text-sm text-red-400/90" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
