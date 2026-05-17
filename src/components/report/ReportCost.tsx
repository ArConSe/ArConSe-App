import type { CalculatorResults } from '../../types';
import { formatPeso } from '../../utils/formatters';

interface Props {
  results: CalculatorResults;
}

export default function ReportCost({ results }: Props) {
  const { systemKwp, totalCost } = results;
  const panelCost = Math.round(totalCost * 0.45);
  const inverterCost = Math.round(totalCost * 0.20);
  const wiringCost = Math.round(totalCost * 0.10);
  const mountingCost = Math.round(totalCost * 0.08);
  const laborCost = Math.round(totalCost * 0.12);
  const miscCost = totalCost - panelCost - inverterCost - wiringCost - mountingCost - laborCost;

  const items = [
    { label: 'Solar Panels', pct: '45%', cost: panelCost },
    { label: 'Inverter / Charge Controller', pct: '20%', cost: inverterCost },
    { label: 'Wiring & Protection', pct: '10%', cost: wiringCost },
    { label: 'Mounting & Racking', pct: '8%', cost: mountingCost },
    { label: 'Labor & Installation', pct: '12%', cost: laborCost },
    { label: 'Miscellaneous / Permits', pct: '5%', cost: miscCost },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">Cost Breakdown</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-600">
            <th className="text-left py-2 px-3 font-medium">Item</th>
            <th className="text-right py-2 px-3 font-medium">%</th>
            <th className="text-right py-2 px-3 font-medium">Estimated Cost</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label} className="border-b border-gray-100">
              <td className="py-2 px-3">{item.label}</td>
              <td className="py-2 px-3 text-right text-gray-500">{item.pct}</td>
              <td className="py-2 px-3 text-right font-semibold">{formatPeso(item.cost)}</td>
            </tr>
          ))}
          <tr className="bg-blue-50 font-bold">
            <td className="py-2 px-3">Total ({systemKwp} kWp system)</td>
            <td className="py-2 px-3 text-right">100%</td>
            <td className="py-2 px-3 text-right text-blue-700">{formatPeso(totalCost)}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-2">* Estimates only. Actual costs may vary based on site conditions and supplier pricing.</p>
    </div>
  );
}
