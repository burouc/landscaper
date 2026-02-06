import { create } from 'zustand';
import { fabric } from 'fabric';
import { CanvasObjectMeta, ItemBehavior } from '@/types/items';

const MAX_UNDO = 50;

interface CanvasState {
  fabricCanvas: fabric.Canvas | null;
  objects: CanvasObjectMeta[];
  selectedIds: string[];

  // Undo / redo stacks hold serialised canvas JSON
  undoStack: string[];
  redoStack: string[];

  setFabricCanvas: (canvas: fabric.Canvas | null) => void;

  // Object management
  syncObjectsFromCanvas: () => void;
  setSelectedIds: (ids: string[]) => void;
  toggleVisibility: (id: string) => void;
  toggleLock: (id: string) => void;
  removeObject: (id: string) => void;
  reorderObject: (id: string, direction: 'up' | 'down') => void;

  // Undo / Redo
  saveUndoState: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

function getObjectsMeta(canvas: fabric.Canvas): CanvasObjectMeta[] {
  return canvas.getObjects().map((obj, index) => ({
    id: (obj as any).itemUniqueId ?? `obj-${index}`,
    itemId: (obj as any).itemId ?? '',
    name: (obj as any).itemName ?? `Object ${index + 1}`,
    visible: obj.visible !== false,
    locked: obj.lockMovementX === true && obj.lockMovementY === true,
    zIndex: index,
    behavior: ((obj as any).itemBehavior ?? 'freeform') as ItemBehavior,
  }));
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  fabricCanvas: null,
  objects: [],
  selectedIds: [],
  undoStack: [],
  redoStack: [],

  setFabricCanvas: (canvas) => set({ fabricCanvas: canvas }),

  syncObjectsFromCanvas: () => {
    const { fabricCanvas } = get();
    if (!fabricCanvas) return;
    set({ objects: getObjectsMeta(fabricCanvas) });
  },

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleVisibility: (id) => {
    const { fabricCanvas, syncObjectsFromCanvas } = get();
    if (!fabricCanvas) return;
    const obj = fabricCanvas.getObjects().find((o: any) => o.itemUniqueId === id);
    if (obj) {
      obj.set('visible', !obj.visible);
      fabricCanvas.requestRenderAll();
      syncObjectsFromCanvas();
    }
  },

  toggleLock: (id) => {
    const { fabricCanvas, syncObjectsFromCanvas } = get();
    if (!fabricCanvas) return;
    const obj = fabricCanvas.getObjects().find((o: any) => o.itemUniqueId === id);
    if (obj) {
      const isLocked = obj.lockMovementX;
      obj.set({
        lockMovementX: !isLocked,
        lockMovementY: !isLocked,
        lockRotation: !isLocked,
        lockScalingX: !isLocked,
        lockScalingY: !isLocked,
        selectable: isLocked,
        evented: isLocked,
      });
      fabricCanvas.requestRenderAll();
      syncObjectsFromCanvas();
    }
  },

  removeObject: (id) => {
    const { fabricCanvas, syncObjectsFromCanvas, saveUndoState } = get();
    if (!fabricCanvas) return;
    const obj = fabricCanvas.getObjects().find((o: any) => o.itemUniqueId === id);
    if (obj) {
      saveUndoState();
      fabricCanvas.remove(obj);
      fabricCanvas.requestRenderAll();
      syncObjectsFromCanvas();
    }
  },

  reorderObject: (id, direction) => {
    const { fabricCanvas, syncObjectsFromCanvas, saveUndoState } = get();
    if (!fabricCanvas) return;
    const obj = fabricCanvas.getObjects().find((o: any) => o.itemUniqueId === id);
    if (!obj) return;
    saveUndoState();
    if (direction === 'up') {
      fabricCanvas.bringForward(obj);
    } else {
      fabricCanvas.sendBackwards(obj);
    }
    fabricCanvas.requestRenderAll();
    syncObjectsFromCanvas();
  },

  saveUndoState: () => {
    const { fabricCanvas, undoStack } = get();
    if (!fabricCanvas) return;
    const json = JSON.stringify(fabricCanvas.toJSON(['itemUniqueId', 'itemId', 'itemName', 'itemBehavior']));
    const newStack = [...undoStack, json].slice(-MAX_UNDO);
    set({ undoStack: newStack, redoStack: [] });
  },

  undo: () => {
    const { fabricCanvas, undoStack, redoStack, syncObjectsFromCanvas } = get();
    if (!fabricCanvas || undoStack.length === 0) return;
    const currentJson = JSON.stringify(fabricCanvas.toJSON(['itemUniqueId', 'itemId', 'itemName', 'itemBehavior']));
    const prevJson = undoStack[undoStack.length - 1];
    set({
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, currentJson],
    });
    fabricCanvas.loadFromJSON(prevJson, () => {
      fabricCanvas.requestRenderAll();
      syncObjectsFromCanvas();
    });
  },

  redo: () => {
    const { fabricCanvas, undoStack, redoStack, syncObjectsFromCanvas } = get();
    if (!fabricCanvas || redoStack.length === 0) return;
    const currentJson = JSON.stringify(fabricCanvas.toJSON(['itemUniqueId', 'itemId', 'itemName', 'itemBehavior']));
    const nextJson = redoStack[redoStack.length - 1];
    set({
      redoStack: redoStack.slice(0, -1),
      undoStack: [...undoStack, currentJson],
    });
    fabricCanvas.loadFromJSON(nextJson, () => {
      fabricCanvas.requestRenderAll();
      syncObjectsFromCanvas();
    });
  },

  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,
}));
