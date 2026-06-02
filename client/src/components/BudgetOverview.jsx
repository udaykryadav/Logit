import React from "react";

const DEFAULT_CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"];
const DEFAULT_ICONS = {
  Food: "🍜",
  Transport: "🚌",
  Bills: "📄",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Health: "💊",
  Other: "📦",
};
const DEFAULT_COLORS = {
  Food: "#e85d3a",
  Transport: "#3b82f6",
  Bills: "#f59e0b",
  Entertainment: "#8b5cf6",
  Shopping: "#ec4899",
  Health: "#10b981",
  Other: "#6b7280",
};
const DEFAULT_BUDGETS = {
  Food: 8000,
  Transport: 3000,
  Bills: 5000,
  Entertainment: 2000,
  Shopping: 4000,
  Health: 2000,
  Other: 1500,
};

export default function BudgetOverview({
  expenses = [],
  budgets = {},
  categories = [],
  catIcons = {},
  catColors = {},
  currencyFormatter = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v)
}) {
  const activeCategories = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
  const activeIcons = catIcons && Object.keys(catIcons).length > 0 ? catIcons : DEFAULT_ICONS;
  const activeColors = catColors && Object.keys(catColors).length > 0 ? catColors : DEFAULT_COLORS;
  const activeBudgets = budgets && Object.keys(budgets).length > 0 ? budgets : DEFAULT_BUDGETS;

  return (
    <div className="budget-overview-container">
      <div className="budget-header">
        <h3 className="budget-title">Budget overview</h3>
        <span className="budget-subtitle">Filtered period</span>
      </div>
      <div className="budget-grid">
        {activeCategories.map((cat) => {
          const spent = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0);
          
          const budget = activeBudgets[cat] || 0;
          const percentage = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
          const isOverBudget = spent > budget;
          
          return (
            <div key={cat} className="budget-item">
              <div className="budget-info">
                <span className="budget-category-label">
                  {activeIcons[cat] ? `${activeIcons[cat]} ` : ""}{cat}
                </span>
                <span className={`budget-values ${isOverBudget ? "over-budget" : ""}`}>
                  {currencyFormatter(spent)} / {currencyFormatter(budget)}
                </span>
              </div>
              <div className="budget-progress-track">
                <div 
                  className={`budget-progress-fill ${isOverBudget ? "over-budget-fill" : ""}`}
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: isOverBudget ? "#e85d3a" : (activeColors[cat] || "#aa3bff") 
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
