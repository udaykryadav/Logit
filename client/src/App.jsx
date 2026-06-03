import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";
import BudgetOverview from "./components/BudgetOverview";
import CategoryBreakdown from "./components/CategoryBreakdown";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");
  const [filterRange, setFilterRange] = useState("this_month");
  const [filterCat, setFilterCat] = useState("All");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses on mount
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/expenses");
      if (!res.ok) throw new Error("Failed to fetch expenses from backend server.");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
  }, []);

  // CRUD Actions
  const handleAddExpense = async (expenseData) => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      if (!res.ok) throw new Error("Failed to add new expense.");
      const savedExpense = await res.json();
      setExpenses((prev) => [savedExpense, ...prev]);
      return true;
    } catch (err) {
      alert(`Error: ${err.message}`);
      return false;
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    if (!editingExpense) return false;
    const id = editingExpense._id || editingExpense.id;
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      if (!res.ok) throw new Error("Failed to update expense.");
      const updatedExpense = await res.json();
      setExpenses((prev) =>
        prev.map((e) => (e._id === id || e.id === id ? updatedExpense : e))
      );
      return true;
    } catch (err) {
      alert(`Error: ${err.message}`);
      return false;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete expense.");
      setExpenses((prev) => prev.filter((e) => e._id !== id && e.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleFormSubmit = async (expenseData) => {
    if (editingExpense) {
      return await handleUpdateExpense(expenseData);
    } else {
      return await handleAddExpense(expenseData);
    }
  };

  // CSV Export Action
  const handleExportCSV = () => {
    if (filteredExpenses.length === 0) {
      alert("No expenses in the filtered view to export.");
      return;
    }
    const headers = ["ID", "Amount (INR)", "Category", "Date", "Note"];
    const rows = filteredExpenses.map((e, index) => [
      e._id || e.id || index + 1,
      e.amount,
      `"${e.category}"`,
      e.date,
      `"${e.note || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `logit_expenses_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to format/parse dates securely locally
  const getLocalStr = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Client-Side Filtering
  const filteredExpenses = expenses.filter((e) => {
    // 1. Category Filter
    if (filterCat !== "All" && e.category !== filterCat) return false;

    // 2. Date Range Filter
    const expenseDate = e.date; // expects "YYYY-MM-DD"
    const now = new Date();

    if (filterRange === "this_month") {
      const start = getLocalStr(new Date(now.getFullYear(), now.getMonth(), 1));
      const end = getLocalStr(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      return expenseDate >= start && expenseDate <= end;
    } else if (filterRange === "last_month") {
      const start = getLocalStr(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      const end = getLocalStr(new Date(now.getFullYear(), now.getMonth(), 0));
      return expenseDate >= start && expenseDate <= end;
    } else if (filterRange === "this_year") {
      const start = `${now.getFullYear()}-01-01`;
      const end = `${now.getFullYear()}-12-31`;
      return expenseDate >= start && expenseDate <= end;
    } else if (filterRange === "custom") {
      if (customFrom && expenseDate < customFrom) return false;
      if (customTo && expenseDate > customTo) return false;
    }
    return true;
  });

  // Calculations for Metrics Cards
  const totalFiltered = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const filteredCount = filteredExpenses.length;

  const now = new Date();
  const thisMonthStart = getLocalStr(new Date(now.getFullYear(), now.getMonth(), 1));
  const todayStr = getLocalStr(new Date());
  
  const thisMonthExpenses = expenses.filter((e) => e.date >= thisMonthStart && e.date <= todayStr);
  const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthCount = thisMonthExpenses.length;

  const highestExpense = filteredExpenses.length > 0 
    ? filteredExpenses.reduce((max, e) => e.amount > max.amount ? e : max, filteredExpenses[0]) 
    : null;
    
  const uniqueDates = new Set(filteredExpenses.map((e) => e.date)).size;
  const avgPerDay = uniqueDates > 0 ? totalFiltered / uniqueDates : 0;

  return (
    <>
      <Navbar 
        onAddExpense={() => {
          setEditingExpense(null);
          setIsModalOpen(true);
        }} 
        currentView={view}
        onViewChange={setView}
      />
      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <FilterBar
          filterRange={filterRange}
          setFilterRange={setFilterRange}
          filterCat={filterCat}
          setFilterCat={setFilterCat}
          customFrom={customFrom}
          setCustomFrom={setCustomFrom}
          customTo={customTo}
          setCustomTo={setCustomTo}
          onExportCSV={handleExportCSV}
          onOpenBudgets={() => setView("budgets")}
        />

        {error && (
          <div style={{ padding: "16px", marginBottom: "24px", backgroundColor: "rgba(232, 93, 58, 0.15)", border: "1px solid rgba(232, 93, 58, 0.4)", borderRadius: "12px", color: "#e85d3a", fontSize: "14px", fontWeight: 500, textAlign: "left" }}>
            ⚠️ Error: {error}. Proceeding with offline calculations.
          </div>
        )}

        {loading ? (
          <div style={{ padding: "80px", textAlign: "center", color: "var(--text)" }}>
            <span style={{ fontSize: "24px", display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
            <p style={{ marginTop: "12px", fontWeight: 500 }}>Loading transactions from database...</p>
          </div>
        ) : (
          <>
            {view === "dashboard" && (
              <>
                <SummaryCards
                  totalFiltered={totalFiltered}
                  filteredCount={filteredCount}
                  totalThisMonth={totalThisMonth}
                  thisMonthCount={thisMonthCount}
                  highestExpense={highestExpense}
                  avgPerDay={avgPerDay}
                />
                <BudgetOverview expenses={filteredExpenses} />
                <CategoryBreakdown expenses={filteredExpenses} />
              </>
            )}

            {view === "expenses" && (
              <ExpenseList 
                expenses={filteredExpenses} 
                onEdit={(exp) => {
                  setEditingExpense(exp);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteExpense}
              />
            )}

            {view === "budgets" && (
              <BudgetOverview expenses={filteredExpenses} />
            )}

            {view === "analytics" && (
              <div className="analytics-placeholder" style={{ padding: "40px", textAlign: "center", border: "1px dashed var(--border)", borderRadius: "12px", background: "var(--code-bg)" }}>
                <span style={{ fontSize: "32px" }}>📊</span>
                <h4 style={{ margin: "12px 0 6px 0", color: "var(--text-h)" }}>Analytics Dashboard</h4>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--text)" }}>Interactive Recharts visualizations are under construction.</p>
              </div>
            )}
          </>
        )}
      </div>

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleFormSubmit}
        expense={editingExpense}
      />
    </>
  );
}

export default App;
