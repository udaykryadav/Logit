
export default function SummaryCards({
  totalFiltered = 0,
  filteredCount = 0,
  totalThisMonth = 0,
  thisMonthCount = 0,
  highestExpense = null,
  avgPerDay = null,
  currencyFormatter = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v)
}) {
  const cards = [
    {
      label: "Total (filtered period)",
      value: currencyFormatter(totalFiltered),
      sub: `${filteredCount} expense${filteredCount === 1 ? "" : "s"}`,
      color: "#e85d3a"
    },
    {
      label: "This month",
      value: currencyFormatter(totalThisMonth),
      sub: `${thisMonthCount} transaction${thisMonthCount === 1 ? "" : "s"}`,
      color: "#3b82f6"
    },
    {
      label: "Highest single expense",
      value: highestExpense ? currencyFormatter(highestExpense.amount) : "—",
      sub: highestExpense ? `${highestExpense.category} · ${highestExpense.date}` : "No data",
      color: "#8b5cf6"
    },
    {
      label: "Avg per day",
      value: avgPerDay ? currencyFormatter(avgPerDay) : "—",
      sub: "based on active days",
      color: "#10b981"
    }
  ];

  return (
    <div className="summary-cards-grid">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="summary-card" 
          style={{ borderTopColor: card.color }}
        >
          <p className="summary-card-label">{card.label}</p>
          <p className="summary-card-value">{card.value}</p>
          <p className="summary-card-sub">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
