import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new expense
router.post("/", async (req, res) => {
  const { amount, category, date, note } = req.body;
  try {
    const newExpense = new Expense({ amount, category, date, note });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing expense
router.put("/:id", async (req, res) => {
  const { amount, category, date, note } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, date, note },
      { new: true, runValidators: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
