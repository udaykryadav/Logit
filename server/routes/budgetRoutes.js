import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

// Get all category budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bulk upsert/update category budgets
router.post("/", async (req, res) => {
  const { budgets } = req.body; // Expects { Food: 8000, Transport: 3000, ... }
  if (!budgets || typeof budgets !== "object") {
    return res.status(400).json({ message: "Invalid budget data format" });
  }

  try {
    const promises = Object.entries(budgets).map(([category, limit]) => {
      return Budget.findOneAndUpdate(
        { category },
        { limit: parseFloat(limit) || 0 },
        { new: true, upsert: true, runValidators: true }
      );
    });

    await Promise.all(promises);

    const updated = await Budget.find();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
