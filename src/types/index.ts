export type ExpenseCategory =
  | 'Materials'
  | 'Labor'
  | 'Equipment'
  | 'Permits'
  | 'Services'
  | 'Miscellaneous';

export type ExpenseStage = 'upcoming' | 'ongoing' | 'completed';

export type ExpenseStatus = 'On Track' | 'Over Budget' | 'Under Budget';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Materials',
  'Labor',
  'Equipment',
  'Permits',
  'Services',
  'Miscellaneous',
];

export interface ProjectInfo {
  name: string;
  location: string;
  startDate: string;
  targetEndDate: string;
  startingBudget: number;
  notes: string;
}

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  estimatedCost: number;
  actualSpent: number | null;
  stage: ExpenseStage;
  notes: string;
  dateCompleted: string | null;
  createdAt: string;
}

export interface ProgressLogEntry {
  id: string;
  date: string;
  notes: string;
  spentThisPeriod: number;
  runningTotal: number;
}

export interface AppState {
  projectInfo: ProjectInfo;
  expenses: Expense[];
  progressLog: ProgressLogEntry[];
}

export interface CategorySummary {
  category: ExpenseCategory;
  estimatedCost: number;
  actualSpent: number;
  difference: number;
  status: ExpenseStatus;
}

export interface BudgetSummary {
  startingBudget: number;
  totalEstimatedCost: number;
  actualSpent: number;
  remainingBudget: number;
  percentUsed: number;
  status: ExpenseStatus;
}

export interface StageTotals {
  estimatedSubtotal: number;
  actualSubtotal: number;
}
