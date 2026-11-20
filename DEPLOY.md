# Deploy guide — Pioneer Buddy (Kawan Pioneer)

Why this route: the build machine's network blocks public tunnels (Cloudflare
quick tunnel, localtunnel, and SSH tunnels all fail), so the app needs real
hosting. Render's free tier runs this Express app unchanged and gives a stable
HTTPS URL — which is what the Pi Developer Portal's App Configuration needs.

## Steps (user's accounts, guided)

1. Push this repo to a GitHub repository under the user's account.
2. On render.com: New → Web Service → connect the GitHub repo. Render reads
   `render.yaml` (build: `npm install`, start: `npm start`, free plan).
3. In Render's Environment tab, add `PI_API_KEY` = the app's Server API Key
   from the Pi Developer Portal. The key is entered there directly — never in
   chat, never committed to the repo.
4. Deploy. The public URL looks like `https://pioneer-buddy.onrender.com`.
5. In the Pi Developer Portal → Pioneer Buddy → App Configuration: set the
   App URL to that URL, and set the production privacy policy URL to
   `<URL>/privacy.html`.
6. Switch the frontend to production mode (`Pi.init({ sandbox: false })`)
   only when moving from Sandbox testing to the Mainnet listing.

## Notes
- Render free services sleep after inactivity and take ~30–60s to wake; fine
  for judging and demos, and it keeps the URL stable.
- For Sandbox testing before production, the same URL works: keep
  `sandbox: true`, register the URL in the portal's testnet app, and test via
  the Pi Sandbox / Pi Browser.
