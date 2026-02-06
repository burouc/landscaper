'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useCanvasStore } from '@/stores/canvasStore';
import { useUIStore } from '@/stores/uiStore';
import { LibraryItem } from '@/types/items';
import { libraryItems } from '@/data/libraryItems';
import { drawGrid } from '@/lib/canvas/gridManager';
import { snapToGrid, snapScaleToGrid } from '@/lib/canvas/snapManager';
import { applyConstraints } from '@/lib/canvas/itemConstraints';
import { v4 as uuidv4 } from 'uuid';

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<any>(null);

  const { setFabricCanvas, syncObjectsFromCanvas, setSelectedIds, saveUndoState } =
    useCanvasStore();
  const unit = useUIStore((s) => s.unit);
  const snapEnabled = useUIStore((s) => s.snapToGrid);
  const gridVisible = useUIStore((s) => s.gridVisible);
  const zoom = useUIStore((s) => s.zoom);
  const setZoom = useUIStore((s) => s.setZoom);

  // Refs for latest values (avoids stale closures in fabric callbacks)
  const unitRef = useRef(unit);
  const snapRef = useRef(snapEnabled);
  const gridRef = useRef(gridVisible);
  unitRef.current = unit;
  snapRef.current = snapEnabled;
  gridRef.current = gridVisible;

  // Initialise fabric canvas
  useEffect(() => {
    let cancelled = false;

    import('fabric').then(({ fabric }) => {
      if (cancelled || !canvasRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: '#FFFFFF',
        selection: true,
        preserveObjectStacking: true,
      });

      fabricRef.current = canvas;
      setFabricCanvas(canvas as any);

      // ── Grid rendering ──
      canvas.on('after:render', () => {
        drawGrid(canvas as any, unitRef.current, gridRef.current);
      });

      // ── Selection events ──
      canvas.on('selection:created', (e: any) => {
        const ids = (e.selected || []).map((o: any) => o.itemUniqueId).filter(Boolean);
        setSelectedIds(ids);
      });
      canvas.on('selection:updated', (e: any) => {
        const ids = (e.selected || []).map((o: any) => o.itemUniqueId).filter(Boolean);
        setSelectedIds(ids);
      });
      canvas.on('selection:cleared', () => {
        setSelectedIds([]);
      });

      // ── Snap to grid ──
      canvas.on('object:moving', (e: any) => {
        if (snapRef.current && e.target) {
          snapToGrid(e.target, unitRef.current);
        }
      });
      canvas.on('object:scaling', (e: any) => {
        if (snapRef.current && e.target) {
          snapScaleToGrid(e.target, unitRef.current);
        }
      });

      // ── Undo state on modification end ──
      canvas.on('object:modified', () => {
        saveUndoState();
        syncObjectsFromCanvas();
      });

      // ── Zoom with scroll ──
      canvas.on('mouse:wheel', (opt: any) => {
        const delta = opt.e.deltaY;
        let newZoom = canvas.getZoom() * (1 - delta / 600);
        newZoom = Math.min(4, Math.max(0.25, newZoom));

        canvas.zoomToPoint(
          new fabric.Point(opt.e.offsetX, opt.e.offsetY),
          newZoom,
        );
        setZoom(newZoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      // ── Pan with middle-click or Alt+drag ──
      let isPanning = false;
      let lastPosX = 0;
      let lastPosY = 0;

      canvas.on('mouse:down', (opt: any) => {
        if (opt.e.button === 1 || opt.e.altKey) {
          isPanning = true;
          lastPosX = opt.e.clientX;
          lastPosY = opt.e.clientY;
          canvas.selection = false;
        }
      });
      canvas.on('mouse:move', (opt: any) => {
        if (!isPanning) return;
        const vpt = canvas.viewportTransform!;
        vpt[4] += opt.e.clientX - lastPosX;
        vpt[5] += opt.e.clientY - lastPosY;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
        canvas.requestRenderAll();
      });
      canvas.on('mouse:up', () => {
        isPanning = false;
        canvas.selection = true;
      });

      // ── Keyboard shortcuts ──
      const handleKeyDown = (e: KeyboardEvent) => {
        // Delete selected
        if (e.key === 'Delete' || e.key === 'Backspace') {
          const active = canvas.getActiveObjects();
          if (active.length) {
            saveUndoState();
            active.forEach((obj) => canvas.remove(obj));
            canvas.discardActiveObject();
            canvas.requestRenderAll();
            syncObjectsFromCanvas();
          }
        }
        // Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          useCanvasStore.getState().undo();
        }
        // Redo
        if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
          e.preventDefault();
          useCanvasStore.getState().redo();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      // ── Resize handler ──
      const ro = new ResizeObserver(() => {
        if (!containerRef.current) return;
        canvas.setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        canvas.requestRenderAll();
      });
      ro.observe(container);

      // Cleanup
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        ro.disconnect();
      };
    });

    return () => {
      cancelled = true;
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
        setFabricCanvas(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render when grid/unit changes
  useEffect(() => {
    fabricRef.current?.requestRenderAll();
  }, [gridVisible, unit]);

  // ── Drag & drop from library ──
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const canvas = fabricRef.current;
      if (!canvas) return;

      const itemId = e.dataTransfer.getData('application/landscaper-item');
      if (!itemId) return;

      const item = libraryItems.find((i) => i.id === itemId);
      if (!item) return;

      // Calculate drop position in canvas coordinates
      const rect = containerRef.current!.getBoundingClientRect();
      const pointer = canvas.getPointer({
        clientX: e.clientX - rect.left,
        clientY: e.clientY - rect.top,
      } as any);

      addItemToCanvas(canvas, item, pointer.x, pointer.y);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-cream"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <canvas ref={canvasRef} />
      {/* Zoom indicator */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs text-text-secondary select-none">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}

/** Add a library item to the canvas at the given position. */
function addItemToCanvas(
  canvas: any,
  item: LibraryItem,
  x: number,
  y: number,
) {
  import('fabric').then(({ fabric }) => {
    const uniqueId = uuidv4();

    fabric.loadSVGFromString(item.svgPath, (objects: any[], options: any) => {
      const group = fabric.util.groupSVGElements(objects, options);

      // Scale SVG to match default dimensions
      const svgWidth = group.width || 100;
      const svgHeight = group.height || 100;
      const scaleX = item.defaultWidth / svgWidth;
      const scaleY = item.defaultHeight / svgHeight;

      group.set({
        left: x - (item.defaultWidth / 2),
        top: y - (item.defaultHeight / 2),
        scaleX,
        scaleY,
        originX: 'left',
        originY: 'top',
      });

      // Store metadata on the fabric object
      (group as any).itemUniqueId = uniqueId;
      (group as any).itemId = item.id;
      (group as any).itemName = item.name;
      (group as any).itemBehavior = item.behavior;

      applyConstraints(group, item.behavior);

      const store = useCanvasStore.getState();
      store.saveUndoState();

      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.requestRenderAll();

      store.syncObjectsFromCanvas();
    });
  });
}
