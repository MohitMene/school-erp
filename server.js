// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import route files
const admissionRoutes = require("./routes/admissionRoutes");
const authRoutes = require("./routes/authRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/admissions", admissionRoutes); // e.g., POST /api/admissions
app.use("/api/auth", authRoutes); // e.g., POST /api/auth/login

// Serve frontend (static HTML/CSS/JS)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// For unknown routes, fallback to index.html (if SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB connection error:", err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
