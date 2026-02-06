import { PathPoint } from '@/types/items';
import { pathPointsToPathString, updatePathFromPoints } from './patternManager';

const POINT_RADIUS = 6;
const CONTROL_RADIUS = 4;
const POINT_COLOR = '#C4785C';
const CONTROL_COLOR = '#5B9BD5';
const CONTROL_LINE_COLOR = '#5B9BD5';

interface EditState {
  targetObj: any;
  points: PathPoint[];
  closed: boolean;
  handles: any[];       // fabric circles for vertices
  controlHandles: any[];// fabric circles for curve control points
  controlLines: any[];  // fabric lines from vertex to control point
  canvas: any;
  fabric: any;
  onUpdate?: () => void;
}

let currentEdit: EditState | null = null;

/**
 * Enter point-editing mode for a path/repeatable object.
 * Creates draggable circle handles on each vertex and control point.
 */
export function enterEditMode(
  fabric: any,
  canvas: any,
  obj: any,
  onUpdate?: () => void,
): void {
  exitEditMode();

  const points: PathPoint[] = JSON.parse(JSON.stringify(obj.itemPathPoints || []));
  const closed: boolean = obj.itemBehavior === 'repeatable';

  currentEdit = {
    targetObj: obj,
    points,
    closed,
    handles: [],
    controlHandles: [],
    controlLines: [],
    canvas,
    fabric,
    onUpdate,
  };

  // Deselect the main object so handles can be interacted with
  canvas.discardActiveObject();
  obj.selectable = false;
  obj.evented = false;

  rebuildHandles();
  canvas.requestRenderAll();
}

/**
 * Exit point-editing mode, removing all handles from canvas.
 */
export function exitEditMode(): void {
  if (!currentEdit) return;
  const { canvas, targetObj, handles, controlHandles, controlLines } = currentEdit;

  // Remove all edit handles
  [...handles, ...controlHandles, ...controlLines].forEach((h) => {
    canvas.remove(h);
  });

  // Re-enable selection on main object
  targetObj.selectable = true;
  targetObj.evented = true;

  currentEdit = null;
  canvas.requestRenderAll();
}

/**
 * Check if currently in edit mode.
 */
export function isEditing(): boolean {
  return currentEdit !== null;
}

/**
 * Get the object currently being edited.
 */
export function getEditingObject(): any | null {
  return currentEdit?.targetObj ?? null;
}

/**
 * Toggle a point between line and curve mode.
 */
export function togglePointCurve(pointIndex: number): void {
  if (!currentEdit || pointIndex < 0 || pointIndex >= currentEdit.points.length) return;
  const pt = currentEdit.points[pointIndex];

  if (pt.curve) {
    // Switch to line
    pt.curve = false;
    delete pt.cx;
    delete pt.cy;
  } else {
    // Switch to curve: place control point at midpoint to previous point
    const prevIdx = pointIndex === 0
      ? (currentEdit.closed ? currentEdit.points.length - 1 : 0)
      : pointIndex - 1;
    const prev = currentEdit.points[prevIdx];
    pt.curve = true;
    pt.cx = (prev.x + pt.x) / 2;
    pt.cy = (prev.y + pt.y) / 2;
  }

  applyPointsToObject();
  rebuildHandles();
}

/**
 * Add a new point after the given index.
 * The new point is placed at the midpoint between index and the next point.
 */
export function addPointAfter(pointIndex: number): void {
  if (!currentEdit) return;
  const { points, closed } = currentEdit;
  const nextIdx = (pointIndex + 1) % points.length;

  // For non-closed paths, don't wrap around from last to first
  if (!closed && pointIndex >= points.length - 1) {
    // Add at the end, extending the path
    const last = points[points.length - 1];
    points.push({ x: last.x + 50, y: last.y });
  } else {
    const curr = points[pointIndex];
    const next = points[nextIdx];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    points.splice(pointIndex + 1, 0, { x: midX, y: midY });
  }

  applyPointsToObject();
  rebuildHandles();
}

/**
 * Remove a point at the given index (minimum 2 points for path, 3 for closed).
 */
export function removePoint(pointIndex: number): void {
  if (!currentEdit) return;
  const { points, closed } = currentEdit;
  const minPoints = closed ? 3 : 2;
  if (points.length <= minPoints) return;

  points.splice(pointIndex, 1);
  applyPointsToObject();
  rebuildHandles();
}

/**
 * Get current points being edited.
 */
export function getEditPoints(): PathPoint[] | null {
  return currentEdit?.points ?? null;
}

// ── Internal helpers ──

function applyPointsToObject(): void {
  if (!currentEdit) return;
  const { fabric: fab, targetObj, points, closed, onUpdate } = currentEdit;

  // Save points on the object for serialization
  targetObj.itemPathPoints = JSON.parse(JSON.stringify(points));

  updatePathFromPoints(fab, targetObj, points, closed);
  currentEdit.canvas.requestRenderAll();
  onUpdate?.();
}

