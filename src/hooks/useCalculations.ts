import { useMemo } from 'react';
import type { AppState, BudgetSummary, CategorySummary, StageTotals } from '../types';
import {
  computeBudgetSummary,
  computeCategorySummaries,
  computeStageTotals,
} from '../utils/calculations';

export function useCalculations(state: AppState): {
  budgetSummary: BudgetSummary;
  categorySummaries: CategorySummary[];
  upcomingTotals: StageTotals;
  ongoingTotals: StageTotals;
  completedTotals: StageTotals;
} {
  const { expenses, projectInfo } = state;

  const budgetSummary = useMemo(
    () => computeBudgetSummary(projectInfo.startingBudget, expenses),
    [projectInfo.startingBudget, expenses]
  );

  const categorySummaries = useMemo(
    () => computeCategorySummaries(expenses),
    [expenses]
  );

  const upcomingTotals = useMemo(
    () => computeStageTotals(expenses, 'upcoming'),
    [expenses]
  );

  const ongoingTotals = useMemo(
    () => computeStageTotals(expenses, 'ongoing'),
    [expenses]
  );

  const completedTotals = useMemo(
    () => computeStageTotals(expenses, 'completed'),
    [expenses]
  );

  return {
    budgetSummary,
    categorySummaries,
    upcomingTotals,
    ongoingTotals,
    completedTotals,
  };
}
