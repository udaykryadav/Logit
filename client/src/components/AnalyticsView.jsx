import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const DEFAULT_CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"];
const CAT_COLORS = {
  Food: "#e85d3a",
  Transport: "#3b82f6",
  Bills: "#f59e0b",
  Entertainment: "#8b5cf6",
  Shopping: "#ec4899",
  Health: "#10b981",
  Other: "#6b7280",
};

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div 
      style={{ 
        background: "var(--bg)", 
        border: "1px solid var(--border)", 
        borderRadius: "8px", 
        padding: "8px 12px", 
        fontSize: "13px",
        color: "var(--text-h)",
        boxShadow: "var(--shadow)"
      }}
    >
      <p style={{ margin: 0, fontWeight: 500 }}>{payload[0].name || payload[0].payload.name}</p>
      <p style={{ margin: "2px 0 0", color: "var(--text)", fontWeight: 600 }}>{fmt(payload[0].value)}</p>
    </div>
  );
};

export default function AnalyticsView({ expenses = [], budgets = {} }) {
  const [chartType, setChartType] = useState("pie");

  const byCategory = useMemo(() => {
    const map = {};
    DEFAULT_CATEGORIES.forEach((c) => (map[c] = 0));
    expenses.forEach((e) => {
      if (map[e.category] !== undefined) {
        map[e.category] += e.amount;
      }
    });

    return DEFAULT_CATEGORIES.map((c) => ({
      name: c,
      value: map[c],
      budget: budgets[c] || 0
    })).filter((x) => x.value > 0 || x.budget > 0);
  }, [expenses, budgets]);

  const totalFiltered = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Category breakdown visualizer */}
      <div className="budget-overview-container" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <h3 className="budget-title" style={{ fontSize: "16px" }}>Spending by Category</h3>
          <div style={{ display: "flex", gap: "6px" }}>
            <button 
              onClick={() => setChartType("pie")}
              className={`btn-secondary ${chartType === "pie" ? "active" : ""}`}
              style={{ 
                padding: "6px 12px", 
                fontSize: "12px", 
                backgroundColor: chartType === "pie" ? "var(--accent-bg)" : "var(--bg)",
                borderColor: chartType === "pie" ? "var(--accent)" : "var(--border)",
                color: chartType === "pie" ? "var(--accent)" : "var(--text-h)"
              }}
            >
              🥧 Pie Chart
            </button>
            <button 
              onClick={() => setChartType("bar")}
              className={`btn-secondary ${chartType === "bar" ? "active" : ""}`}
              style={{ 
                padding: "6px 12px", 
                fontSize: "12px", 
                backgroundColor: chartType === "bar" ? "var(--accent-bg)" : "var(--bg)",
                borderColor: chartType === "bar" ? "var(--accent)" : "var(--border)",
                color: chartType === "bar" ? "var(--accent)" : "var(--text-h)"
              }}
            >
              📊 Bar Chart
            </button>
          </div>
        </div>

        {byCategory.length === 0 ? (
          <p className="no-breakdown-data">No expense data available for the selected filters.</p>
        ) : (
          <>
            {chartType === "pie" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: 280, width: "100%", maxWidth: 400 }}>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie 
                        data={byCategory.filter(x => x.value > 0)} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={95} 
                        innerRadius={55} 
                        paddingAngle={2}
                      >
                        {byCategory.filter(x => x.value > 0).map((entry) => (
                          <Cell key={entry.name} fill={CAT_COLORS[entry.name] || "#6b7280"} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 16px", marginTop: "12px" }}>
                  {byCategory.filter(x => x.value > 0).map((d) => (
                    <span key={d.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLORS[d.name] || "#6b7280" }} />
                      {d.name}: {totalFiltered > 0 ? ((d.value / totalFiltered) * 100).toFixed(1) : 0}%
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ height: 300, width: "100%" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={byCategory.filter(x => x.value > 0)} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--text)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {byCategory.filter(x => x.value > 0).map((entry) => (
                        <Cell key={entry.name} fill={CAT_COLORS[entry.name] || "#6b7280"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>

      {/* Budget vs Actual Comparison Chart */}
      <div className="budget-overview-container" style={{ padding: "24px" }}>
        <h3 className="budget-title" style={{ fontSize: "16px", marginBottom: "20px" }}>Budget vs Actual</h3>
        {byCategory.length === 0 ? (
          <p className="no-breakdown-data">No budget or expense data to display.</p>
        ) : (
          <div style={{ height: Math.max(220, byCategory.length * 48), width: "100%" }}>
            <ResponsiveContainer width="100%" height={Math.max(220, byCategory.length * 48)}>
              <BarChart 
                data={byCategory} 
                layout="vertical" 
                margin={{ left: -10, right: 10, top: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 10, fill: "var(--text)" }} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(v) => `₹${v}`} 
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: "var(--text-h)", fontWeight: 500 }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={80} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(value) => (
                    <span style={{ fontSize: "12px", color: "var(--text)", fontWeight: 500 }}>
                      {value === "budget" ? "Budget Limit" : "Spent Amount"}
                    </span>
                  )}
                />
                <Bar dataKey="budget" fill="var(--border)" radius={[0, 4, 4, 0]} name="budget" />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="value">
                  {byCategory.map((entry) => {
                    const isOver = entry.value > entry.budget;
                    return (
                      <Cell 
                        key={entry.name} 
                        fill={isOver ? "#e85d3a" : (CAT_COLORS[entry.name] || "#3b82f6")} 
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
