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
  onAdvance: (id: string) => void;
}

export function UpcomingExpenses({ expenses, totals, onAdd, onEdit, onDelete, onAdvance }: Props) {
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
    <SectionWrapper id="upcoming" title="Upcoming — Planned Expenses" icon="🟡" accent="yellow">
      <p className="text-sm text-gray-500 mb-4">Items not yet started or paid for.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-center w-10">#</th>
              <th className="px-4 py-3 text-left">Item / Description</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Estimated Cost</th>
              <th className="px-4 py-3 text-left">Notes</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <EmptyState message="No upcoming expenses. Add one below." colSpan={6} />
            ) : (
              expenses.map((expense, i) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  rowNumber={i + 1}
                  stage="upcoming"
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  onAdvance={onAdvance}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          Upcoming Subtotal (Estimated):{' '}
          <span className="text-yellow-700 font-semibold">{formatCurrency(totals.estimatedSubtotal)}</span>
        </p>
        <button
          onClick={() => { setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Upcoming
        </button>
      </div>

      {showForm && (
        <ExpenseForm
          mode={editingId ? 'edit' : 'add'}
          stage="upcoming"
          initialData={editingExpense}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </SectionWrapper>
  );
}
