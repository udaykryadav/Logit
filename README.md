# Logit - Premium Expense Tracker

Logit is a modern, premium, and feature-rich full-stack Expense Tracker. It empowers users to monitor their daily transactions, configure categoric budget limits, analyze their spending behaviors via interactive SVG charts, and toggle between clean light/dark themes.

## 🚀 Key Features

- **Dynamic Financial Dashboard**: View real-time calculations for total spent, remaining budget balance, and average daily expenses.
- **Set & Manage Budgets**: Set custom monthly budgets for various categories with immediate indicator feedback (turns red when budgets are exceeded).
- **Interactive Analytics**:
  - **Spending by Category**: Toggle between a beautiful **Pie Chart** (percentage view) and a **Bar Chart** (total amounts).
  - **Budget vs Actual**: Visually compare your target monthly budgets against actual spending side-by-side.
- **Timezone-Aware Limits**: Prevents logging transaction expenses on future dates with both frontend calendar limits and backend schema validation.
- **Premium Glassmorphic UI**: High-fidelity dark and light theme overrides with dynamic tooltips and seamless transitions.
- **Export to CSV**: Export transaction logs instantly for spreadsheet processing.

---

## 🛠️ Tech Stack

### Frontend (client/)
- **Core**: React 19, Vite, vanilla CSS.
- **Visualization**: Recharts (fully responsive SVG charting).
- **Icons**: Custom vector emojis.

### Backend (server/)
- **Core**: Node.js, Express, MongoDB Atlas, Mongoose.
- **Utilities**: CORS, Dotenv, Nodemon.

---

## 📁 Repository Structure

```text
Logit/
├── client/                 # React frontend
│   ├── public/             # Static public assets (favicon.svg, etc.)
│   ├── src/
│   │   ├── components/     # Reusable React UI Components
│   │   │   ├── AnalyticsView.jsx
│   │   │   ├── BudgetModal.jsx
│   │   │   ├── BudgetOverview.jsx
│   │   │   ├── CategoryBreakdown.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SummaryCards.jsx
│   │   ├── App.jsx         # App layouts and API hookups
│   │   ├── index.css       # Core design systems and styles
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express backend API
│   ├── config/             # DB configurations
│   ├── models/             # Mongoose schemas (Expense, Budget)
│   ├── routes/             # REST endpoints (expenses, budgets, dashboard)
│   ├── server.js           # Server runner
│   └── package.json
│
└── expense_tracker.jsx     # Original standalone mockup file (kept for reference)
```

---

## 💻 Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string

### 2. Configure Environment Variables
Inside the `server/` directory, create a `.env` file based on `.env.example`:
```ini
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 3. Running Locally

You can spin up the development servers concurrently:

#### Start Backend Server
```bash
cd server
npm install
npm run dev
```

#### Start Frontend Client
```bash
cd client
npm install
npm run dev
```

The application will run locally at [http://localhost:5173/](http://localhost:5173/) and query the API endpoints running on [http://localhost:5000/](http://localhost:5000/).
