import { fabric } from 'fabric';
import { UnitSystem } from '@/types/project';
import { cmToDisplay } from '@/lib/units';

/** Tag to identify measurement line objects */
const MEASURE_TAG = '__landscaper_measure__';

/** Style constants */
const LINE_COLOR = '#3B82F6';
const LABEL_BG = '#3B82F6';
const LABEL_TEXT = '#FFFFFF';
const ENDPOINT_RADIUS = 4;
const ARROW_SIZE = 8;

export interface MeasurePoint {
  x: number;
  y: number;
}

export interface MeasureLine {
  id: string;
  start: MeasurePoint;
  end: MeasurePoint;
}

let measureLines: MeasureLine[] = [];
let nextId = 1;

/**
 * Add a completed measurement line.
 */
export function addMeasureLine(start: MeasurePoint, end: MeasurePoint): MeasureLine {
  const line: MeasureLine = { id: `measure-${nextId++}`, start, end };
  measureLines.push(line);
  return line;
}

/**
 * Remove a specific measurement line by ID.
 */
export function removeMeasureLine(id: string): void {
  measureLines = measureLines.filter((l) => l.id !== id);
}

/**
 * Clear all measurement lines.
 */
export function clearAllMeasureLines(): void {
  measureLines = [];
}

/**
 * Get all current measurement lines.
 */
export function getMeasureLines(): MeasureLine[] {
  return measureLines;
}

/**
 * Calculate the distance between two points in cm.
 */
export function getDistanceCm(start: MeasurePoint, end: MeasurePoint): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Draw all measurement lines and the active (in-progress) measurement.
 * Call from after:render so lines appear on top of objects.
 */
export function drawMeasurements(
  canvas: fabric.Canvas,
  unit: UnitSystem,
  activeMeasure: { start: MeasurePoint; end: MeasurePoint } | null,
): void {
  const ctx = canvas.getContext() as CanvasRenderingContext2D;
  if (!ctx) return;

  const vpt = canvas.viewportTransform;
  if (!vpt) return;

  const zoom = canvas.getZoom();

  ctx.save();

  // Draw persisted measurement lines
  for (const line of measureLines) {
    drawSingleMeasurement(ctx, vpt, zoom, line.start, line.end, unit, false);
  }

  // Draw active (in-progress) measurement
  if (activeMeasure) {
    drawSingleMeasurement(ctx, vpt, zoom, activeMeasure.start, activeMeasure.end, unit, true);
  }

  ctx.restore();
}

/**
 * Draw a single measurement line with arrows, distance label, and endpoints.
 */
function drawSingleMeasurement(
  ctx: CanvasRenderingContext2D,
  vpt: number[],
  zoom: number,
  start: MeasurePoint,
  end: MeasurePoint,
  unit: UnitSystem,
  isActive: boolean,
): void {
  // Convert canvas coords to screen coords
  const sx = start.x * zoom + vpt[4];
  const sy = start.y * zoom + vpt[5];
  const ex = end.x * zoom + vpt[4];
  const ey = end.y * zoom + vpt[5];

  const dx = ex - sx;
  const dy = ey - sy;
  const screenLen = Math.sqrt(dx * dx + dy * dy);

  if (screenLen < 2) return;

  const angle = Math.atan2(dy, dx);
  const distance = getDistanceCm(start, end);
  const label = cmToDisplay(distance, unit);

  const alpha = isActive ? 0.85 : 0.7;

  // Main line
  ctx.beginPath();
  ctx.strokeStyle = LINE_COLOR;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.moveTo(sx, sy);
  ctx.lineTo(ex, ey);
  ctx.stroke();

  // Arrow at start
  drawArrowHead(ctx, sx, sy, angle + Math.PI, ARROW_SIZE, alpha);
  // Arrow at end
  drawArrowHead(ctx, ex, ey, angle, ARROW_SIZE, alpha);

  // Endpoint circles
  ctx.globalAlpha = alpha;
  ctx.fillStyle = LINE_COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, ENDPOINT_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ex, ey, ENDPOINT_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // Label at midpoint
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;

  ctx.font = 'bold 11px Inter, system-ui, sans-serif';
  const metrics = ctx.measureText(label);
  const padX = 6;
  const padY = 3;
  const labelW = metrics.width + padX * 2;
  const labelH = 16 + padY * 2;

  // Offset label perpendicular to the line so it doesn't overlap
  const perpAngle = angle - Math.PI / 2;
  const labelOffset = 14;
  const lx = mx + Math.cos(perpAngle) * labelOffset;
  const ly = my + Math.sin(perpAngle) * labelOffset;

  // Background pill
  ctx.globalAlpha = isActive ? 0.95 : 0.85;
  ctx.fillStyle = LABEL_BG;
  ctx.beginPath();
  roundRect(ctx, lx - labelW / 2, ly - labelH / 2, labelW, labelH, 4);
  ctx.fill();

  // Text
  ctx.globalAlpha = 1;
  ctx.fillStyle = LABEL_TEXT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, lx, ly);
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  alpha: number,
): void {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = LINE_COLOR;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x - size * Math.cos(angle - Math.PI / 6),
    y - size * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    x - size * Math.cos(angle + Math.PI / 6),
    y - size * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}

/**
 * Hit test: check if a screen coordinate is near any measurement line's delete zone (label area).
 * Returns the measurement line ID if hit, null otherwise.
 */
export function hitTestMeasureLine(
  canvas: fabric.Canvas,
  screenX: number,
  screenY: number,
): string | null {
  const vpt = canvas.viewportTransform;
  if (!vpt) return null;

  const zoom = canvas.getZoom();

  for (const line of measureLines) {
    const sx = line.start.x * zoom + vpt[4];
    const sy = line.start.y * zoom + vpt[5];
    const ex = line.end.x * zoom + vpt[4];
    const ey = line.end.y * zoom + vpt[5];

    // Check proximity to the line midpoint (label area)
    const mx = (sx + ex) / 2;
    const my = (sy + ey) / 2;

    const dx = screenX - mx;
    const dy = screenY - my;

    if (Math.sqrt(dx * dx + dy * dy) < 20) {
      return line.id;
    }
  }

  return null;
}
