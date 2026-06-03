# Logit - Expense Tracker

I chose the **Expense Tracker** exercise. Logit is a full-stack financial tool designed to help users track categoric transaction records, establish custom monthly budget targets, and gain visual insights into spending behaviors using interactive graphs, while enforcing timezone-aware date selection restraints.

---

## 🔗 Live Demo Links

- **Frontend**: *Not Deployed (Local execution only)*
- **Backend API**: *Not Deployed (Local execution only)*

---

## 🛠️ Tech Stack

- **React 19 & Vite**: Fast UI rendering, state management, and modern developer experience.
- **Recharts**: Responsive SVG charting to render categorical spending breakdown and budget comparison graphs.
- **Express & Node.js**: Lightweight REST API to handle CRUD operations on transactions and budget configurations.
- **MongoDB & Mongoose**: Flexible document storage with schema-level validation to prevent future-dated entries.

---

## 💻 How to Run Locally

### 1. Start Backend Server
```bash
cd server
npm install
npm start
```
*Note: Connects to `mongodb://localhost:27017/logit` by default if no `MONGO_URI` env is supplied.*

### 2. Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*Open [http://localhost:5173/](http://localhost:5173/) in your browser.*

---

## api API Documentation

### 📊 Dashboard Statistics
- **GET** `/api/dashboard`
  - **Request Body**: None
  - **Response Shape**:
    ```json
    {
      "totalFiltered": 1500.50,
      "filteredCount": 2,
      "totalThisMonth": 1500.50,
      "thisMonthCount": 2,
      "highestExpense": {
        "_id": "603f...",
        "amount": 1000,
        "category": "Bills",
        "date": "2026-06-03",
        "note": "Electricity"
      },
      "avgPerDay": 750.25,
      "recentExpenses": [...]
    }
    ```

### 💸 Expenses
- **GET** `/api/expenses`
  - **Request Body**: None
  - **Response Shape**: `Array<Expense>`

- **POST** `/api/expenses`
  - **Request Body**:
    ```json
    {
      "amount": 500,
      "category": "Food",
      "date": "2026-06-03",
      "note": "Lunch"
    }
    ```
  - **Response Shape**: `Expense` object

- **PUT** `/api/expenses/:id`
  - **Request Body**:
    ```json
    {
      "amount": 600,
      "category": "Food",
      "date": "2026-06-03",
      "note": "Lunch (Updated)"
    }
    ```
  - **Response Shape**: `Expense` object

- **DELETE** `/api/expenses/:id`
  - **Request Body**: None
  - **Response Shape**:
    ```json
    {
      "message": "Expense deleted successfully",
      "deletedExpense": { ... }
    }
    ```

### 🎯 Budgets
- **GET** `/api/budgets`
  - **Request Body**: None
  - **Response Shape**: `Array<Budget>`

- **POST** `/api/budgets`
  - **Request Body**:
    ```json
    {
      "budgets": {
        "Food": 8000,
        "Transport": 3000
      }
    }
    ```
  - **Response Shape**: `Array<Budget>`

---

## 📁 Project Structure

```text
Logit/
├── client/
│   ├── public/             # Static public assets (favicon.svg, etc.)
│   ├── src/
│   │   ├── components/     # UI Components (AnalyticsView, ExpenseForm, etc.)
│   │   ├── App.jsx         # App view layouts and API hookups
│   │   ├── index.css       # Core design system and styles
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/             # Database connection setups
│   ├── models/             # Mongoose schemas (Expense, Budget)
│   ├── routes/             # REST endpoints (expenses, budgets, dashboard)
│   ├── server.js           # Express app initialization
│   └── package.json
│
└── expense_tracker.jsx     # Original standalone mockup file (kept for reference)
```
