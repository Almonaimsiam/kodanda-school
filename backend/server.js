// 🟦 [TEMPLATE: EXPRESS_MONGO_SERVER]
// Use this as the starting point for ANY Node.js & MongoDB backend.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middlewares
app.use(cors()); // Lets frontend talk to backend
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // REQUIRED FOR SSLCOMMERZ// Lets backend understand JSON data

// 2. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));

// 3. Routes (We will create authRoutes in the next step)
app.use('/api/auth', require('./routes/authRoutes'));
// 3. Routes 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes')); // <-- ADD THIS LINE

// Simple Test Route
app.get('/', (req, res) => {
    res.send("Kodanda School API is running!");
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});