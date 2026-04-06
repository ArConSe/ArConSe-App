import type { CategorySummary } from '../../types';
import { SectionWrapper } from '../layout/SectionWrapper';
import { StatusBadge } from '../shared/StatusBadge';
import { formatCurrency, formatOverUnder } from '../../utils/formatters';
import { getOverUnderClass } from '../../utils/statusHelpers';

interface Props {
  summaries: CategorySummary[];
}

const CATEGORY_ICONS: Record<string, string> = {
  Materials: '🧱',
  Labor: '👷',
  Equipment: '🚧',
  Permits: '📄',
  Services: '🔧',
  Miscellaneous: '📦',
};

export function SpendingByCategory({ summaries }: Props) {
  const total = {
    estimatedCost: summaries.reduce((s, c) => s + c.estimatedCost, 0),
    actualSpent: summaries.reduce((s, c) => s + c.actualSpent, 0),
    difference: summaries.reduce((s, c) => s + c.difference, 0),
  };

  return (
    <SectionWrapper id="spending-by-category" title="Spending by Category" icon="📊">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Estimated Cost</th>
              <th className="px-4 py-3 text-right">Actual Spent</th>
              <th className="px-4 py-3 text-right">Difference</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((cat) => (
              <tr key={cat.category} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                  <span>{CATEGORY_ICONS[cat.category]}</span>
                  {cat.category}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(cat.estimatedCost)}</td>
                <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(cat.actualSpent)}</td>
                <td className={`px-4 py-3 text-right ${getOverUnderClass(cat.difference)}`}>
                  {formatOverUnder(cat.difference)}
                </td>
                <td className="px-4 py-3">
                  {(cat.estimatedCost > 0 || cat.actualSpent > 0) ? (
                    <StatusBadge status={cat.status} />
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold text-gray-900">
              <td className="px-4 py-3">TOTAL</td>
              <td className="px-4 py-3 text-right">{formatCurrency(total.estimatedCost)}</td>
              <td className="px-4 py-3 text-right">{formatCurrency(total.actualSpent)}</td>
              <td className={`px-4 py-3 text-right ${getOverUnderClass(total.difference)}`}>
                {formatOverUnder(total.difference)}
              </td>
              <td className="px-4 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
