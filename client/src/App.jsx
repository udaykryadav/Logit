import { useState } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";
import BudgetOverview from "./components/BudgetOverview";
import "./App.css";

function App() {
  const [filterRange, setFilterRange] = useState("this_month");
  const [filterCat, setFilterCat] = useState("All");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  return (
    <>
      <Navbar />
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
        <SummaryCards />
        <BudgetOverview />
      </div>
    </>
  );
}

export default App;
