import { useRef, useEffect } from 'react';
import type { CanvasComponent, ComponentType } from '../../types';
import ComponentLibrary from './ComponentLibrary';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import { useCanvas } from '../../hooks/useCanvas';

interface Props {
  items: CanvasComponent[];
  setItems: (items: CanvasComponent[]) => void;
}

export default function LayoutTab({ items, setItems }: Props) {
  const dragTypeRef = useRef<ComponentType | null>(null);

  const {
    selectedId, setSelectedId, draggingId,
    selected, dropNew, startDragExisting,
    moveDragging, endDrag, deleteSelected, updateItem,
  } = useCanvas(items, setItems);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [deleteSelected]);

  function handleDragStart(type: ComponentType) {
    dragTypeRef.current = type;
  }

  function handleDropNew(x: number, y: number) {
    const type = dragTypeRef.current;
    if (!type) return;
    dropNew(type, x, y);
    dragTypeRef.current = null;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <ComponentLibrary onDragStart={handleDragStart} />
      <div className="flex-1 flex overflow-hidden">
        <Canvas
          items={items}
          selectedId={selectedId}
          draggingId={draggingId}
          onDropNew={handleDropNew}
          onItemMouseDown={startDragExisting}
          onSelectItem={setSelectedId}
          onMouseMove={moveDragging}
          onMouseUp={endDrag}
        />
      </div>
      <PropertiesPanel
        item={selected}
        onUpdate={(patch) => selected && updateItem(selected.id, patch)}
        onDelete={deleteSelected}
      />
    </div>
  );
}
