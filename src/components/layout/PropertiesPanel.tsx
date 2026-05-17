import type { CanvasComponent } from '../../types';

interface Props {
  item: CanvasComponent | null;
  onUpdate: (patch: Partial<CanvasComponent>) => void;
  onDelete: () => void;
}

const inputCls = 'w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

export default function PropertiesPanel({ item, onUpdate, onDelete }: Props) {
  if (!item) {
    return (
      <div className="w-52 flex-shrink-0 border-l border-gray-200 bg-white p-4">
        <p className="text-xs text-gray-400 text-center mt-8">Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-52 flex-shrink-0 border-l border-gray-200 bg-white p-4 space-y-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Properties</h3>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Label</label>
        <input
          className={inputCls}
          value={item.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Count / Qty</label>
        <input
          type="number" min={1} className={inputCls}
          value={item.count}
          onChange={(e) => onUpdate({ count: Math.max(1, +e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Notes</label>
        <textarea
          className={inputCls + ' resize-none h-20'}
          value={item.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
        />
      </div>

      <div className="text-xs text-gray-400">
        Position: ({item.x}, {item.y})
      </div>

      <button
        onClick={onDelete}
        className="w-full text-xs text-red-600 border border-red-300 rounded px-3 py-1.5 hover:bg-red-50 transition-colors"
      >
        Delete Component
      </button>
    </div>
  );
}