function getWorldCoord(pt: { x: number; y: number }): { x: number; y: number } {
  if (!currentEdit) return pt;
  const obj = currentEdit.targetObj;
  const pathOffset = obj.pathOffset || { x: 0, y: 0 };
  // Transform point from path-local coords to canvas world coords
  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  return {
    x: left + pt.x - pathOffset.x,
    y: top + pt.y - pathOffset.y,
  };
}

function getLocalCoord(worldPt: { x: number; y: number }): { x: number; y: number } {
  if (!currentEdit) return worldPt;
  const obj = currentEdit.targetObj;
  const pathOffset = obj.pathOffset || { x: 0, y: 0 };
  const left = obj.left ?? 0;
  const top = obj.top ?? 0;
  return {
    x: worldPt.x - left + pathOffset.x,
    y: worldPt.y - top + pathOffset.y,
  };
}

function rebuildHandles(): void {
  if (!currentEdit) return;
  const { canvas, fabric: fab, handles, controlHandles, controlLines, points } = currentEdit;

  // Remove existing handles
  [...handles, ...controlHandles, ...controlLines].forEach((h) => canvas.remove(h));
  currentEdit.handles = [];
  currentEdit.controlHandles = [];
  currentEdit.controlLines = [];

  // Create vertex handles
  points.forEach((pt, idx) => {
    const world = getWorldCoord(pt);
    const circle = new fab.Circle({
      left: world.x,
      top: world.y,
      radius: POINT_RADIUS,
      fill: POINT_COLOR,
      stroke: '#FFFFFF',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      selectable: true,
      evented: true,
      hoverCursor: 'move',
    });
    (circle as any)._isEditHandle = true;
    (circle as any)._editPointIndex = idx;
    (circle as any)._editPointType = 'vertex';

    circle.on('moving', () => {
      const local = getLocalCoord({ x: circle.left!, y: circle.top! });
      points[idx].x = local.x;
      points[idx].y = local.y;
      applyPointsToObject();
      updateControlHandlePositions();
    });

    circle.on('mousedblclick', () => {
      togglePointCurve(idx);
    });

    circle.on('mousedown', (e: any) => {
      // Right-click to toggle curve
      if (e.e?.button === 2) {
        e.e.preventDefault();
        togglePointCurve(idx);
      }
    });

    canvas.add(circle);
    currentEdit!.handles.push(circle);

    // If this point has a curve control, add control handle
    if (pt.curve && pt.cx !== undefined && pt.cy !== undefined) {
      const ctrlWorld = getWorldCoord({ x: pt.cx, y: pt.cy });

      // Line from control point to vertex
      const line = new fab.Line(
        [ctrlWorld.x, ctrlWorld.y, world.x, world.y],
        {
          stroke: CONTROL_LINE_COLOR,
          strokeWidth: 1,
          strokeDashArray: [3, 3],
          selectable: false,
          evented: false,
          opacity: 0.6,
        },
      );
      (line as any)._isEditHandle = true;
      canvas.add(line);
      currentEdit!.controlLines.push(line);

      const ctrlCircle = new fab.Circle({
        left: ctrlWorld.x,
        top: ctrlWorld.y,
        radius: CONTROL_RADIUS,
        fill: CONTROL_COLOR,
        stroke: '#FFFFFF',
        strokeWidth: 1.5,
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        selectable: true,
        evented: true,
        hoverCursor: 'move',
      });
      (ctrlCircle as any)._isEditHandle = true;
      (ctrlCircle as any)._editPointIndex = idx;
      (ctrlCircle as any)._editPointType = 'control';
      (ctrlCircle as any)._controlLine = line;

      ctrlCircle.on('moving', () => {
        const local = getLocalCoord({ x: ctrlCircle.left!, y: ctrlCircle.top! });
        points[idx].cx = local.x;
        points[idx].cy = local.y;
        // Update the control line
        const vWorld = getWorldCoord(points[idx]);
        line.set({ x1: ctrlCircle.left, y1: ctrlCircle.top, x2: vWorld.x, y2: vWorld.y });
        applyPointsToObject();
      });

      canvas.add(ctrlCircle);
      currentEdit!.controlHandles.push(ctrlCircle);
    }
  });
}

function updateControlHandlePositions(): void {
  if (!currentEdit) return;
  const { points, controlHandles, controlLines } = currentEdit;

  // Update control handle and line positions when vertices move
  controlHandles.forEach((ch) => {
    const idx = (ch as any)._editPointIndex;
    const pt = points[idx];
    if (pt && pt.curve && pt.cx !== undefined && pt.cy !== undefined) {
      const ctrlWorld = getWorldCoord({ x: pt.cx, y: pt.cy });
      ch.set({ left: ctrlWorld.x, top: ctrlWorld.y });
      ch.setCoords();

      const line = (ch as any)._controlLine;
      if (line) {
        const vWorld = getWorldCoord(pt);
        line.set({ x1: ctrlWorld.x, y1: ctrlWorld.y, x2: vWorld.x, y2: vWorld.y });
      }
    }
  });
}
