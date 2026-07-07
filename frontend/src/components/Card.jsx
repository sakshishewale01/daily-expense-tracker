import React from 'react';

/**
 * A rounded stat card used on the dashboard. `accent` picks a subtle
 * gradient tint so each metric reads distinctly at a glance.
 */
export default function Card({ icon: Icon, label, value, accent = 'brand', trend }) {
  const accents = {
    brand: 'from-brand-500/10 to-brand-500/0 text-brand-600 dark:text-brand-300',
    accent: 'from-accent-500/10 to-accent-500/0 text-accent-600 dark:text-accent-300',
    amber: 'from-amber-500/10 to-amber-500/0 text-amber-600 dark:text-amber-300',
    rose: 'from-rose-500/10 to-rose-500/0 text-rose-600 dark:text-rose-300'
  };

  return (
    <div className="card card-hover p-5 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
          {trend && <p className="mt-1 text-xs text-slate-400">{trend}</p>}
        </div>
        {Icon && (
          <div className={`rounded-xl bg-gradient-to-br ${accents[accent]} p-3`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
