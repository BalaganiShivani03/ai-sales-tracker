// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dealRoutes = require('./routes/dealRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ────────────────────────────────────────────────
// Middleware
// ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ────────────────────────────────────────────────
// Health Check Route
// ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('✅ AI Sales Pipeline Tracker backend is running.');
});

// ────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────
app.use('/api/deals', dealRoutes);
app.use('/api/ai', aiRoutes);

// ────────────────────────────────────────────────
// MongoDB Connection & Server Start
// ────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () =>
    console.log(`🚀 Server running at: http://localhost:${PORT}`)
  );
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
});
