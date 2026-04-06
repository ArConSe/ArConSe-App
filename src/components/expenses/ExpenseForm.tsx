import { useState } from 'react';
import type { Expense, ExpenseCategory, ExpenseStage } from '../../types';
import { EXPENSE_CATEGORIES } from '../../types';
import { CurrencyInput } from '../shared/CurrencyInput';

interface Props {
  mode: 'add' | 'edit';
  stage: ExpenseStage;
  initialData?: Partial<Expense>;
  onSubmit: (data: Omit<Expense, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const STAGE_LABELS: Record<ExpenseStage, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

export function ExpenseForm({ mode, stage, initialData, onSubmit, onClose }: Props) {
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [category, setCategory] = useState<ExpenseCategory>(
    initialData?.category ?? 'Materials'
  );
  const [estimatedCost, setEstimatedCost] = useState<number>(initialData?.estimatedCost ?? 0);
  const [actualSpent, setActualSpent] = useState<number>(initialData?.actualSpent ?? 0);
  const [notes, setNotes] = useState(initialData?.notes ?? '');
  const [dateCompleted, setDateCompleted] = useState(
    initialData?.dateCompleted ?? new Date().toISOString().split('T')[0]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      description,
      category,
      estimatedCost,
      actualSpent: stage === 'upcoming' ? null : actualSpent,
      stage,
      notes,
      dateCompleted: stage === 'completed' ? dateCompleted : null,
    });
    onClose();
  }

  const showActualSpent = stage === 'ongoing' || stage === 'completed';
  const showDateCompleted = stage === 'completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full z-10 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {mode === 'add' ? 'Add' : 'Edit'} {STAGE_LABELS[stage]} Expense
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Foundation concrete pouring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Cost
            </label>
            <CurrencyInput value={estimatedCost} onChange={setEstimatedCost} />
          </div>

          {showActualSpent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Actual Spent
              </label>
              <CurrencyInput value={actualSpent} onChange={setActualSpent} />
            </div>
          )}

          {showDateCompleted && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Completed
              </label>
              <input
                type="date"
                value={dateCompleted}
                onChange={(e) => setDateCompleted(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === 'add' ? 'Add Expense' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
