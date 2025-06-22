// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB Error:", err);
});

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// ✅ Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("❌ Signin Error:", error);
    res.status(500).json({ message: "Signin failed" });
  }
});

// ✅ AI: Motivational Quote
app.post("/api/motivation", async (req, res) => {
  const { topic } = req.body;
  try {
    const prompt = `Give a short motivational quote for a student studying "${topic}". It should be fresh, non-cliché, and spark energy to keep learning.`;
    const result = await model.generateContent(prompt);
    const quote = result.response.text().trim();
    res.json({ quote });
  } catch (error) {
    console.error("❌ Motivation Error:", error);
    res.status(500).json({
      quote: "🌟 Keep pushing forward. Every bug you fix takes you one step closer to mastery!",
    });
  }
});

// ✅ AI: Topic Explanation
app.post("/api/explanation", async (req, res) => {
  const { topic } = req.body;
  try {
    const prompt = `Explain "${topic}" in simple beginner-friendly language with a real-world relatable example. Make it fun, energetic, and easy to understand for a student learning web development.`;
    const result = await model.generateContent(prompt);
    const explanation = result.response.text().trim();
    res.json({ explanation });
  } catch (error) {
    console.error("❌ Explanation Error:", error);
    res.status(500).json({
      explanation: "❌ Could not fetch explanation. Please try again later.",
    });
  }
});

// ✅ AI: Feedback on Student Answer
app.post("/api/feedback", async (req, res) => {
  const { question, userAnswer } = req.body;
  try {
    const prompt = `You are a JavaScript teacher. Here's a student's response:\n\nQuestion: ${question}\nAnswer: ${userAnswer}\n\nGive helpful feedback. Praise what's good, and suggest improvements in a kind, encouraging tone.`;
    const result = await model.generateContent(prompt);
    const feedback = result.response.text().trim();
    res.json({ feedback });
  } catch (error) {
    console.error("❌ Feedback Error:", error);
    res.status(500).json({
      feedback: "❌ Feedback couldn't be generated. Please try again later.",
    });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
