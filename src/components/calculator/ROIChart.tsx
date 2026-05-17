import { formatPeso } from '../../utils/formatters';

interface Props {
  totalCost: number;
  monthlySavings: number;
  paybackYears: number;
}

export default function ROIChart({ totalCost, monthlySavings, paybackYears }: Props) {
  const maxYears = Math.max(Math.ceil(paybackYears) + 3, 10);
  const years = Array.from({ length: maxYears }, (_, i) => i + 1);

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Cumulative Savings vs. System Cost</h3>
      <div className="relative h-40 flex items-end gap-1">
        {years.map((yr) => {
          const savings = monthlySavings * 12 * yr;
          const pct = Math.min((savings / totalCost) * 100, 100);
          const isPaidOff = savings >= totalCost;
          return (
            <div key={yr} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className={`w-full rounded-t transition-all ${isPaidOff ? 'bg-green-500' : 'bg-blue-400'}`}
                style={{ height: `${pct}%`, minHeight: 2 }}
                title={`Year ${yr}: ${formatPeso(savings)} saved`}
              />
              {yr % 2 === 0 && (
                <span className="text-[10px] text-gray-400">{yr}</span>
              )}
            </div>
          );
        })}
        <div
          className="absolute left-0 right-0 border-t-2 border-red-400 border-dashed"
          style={{ bottom: '100%', top: 0 }}
          title={`System cost: ${formatPeso(totalCost)}`}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Blue = recovering cost &nbsp;|&nbsp; Green = paid off &nbsp;|&nbsp; Payback: <strong>{paybackYears} yrs</strong>
      </p>
    </div>
  );
}
