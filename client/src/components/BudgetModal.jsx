/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

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

export default function BudgetModal({
  isOpen,
  onClose,
  onSubmit,
  currentBudgets = {},
  categories = DEFAULT_CATEGORIES,
  catIcons = DEFAULT_ICONS,
}) {
  const [formBudgets, setFormBudgets] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const initial = {};
      categories.forEach((cat) => {
        initial[cat] = currentBudgets[cat] !== undefined ? currentBudgets[cat] : "";
      });
      setFormBudgets(initial);
      setValidationError("");
    }
  }, [isOpen, currentBudgets, categories]);

  if (!isOpen) return null;

  const handleChange = (category, value) => {
    setFormBudgets((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    const parsedBudgets = {};
    for (const [cat, val] of Object.entries(formBudgets)) {
      const num = parseFloat(val);
      if (val !== "" && (isNaN(num) || num < 0)) {
        setValidationError(`Please enter a valid positive number for ${cat}.`);
        return;
      }
      parsedBudgets[cat] = val === "" ? 0 : num;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit(parsedBudgets);
      if (success) {
        onClose();
      }
    } catch (err) {
      setValidationError(err.message || "An error occurred while saving budgets.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">🎯 Monthly Budgets</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {validationError && (
            <div className="form-error-banner">
              ⚠️ {validationError}
            </div>
          )}

          <div 
            style={{ 
              maxHeight: "360px", 
              overflowY: "auto", 
              paddingRight: "6px",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}
          >
            {categories.map((cat) => (
              <div key={cat} className="form-group" style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", gap: "10px" }}>
                <label htmlFor={`budget-${cat}`} className="form-label" style={{ marginBottom: 0 }}>
                  {catIcons[cat] ? `${catIcons[cat]} ` : ""}{cat}
                </label>
                <input
                  type="number"
                  id={`budget-${cat}`}
                  className="form-input"
                  placeholder="0.00"
                  min="0"
                  step="any"
                  value={formBudgets[cat] !== undefined ? formBudgets[cat] : ""}
                  onChange={(e) => handleChange(cat, e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary modal-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary modal-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-icon">⏳</span> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
