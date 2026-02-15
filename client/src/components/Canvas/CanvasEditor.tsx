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
import {
  applyObjectSnap,
  clearGuides,
  drawAlignmentGuides,
} from '@/lib/canvas/objectSnapManager';
import {
  drawMeasurements,
  addMeasureLine,
  removeMeasureLine,
  hitTestMeasureLine,
  MeasurePoint,
} from '@/lib/canvas/measureTool';
import { v4 as uuidv4 } from 'uuid';

/** Unique key to identify the background image object on the canvas */
const BG_IMAGE_KEY = '__landscaper_bg_image__';

/** Custom properties preserved during object clone/serialization */
const CUSTOM_PROPS = [
  'itemUniqueId', 'itemId', 'itemName', 'itemBehavior',
  'itemPathPoints', 'itemPatternAngle', 'itemPatternSvg',
  'itemPatternWidth', 'itemPatternHeight', 'itemCurveTension',
];

export default function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<any>(null);
  const clipboardRef = useRef<any>(null);
  const spaceHeldRef = useRef(false);

  const { setFabricCanvas, syncObjectsFromCanvas, setSelectedIds, saveUndoState } =
    useCanvasStore();
  const setEditingObjectId = useCanvasStore((s) => s.setEditingObjectId);
  const editingObjectId = useCanvasStore((s) => s.editingObjectId);
  const unit = useUIStore((s) => s.unit);
  const snapEnabled = useUIStore((s) => s.snapToGrid);
  const objectSnapEnabled = useUIStore((s) => s.objectSnap);
  const gridVisible = useUIStore((s) => s.gridVisible);
  const gridSize = useUIStore((s) => s.gridSize);
  const zoom = useUIStore((s) => s.zoom);
  const setZoom = useUIStore((s) => s.setZoom);
  const activeTool = useUIStore((s) => s.activeTool);
  const setActiveTool = useUIStore((s) => s.setActiveTool);
  const backgroundImage = useUIStore((s) => s.backgroundImage);
  const calibratePhase = useUIStore((s) => s.calibrate.phase);

  // Measure tool state
  const measureStartRef = useRef<MeasurePoint | null>(null);
  const activeMeasureRef = useRef<{ start: MeasurePoint; end: MeasurePoint } | null>(null);

  // Refs for latest values (avoids stale closures in fabric callbacks)
  const unitRef = useRef(unit);
  const snapRef = useRef(snapEnabled);
  const objectSnapRef = useRef(objectSnapEnabled);
  const gridRef = useRef(gridVisible);
  const gridSizeRef = useRef(gridSize);
  const activeToolRef = useRef(activeTool);
  const calibratePhaseRef = useRef(calibratePhase);
  unitRef.current = unit;
  snapRef.current = snapEnabled;
  objectSnapRef.current = objectSnapEnabled;
  gridRef.current = gridVisible;
  gridSizeRef.current = gridSize;
  activeToolRef.current = activeTool;
  calibratePhaseRef.current = calibratePhase;

  // Initialise fabric canvas
  useEffect(() => {
    let cancelled = false;

    import('fabric').then(({ fabric }) => {
      if (cancelled || !canvasRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: container.clientWidth,
        height: container.clientHeight,
        selection: true,
        preserveObjectStacking: true,
        fireRightClick: true,
        stopContextMenu: true,
      });

      fabricRef.current = canvas;
      setFabricCanvas(canvas as any);

      // ── Grid rendering + alignment guides + measurements ──
      canvas.on('after:render', () => {
        drawGrid(canvas as any, unitRef.current, gridRef.current, gridSizeRef.current);
        drawAlignmentGuides(canvas as any);
        drawMeasurements(canvas as any, unitRef.current, activeMeasureRef.current);
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

      // ── Snap to grid + object snap ──
      canvas.on('object:moving', (e: any) => {
        if (snapRef.current && e.target) {
          snapToGrid(e.target, unitRef.current, gridSizeRef.current);
        }
        if (objectSnapRef.current && e.target) {
          applyObjectSnap(canvas as any, e.target);
        }
      });
      canvas.on('object:scaling', (e: any) => {
        if (snapRef.current && e.target) {
          snapScaleToGrid(e.target, unitRef.current, gridSizeRef.current);
        }
      });

      // ── Undo state on modification end ──
      canvas.on('object:modified', () => {
        clearGuides(canvas as any);
        saveUndoState();
        syncObjectsFromCanvas();
      });

      // ── Double-click to enter path/shape edit mode ──
      canvas.on('mouse:dblclick', (opt: any) => {
        const target = opt.target;
        if (!target) return;
        const behavior = target.itemBehavior;
        if (behavior === 'repeatable' || behavior === 'path') {
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
      // ── Also handle calibration point picking and measure tool ──
      canvas.on('mouse:down', (opt: any) => {
        // Calibration mode: pick points
        const cPhase = calibratePhaseRef.current;
        if (cPhase === 'pick-start' || cPhase === 'pick-end') {
          const pointer = canvas.getPointer(opt.e);
          useUIStore.getState().setCalibratePoint({ x: pointer.x, y: pointer.y });
          return;
        }

        // Measure tool: start measurement
        if (activeToolRef.current === 'measure') {
          const pointer = canvas.getPointer(opt.e);

          // Right-click to delete a measurement near cursor
          if (opt.e.button === 2) {
            const rect = (containerRef.current || canvasRef.current)?.getBoundingClientRect();
            if (rect) {
              const screenX = opt.e.clientX - rect.left;
              const screenY = opt.e.clientY - rect.top;
              const hitId = hitTestMeasureLine(canvas as any, screenX, screenY);
              if (hitId) {
                removeMeasureLine(hitId);
                canvas.requestRenderAll();
              }
            }
            return;
          }

          measureStartRef.current = { x: pointer.x, y: pointer.y };
          activeMeasureRef.current = null;
          return;
        }

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
        if (opt.e.button === 1 || opt.e.altKey || spaceHeldRef.current) {
          isPanning = true;
          lastPosX = opt.e.clientX;
          lastPosY = opt.e.clientY;
          canvas.selection = false;
          if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
        }
      });
      canvas.on('mouse:move', (opt: any) => {
        // Measure tool: update active measurement preview
        if (activeToolRef.current === 'measure' && measureStartRef.current) {
          const pointer = canvas.getPointer(opt.e);
          activeMeasureRef.current = {
            start: measureStartRef.current,
            end: { x: pointer.x, y: pointer.y },
          };
          canvas.requestRenderAll();
          return;
        }

        if (!isPanning) return;
        const vpt = canvas.viewportTransform!;
        vpt[4] += opt.e.clientX - lastPosX;
        vpt[5] += opt.e.clientY - lastPosY;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
        canvas.requestRenderAll();
      });
      canvas.on('mouse:up', () => {
        // Finalize measure tool
        if (activeToolRef.current === 'measure' && measureStartRef.current && activeMeasureRef.current) {
          const { start, end } = activeMeasureRef.current;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          // Only add if dragged a meaningful distance (> 5 cm)
          if (Math.sqrt(dx * dx + dy * dy) > 5) {
            addMeasureLine(start, end);
          }
          measureStartRef.current = null;
          activeMeasureRef.current = null;
          canvas.requestRenderAll();
          return;
        }

        // Clear alignment guides on drop
        clearGuides(canvas as any);

        isPanning = false;
        if (spaceHeldRef.current) {
          // Still holding space — keep grab cursor, selection stays off
          if (containerRef.current) containerRef.current.style.cursor = 'grab';
        } else {
          canvas.selection = true;
          if (containerRef.current) containerRef.current.style.cursor = '';
        }
      });

      // ── Keyboard shortcuts ──
      const handleKeyDown = (e: KeyboardEvent) => {
        // Don't handle shortcuts if user is typing in an input
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        // Space to enter pan mode
        if (e.key === ' ' && !e.repeat) {
          e.preventDefault();
          spaceHeldRef.current = true;
          canvas.selection = false;
          canvas.forEachObject((obj: any) => {
            if (!obj._isEditHandle && !obj._isBgImage) {
              obj.set('evented', false);
            }
          });
          if (containerRef.current) containerRef.current.style.cursor = 'grab';
          return;
        }

        // Arrow keys to pan viewport
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const step = e.shiftKey ? 200 : 50;
          const vpt = canvas.viewportTransform!;
          if (e.key === 'ArrowUp') vpt[5] += step;
          if (e.key === 'ArrowDown') vpt[5] -= step;
          if (e.key === 'ArrowLeft') vpt[4] += step;
          if (e.key === 'ArrowRight') vpt[4] -= step;
          canvas.requestRenderAll();
          return;
        }

        // Tool shortcuts
        if (e.key === 'v' || e.key === 'V') {
          useUIStore.getState().setActiveTool('select');
          return;
        }
        if (e.key === 'm' || e.key === 'M') {
          const current = useUIStore.getState().activeTool;
          useUIStore.getState().setActiveTool(current === 'measure' ? 'select' : 'measure');
          return;
        }

        // Escape exits edit mode, calibration, or measure tool
        if (e.key === 'Escape') {
          if (activeToolRef.current === 'measure') {
            // Cancel in-progress measurement
            measureStartRef.current = null;
            activeMeasureRef.current = null;
            useUIStore.getState().setActiveTool('select');
            canvas.requestRenderAll();
            return;
          }
          if (calibratePhaseRef.current !== 'idle') {
            useUIStore.getState().cancelCalibration();
            return;
          }
          if (isEditing()) {
            exitEditMode();
            useCanvasStore.getState().setEditingObjectId(null);
            useCanvasStore.getState().saveUndoState();
            canvas.requestRenderAll();
            return;
          }
        }

        // Delete selected
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (isEditing()) return;
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
        // Copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
          e.preventDefault();
          const activeObj = canvas.getActiveObject();
          if (activeObj) {
            activeObj.clone((cloned: any) => {
              clipboardRef.current = cloned;
            }, CUSTOM_PROPS);
          }
        }
        // Paste
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
          e.preventDefault();
          if (!clipboardRef.current) return;
          clipboardRef.current.clone((cloned: any) => {
            canvas.discardActiveObject();
            cloned.set({
              left: (cloned.left || 0) + 20,
              top: (cloned.top || 0) + 20,
              evented: true,
            });
            if (cloned.type === 'activeSelection') {
              cloned.canvas = canvas;
              cloned.forEachObject((obj: any) => {
                obj.itemUniqueId = uuidv4();
                canvas.add(obj);
              });
              cloned.setCoords();
            } else {
              cloned.itemUniqueId = uuidv4();
              canvas.add(cloned);
            }
            // Shift clipboard so next paste offsets further
            clipboardRef.current.set({
              left: (clipboardRef.current.left || 0) + 20,
              top: (clipboardRef.current.top || 0) + 20,
            });
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
            saveUndoState();
            syncObjectsFromCanvas();
          }, CUSTOM_PROPS);
        }
        // Duplicate
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
          e.preventDefault();
          const activeObj = canvas.getActiveObject();
          if (!activeObj) return;
          activeObj.clone((cloned: any) => {
            canvas.discardActiveObject();
            cloned.set({
              left: (cloned.left || 0) + 20,
              top: (cloned.top || 0) + 20,
              evented: true,
            });
            if (cloned.type === 'activeSelection') {
              cloned.canvas = canvas;
              cloned.forEachObject((obj: any) => {
                obj.itemUniqueId = uuidv4();
                canvas.add(obj);
              });
              cloned.setCoords();
            } else {
              cloned.itemUniqueId = uuidv4();
              canvas.add(cloned);
            }
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
            saveUndoState();
            syncObjectsFromCanvas();
          }, CUSTOM_PROPS);
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === ' ') {
          spaceHeldRef.current = false;
          const measuring = activeToolRef.current === 'measure';
          canvas.selection = !measuring;
          canvas.forEachObject((obj: any) => {
            if (!obj._isEditHandle && !obj._isBgImage) {
              obj.set('evented', !measuring);
            }
          });
          if (containerRef.current) {
            containerRef.current.style.cursor = measuring ? 'crosshair' : '';
          }
        }
      };
      document.addEventListener('keyup', handleKeyUp);

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
        document.removeEventListener('keyup', handleKeyUp);
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

  // Re-render when grid/unit/gridSize changes
  useEffect(() => {
    fabricRef.current?.requestRenderAll();
  }, [gridVisible, unit, gridSize]);

  // Sync zoom from store to canvas (toolbar zoom buttons)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const currentZoom = canvas.getZoom();
    if (Math.abs(currentZoom - zoom) > 0.001) {
      const center = canvas.getCenter();
      canvas.zoomToPoint({ x: center.left, y: center.top } as any, zoom);
      canvas.requestRenderAll();
    }
  }, [zoom]);

  // ── Background image sync ──
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    import('fabric').then(({ fabric }) => {
      // Remove existing background image object
      const existing = canvas.getObjects().find((o: any) => o._isBgImage === BG_IMAGE_KEY);
      if (existing) {
        canvas.remove(existing);
      }

      if (!backgroundImage || !backgroundImage.visible) {
        canvas.requestRenderAll();
        return;
      }

      fabric.Image.fromURL(backgroundImage.src, (img: any) => {
        if (!img) return;
        img.set({
          left: backgroundImage.x,
          top: backgroundImage.y,
          scaleX: backgroundImage.scale,
          scaleY: backgroundImage.scale,
          opacity: backgroundImage.opacity,
          selectable: false,
          evented: false,
          excludeFromExport: true,
          _isBgImage: BG_IMAGE_KEY,
        });

        canvas.add(img);
        canvas.sendToBack(img);
        canvas.requestRenderAll();
      }, { crossOrigin: 'anonymous' });
    });
  }, [backgroundImage]);

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

  const isCalibrating = calibratePhase !== 'idle';
  const isMeasuring = activeTool === 'measure';

  // Disable fabric selection when in measure mode
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.selection = !isMeasuring;
    canvas.forEachObject((obj: any) => {
      if (!obj._isEditHandle && !obj._isBgImage) {
        obj.set('evented', !isMeasuring);
      }
    });
    canvas.requestRenderAll();
  }, [isMeasuring]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 relative overflow-hidden bg-cream ${isCalibrating || isMeasuring ? 'cursor-crosshair' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <canvas ref={canvasRef} />
      {/* Zoom indicator */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs text-text-secondary select-none">
        {Math.round(zoom * 100)}%
      </div>
      {/* Measure mode indicator */}
      {isMeasuring && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-full shadow select-none">
          Click & drag to measure · Right-click label to delete · ESC to exit
        </div>
      )}
      {/* Edit mode indicator */}
      {editingObjectId && !isMeasuring && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-terra/90 text-white text-xs px-3 py-1.5 rounded-full shadow select-none">
          Editing points — Dbl-click point to toggle curve · ESC to finish
        </div>
      )}
      {/* Calibration mode indicator */}
      {calibratePhase === 'pick-start' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-full shadow select-none">
          Click the start of a known distance on the image · ESC to cancel
        </div>
      )}
      {calibratePhase === 'pick-end' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-full shadow select-none">
          Click the end of the known distance · ESC to cancel
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
    fill: '#CCCCCC',
    stroke: '#999999',
    strokeWidth: 1,
    originX: 'left',
    originY: 'top',
  });

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

  if (item.patternSvg && item.patternWidth && item.patternHeight) {
    createFabricPattern(
      fabric,
      item.patternSvg,
      item.patternWidth,
      item.patternHeight,
      0,
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
