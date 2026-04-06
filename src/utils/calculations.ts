import type {
  Expense,
  ExpenseCategory,
  ExpenseStage,
  ExpenseStatus,
  CategorySummary,
  BudgetSummary,
  StageTotals,
} from '../types';
import { EXPENSE_CATEGORIES } from '../types';

export function getExpenseStatus(
  estimatedCost: number,
  actualSpent: number | null
): ExpenseStatus {
  if (actualSpent === null) return 'On Track';
  const diff = actualSpent - estimatedCost;
  if (diff > 0) return 'Over Budget';
  if (diff < 0) return 'Under Budget';
  return 'On Track';
}

export function getOverUnder(
  estimatedCost: number,
  actualSpent: number | null
): number | null {
  if (actualSpent === null) return null;
  return actualSpent - estimatedCost;
}

export function computeCategorySummaries(expenses: Expense[]): CategorySummary[] {
  return EXPENSE_CATEGORIES.map((category: ExpenseCategory) => {
    const categoryExpenses = expenses.filter((e) => e.category === category);
    const estimatedCost = categoryExpenses.reduce((sum, e) => sum + e.estimatedCost, 0);
    const actualSpent = categoryExpenses.reduce(
      (sum, e) => sum + (e.actualSpent ?? 0),
      0
    );
    const difference = actualSpent - estimatedCost;
    return {
      category,
      estimatedCost,
      actualSpent,
      difference,
      status: getExpenseStatus(estimatedCost, actualSpent === 0 && estimatedCost === 0 ? null : actualSpent),
    };
  });
}

export function computeBudgetSummary(
  startingBudget: number,
  expenses: Expense[]
): BudgetSummary {
  const totalEstimatedCost = expenses.reduce((sum, e) => sum + e.estimatedCost, 0);
  const actualSpent = expenses
    .filter((e) => e.stage !== 'upcoming')
    .reduce((sum, e) => sum + (e.actualSpent ?? 0), 0);
  const remainingBudget = startingBudget - actualSpent;
  const percentUsed = startingBudget > 0 ? (actualSpent / startingBudget) * 100 : 0;

  let status: ExpenseStatus = 'On Track';
  if (actualSpent > startingBudget) {
    status = 'Over Budget';
  } else if (actualSpent < startingBudget && actualSpent > 0) {
    status = 'Under Budget';
  }

  return {
    startingBudget,
    totalEstimatedCost,
    actualSpent,
    remainingBudget,
    percentUsed,
    status,
  };
}

export function computeStageTotals(expenses: Expense[], stage: ExpenseStage): StageTotals {
  const filtered = expenses.filter((e) => e.stage === stage);
  return {
    estimatedSubtotal: filtered.reduce((sum, e) => sum + e.estimatedCost, 0),
    actualSubtotal: filtered.reduce((sum, e) => sum + (e.actualSpent ?? 0), 0),
  };
}
