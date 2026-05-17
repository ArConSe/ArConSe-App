import type { CanvasComponent } from '../../types';
import { getComponentDef } from '../../constants/solar';

interface Props {
  item: CanvasComponent;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onClick: (id: string) => void;
}

export default function CanvasItem({ item, isSelected, onMouseDown, onClick }: Props) {
  const def = getComponentDef(item.type);

  return (
    <div
      onMouseDown={(e) => { e.stopPropagation(); onMouseDown(e, item.id); }}
      onClick={(e) => { e.stopPropagation(); onClick(item.id); }}
      style={{ left: item.x, top: item.y, position: 'absolute' }}
      className={`select-none cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 p-2 rounded border-2 text-center min-w-[64px] transition-shadow ${def.bgColor} ${def.color} ${
        isSelected ? 'border-blue-500 shadow-lg ring-2 ring-blue-300' : 'hover:shadow-md'
      }`}
    >
      <span className="text-xl">{def.icon}</span>
      <span className="text-[10px] font-medium leading-tight max-w-[72px] break-words">{item.label}</span>
      {item.count > 1 && (
        <span className="text-[9px] bg-white bg-opacity-70 rounded px-1">×{item.count}</span>
      )}
    </div>
  );
}
