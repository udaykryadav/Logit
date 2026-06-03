import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Mount Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Server running on http://localhost:${PORT}`);
});
