import type { ExpenseStatus } from '../types';

export interface StatusConfig {
  label: string;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export function getStatusConfig(status: ExpenseStatus): StatusConfig {
  switch (status) {
    case 'Over Budget':
      return {
        label: 'Over Budget',
        icon: '⚠️',
        bgClass: 'bg-red-50',
        textClass: 'text-red-700',
        borderClass: 'border-red-200',
      };
    case 'Under Budget':
      return {
        label: 'Under Budget',
        icon: '💚',
        bgClass: 'bg-green-50',
        textClass: 'text-green-700',
        borderClass: 'border-green-200',
      };
    case 'On Track':
    default:
      return {
        label: 'On Track',
        icon: '✅',
        bgClass: 'bg-blue-50',
        textClass: 'text-blue-700',
        borderClass: 'border-blue-200',
      };
  }
}

export function getOverUnderClass(value: number | null): string {
  if (value === null || value === 0) return 'text-gray-600';
  return value > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium';
}
