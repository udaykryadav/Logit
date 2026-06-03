
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

export default function FilterBar({
  filterRange = "this_month",
  setFilterRange,
  filterCat = "All",
  setFilterCat,
  customFrom = "",
  setCustomFrom,
  customTo = "",
  setCustomTo,
  categories = [],
  catIcons = {},
  onExportCSV,
  onOpenBudgets,
  onOpenExpenses,
  today = () => new Date().toISOString().split("T")[0]
}) {
  const activeCategories = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
  const activeIcons = catIcons && Object.keys(catIcons).length > 0 ? catIcons : DEFAULT_ICONS;

  return (
    <div className="filter-bar-container">
      <div className="filter-group">
        {/* Date Range Selector */}
        <div className="select-wrapper">
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            className="filter-select"
          >
            <option value="this_month">This month</option>
            <option value="last_month">Last month</option>
            <option value="this_year">This year</option>
            <option value="custom">Custom range</option>
          </select>
          <span className="select-arrow">▼</span>
        </div>

        {/* Custom Date Inputs */}
        {filterRange === "custom" && (
          <div className="custom-date-inputs">
            <input
              type="date"
              value={customFrom}
              max={today()}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="filter-date-input"
            />
            <span className="date-separator">to</span>
            <input
              type="date"
              value={customTo}
              max={today()}
              onChange={(e) => setCustomTo(e.target.value)}
              className="filter-date-input"
            />
          </div>
        )}

        {/* Category Selector */}
        <div className="select-wrapper">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="filter-select"
          >
            <option value="All">All categories</option>
            {activeCategories.map((c) => (
              <option key={c} value={c}>
                {activeIcons[c] ? `${activeIcons[c]} ${c}` : c}
              </option>
            ))}
          </select>
          <span className="select-arrow">▼</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-group">
        {onOpenExpenses && (
          <button onClick={onOpenExpenses} className="btn-secondary" title="View Expenses">
            <span className="btn-icon">💸</span> Expenses
          </button>
        )}
        <button onClick={onOpenBudgets} className="btn-secondary" title="Manage Budgets">
          <span className="btn-icon">🎯</span> Budgets
        </button>
        <button onClick={onExportCSV} className="btn-secondary" title="Export to CSV">
          <span className="btn-icon">↓</span> Export CSV
        </button>
      </div>
    </div>
  );
}
