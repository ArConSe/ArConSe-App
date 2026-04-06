export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '₱—';
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatOverUnder(value: number | null): string {
  if (value === null) return '—';
  if (value === 0) return '₱0';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatCurrency(value).slice(1)}`;
}

export function formatPercent(value: number): string {
  return `${Math.min(value, 999).toFixed(1)}%`;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
