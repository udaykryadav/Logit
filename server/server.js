import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/logit";

// Middleware
app.use(cors());
app.use(express.json());

// Hello World / API Health Check Route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "Logit API is running successfully!",
    timestamp: new Date()
  });
});

// Database connection & Server Startup
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    console.log("🚀 MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`📡 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("⚠️  Starting server without MongoDB connection...");
    app.listen(PORT, () => {
      console.log(`📡 Server running on http://localhost:${PORT}`);
    });
  });
