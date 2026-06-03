
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

export default function ExpenseList({
  expenses = [],
  onEdit = () => {},
  onDelete = () => {},
  catIcons = {},
  catColors = {},
  currencyFormatter = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v)
}) {
  const activeIcons = catIcons && Object.keys(catIcons).length > 0 ? catIcons : DEFAULT_ICONS;
  const activeColors = catColors && Object.keys(catColors).length > 0 ? catColors : DEFAULT_COLORS;

  const totalFiltered = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <h3 className="expense-list-title">All expenses</h3>
        <span className="expense-list-meta">
          {expenses.length} result{expenses.length === 1 ? "" : "s"} · {currencyFormatter(totalFiltered)}
        </span>
      </div>

      <div className="expense-items-wrapper">
        {expenses.length === 0 ? (
          <div className="empty-expenses-view">
            No expenses found for the selected filters.
          </div>
        ) : (
          expenses.map((exp) => {
            const catColor = activeColors[exp.category] || "#aa3bff";
            return (
              <div key={exp._id || exp.id} className="expense-item">
                <div 
                  className="expense-item-icon-box"
                  style={{ backgroundColor: `${catColor}1c` }} // ~11% opacity for soft tint
                >
                  {activeIcons[exp.category] || "📦"}
                </div>

                <div className="expense-item-main">
                  <div className="expense-item-category">{exp.category}</div>
                  <div className="expense-item-note" title={exp.note || "No note"}>
                    {exp.note || "—"}
                  </div>
                </div>

                <div className="expense-item-right">
                  <div className="expense-item-amount">{currencyFormatter(exp.amount)}</div>
                  <div className="expense-item-date">{exp.date}</div>
                </div>

                <div className="expense-item-actions">
                  <button 
                    onClick={() => onEdit(exp)} 
                    className="action-btn-text edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(exp._id || exp.id)} 
                    className="action-btn-text delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
