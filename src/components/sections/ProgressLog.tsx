import { useState } from 'react';
import type { ProgressLogEntry } from '../../types';
import { SectionWrapper } from '../layout/SectionWrapper';
import { CurrencyInput } from '../shared/CurrencyInput';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface Props {
  entries: ProgressLogEntry[];
  onAdd: (entry: Omit<ProgressLogEntry, 'id'>) => void;
  onEdit: (id: string, changes: Partial<ProgressLogEntry>) => void;
  onDelete: (id: string) => void;
}

export function ProgressLog({ entries, onAdd, onEdit, onDelete }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [spentThisPeriod, setSpentThisPeriod] = useState(0);

  function openAdd() {
    setEditingId(null);
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setSpentThisPeriod(0);
    setShowForm(true);
  }

  function openEdit(entry: ProgressLogEntry) {
    setEditingId(entry.id);
    setDate(entry.date);
    setNotes(entry.notes);
    setSpentThisPeriod(entry.spentThisPeriod);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    const priorTotal = sortedEntries
      .filter((e) => editingId ? e.id !== editingId : true)
      .filter((e) => e.date <= date)
      .reduce((sum, e) => sum + e.spentThisPeriod, 0);
    const runningTotal = priorTotal + spentThisPeriod;

    if (editingId) {
      onEdit(editingId, { date, notes, spentThisPeriod, runningTotal });
    } else {
      onAdd({ date, notes, spentThisPeriod, runningTotal });
    }
    setShowForm(false);
    setEditingId(null);
  }

  return (
    <SectionWrapper id="progress-log" title="Progress Log" icon="📈">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Update / Notes</th>
              <th className="px-4 py-3 text-right">Spent This Period</th>
              <th className="px-4 py-3 text-right">Running Total</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400 italic">
                  No progress entries yet.
                </td>
              </tr>
            ) : (
              [...entries]
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{formatDate(entry.date)}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs">{entry.notes || '—'}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(entry.spentThisPeriod)}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(entry.runningTotal)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(entry)}
                          className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(entry.id)}
                          className="text-xs px-2 py-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Entry
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowForm(false); setEditingId(null); }} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full z-10 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              {editingId ? 'Edit' : 'Add'} Progress Entry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update / Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="What happened this period?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spent This Period</label>
                <CurrencyInput value={spentThisPeriod} onChange={setSpentThisPeriod} />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Save' : 'Add Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Entry"
        message="Delete this progress entry? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => { if (deleteId) { onDelete(deleteId); } setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        danger
      />
    </SectionWrapper>
  );
}
