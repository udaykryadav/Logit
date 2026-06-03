// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import expenseRoutes from "./routes/expenseRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import budgetRoutes from "./routes/budgetRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Hello World / API Health Check Route
// app.get("/api", (req, res) => {
//   res.json({
//     status: "success",
//     message: "Logit API is running successfully!",
//     timestamp: new Date()
//   });
// });

// // Mount Routes
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/budgets", budgetRoutes);

// // Connect to Database
// connectDB();

// // Start Server
// app.listen(PORT, () => {
//   console.log(`📡 Server running on http://localhost:${PORT}`);
// });



// production changes

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic CORS configuration for separate deployment
const allowedOrigins = [
  "http://localhost:5173", // For local Vite development
  "http://localhost:3000", // For local React template fallback
  process.env.FRONTEND_URL  // Your live production frontend domain (set in host dashboard)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman testing)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Blocked by CORS policy: Origin not allowed by server."));
    }
  },
  credentials: true
}));

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
app.use("/api/budgets", budgetRoutes);

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Server running on port ${PORT}`);
});