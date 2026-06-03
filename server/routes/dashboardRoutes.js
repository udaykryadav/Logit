import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Get dashboard statistics
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    const totalFiltered = expenses.reduce((sum, e) => sum + e.amount, 0);
    const filteredCount = expenses.length;

    // This Month calculation
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];
    const thisMonthExpenses = expenses.filter((e) => e.date >= thisMonthStart && e.date <= todayStr);
    const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const thisMonthCount = thisMonthExpenses.length;

    // Highest single expense
    const highestExpense = expenses.length > 0 
      ? expenses.reduce((max, e) => e.amount > max.amount ? e : max, expenses[0]) 
      : null;

    // Average per day
    const uniqueDates = new Set(expenses.map((e) => e.date)).size;
    const avgPerDay = uniqueDates > 0 ? totalFiltered / uniqueDates : 0;

    // Recent 5 expenses
    const recentExpenses = expenses.slice(0, 5);

    res.json({
      totalFiltered,
      filteredCount,
      totalThisMonth,
      thisMonthCount,
      highestExpense,
      avgPerDay,
      recentExpenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
