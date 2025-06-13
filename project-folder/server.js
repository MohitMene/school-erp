// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admissionRoutes = require("./routes/admissionRoutes");// ✅ import the router directly

dotenv.config();
console.log("JWT Secret loaded:", process.env.JWT_SECRET); // ✅ Add this


const app = express();
console.log("Type of admissionRoutes:", typeof admissionRoutes);
app.use(cors());
app.use(express.json());

// ✅ Mount the router (must be a function)
app.use("/api/admissions", admissionRoutes);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
