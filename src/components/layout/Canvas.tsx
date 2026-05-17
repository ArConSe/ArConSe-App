import { useRef, useCallback, useEffect } from 'react';
import type { CanvasComponent } from '../../types';
import CanvasItem from './CanvasItem';
import { GRID_SNAP } from '../../constants/solar';

interface Props {
  items: CanvasComponent[];
  selectedId: string | null;
  draggingId: string | null;
  onDropNew: (x: number, y: number) => void;
  onItemMouseDown: (id: string, canvasX: number, canvasY: number) => void;
  onSelectItem: (id: string | null) => void;
  onMouseMove: (canvasX: number, canvasY: number) => void;
  onMouseUp: () => void;
}

export default function Canvas({
  items, selectedId, draggingId,
  onDropNew, onItemMouseDown, onSelectItem, onMouseMove, onMouseUp,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const getCanvasPos = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!draggingId) return;
      const { x, y } = getCanvasPos(e.clientX, e.clientY);
      onMouseMove(x, y);
    }
    function handleMouseUp() {
      onMouseUp();
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, getCanvasPos, onMouseMove, onMouseUp]);

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const { x, y } = getCanvasPos(e.clientX, e.clientY);
    onDropNew(x, y);
  }

  function handleItemMouseDown(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    const { x, y } = getCanvasPos(e.clientX, e.clientY);
    onItemMouseDown(id, x, y);
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <div
        ref={canvasRef}
        className="flex-1 relative overflow-auto cursor-default"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: `${GRID_SNAP}px ${GRID_SNAP}px`,
          minHeight: 600,
          minWidth: 800,
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => onSelectItem(null)}
      >
        {items.map((item) => (
          <CanvasItem
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onMouseDown={handleItemMouseDown}
            onClick={onSelectItem}
          />
        ))}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-300 text-sm select-none">Drag components from the left panel onto the canvas</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-100 border-t border-gray-200 text-xs text-gray-500">
        <span>{items.length} component{items.length !== 1 ? 's' : ''}</span>
        <span>Grid: {GRID_SNAP}px &nbsp;|&nbsp; Delete key removes selected</span>
      </div>
    </div>
  );
}
