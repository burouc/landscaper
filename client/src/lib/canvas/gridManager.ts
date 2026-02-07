import { fabric } from 'fabric';
import { UnitSystem } from '@/types/project';
import { getGridConfig } from '@/lib/units';

/**
 * Pixel-per-cm base ratio.  At zoom=1, 1 cm = 1 px on the canvas.
 * This makes math simple: a 100cm object is 100px wide at zoom 1.
 */
export const PX_PER_CM = 1;

/**
 * Draw a measurement grid behind all objects on the fabric canvas.
 * Call this inside canvas.on('after:render') using destination-over
 * composite so the grid is drawn *behind* objects.
 */
export function drawGrid(
  canvas: fabric.Canvas,
  unit: UnitSystem,
  gridVisible: boolean,
  gridSize?: number,
) {
  if (!gridVisible) return;

  const ctx = canvas.getContext() as CanvasRenderingContext2D;
  if (!ctx) return;

  const vpt = canvas.viewportTransform;
  if (!vpt) return;

  const zoom = canvas.getZoom();
  const { smallStep, largeStep } = getGridConfig(unit, gridSize);

  // Convert step sizes to screen pixels
  const smallPx = smallStep * zoom;
  const largePx = largeStep * zoom;

  // Viewport offset (pan)
  const offsetX = vpt[4];
  const offsetY = vpt[5];

  const width = canvas.getWidth();
  const height = canvas.getHeight();

  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';

  // Only draw small grid if lines are >= 8px apart
  if (smallPx >= 8) {
    ctx.beginPath();
    ctx.strokeStyle = '#ECEAE6';
    ctx.lineWidth = 0.5;

    const startX = Math.floor(-offsetX / smallPx) * smallPx + offsetX;
    const startY = Math.floor(-offsetY / smallPx) * smallPx + offsetY;

    for (let x = startX; x < width; x += smallPx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = startY; y < height; y += smallPx) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  // Large grid (always drawn)
  if (largePx >= 4) {
    ctx.beginPath();
    ctx.strokeStyle = '#DDD8D2';
    ctx.lineWidth = 1;

    const startX = Math.floor(-offsetX / largePx) * largePx + offsetX;
    const startY = Math.floor(-offsetY / largePx) * largePx + offsetY;

    for (let x = startX; x < width; x += largePx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = startY; y < height; y += largePx) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  // White background behind everything
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}
