'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useCanvasStore } from '@/stores/canvasStore';
import { useUIStore } from '@/stores/uiStore';
import { LibraryItem } from '@/types/items';
import { libraryItems } from '@/data/libraryItems';
import { drawGrid } from '@/lib/canvas/gridManager';
import { snapToGrid, snapScaleToGrid } from '@/lib/canvas/snapManager';
import { applyConstraints } from '@/lib/canvas/itemConstraints';
import {
  createFabricPattern,
  pathPointsToPathString,
  defaultRectPoints,
  defaultLinePoints,
} from '@/lib/canvas/patternManager';
import {
  enterEditMode,
  exitEditMode,
  isEditing,
} from '@/lib/canvas/pathEditor';
import { v4 as uuidv4 } from 'uuid';

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<any>(null);

  const { setFabricCanvas, syncObjectsFromCanvas, setSelectedIds, saveUndoState } =
    useCanvasStore();
  const setEditingObjectId = useCanvasStore((s) => s.setEditingObjectId);
  const editingObjectId = useCanvasStore((s) => s.editingObjectId);
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
        fireRightClick: true,
        stopContextMenu: true,
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

      // ── Double-click to enter path/shape edit mode ──
      canvas.on('mouse:dblclick', (opt: any) => {
        const target = opt.target;
        if (!target) return;
        const behavior = target.itemBehavior;
        if (behavior === 'repeatable' || behavior === 'path') {
          // Enter point editing mode
          const objId = target.itemUniqueId;
          if (objId) {
            useCanvasStore.getState().setEditingObjectId(objId);
            enterEditMode(fabric, canvas, target, () => {
              syncObjectsFromCanvas();
            });
          }
        }
      });

      // ── Click on empty space exits edit mode ──
      canvas.on('mouse:down', (opt: any) => {
        if (isEditing() && !opt.target) {
          exitEditMode();
          useCanvasStore.getState().setEditingObjectId(null);
          useCanvasStore.getState().saveUndoState();
        }
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
        // Escape exits edit mode
        if (e.key === 'Escape' && isEditing()) {
          exitEditMode();
          useCanvasStore.getState().setEditingObjectId(null);
          useCanvasStore.getState().saveUndoState();
          canvas.requestRenderAll();
          return;
        }

        // Delete selected
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (isEditing()) return; // Don't delete while editing points
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
          if (isEditing()) {
            exitEditMode();
            useCanvasStore.getState().setEditingObjectId(null);
          }
          useCanvasStore.getState().undo();
        }
        // Redo
        if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
          e.preventDefault();
          if (isEditing()) {
            exitEditMode();
            useCanvasStore.getState().setEditingObjectId(null);
          }
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
      {/* Edit mode indicator */}
      {editingObjectId && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-terra/90 text-white text-xs px-3 py-1.5 rounded-full shadow select-none">
          Editing points — Dbl-click point to toggle curve · ESC to finish
        </div>
      )}
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

    if (item.behavior === 'repeatable') {
      addRepeatableItem(fabric, canvas, item, x, y, uniqueId);
    } else if (item.behavior === 'path') {
      addPathItem(fabric, canvas, item, x, y, uniqueId);
    } else {
      // Default SVG-based item creation for proportional, freeform, fixed
      addSvgItem(fabric, canvas, item, x, y, uniqueId);
    }
  });
}

/** Create a repeatable item (polygon path with pattern fill). */
function addRepeatableItem(
  fabric: any,
  canvas: any,
  item: LibraryItem,
  x: number,
  y: number,
  uniqueId: string,
) {
  const points = defaultRectPoints(item.defaultWidth, item.defaultHeight);
  const pathString = pathPointsToPathString(points, true);
  const pathObj = new fabric.Path(pathString, {
    left: x - item.defaultWidth / 2,
    top: y - item.defaultHeight / 2,
    fill: '#CCCCCC', // placeholder until pattern loads
    stroke: '#999999',
    strokeWidth: 1,
    originX: 'left',
    originY: 'top',
  });

  // Store metadata
  (pathObj as any).itemUniqueId = uniqueId;
  (pathObj as any).itemId = item.id;
  (pathObj as any).itemName = item.name;
  (pathObj as any).itemBehavior = item.behavior;
  (pathObj as any).itemPathPoints = JSON.parse(JSON.stringify(points));
  (pathObj as any).itemPatternAngle = 0;
  (pathObj as any).itemPatternSvg = item.patternSvg;
  (pathObj as any).itemPatternWidth = item.patternWidth;
  (pathObj as any).itemPatternHeight = item.patternHeight;

  applyConstraints(pathObj, item.behavior);

  const store = useCanvasStore.getState();
  store.saveUndoState();

  canvas.add(pathObj);
  canvas.setActiveObject(pathObj);
  canvas.requestRenderAll();
  store.syncObjectsFromCanvas();

  // Load pattern asynchronously and apply
  if (item.patternSvg && item.patternWidth && item.patternHeight) {
    createFabricPattern(
      fabric,
      item.patternSvg,
      item.patternWidth,
      item.patternHeight,
      0, // initial angle
      (pattern) => {
        pathObj.set('fill', pattern);
        pathObj.set('stroke', 'rgba(0,0,0,0.15)');
        canvas.requestRenderAll();
      },
    );
  }
}

/** Create a path item (stroke-based path for walls/fences). */
function addPathItem(
  fabric: any,
  canvas: any,
  item: LibraryItem,
  x: number,
  y: number,
  uniqueId: string,
) {
  const points = defaultLinePoints(item.defaultWidth);
  const pathString = pathPointsToPathString(points, false);
  const strokeW = item.defaultStrokeWidth ?? 10;
  const strokeC = item.defaultStrokeColor ?? '#9E8E7E';

  const pathObj = new fabric.Path(pathString, {
    left: x - item.defaultWidth / 2,
    top: y,
    fill: null,
    stroke: strokeC,
    strokeWidth: strokeW,
    strokeLineCap: 'round',
    strokeLineJoin: 'round',
    originX: 'left',
    originY: 'center',
  });

  // Store metadata
  (pathObj as any).itemUniqueId = uniqueId;
  (pathObj as any).itemId = item.id;
  (pathObj as any).itemName = item.name;
  (pathObj as any).itemBehavior = item.behavior;
  (pathObj as any).itemPathPoints = JSON.parse(JSON.stringify(points));

  applyConstraints(pathObj, item.behavior);

  const store = useCanvasStore.getState();
  store.saveUndoState();

  canvas.add(pathObj);
  canvas.setActiveObject(pathObj);
  canvas.requestRenderAll();
  store.syncObjectsFromCanvas();
}

/** Create a standard SVG-based item (proportional, freeform, fixed). */
function addSvgItem(
  fabric: any,
  canvas: any,
  item: LibraryItem,
  x: number,
  y: number,
  uniqueId: string,
) {
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
}
