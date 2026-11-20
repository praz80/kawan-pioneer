# Kawan Pioneer (Pioneer Buddy)

An Indonesian-language companion app for Pi Network Pioneers: Pi lessons, wallet
safety, a scam-shield checker, and daily quizzes — built for the **Pi Next
Hackathon** (submission deadline 6 Jan 2027, 14:59 WIB).

## What it does

- **Belajar Pi** — six short Bahasa Indonesia modules (Pi basics, wallet &
  passphrase safety, KYC, the Mainnet Checklist, reading the Block Explorer,
  safe transacting), each ending in a quiz worth XP.
- **Perisai Penipuan (Scam Shield)** — paste a suspicious message or link and
  the app flags red patterns (passphrase requests, send-first scams, fake
  fees, guaranteed-profit claims, impersonation, urgency, non-official
  domains). The analysis runs fully on-device.
- **Kuis Harian** — five seeded questions a day, XP, levels, and streaks.
- **Paket Penjaga** — a 1 Pi premium unlock via Pi Payments (User-to-App flow
  with server approval and completion).

## Run it (development / Pi Sandbox)

```bash
npm install
cp .env.example .env   # fill in PI_API_KEY from the Developer Portal
npm start              # http://localhost:3000
```

The frontend initializes the Pi SDK with `sandbox: true` (see `SANDBOX` in
`public/app.js`). Outside Pi Browser the app runs in a clearly-labelled demo
mode: sign-in and payments are simulated so the content can be previewed
anywhere, while all learning features work normally.

## Deployment status (20 Nov 2026)

- Live on Vercel (Hobby): https://kawan-pioneer.vercel.app
- Registered as the app URL of "Pioneer Buddy" (Testnet) in the Pi Developer
  Portal; **domain ownership verified** on 20 Nov 2026 (validation key served
  from a Vercel environment variable, never committed).
- Server API Key stored as the `PI_API_KEY` Vercel environment variable
  (Secret, Production + Preview) — set by the app owner, never committed.

## Production checklist

1. Register the app in the Pi Developer Portal and copy the Server API Key
   into `.env` (server-side only — never commit it). **Done — via Vercel env.**
2. Deploy behind HTTPS, register the production URL in the Developer Portal,
   and complete domain ownership validation. **Done for the Testnet app.**
3. Set `SANDBOX = false` in `public/app.js`.
4. Complete one real User-to-App payment to confirm the setup.
5. Listing assets: English name ("Pioneer Buddy"), English description,
   logo per Pi trademark guidelines, preview images, PiNet integration,
   and this privacy policy (served at `/privacy.html`).

## Layout

```
public/   index.html · app.js · data.js (content) · style.css · privacy.html
server.js Express backend: /api/verify, /api/payments/approve, /api/payments/complete
```
