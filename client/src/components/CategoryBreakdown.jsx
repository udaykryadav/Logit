
const DEFAULT_CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"];
const DEFAULT_COLORS = {
  Food: "#e85d3a",
  Transport: "#3b82f6",
  Bills: "#f59e0b",
  Entertainment: "#8b5cf6",
  Shopping: "#ec4899",
  Health: "#10b981",
  Other: "#6b7280",
};

export default function CategoryBreakdown({
  expenses = [],
  categories = [],
  catColors = {},
  currencyFormatter = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v)
}) {
  const activeCategories = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;
  const activeColors = catColors && Object.keys(catColors).length > 0 ? catColors : DEFAULT_COLORS;

  const totalSpend = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Compute breakdown stats for active categories with non-zero spending
  const breakdownData = activeCategories
    .map((cat) => {
      const catExpenses = expenses.filter((e) => e.category === cat);
      const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
      return {
        category: cat,
        count: catExpenses.length,
        total,
        percentage: totalSpend > 0 ? ((total / totalSpend) * 100).toFixed(1) : "0.0"
      };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total); // Sort by total spend descending

  return (
    <div className="category-breakdown-container">
      <h3 className="category-breakdown-title">Category breakdown</h3>
      {breakdownData.length === 0 ? (
        <p className="no-breakdown-data">No expense data available to display breakdown.</p>
      ) : (
        <table className="breakdown-table">
          <thead>
            <tr>
              <th className="th-left">Category</th>
              <th className="th-right">Expenses</th>
              <th className="th-right">Total</th>
              <th className="th-right">% of spend</th>
            </tr>
          </thead>
          <tbody>
            {breakdownData.map((item) => (
              <tr key={item.category} className="breakdown-row">
                <td className="td-left">
                  <span className="category-cell-wrapper">
                    <span 
                      className="category-color-badge" 
                      style={{ backgroundColor: activeColors[item.category] || "#aa3bff" }} 
                    />
                    {item.category}
                  </span>
                </td>
                <td className="td-right count-cell">{item.count}</td>
                <td className="td-right total-cell">{currencyFormatter(item.total)}</td>
                <td className="td-right pct-cell">{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
