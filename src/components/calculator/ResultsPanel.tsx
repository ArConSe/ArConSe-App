import type { CalculatorResults } from '../../types';
import { formatPeso, formatKwp, formatKwh, formatYears } from '../../utils/formatters';
import ROIChart from './ROIChart';

interface Props {
  results: CalculatorResults;
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ?? 'bg-white border-gray-200'}`}>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function ResultsPanel({ results }: Props) {
  const { systemKwp, panelCount, inverterKva, annualKwh, totalCost, monthlySavings, paybackYears, co2OffsetKg } = results;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">System Sizing</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="System Size" value={formatKwp(systemKwp)} accent="bg-blue-50 border-blue-200" />
          <StatCard label="Panel Count" value={String(panelCount)} sub="panels required" />
          <StatCard label="Inverter Size" value={`${inverterKva} kVA`} sub="with 25% headroom" />
          <StatCard label="Annual Output" value={formatKwh(annualKwh)} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Financial</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Cost" value={formatPeso(totalCost)} accent="bg-yellow-50 border-yellow-200" />
          <StatCard label="Monthly Savings" value={formatPeso(monthlySavings)} accent="bg-green-50 border-green-200" />
          <StatCard label="Simple Payback" value={formatYears(paybackYears)} />
          <StatCard label="CO₂ Offset" value={`${co2OffsetKg.toLocaleString()} kg`} sub="per year" accent="bg-emerald-50 border-emerald-200" />
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <ROIChart totalCost={totalCost} monthlySavings={monthlySavings} paybackYears={paybackYears} />
      </section>
    </div>
  );
}
