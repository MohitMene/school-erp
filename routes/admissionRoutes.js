const express = require("express");
const router = express.Router();
const { submitAdmission } = require("../controllers/admissionController");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

// Middleware to protect route


function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token required or invalid format" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}
// Route to submit admission form
router.post("/submit", submitAdmission);

// ✅ Now protected with token
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await Student.find().sort({ date: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving students" });
  }
});

module.exports = router;
