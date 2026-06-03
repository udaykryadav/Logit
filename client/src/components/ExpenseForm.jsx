/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const DEFAULT_CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Other"];

const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ExpenseForm({
  isOpen,
  onClose,
  onSubmit,
  expense = null,
  categories = DEFAULT_CATEGORIES,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(() => getLocalDateString());
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Populate form if we are editing an expense
  useEffect(() => {
    if (expense) {
      setAmount(expense.amount || "");
      setCategory(expense.category || categories[0]);
      setDate(expense.date || getLocalDateString());
      setNote(expense.note || "");
    } else {
      setAmount("");
      setCategory(categories[0]);
      setDate(getLocalDateString());
      setNote("");
    }
    setValidationError("");
  }, [expense, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationError("Please enter a valid amount greater than 0.");
      return;
    }
    if (!category) {
      setValidationError("Please select a category.");
      return;
    }
    if (!date) {
      setValidationError("Please select a date.");
      return;
    }
    const todayStr = getLocalDateString();
    if (date > todayStr) {
      setValidationError("Date cannot be in the future.");
      return;
    }

    setIsSubmitting(true);
    try {
      const expenseData = {
        amount: parsedAmount,
        category,
        date,
        note: note.trim(),
      };
      
      const success = await onSubmit(expenseData);
      if (success) {
        onClose();
      }
    } catch (err) {
      setValidationError(err.message || "An error occurred while saving the expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{expense ? "Edit Expense" : "Add Expense"}</h3>
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

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount (₹) <span className="required-star">*</span>
            </label>
            <input
              type="number"
              id="amount"
              className="form-input amount-input"
              placeholder="0.00"
              step="any"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required-star">*</span>
            </label>
            <div className="form-select-wrapper">
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={isSubmitting}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className="form-select-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date <span className="required-star">*</span>
            </label>
            <input
              type="date"
              id="date"
              className="form-input"
              value={date}
              max={getLocalDateString()}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note" className="form-label">
              Note / Details
            </label>
            <textarea
              id="note"
              className="form-textarea"
              placeholder="e.g. Lunch at office, weekly groceries"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isSubmitting}
              maxLength={200}
              rows={3}
            />
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
                expense ? "Save Changes" : "Add Expense"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
