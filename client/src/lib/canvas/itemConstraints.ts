import { fabric } from 'fabric';
import { ItemBehavior } from '@/types/items';

/**
 * Apply transform constraints based on item behavior type.
 *
 * - proportional: uniform scaling only (locked aspect ratio)
 * - freeform: free width/height scaling
 * - fixed: no scaling, rotation only
 */
export function applyConstraints(obj: fabric.Object, behavior: ItemBehavior) {
  // Common settings
  obj.set({
    cornerColor: '#C4785C',
    cornerStrokeColor: '#A8604A',
    cornerStyle: 'circle',
    cornerSize: 8,
    transparentCorners: false,
    borderColor: '#C4785C',
    borderScaleFactor: 1.5,
    padding: 4,
  });

  switch (behavior) {
    case 'proportional':
      obj.set({
        lockUniScaling: true,
        lockSkewingX: true,
        lockSkewingY: true,
      });
      // Hide middle controls, keep corners + rotation
      obj.setControlsVisibility({
        mt: false, // middle top
        mb: false, // middle bottom
        ml: false, // middle left
        mr: false, // middle right
        mtr: true, // rotation
      });
      break;

    case 'freeform':
      obj.set({
        lockUniScaling: false,
        lockSkewingX: true,
        lockSkewingY: true,
      });
      obj.setControlsVisibility({
        mt: true,
        mb: true,
        ml: true,
        mr: true,
        mtr: true,
      });
      break;

    case 'fixed':
      obj.set({
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
      });
      obj.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false,
        br: false,
        mtr: true, // only rotation
      });
      break;

    case 'repeatable':
      // Repeatable items use path shapes with pattern fill.
      // No scaling via handles — shape is edited by moving path points.
      // Allow rotation and movement.
      obj.set({
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
      });
      obj.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false,
        br: false,
        mtr: true,
      });
      break;

    case 'path':
      // Path items are stroked lines — no scaling, shape edited via path points.
      // Allow rotation and movement.
      obj.set({
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,
      });
      obj.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false,
        br: false,
        mtr: true,
      });
      break;
  }
}
