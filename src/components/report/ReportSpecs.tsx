import type { CalculatorInputs, CalculatorResults } from '../../types';
import { formatPeso, formatKwp, formatKwh, formatYears } from '../../utils/formatters';

interface Props {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 pr-4 text-sm text-gray-600 font-medium">{label}</td>
      <td className="py-2 text-sm text-gray-900 font-semibold">{value}</td>
    </tr>
  );
}

export default function ReportSpecs({ inputs, results }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">System Specifications</h2>
      <div className="grid grid-cols-2 gap-6">
        <table className="w-full">
          <tbody>
            <Row label="System Size" value={formatKwp(results.systemKwp)} />
            <Row label="Panel Count" value={`${results.panelCount} panels`} />
            <Row label="Panel Wattage" value={`${inputs.panelWatts} W`} />
            <Row label="Inverter Size" value={`${results.inverterKva} kVA`} />
            <Row label="System Type" value={inputs.gridType === 'grid-tie' ? 'Grid-Tie' : 'Off-Grid'} />
            <Row label="System Efficiency" value={`${(inputs.systemEfficiency * 100).toFixed(0)}%`} />
            <Row label="Peak Sun Hours" value={`${inputs.peakSunHours} hrs/day`} />
          </tbody>
        </table>
        <table className="w-full">
          <tbody>
            <Row label="Monthly Consumption" value={`${inputs.monthlyKwh.toLocaleString()} kWh`} />
            <Row label="Annual Generation" value={formatKwh(results.annualKwh)} />
            <Row label="Electricity Rate" value={`₱${inputs.electricityRate}/kWh`} />
            <Row label="Monthly Savings" value={formatPeso(results.monthlySavings)} />
            <Row label="Total System Cost" value={formatPeso(results.totalCost)} />
            <Row label="Simple Payback" value={formatYears(results.paybackYears)} />
            <Row label="CO₂ Offset" value={`${results.co2OffsetKg.toLocaleString()} kg/yr`} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
