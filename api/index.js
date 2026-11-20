// Vercel serverless entry point: hands every request to the Express app
// defined in server.js (vercel.json rewrites all paths here).
const app = require('../server');

module.exports = app;
