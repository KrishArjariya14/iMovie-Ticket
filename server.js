import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { connectMongoDB, getDatabaseStatus, Booking, Movie } from './src/db/mongodb.js';
import { MOCK_MOVIES, INITIAL_BOOKINGS } from './src/data/mockData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Attempt MongoDB Connection at startup
connectMongoDB().catch((err) => {
  console.log('[Server] MongoDB initialization notice:', err.message);
});

// -------------------------------------------------------------
// Backend REST API Endpoints (/api/*)
// -------------------------------------------------------------

// 1. Health & Database Status
app.get('/api/status', (req, res) => {
  const dbInfo = getDatabaseStatus();
  res.json({
    status: 'online',
    appName: 'iMovies India',
    developer: 'Krish Arjariya',
    developerEmail: 'krisharjariya861@gmail.com',
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    database: dbInfo,
    serverTime: new Date().toISOString(),
  });
});

// 2. Movies Endpoint
app.get('/api/movies', async (req, res) => {
  try {
    const dbInfo = getDatabaseStatus();
    if (dbInfo.isConnected) {
      let dbMovies = await Movie.find();
      if (dbMovies.length === 0) {
        // Seed initial Indian movies if collection is empty
        await Movie.insertMany(MOCK_MOVIES);
        dbMovies = await Movie.find();
      }
      return res.json(dbMovies);
    }
  } catch (err) {
    console.warn('[API] MongoDB fetch fallback to local mock:', err.message);
  }
  return res.json(MOCK_MOVIES);
});

// 3. Save Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    const dbInfo = getDatabaseStatus();
    if (dbInfo.isConnected) {
      const saved = await Booking.create(bookingData);
      return res.status(201).json({ success: true, booking: saved });
    }
  } catch (err) {
    console.warn('[API] MongoDB save fallback to local state:', err.message);
  }
  return res.status(201).json({ success: true, booking: req.body });
});

// 4. Retrieve Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const dbInfo = getDatabaseStatus();
    if (dbInfo.isConnected) {
      const dbBookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(dbBookings);
    }
  } catch (err) {
    console.warn('[API] Bookings fetch fallback:', err.message);
  }
  return res.json(INITIAL_BOOKINGS);
});

// -------------------------------------------------------------
// Vite Frontend Middleware / Static Serve
// -------------------------------------------------------------
if (!isProduction) {
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎬 iMovies India Server running on http://localhost:${PORT}`);
  console.log(`👤 Developer: Krish Arjariya (krisharjariya861@gmail.com)`);
  console.log(`🍃 Database Status: ${getDatabaseStatus().statusMessage}`);
});
