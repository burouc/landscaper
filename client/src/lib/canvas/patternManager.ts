import { PathPoint } from '@/types/items';

/**
 * Create a Fabric.js pattern from an SVG string tile.
 * The pattern tiles infinitely and can be rotated via angleDeg.
 */
export function createFabricPattern(
  fabric: any,
  svgString: string,
  tileWidth: number,
  tileHeight: number,
  angleDeg: number,
  callback: (pattern: any) => void,
): void {
  const dataUri =
    'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

  const img = new Image();
  img.onload = () => {
    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const pattern = new fabric.Pattern({
      source: img,
      repeat: 'repeat',
      patternTransform: [cos, sin, -sin, cos, 0, 0],
    });
    callback(pattern);
  };
  img.src = dataUri;
}

/**
 * Convert an array of PathPoints into a fabric.Path "d" string.
 * If `closed` is true, appends Z to close the shape.
 */
export function pathPointsToPathString(points: PathPoint[], closed: boolean): string {
  if (points.length === 0) return 'M 0 0';
  const parts: string[] = [];

  parts.push(`M ${points[0].x} ${points[0].y}`);

  for (let i = 1; i < points.length; i++) {
    const pt = points[i];
    if (pt.curve && pt.cx !== undefined && pt.cy !== undefined) {
      parts.push(`Q ${pt.cx} ${pt.cy} ${pt.x} ${pt.y}`);
    } else {
      parts.push(`L ${pt.x} ${pt.y}`);
    }
  }

  if (closed) {
    // Close back to first point, with optional curve
    const first = points[0];
    if (first.curve && first.cx !== undefined && first.cy !== undefined) {
      parts.push(`Q ${first.cx} ${first.cy} ${first.x} ${first.y}`);
    }
    parts.push('Z');
  }

  return parts.join(' ');
}

/**
 * Generate default rectangular path points for a repeatable item.
 */
export function defaultRectPoints(width: number, height: number): PathPoint[] {
  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}

/**
 * Generate default straight-line path points for a path item.
 */
export function defaultLinePoints(length: number): PathPoint[] {
  return [
    { x: 0, y: 0 },
    { x: length, y: 0 },
  ];
}

/**
 * Rebuild a fabric.Path "d" string from stored points and update the object.
 * Also repositions the object to maintain its visual position after path changes.
 */
export function updatePathFromPoints(
  fabric: any,
  obj: any,
  points: PathPoint[],
  closed: boolean,
): void {
  const oldLeft = obj.left ?? 0;
  const oldTop = obj.top ?? 0;
  const oldPathOffset = { x: obj.pathOffset?.x ?? 0, y: obj.pathOffset?.y ?? 0 };

  const pathString = pathPointsToPathString(points, closed);
  const tempPath = new fabric.Path(pathString);

  // Update path data
  obj.set('path', tempPath.path);
  obj.set('width', tempPath.width);
  obj.set('height', tempPath.height);
  obj.set('pathOffset', { x: tempPath.pathOffset.x, y: tempPath.pathOffset.y });

  // Maintain visual position
  obj.set({
    left: oldLeft + (oldPathOffset.x - tempPath.pathOffset.x),
    top: oldTop + (oldPathOffset.y - tempPath.pathOffset.y),
  });

  obj.setCoords();
  obj.dirty = true;
}
