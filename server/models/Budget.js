import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      unique: true,
      trim: true
    },
    limit: {
      type: Number,
      required: [true, "Limit is required"],
      min: [0, "Limit cannot be negative"]
    }
  },
  {
    timestamps: true
  }
);

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
