import { useState, type ChangeEvent } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: '-',
    href: '-',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Poland, Remote',
    href: undefined,
  },
]

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': '', ...fields }),
      })
      if (!res.ok) {
        setError(`Something went wrong (${res.status}). Please try again.`)
      } else {
        setSent(true)
      }
    } catch {
      setError('Could not send the message. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
          Contact
        </p>
        <h1 className="mb-4 text-4xl font-bold">Let's work together</h1>
        <p className="max-w-xl text-muted-foreground">
          Have a project idea or just want to say hi? Fill out the form below or
          reach out directly — I usually respond within a day.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        {sent ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div>
              <div className="mb-4 text-4xl">✉️</div>
              <h2 className="mb-2 text-xl font-semibold">Message sent!</h2>
              <p className="text-muted-foreground">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Jan Kowalski" aria-label="Name" required value={fields.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jan@example.com"
                  aria-label="Email"
                  required
                  value={fields.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Project inquiry"
                aria-label="Subject"
                required
                value={fields.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                aria-label="Message"
                rows={6}
                required
                className="resize-none"
                value={fields.message}
                onChange={handleChange}
              />
            </div>

            <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
              <input type="checkbox" required className="h-4 w-4 rounded border-border accent-primary" />
              I'm not a robot
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  'Sending…'
                ) : (
                  <>
                    Send message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          </form>
        )}

        {/* Sidebar info */}
        <aside className="space-y-4">
          {INFO.map(({ icon: Icon, label, value, href }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Response time:</span>{' '}
                Usually within 24 hours on business days.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}
