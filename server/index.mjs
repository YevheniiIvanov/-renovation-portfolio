import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { Resend } from 'resend'

const app = express()
const PORT = process.env.PORT || 3001

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim()
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL?.trim() || 'wykonczenia.ddbud@gmail.com'
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  'DD BUD <onboarding@resend.dev>'

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

const defaultCorsOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']
const extraOrigins = process.env.CORS_ORIGINS?.trim()
  ? process.env.CORS_ORIGINS.split(',')
      .map((o) => o.trim())
      .filter(Boolean)
  : []
const corsOrigins = [...new Set([...defaultCorsOrigins, ...extraOrigins])]

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const emailLooksValid = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

app.use(
  cors({
    origin: corsOrigins,
    methods: ['POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '32kb' }))

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, consent } = req.body ?? {}
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: 'Wymagane pola: imię, e-mail, wiadomość.' })
  }
  if (!emailLooksValid(email.trim())) {
    return res.status(400).json({ error: 'Podaj poprawny adres e-mail.' })
  }
  if (consent !== true) {
    return res.status(400).json({
      error: 'Wymagana jest zgoda na przetwarzanie danych osobowych.',
    })
  }
  const entry = {
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === 'string' ? phone.trim() : '',
    message: message.trim(),
    consentRodo: true,
    at: new Date().toISOString(),
  }
  console.log('[contact]', entry)

  if (!resend) {
    console.warn(
      '[contact] Brak RESEND_API_KEY — wiadomość zapisana tylko w logu serwera.',
    )
    return res.status(503).json({
      error:
        'Wysyłka e-mail jest chwilowo niedostępna. Spróbuj później lub zadzwoń.',
    })
  }
  const subject = `[Strona] Wiadomość od ${entry.name}`
  const text = [
    `Imię: ${entry.name}`,
    `E-mail: ${entry.email}`,
    entry.phone ? `Telefon: ${entry.phone}` : null,
    '',
    entry.message,
    '',
    `Wysłano: ${entry.at}`,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <p><strong>Imię:</strong> ${escapeHtml(entry.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(entry.email)}</p>
    ${
      entry.phone
        ? `<p><strong>Telefon:</strong> ${escapeHtml(entry.phone)}</p>`
        : ''
    }
    <p><strong>Wiadomość:</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(entry.message)}</p>
    <p style="color:#666;font-size:12px;">Wysłano: ${escapeHtml(entry.at)}</p>
  `.trim()

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: entry.email,
      subject,
      text,
      html,
    })
    if (error) {
      console.error('[contact] Resend:', error)
      return res.status(502).json({
        error:
          'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.',
      })
    }
    return res.json({ ok: true })
  } catch (err) {
    console.error('[contact] Resend wyjątek:', err)
    return res.status(502).json({
      error:
        'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.',
    })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
  if (!RESEND_API_KEY) {
    console.warn(
      '[contact] Brak RESEND_API_KEY — ustaw klucz w pliku .env (patrz .env.example).',
    )
  }
})
