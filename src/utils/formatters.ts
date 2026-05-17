export function formatPeso(value: number): string {
  return '₱' + value.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatKwp(value: number): string {
  return value.toFixed(2) + ' kWp';
}

export function formatKwh(value: number): string {
  return value.toLocaleString('en-PH') + ' kWh';
}

export function formatYears(value: number): string {
  return value.toFixed(1) + ' yrs';
}
