import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '32kb' }))

app.post('/api/contact', (req, res) => {
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
  return res.json({ ok: true })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
})
