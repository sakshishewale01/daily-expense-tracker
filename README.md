# 💰 Daily Expense Tracker

A modern, full-stack expense tracking application built with React, Node.js, Express, and MySQL. Designed as a portfolio-ready project with a clean SaaS-style UI, complete CRUD functionality, authentication, and data visualizations.

---

## 📖 Project Overview

Daily Expense Tracker helps users log, categorize, and visualize their daily spending. It features secure authentication, a searchable/filterable expense list, interactive charts, and a polished light/dark themed dashboard — all backed by a real MySQL database.

---

## ✨ Features

### Authentication
- Register, login, and logout with JWT-based sessions
- Passwords hashed with bcrypt
- Protected API routes and protected frontend routes

### Dashboard
- Total expenses, today's expenses, this month's expenses, and total transaction count
- Recent transactions (last 5)
- Quick "Add Expense" shortcut
- Monthly bar chart and category pie chart (Chart.js)

### Expense Management
- Add, edit, delete, and view expenses
- Search by title
- Filter by category and by month
- Paginated expense list

### Categories
- Food, Travel, Shopping, Bills, Entertainment, Education, Medical, Other (seeded by default)

### Profile
- Update display name
- Change password

### Theme
- Light and dark mode, persisted in local storage

### UI/UX
- Sidebar navigation + sticky top navbar
- Rounded cards, soft shadows, glassmorphism accents
- Smooth hover/page transitions, responsive on mobile/tablet/desktop
- Loading spinners, empty states, toast notifications, delete confirmation dialogs

---

## 🛠 Tech Stack

**Frontend:** React (Vite), JavaScript (ES6+), Tailwind CSS, React Router DOM, Axios, React Icons, Chart.js + react-chartjs-2, React Toastify

**Backend:** Node.js, Express.js

**Database:** MySQL

**Auth:** JWT, bcrypt

---

## 📁 Folder Structure

```
expense-tracker/
├── backend/
│   ├── config/          # Database connection (pool)
│   ├── controllers/      # Route handlers (auth, expenses, categories, profile)
│   ├── middleware/        # Auth guard, validation, error handling
│   ├── models/            # Raw SQL data-access layer
│   ├── routes/             # Express routers
│   ├── services/           # Business logic composed from models
│   ├── utils/               # Helpers (JWT, validators, async handler)
│   ├── uploads/               # Reserved for future file uploads
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI building blocks
│   │   ├── pages/          # Route-level pages
│   │   ├── layouts/         # Auth layout & main app layout
│   │   ├── services/          # Axios API wrappers
│   │   ├── context/             # Auth & Theme React contexts
│   │   ├── hooks/                 # useAuth hook
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── database/
│   ├── schema.sql
│   └── seed.sql
├── README.md
├── LICENSE
├── .gitignore
└── .env.example
```

---

## 🚀 Installation Steps

### Prerequisites
- Node.js 18+ and npm
- MySQL 8+ (or MariaDB 10.6+) running locally or remotely

### 1. Clone / extract the project
```bash
cd expense-tracker
```

### 2. Database Setup
Create the database and seed default categories:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p expense_tracker < database/seed.sql
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set DB_PASSWORD, JWT_SECRET, etc.
```

### 4. Running the Backend
```bash
npm run dev     # with nodemon (auto-restart)
# or
npm start       # plain node
```
The API will start on `http://localhost:5000` (or whatever `PORT` you set).

### 5. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env   # optional — only needed if your API isn't on localhost:5000
```

### 6. Running the Frontend
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 7. Production build (optional)
```bash
npm run build      # outputs to frontend/dist
npm run preview    # serve the production build locally
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| POST | `/api/auth/logout` | Log out (client discards token) |
| GET | `/api/auth/me` | Get the current authenticated user |

### Expenses
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/expenses` | List expenses (search, category, month, page, limit) |
| GET | `/api/expenses/:id` | Get a single expense |
| POST | `/api/expenses` | Create an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses/dashboard/summary` | Dashboard stats + recent transactions |
| GET | `/api/expenses/charts/monthly?year=` | Monthly totals for bar chart |
| GET | `/api/expenses/charts/categories` | Category totals for pie chart |

### Categories
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/categories` | List all categories |

### Profile
| Method | Endpoint | Description |
|--------|-----------|-------------|
| PUT | `/api/profile` | Update display name |
| PUT | `/api/profile/password` | Change password |

All `/api/expenses`, `/api/categories`, and `/api/profile` routes require an `Authorization: Bearer <token>` header.

---

## 🔮 Future Improvements

- CSV/PDF export of expenses
- Recurring expenses and budgets with alerts
- Multi-currency support
- Receipt image uploads (the `backend/uploads` folder is already scaffolded for this)
- Shared/family expense tracking

---


