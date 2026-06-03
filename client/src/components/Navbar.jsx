import { useState, useEffect } from "react";

export default function Navbar({ onAddExpense, currentView = "dashboard", onViewChange = () => {} }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <span className="navbar-logo-icon">💸</span>
        <span className="navbar-title">Logit</span>
      </div>

      <div className="navbar-links">
        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); onViewChange("dashboard"); }} 
          className={`navbar-link ${currentView === "dashboard" ? "active" : ""}`}
        >
          Dashboard
        </a>
        <a 
          href="#expenses" 
          onClick={(e) => { e.preventDefault(); onViewChange("expenses"); }} 
          className={`navbar-link ${currentView === "expenses" ? "active" : ""}`}
        >
          Expenses
        </a>
        <a 
          href="#analytics" 
          onClick={(e) => { e.preventDefault(); onViewChange("analytics"); }} 
          className={`navbar-link ${currentView === "analytics" ? "active" : ""}`}
        >
          Analytics
        </a>
        <a 
          href="#budgets" 
          onClick={(e) => { e.preventDefault(); onViewChange("budgets"); }} 
          className={`navbar-link ${currentView === "budgets" ? "active" : ""}`}
        >
          Budgets
        </a>
      </div>

      <div className="navbar-actions">
        <button onClick={onAddExpense} className="btn-primary">
          + Add Expense
        </button>
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="user-profile">
          <span className="user-avatar">U</span>
        </div>
      </div>
    </nav>
  );
}
