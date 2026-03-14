// 🟦[TEMPLATE: VERCEL_SERVERLESS_BACKEND]
// This is the upgraded template for a Vercel Serverless Backend!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middlewares
app.use(cors()); // Lets frontend talk to backend
app.use(express.json()); // Lets backend understand JSON data
app.use(express.urlencoded({ extended: true })); // REQUIRED FOR SSLCOMMERZ

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));

// 3. Routes 
app.use('/api/auth', require('./routes/authRoutes.cjs'));
app.use('/api/payment', require('./routes/paymentRoutes.cjs'));

// Simple Test Route
app.get('/api', (req, res) => {
    res.send("Kodanda School Serverless API is running ⚡!");
});

// 4. EXPORT FOR VERCEL (We do NOT use app.listen in Serverless!)
module.exports = app;