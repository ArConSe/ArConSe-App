import { useProjectData } from './hooks/useProjectData';
import { useCalculations } from './hooks/useCalculations';
import { AppHeader } from './components/layout/AppHeader';
import { SideNav } from './components/layout/SideNav';
import { ProjectOverview } from './components/sections/ProjectOverview';
import { BudgetSummary } from './components/sections/BudgetSummary';
import { SpendingByCategory } from './components/sections/SpendingByCategory';
import { UpcomingExpenses } from './components/sections/UpcomingExpenses';
import { OngoingExpenses } from './components/sections/OngoingExpenses';
import { CompletedExpenses } from './components/sections/CompletedExpenses';
import { ProgressLog } from './components/sections/ProgressLog';
import { HowToUse } from './components/sections/HowToUse';
import type { Expense } from './types';

function App() {
  const {
    state,
    updateProjectInfo,
    addExpense,
    updateExpense,
    deleteExpense,
    moveExpenseStage,
    addProgressEntry,
    updateProgressEntry,
    deleteProgressEntry,
  } = useProjectData();

  const { budgetSummary, categorySummaries, upcomingTotals, ongoingTotals, completedTotals } =
    useCalculations(state);

  const upcoming = state.expenses.filter((e) => e.stage === 'upcoming');
  const ongoing = state.expenses.filter((e) => e.stage === 'ongoing');
  const completed = state.expenses.filter((e) => e.stage === 'completed');

  function handleAdd(stage: Expense['stage']) {
    return (expense: Omit<Expense, 'id' | 'createdAt'>) => addExpense({ ...expense, stage });
  }

  function handleEdit(id: string, changes: Partial<Expense>) {
    updateExpense(id, changes);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader projectName={state.projectInfo.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 pt-6 pb-12">
        <SideNav />

        <main className="flex-1 min-w-0 space-y-6">
          <ProjectOverview projectInfo={state.projectInfo} onUpdate={updateProjectInfo} />

          <BudgetSummary summary={budgetSummary} />

          <SpendingByCategory summaries={categorySummaries} />

          <UpcomingExpenses
            expenses={upcoming}
            totals={upcomingTotals}
            onAdd={handleAdd('upcoming')}
            onEdit={handleEdit}
            onDelete={deleteExpense}
            onAdvance={(id) => moveExpenseStage(id, 'ongoing')}
          />

          <OngoingExpenses
            expenses={ongoing}
            totals={ongoingTotals}
            onAdd={handleAdd('ongoing')}
            onEdit={handleEdit}
            onDelete={deleteExpense}
            onAdvance={(id) => moveExpenseStage(id, 'completed')}
            onRevert={(id) => moveExpenseStage(id, 'upcoming')}
          />

          <CompletedExpenses
            expenses={completed}
            totals={completedTotals}
            onAdd={handleAdd('completed')}
            onEdit={handleEdit}
            onDelete={deleteExpense}
            onRevert={(id) => moveExpenseStage(id, 'ongoing')}
          />

          <ProgressLog
            entries={state.progressLog}
            onAdd={addProgressEntry}
            onEdit={updateProgressEntry}
            onDelete={deleteProgressEntry}
          />

          <HowToUse />
        </main>
      </div>
    </div>
  );
}

export default App;
