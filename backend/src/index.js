// backend/src/index.js
/**
 * Application entry point
 */
import 'dotenv/config';                // loads .env automatically
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import SharkRouter from './routers/SharkRouter.js';
import AuthRouter from './routers/AuthRouter.js';
import db from './db/db.js';           // to close pool on shutdown (optional)

// --- Config ---
const PORT = Number(process.env.PORT) || 3333;
const ORIGIN = process.env.CORS_ORIGIN || '*'; // set to http://localhost:3000 for dev

// --- App ---
const app = express();

// --- Middleware ---
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(morgan('dev'));

// --- Routes ---
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

app.use('/api/sharks', SharkRouter);
app.use('/api/auth', AuthRouter);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// --- Error handler ---
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// --- Start server (skip in tests) ---
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });

  // Graceful shutdown (optional)
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Closing server...`);
    server.close(async () => {
      try {
        await db.end(); // closes mysql2 pool
        console.log('🟢 DB pool closed.');
      } catch (e) {
        console.error('DB close error:', e);
      } finally {
        process.exit(0);
      }
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

export default app;
