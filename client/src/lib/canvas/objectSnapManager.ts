import { fabric } from 'fabric';

/** Threshold in screen pixels for snapping to trigger */
const SNAP_THRESHOLD = 8;

/** Color for alignment guide lines */
const GUIDE_COLOR = '#FF6B9D';
const GUIDE_DASH = [4, 4];

export interface SnapGuide {
  orientation: 'horizontal' | 'vertical';
  /** Position in canvas coordinates */
  position: number;
}

export interface SnapResult {
  /** Corrected left position (or undefined if no horizontal snap) */
  left?: number;
  /** Corrected top position (or undefined if no vertical snap) */
  top?: number;
  /** Guide lines to draw */
  guides: SnapGuide[];
}

/**
 * Get the bounding edges and center of a fabric object in canvas coordinates.
 */
function getObjectEdges(obj: fabric.Object) {
  const bound = obj.getBoundingRect(true, true);
  return {
    left: bound.left,
    right: bound.left + bound.width,
    top: bound.top,
    centerX: bound.left + bound.width / 2,
    bottom: bound.top + bound.height,
    centerY: bound.top + bound.height / 2,
    width: bound.width,
    height: bound.height,
  };
}

/**
 * Calculate snap adjustments for a moving object against all other objects.
 * Returns corrected position and guide lines to render.
 */
export function calculateObjectSnap(
  canvas: fabric.Canvas,
  movingObj: fabric.Object,
): SnapResult {
  const zoom = canvas.getZoom();
  const threshold = SNAP_THRESHOLD / zoom;
  const guides: SnapGuide[] = [];

  const moving = getObjectEdges(movingObj);

  // Collect edges from all other non-moving, visible, non-background objects
  const verticalEdges: number[] = [];   // x positions to snap to
  const horizontalEdges: number[] = []; // y positions to snap to

  const activeIds = new Set(
    canvas.getActiveObjects().map((o: any) => o.itemUniqueId),
  );

  for (const obj of canvas.getObjects()) {
    const o = obj as any;
    if (activeIds.has(o.itemUniqueId)) continue;
    if (o._isEditHandle || o._isBgImage) continue;
    if (!obj.visible) continue;

    const edges = getObjectEdges(obj);
    verticalEdges.push(edges.left, edges.right, edges.centerX);
    horizontalEdges.push(edges.top, edges.bottom, edges.centerY);
  }

  let snapLeft: number | undefined;
  let snapTop: number | undefined;
  let bestDx = threshold + 1;
  let bestDy = threshold + 1;

  // Check vertical alignment (x-axis snap)
  const movingXPoints = [
    { value: moving.left, offset: 0 },
    { value: moving.right, offset: moving.width },
    { value: moving.centerX, offset: moving.width / 2 },
  ];

  for (const target of verticalEdges) {
    for (const mp of movingXPoints) {
      const dx = Math.abs(mp.value - target);
      if (dx < bestDx) {
        bestDx = dx;
        snapLeft = (movingObj.left ?? 0) + (target - mp.value);
        // Clear and set the guide
        guides.length = 0;
        guides.push({ orientation: 'vertical', position: target });
      } else if (Math.abs(dx - bestDx) < 0.5 && dx < threshold) {
        guides.push({ orientation: 'vertical', position: target });
      }
    }
  }

  // If no vertical snap found within threshold, discard
  if (bestDx > threshold) {
    snapLeft = undefined;
    // Remove vertical guides
    for (let i = guides.length - 1; i >= 0; i--) {
      if (guides[i].orientation === 'vertical') guides.splice(i, 1);
    }
  }

  // Check horizontal alignment (y-axis snap)
  const movingYPoints = [
    { value: moving.top, offset: 0 },
    { value: moving.bottom, offset: moving.height },
    { value: moving.centerY, offset: moving.height / 2 },
  ];

  for (const target of horizontalEdges) {
    for (const mp of movingYPoints) {
      const dy = Math.abs(mp.value - target);
      if (dy < bestDy) {
        bestDy = dy;
        snapTop = (movingObj.top ?? 0) + (target - mp.value);
        guides.push({ orientation: 'horizontal', position: target });
      } else if (Math.abs(dy - bestDy) < 0.5 && dy < threshold) {
        guides.push({ orientation: 'horizontal', position: target });
      }
    }
  }

  if (bestDy > threshold) {
    snapTop = undefined;
    for (let i = guides.length - 1; i >= 0; i--) {
      if (guides[i].orientation === 'horizontal') guides.splice(i, 1);
    }
  }

  return { left: snapLeft, top: snapTop, guides };
}

/** Active guides to draw on the overlay canvas */
let activeGuides: SnapGuide[] = [];

/**
 * Apply object snap during object:moving and store guides for rendering.
 */
export function applyObjectSnap(canvas: fabric.Canvas, target: fabric.Object): void {
  const result = calculateObjectSnap(canvas, target);

  if (result.left !== undefined) {
    target.set('left', result.left);
  }
  if (result.top !== undefined) {
    target.set('top', result.top);
  }

  activeGuides = result.guides;
  canvas.requestRenderAll();
}

/**
 * Clear all guide lines (call on mouse:up or object:modified).
 */
export function clearGuides(canvas: fabric.Canvas): void {
  activeGuides = [];
  canvas.requestRenderAll();
}

/**
 * Draw alignment guide lines on the canvas.
 * Call this from after:render to draw guides on top of objects.
 */
export function drawAlignmentGuides(canvas: fabric.Canvas): void {
  if (activeGuides.length === 0) return;

  const ctx = canvas.getContext() as CanvasRenderingContext2D;
  if (!ctx) return;

  const vpt = canvas.viewportTransform;
  if (!vpt) return;

  const zoom = canvas.getZoom();
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  ctx.save();
  ctx.strokeStyle = GUIDE_COLOR;
  ctx.lineWidth = 1;
  ctx.setLineDash(GUIDE_DASH);

  for (const guide of activeGuides) {
    ctx.beginPath();
    if (guide.orientation === 'vertical') {
      const screenX = guide.position * zoom + vpt[4];
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, height);
    } else {
      const screenY = guide.position * zoom + vpt[5];
      ctx.moveTo(0, screenY);
      ctx.lineTo(width, screenY);
    }
    ctx.stroke();
  }

  ctx.restore();
}
