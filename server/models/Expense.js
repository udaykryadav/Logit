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
      required: [true, "Date is required"]
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
