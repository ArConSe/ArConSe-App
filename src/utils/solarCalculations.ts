import type { CalculatorInputs, CalculatorResults } from '../types';

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const { monthlyKwh, peakSunHours, panelWatts, systemEfficiency, costPerWatt, electricityRate } = inputs;

  const systemKwp = monthlyKwh / (peakSunHours * 30 * systemEfficiency);
  const panelCount = Math.ceil((systemKwp * 1000) / panelWatts);
  const inverterKva = Math.ceil(systemKwp * 1.25);
  const annualKwh = systemKwp * peakSunHours * 365 * systemEfficiency;
  const totalCost = systemKwp * 1000 * costPerWatt;
  const monthlySavings = (annualKwh / 12) * electricityRate;
  const paybackYears = totalCost / (monthlySavings * 12);
  const co2OffsetKg = annualKwh * 0.7082;

  return {
    systemKwp: Math.round(systemKwp * 100) / 100,
    panelCount,
    inverterKva,
    annualKwh: Math.round(annualKwh),
    totalCost: Math.round(totalCost),
    monthlySavings: Math.round(monthlySavings),
    paybackYears: Math.round(paybackYears * 10) / 10,
    co2OffsetKg: Math.round(co2OffsetKg),
  };
}
