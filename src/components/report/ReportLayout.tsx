import type { CanvasComponent } from '../../types';
import { getComponentDef } from '../../constants/solar';

interface Props {
  items: CanvasComponent[];
}

export default function ReportLayout({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">System Layout Diagram</h2>
        <div className="border border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-400 text-sm">
          No layout created. Go to the Layout Designer tab to add components.
        </div>
      </div>
    );
  }

  const maxX = Math.max(...items.map((i) => i.x + 100));
  const maxY = Math.max(...items.map((i) => i.y + 80));
  const scale = Math.min(1, 680 / maxX, 300 / maxY);

  return (
    <div className="mb-6">
      <h2 className="text-base font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">System Layout Diagram</h2>
      <div
        className="border border-gray-200 rounded-lg overflow-hidden bg-white relative"
        style={{ height: Math.ceil(maxY * scale) + 20, width: '100%' }}
      >
        <div
          style={{
            position: 'relative',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: maxX,
            height: maxY,
          }}
        >
          {items.map((item) => {
            const def = getComponentDef(item.type);
            return (
              <div
                key={item.id}
                style={{ left: item.x, top: item.y, position: 'absolute' }}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded border text-center min-w-[56px] ${def.bgColor} ${def.color}`}
              >
                <span className="text-lg">{def.icon}</span>
                <span className="text-[9px] font-medium leading-tight max-w-[64px] break-words">{item.label}</span>
                {item.count > 1 && <span className="text-[8px]">×{item.count}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">
        {items.length} component{items.length !== 1 ? 's' : ''} placed
      </p>
    </div>
  );
}
