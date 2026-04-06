import type { BudgetSummary as BudgetSummaryType } from '../../types';
import { SectionWrapper } from '../layout/SectionWrapper';
import { StatusBadge } from '../shared/StatusBadge';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface Props {
  summary: BudgetSummaryType;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

function StatCard({ label, value, sub, highlight }: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-blue-700' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export function BudgetSummary({ summary }: Props) {
  const pct = Math.min(summary.percentUsed, 100);
  const isOverBudget = summary.remainingBudget < 0;

  return (
    <SectionWrapper id="budget-summary" title="Budget Summary" icon="💰">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        <StatCard label="Starting Budget" value={formatCurrency(summary.startingBudget)} highlight />
        <StatCard label="Total Estimated" value={formatCurrency(summary.totalEstimatedCost)} />
        <StatCard label="Actual Spent" value={formatCurrency(summary.actualSpent)} />
        <StatCard
          label="Remaining"
          value={formatCurrency(summary.remainingBudget)}
          sub={isOverBudget ? 'Over budget!' : undefined}
        />
        <StatCard label="% Used" value={formatPercent(summary.percentUsed)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Budget Used</span>
          <StatusBadge status={summary.status} size="md" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              pct >= 100
                ? 'bg-red-500'
                : pct >= 80
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>₱0</span>
          <span>{formatCurrency(summary.startingBudget)}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Status guide: </span>
          ✅ On Track = Actual ≤ Budget &nbsp;·&nbsp;
          ⚠️ Over Budget = Actual &gt; Budget &nbsp;·&nbsp;
          💚 Under Budget = Actual &lt; Budget
        </p>
      </div>
    </SectionWrapper>
  );
}
