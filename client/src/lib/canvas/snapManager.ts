import { fabric } from 'fabric';
import { UnitSystem } from '@/types/project';
import { getGridConfig } from '@/lib/units';

/**
 * Snap an object's position to the nearest grid intersection.
 */
export function snapToGrid(
  obj: fabric.Object,
  unit: UnitSystem,
  gridSize?: number,
) {
  const { smallStep } = getGridConfig(unit, gridSize);

  const left = obj.left ?? 0;
  const top = obj.top ?? 0;

  obj.set({
    left: Math.round(left / smallStep) * smallStep,
    top: Math.round(top / smallStep) * smallStep,
  });
}

/**
 * Snap object dimensions during scaling.
 */
export function snapScaleToGrid(
  obj: fabric.Object,
  unit: UnitSystem,
  gridSize?: number,
) {
  const { smallStep } = getGridConfig(unit, gridSize);

  const w = (obj.width ?? 1) * (obj.scaleX ?? 1);
  const h = (obj.height ?? 1) * (obj.scaleY ?? 1);

  const snappedW = Math.max(smallStep, Math.round(w / smallStep) * smallStep);
  const snappedH = Math.max(smallStep, Math.round(h / smallStep) * smallStep);

  obj.set({
    scaleX: snappedW / (obj.width ?? 1),
    scaleY: snappedH / (obj.height ?? 1),
  });
}
