export default function Navbar({ 
  onAddExpense, 
  currentView = "dashboard", 
  onViewChange = () => {},
  theme = "light",
  onToggleTheme = () => {}
}) {
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
        <button onClick={onToggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="user-profile">
          <span className="user-avatar">U</span>
        </div>
      </div>
    </nav>
  );
}
