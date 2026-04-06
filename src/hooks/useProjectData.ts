import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import type { AppState, Expense, ExpenseStage, ProjectInfo, ProgressLogEntry } from '../types';

const DEFAULT_STATE: AppState = {
  projectInfo: {
    name: '',
    location: '',
    startDate: '',
    targetEndDate: '',
    startingBudget: 0,
    notes: '',
  },
  expenses: [],
  progressLog: [],
};

export function useProjectData() {
  const [state, setState] = useLocalStorage<AppState>('budget_your_build_v1', DEFAULT_STATE);

  function updateProjectInfo(info: Partial<ProjectInfo>) {
    setState((prev) => ({
      ...prev,
      projectInfo: { ...prev.projectInfo, ...info },
    }));
  }

  function addExpense(expense: Omit<Expense, 'id' | 'createdAt'>) {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
  }

  function updateExpense(id: string, changes: Partial<Expense>) {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((e) => (e.id === id ? { ...e, ...changes } : e)),
    }));
  }

  function deleteExpense(id: string) {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
  }

  function moveExpenseStage(id: string, to: ExpenseStage) {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((expense) => {
        if (expense.id !== id) return expense;

        const updates: Partial<Expense> = { stage: to };

        if (to === 'ongoing' && expense.actualSpent === null) {
          updates.actualSpent = 0;
        }

        if (to === 'completed' && !expense.dateCompleted) {
          updates.dateCompleted = new Date().toISOString().split('T')[0];
        }

        if (to === 'ongoing' && expense.stage === 'completed') {
          updates.dateCompleted = null;
        }

        if (to === 'upcoming') {
          updates.actualSpent = null;
          updates.dateCompleted = null;
        }

        return { ...expense, ...updates };
      }),
    }));
  }

  function addProgressEntry(entry: Omit<ProgressLogEntry, 'id'>) {
    const newEntry: ProgressLogEntry = { ...entry, id: uuidv4() };
    setState((prev) => ({
      ...prev,
      progressLog: [...prev.progressLog, newEntry],
    }));
  }

  function updateProgressEntry(id: string, changes: Partial<ProgressLogEntry>) {
    setState((prev) => ({
      ...prev,
      progressLog: prev.progressLog.map((e) => (e.id === id ? { ...e, ...changes } : e)),
    }));
  }

  function deleteProgressEntry(id: string) {
    setState((prev) => ({
      ...prev,
      progressLog: prev.progressLog.filter((e) => e.id !== id),
    }));
  }

  return {
    state,
    updateProjectInfo,
    addExpense,
    updateExpense,
    deleteExpense,
    moveExpenseStage,
    addProgressEntry,
    updateProgressEntry,
    deleteProgressEntry,
  };
}
