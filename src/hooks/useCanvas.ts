import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { CanvasComponent, ComponentType } from '../types';
import { GRID_SNAP, getComponentDef } from '../constants/solar';

function snap(v: number) {
  return Math.round(v / GRID_SNAP) * GRID_SNAP;
}

export function useCanvas(
  items: CanvasComponent[],
  setItems: (items: CanvasComponent[]) => void,
) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const dropNew = useCallback(
    (type: ComponentType, canvasX: number, canvasY: number) => {
      const def = getComponentDef(type);
      const newItem: CanvasComponent = {
        id: uuidv4(),
        type,
        x: snap(canvasX),
        y: snap(canvasY),
        label: def.label,
        count: 1,
        notes: '',
      };
      setItems([...items, newItem]);
      setSelectedId(newItem.id);
    },
    [items, setItems],
  );

  const startDragExisting = useCallback(
    (id: string, mouseX: number, mouseY: number) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      setDraggingId(id);
      setDragOffset({ x: mouseX - item.x, y: mouseY - item.y });
      setSelectedId(id);
    },
    [items],
  );

  const moveDragging = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!draggingId) return;
      setItems(
        items.map((i) =>
          i.id === draggingId
            ? { ...i, x: snap(mouseX - dragOffset.x), y: snap(mouseY - dragOffset.y) }
            : i,
        ),
      );
    },
    [draggingId, dragOffset, items, setItems],
  );

  const endDrag = useCallback(() => {
    setDraggingId(null);
  }, []);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setItems(items.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  }, [selectedId, items, setItems]);

  const updateItem = useCallback(
    (id: string, patch: Partial<CanvasComponent>) => {
      setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    },
    [items, setItems],
  );

  const selected = items.find((i) => i.id === selectedId) ?? null;

  return {
    selectedId,
    setSelectedId,
    draggingId,
    selected,
    dropNew,
    startDragExisting,
    moveDragging,
    endDrag,
    deleteSelected,
    updateItem,
  };
}
