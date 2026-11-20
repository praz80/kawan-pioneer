// Kawan Pioneer — backend.
// Serves the static app and provides the three server routes a Pi app needs:
//   POST /api/verify             — verify a Pioneer's access token with the Platform API
//   POST /api/payments/approve   — approve a User-to-App payment (Server API Key)
//   POST /api/payments/complete  — complete a payment after its blockchain transaction
// Pattern follows the official guide at developers.minepi.com ("Build an App").
// The Server API Key stays on the server (see .env.example); it is never sent to clients.

const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());

// Embed headers for the Pi Sandbox / Pi Browser, per developers.minepi.com/agents.md:
// never send X-Frame-Options; allow framing only by Pi surfaces; the Pi SDK
// calls socialchain.app.
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' https://sdk.minepi.com",
      "style-src 'self'",
      "img-src 'self' data:",
      "connect-src 'self' https://socialchain.app https://api.minepi.com",
      "frame-ancestors 'self' https://*.pinet.com https://*.minepi.com",
    ].join('; ')
  );
  next();
});

// Pi domain-ownership proof. The Developer Portal shows a validation key when
// the app URL is registered; the app owner stores it as the PI_VALIDATION_KEY
// environment variable (never in code or in the repo), and this route serves it
// back as plain text so the Portal can confirm the domain is really ours.
app.get('/validation-key.txt', (req, res) => {
  const key = process.env.PI_VALIDATION_KEY || '';
  if (!key) return res.status(404).type('text/plain').send('not configured');
  res.type('text/plain').send(key);
});

app.use(express.static(path.join(__dirname, 'public')));

const PI_API_BASE = 'https://api.minepi.com/v2';
const PI_API_KEY = process.env.PI_API_KEY || '';
const PORT = process.env.PORT || 3000;

// Payments whose premium delivery has already happened. The Pi Platform retries
// the approve/complete callbacks roughly every 10 seconds, so delivery must be
// guarded on payment state, not on the request arriving (idempotency).
const delivered = new Set();

app.post('/api/verify', async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) return res.status(401).json({ error: 'Missing access token' });
  try {
    const piRes = await fetch(`${PI_API_BASE}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!piRes.ok) return res.status(401).json({ error: 'Unauthorized' });
    const user = await piRes.json();
    // A production deployment would create its own session/JWT for user.uid here.
    res.json({ uid: user.uid, username: user.username });
  } catch (err) {
    res.status(502).json({ error: 'Platform API unreachable' });
  }
});

app.post('/api/payments/approve', async (req, res) => {
  const { paymentId } = req.body || {};
  if (!paymentId) return res.status(400).json({ error: 'Missing paymentId' });
  if (!PI_API_KEY) return res.status(503).json({ error: 'Server API Key not configured' });
  try {
    // A production deployment confirms the order and amount against its own
    // database before approving. Kawan Pioneer's only product is the fixed
    // 1 Pi "Paket Penjaga", so there is nothing variable to check yet.
    const approval = await fetch(`${PI_API_BASE}/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { Authorization: `Key ${PI_API_KEY}` },
    });
    res.status(approval.status).json(await approval.json());
  } catch (err) {
    res.status(502).json({ error: 'Platform API unreachable' });
  }
});

app.post('/api/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body || {};
  if (!paymentId || !txid) return res.status(400).json({ error: 'Missing paymentId or txid' });
  if (!PI_API_KEY) return res.status(503).json({ error: 'Server API Key not configured' });
  try {
    // This route is also called from the frontend's onIncompletePayment
    // callback, which carries no user session. Authorize on the payment
    // itself: look it up with the Server API Key and confirm it is ours.
    const lookup = await fetch(`${PI_API_BASE}/payments/${paymentId}`, {
      headers: { Authorization: `Key ${PI_API_KEY}` },
    });
    if (!lookup.ok) return res.status(404).json({ error: 'Payment not found' });

    const completion = await fetch(`${PI_API_BASE}/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    });
    const data = await completion.json();
    if (completion.ok && !delivered.has(paymentId)) {
      delivered.add(paymentId);
      // Deliver "Paket Penjaga" here in production (flag the buyer's account).
      // The hackathon build unlocks premium client-side on the success callback;
      // this set is where the server-side entitlement record belongs.
      console.log(`Premium delivered for payment ${paymentId} (txid ${txid})`);
    }
    res.status(completion.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Platform API unreachable' });
  }
});

// Local / traditional hosts: run directly (`node server.js`) and listen.
// Serverless hosts (Vercel): api/index.js imports the app as a handler instead.
if (require.main === module) {
  app.listen(PORT, () => console.log(`Kawan Pioneer listening on http://localhost:${PORT}`));
}

module.exports = app;
