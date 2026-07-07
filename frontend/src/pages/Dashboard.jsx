import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FaWallet, FaCalendarDay, FaCalendarAlt, FaReceipt, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Card from '../components/Card';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import * as expenseService from '../services/expenseService';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [monthlyChart, setMonthlyChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [summary, monthly, byCategory] = await Promise.all([
          expenseService.getDashboardSummary(),
          expenseService.getMonthlyChart(new Date().getFullYear()),
          expenseService.getCategoryChart()
        ]);
        setStats(summary.stats);
        setRecent(summary.recentTransactions);
        setMonthlyChart(monthly);
        setCategoryChart(byCategory);
      } catch (err) {
        toast.error('Could not load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader label="Loading your dashboard..." />;

  const barData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Monthly spending',
        data: monthlyChart?.monthlyTotals || Array(12).fill(0),
        backgroundColor: '#4c5fe0',
        borderRadius: 8,
        maxBarThickness: 28
      }
    ]
  };

  const pieData = {
    labels: categoryChart?.labels || [],
    datasets: [
      {
        data: categoryChart?.totals || [],
        backgroundColor: ['#4c5fe0', '#25ab7e', '#f97316', '#ec4899', '#a855f7', '#22c55e', '#14b8a6', '#6b7280'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Here&apos;s an overview of your spending.</p>
        </div>
        <Link to="/expenses/add" className="btn-primary w-fit">
          <FaPlus className="h-4 w-4" /> Quick Add Expense
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={FaWallet} label="Total Expenses" value={formatCurrency(stats.totalExpenses)} accent="brand" />
        <Card icon={FaCalendarDay} label="Today's Expenses" value={formatCurrency(stats.todayExpenses)} accent="accent" />
        <Card icon={FaCalendarAlt} label="This Month" value={formatCurrency(stats.monthExpenses)} accent="amber" />
        <Card icon={FaReceipt} label="Total Transactions" value={stats.totalTransactions} accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="card p-6 lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Monthly Expenses</h3>
          <div className="h-72">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Spending by Category</h3>
          {categoryChart?.labels?.length ? (
            <div className="flex h-72 items-center justify-center">
              <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          ) : (
            <EmptyState title="No data yet" message="Add an expense to see your category breakdown." />
          )}
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Recent Transactions</h3>
          <Link to="/expenses" className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            title="No expenses yet"
            message="Add your first expense to start tracking your spending."
            action={
              <Link to="/expenses/add" className="btn-primary mt-2">
                <FaPlus className="h-4 w-4" /> Add Expense
              </Link>
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recent.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    {item.category_name} &middot; {new Date(item.expense_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <p className="font-semibold text-slate-800 dark:text-white">{formatCurrency(item.amount)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
