import { useState } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";
import BudgetOverview from "./components/BudgetOverview";
import CategoryBreakdown from "./components/CategoryBreakdown";
import "./App.css";

const todayRelative = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

const SEED_DATA = [
  { id: 1, amount: 450, category: "Food", date: todayRelative(1), note: "Lunch at office" },
  { id: 2, amount: 1200, category: "Transport", date: todayRelative(2), note: "Monthly metro pass" },
  { id: 3, amount: 3500, category: "Bills", date: todayRelative(3), note: "Electricity bill" },
  { id: 4, amount: 799, category: "Entertainment", date: todayRelative(4), note: "Netflix + Hotstar" },
  { id: 5, amount: 2200, category: "Shopping", date: todayRelative(5), note: "Grocery run" },
  { id: 6, amount: 650, category: "Health", date: todayRelative(6), note: "Pharmacy" },
  { id: 7, amount: 380, category: "Food", date: todayRelative(0), note: "Dinner out" },
];

function App() {
  const [filterRange, setFilterRange] = useState("this_month");
  const [filterCat, setFilterCat] = useState("All");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [expenses, setExpenses] = useState(SEED_DATA);

  // Dynamic Metrics calculations
  const totalFiltered = expenses.reduce((sum, e) => sum + e.amount, 0);
  const filteredCount = expenses.length;

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const todayStr = new Date().toISOString().split("T")[0];
  const thisMonthExpenses = expenses.filter((e) => e.date >= thisMonthStart && e.date <= todayStr);
  const totalThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthCount = thisMonthExpenses.length;

  const highestExpense = expenses.length > 0 ? expenses.reduce((max, e) => e.amount > max.amount ? e : max, expenses[0]) : null;
  const uniqueDates = new Set(expenses.map((e) => e.date)).size;
  const avgPerDay = uniqueDates > 0 ? totalFiltered / uniqueDates : 0;

  return (
    <>
      <Navbar onAddExpense={() => console.log("Add Expense clicked")} />
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
        />
        <SummaryCards
          totalFiltered={totalFiltered}
          filteredCount={filteredCount}
          totalThisMonth={totalThisMonth}
          thisMonthCount={thisMonthCount}
          highestExpense={highestExpense}
          avgPerDay={avgPerDay}
        />
        <BudgetOverview expenses={expenses} />
        <CategoryBreakdown expenses={expenses} />
      </div>
    </>
  );
}

export default App;
