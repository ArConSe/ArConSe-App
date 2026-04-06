import { useState } from 'react';
import type { Expense, StageTotals } from '../../types';
import { SectionWrapper } from '../layout/SectionWrapper';
import { EmptyState } from '../shared/EmptyState';
import { ExpenseRow } from '../expenses/ExpenseRow';
import { ExpenseForm } from '../expenses/ExpenseForm';
import { formatCurrency } from '../../utils/formatters';

interface Props {
  expenses: Expense[];
  totals: StageTotals;
  onAdd: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  onEdit: (id: string, changes: Partial<Expense>) => void;
  onDelete: (id: string) => void;
  onRevert: (id: string) => void;
}

export function CompletedExpenses({ expenses, totals, onAdd, onEdit, onDelete, onRevert }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingExpense = editingId ? expenses.find((e) => e.id === editingId) : undefined;

  function handleEdit(id: string) {
    setEditingId(id);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditingId(null);
  }

  function handleSubmit(data: Omit<Expense, 'id' | 'createdAt'>) {
    if (editingId) {
      onEdit(editingId, data);
    } else {
      onAdd(data);
    }
  }

  return (
    <SectionWrapper id="completed" title="Completed — Finished Expenses" icon="✅" accent="green">
      <p className="text-sm text-gray-500 mb-4">Items fully paid and completed.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-center w-10">#</th>
              <th className="px-4 py-3 text-left">Item / Description</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Estimated</th>
              <th className="px-4 py-3 text-right">Actual Spent</th>
              <th className="px-4 py-3 text-right">Over/Under</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date Completed</th>
              <th className="px-4 py-3 text-left">Notes</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <EmptyState message="No completed expenses yet." colSpan={10} />
            ) : (
              expenses.map((expense, i) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  rowNumber={i + 1}
                  stage="completed"
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  onRevert={onRevert}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          Completed Subtotal —{' '}
          <span className="text-gray-500">Est: <span className="text-green-700 font-semibold">{formatCurrency(totals.estimatedSubtotal)}</span></span>
          {' · '}
          <span className="text-gray-500">Actual: <span className="text-green-700 font-semibold">{formatCurrency(totals.actualSubtotal)}</span></span>
        </p>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Completed
        </button>
      </div>

      {showForm && (
        <ExpenseForm
          mode={editingId ? 'edit' : 'add'}
          stage="completed"
          initialData={editingExpense}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </SectionWrapper>
  );
}
