# Wdrożenie (front + API w jednym serwisie)

Jeden proces Node uruchamia Express: **`/api/*`** (formularz → Resend) oraz statyczny front z **`dist/`** (Vite). Przeglądarka woła **`/api/contact`** pod tym samym adresem — **nie trzeba** `VITE_CONTACT_API`.

## Zmienne środowiskowe (panel hostingu)

Ustaw te same wartości co w `.env.example`:

| Zmienna | Opis |
|--------|------|
| `RESEND_API_KEY` | Klucz z [Resend](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Skrzynka na leady (np. `wykonczenia.ddbud@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Nadawca (np. `DD BUD <onboarding@resend.dev>` lub zweryfikowana domena) |
| `PORT` | Zwykle **ustawia platforma** — nie zmieniaj ręcznie, jeśli jest już podany |

Opcjonalnie `CORS_ORIGINS` — tylko gdy front jest na **innej** domenie niż API (przy jednym deployu zwykle niepotrzebne).

## Railway

1. [railway.app](https://railway.app) → **New project** → **Deploy from GitHub** (repo z tym kodem).
2. Railway wykryje `railway.toml` (`npm ci && npm run build`, `npm start`).
3. **Variables** — dodaj `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Po deployu: **Settings → Networking → Generate domain** (publiczny URL).
5. Serwer sam ustawia `RAILWAY_ENVIRONMENT` — statyczny front włącza się bez ręcznego `NODE_ENV`.

Jeśli w repozytorium jest **Dockerfile**, Railway może zbudować obraz zamiast Nixpacks — oba warianty są poprawne.

## Render

1. Utwórz **Web Service** z repozytorium albo użyj `render.yaml` (**Blueprint**).
2. Ustaw te same zmienne co wyżej + upewnij się, że `NODE_ENV=production` (jest w przykładowym `render.yaml`).
3. `Start command`: `npm start`.

## Docker (dowolny hosting z kontenerami)

```bash
docker build -t single-page-portfolio .
docker run -p 3001:3001 -e NODE_ENV=production -e RESEND_API_KEY=... -e CONTACT_FROM_EMAIL="DD BUD <onboarding@resend.dev>" -e CONTACT_TO_EMAIL=... single-page-portfolio
```

## Lokalny podgląd „jak na produkcji”

```bash
npm run build
set SERVE_STATIC=1&& node server/index.mjs
```

(PowerShell: `$env:SERVE_STATIC='1'; node server/index.mjs`.) Otwórz `http://localhost:3001`.

## Vercel

Vercel opiera się o **funkcje serverless**; ten projekt ma **długo działający Express**. Najprościej użyć **Railway / Render / Docker**. Pełna integracja z Vercel wymagałaby osobnego handlera serverless — nie jest w tym repozytorium.

## GitHub Pages

Publikuje **tylko front** z `npm run build` (bez Node API). Formularz działa dopiero po ustawieniu **`VITE_CONTACT_API`** albo osobnym backendzie.

### Checklist (raz na repo)

1. **Settings → Pages → Build and deployment → Source:** **GitHub Actions** (nie „Deploy from a branch”).
2. **Settings → Actions → General → Workflow permissions:** **Read and write** (wymagane do wdrożenia artefaktu na Pages).
3. Wypchnij kod na **`main`** lub **`master`** — workflow `.github/workflows/deploy-pages.yml` uruchomi się sam.  
   Albo **Actions → Deploy to GitHub Pages → Run workflow** (ręczny start).
4. Po zielonym jobie: **Settings → Pages** — na górze pojawi się link **`https://TWOJ_LOGIN.github.io/NAZWA_REPO/`**.

### Opcjonalnie: formularz z github.io

**Settings → Secrets and variables → Actions → Variables** → dodaj **`VITE_CONTACT_API`** = pełny adres do backendu, np. `https://twoj-api.up.railway.app/api/contact`, potem ponownie uruchom workflow (push lub Run workflow). Na backendzie dopisz **`CORS_ORIGINS`** z adresem strony na `github.io`.
