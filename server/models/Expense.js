import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: [true, "Date is required"],
      validate: {
        validator: function(v) {
          if (!v) return false;
          if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
          const today = new Date();
          const maxAllowedDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
          return v <= maxAllowedDate;
        },
        message: "Expense date cannot be in the future."
      }
    },
    note: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
