import { COMPONENT_DEFS } from '../../constants/solar';
import type { ComponentType } from '../../types';

interface Props {
  onDragStart: (type: ComponentType) => void;
}

export default function ComponentLibrary({ onDragStart }: Props) {
  return (
    <div className="w-52 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto p-3">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Components</h3>
      <p className="text-xs text-gray-400 mb-3">Drag onto canvas →</p>
      <div className="space-y-1.5">
        {COMPONENT_DEFS.map((def) => (
          <div
            key={def.type}
            draggable
            onDragStart={() => onDragStart(def.type)}
            className={`flex items-center gap-2 border rounded px-2.5 py-2 cursor-grab active:cursor-grabbing select-none text-sm font-medium ${def.bgColor} ${def.color} transition-shadow hover:shadow`}
          >
            <span className="text-base">{def.icon}</span>
            <span className="text-xs">{def.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
