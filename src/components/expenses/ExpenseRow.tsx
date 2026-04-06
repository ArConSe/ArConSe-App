import { useState } from 'react';
import type { Expense, ExpenseStage } from '../../types';
import { formatCurrency, formatOverUnder, formatDate } from '../../utils/formatters';
import { getExpenseStatus, getOverUnder } from '../../utils/calculations';
import { getOverUnderClass } from '../../utils/statusHelpers';
import { StatusBadge } from '../shared/StatusBadge';
import { MoveStageButton } from './MoveStageButton';
import { ConfirmDialog } from '../shared/ConfirmDialog';

interface Props {
  expense: Expense;
  rowNumber: number;
  stage: ExpenseStage;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdvance?: (id: string) => void;
  onRevert?: (id: string) => void;
}

export function ExpenseRow({ expense, rowNumber, stage, onEdit, onDelete, onAdvance, onRevert }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const overUnder = getOverUnder(expense.estimatedCost, expense.actualSpent);
  const status = getExpenseStatus(expense.estimatedCost, expense.actualSpent);

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
        <td className="px-4 py-3 text-gray-400 text-center w-10">{rowNumber}</td>
        <td className="px-4 py-3 text-gray-900 font-medium">{expense.description || '—'}</td>
        <td className="px-4 py-3">
          <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            {expense.category}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-700 text-right">{formatCurrency(expense.estimatedCost)}</td>

        {(stage === 'ongoing' || stage === 'completed') && (
          <>
            <td className="px-4 py-3 text-gray-700 text-right">{formatCurrency(expense.actualSpent)}</td>
            <td className={`px-4 py-3 text-right ${getOverUnderClass(overUnder)}`}>
              {formatOverUnder(overUnder)}
            </td>
            <td className="px-4 py-3">
              <StatusBadge status={status} />
            </td>
          </>
        )}

        {stage === 'completed' && (
          <td className="px-4 py-3 text-gray-600 text-sm">{formatDate(expense.dateCompleted)}</td>
        )}

        <td className="px-4 py-3 text-gray-400 text-sm max-w-[140px] truncate">{expense.notes || '—'}</td>

        <td className="px-4 py-3">
          <div className="flex items-center gap-1 flex-wrap">
            {onAdvance && (
              <MoveStageButton direction="advance" stage={stage} onClick={() => onAdvance(expense.id)} />
            )}
            {onRevert && (
              <MoveStageButton direction="revert" stage={stage} onClick={() => onRevert(expense.id)} />
            )}
            <button
              onClick={() => onEdit(expense.id)}
              className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        isOpen={confirmDelete}
        title="Delete Expense"
        message={`Delete "${expense.description || 'this expense'}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => { onDelete(expense.id); setConfirmDelete(false); }}
        onCancel={() => setConfirmDelete(false)}
        danger
      />
    </>
  );
}
