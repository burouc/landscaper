'use client';

import { useCanvasStore } from '@/stores/canvasStore';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export default function LayersPanel() {
  const objects = useCanvasStore((s) => s.objects);
  const selectedIds = useCanvasStore((s) => s.selectedIds);
  const toggleVisibility = useCanvasStore((s) => s.toggleVisibility);
  const toggleLock = useCanvasStore((s) => s.toggleLock);
  const removeObject = useCanvasStore((s) => s.removeObject);
  const reorderObject = useCanvasStore((s) => s.reorderObject);
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas);

  const handleSelect = (id: string) => {
    if (!fabricCanvas) return;
    const obj = (fabricCanvas as any).getObjects().find((o: any) => o.itemUniqueId === id);
    if (obj) {
      (fabricCanvas as any).setActiveObject(obj);
      (fabricCanvas as any).requestRenderAll();
    }
  };

  // Display in reverse order (top layer first)
  const sortedObjects = [...objects].reverse();

  return (
    <div className="flex flex-col">
      <div className="px-3 py-2.5 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Layers</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedObjects.length === 0 && (
          <p className="text-xs text-text-muted text-center py-6 px-3">
            Drag items from the library to the canvas to start designing.
          </p>
        )}
        {sortedObjects.map((obj) => {
          const isSelected = selectedIds.includes(obj.id);
          return (
            <div
              key={obj.id}
              onClick={() => handleSelect(obj.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer border-b border-border/50 transition-colors ${
                isSelected ? 'bg-terra/10 text-terra' : 'text-text-primary hover:bg-cream/50'
              }`}
            >
              {/* Name */}
              <span className="flex-1 truncate">{obj.name}</span>

              {/* Controls */}
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); reorderObject(obj.id, 'up'); }}
                  className="p-0.5 hover:text-terra" title="Move up"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); reorderObject(obj.id, 'down'); }}
                  className="p-0.5 hover:text-terra" title="Move down"
                >
                  <ChevronDown size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleVisibility(obj.id); }}
                  className="p-0.5 hover:text-terra" title="Toggle visibility"
                >
                  {obj.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLock(obj.id); }}
                  className="p-0.5 hover:text-terra" title="Toggle lock"
                >
                  {obj.locked ? <Lock size={12} /> : <Unlock size={12} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeObject(obj.id); }}
                  className="p-0.5 hover:text-red-500" title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
