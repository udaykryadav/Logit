import { useState, useEffect } from "react";

export default function Navbar({ onAddExpense }) {
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
        <a href="#dashboard" className="navbar-link active">Dashboard</a>
        <a href="#expenses" className="navbar-link">Expenses</a>
        <a href="#analytics" className="navbar-link">Analytics</a>
        <a href="#budgets" className="navbar-link">Budgets</a>
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
