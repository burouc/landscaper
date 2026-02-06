export type ItemBehavior = 'proportional' | 'freeform' | 'fixed' | 'repeatable' | 'path';

export interface PathPoint {
  x: number;
  y: number;
  curve?: boolean;  // if true, incoming segment is a quadratic bezier
  cx?: number;      // control point x (for quadratic bezier)
  cy?: number;      // control point y
}

export type ItemCategory =
  | 'trees-shrubs'
  | 'ground-cover'
  | 'furniture'
  | 'structures'
  | 'lighting'
  | 'decorative';

export interface ItemPropertyDef {
  key: string;
  label: string;
  type: 'number' | 'color' | 'select';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: string }[];
  defaultValue: number | string;
}

export interface LibraryItem {
  id: string;
  name: string;
  category: ItemCategory;
  behavior: ItemBehavior;
  svgPath: string; // inline SVG markup
  defaultWidth: number;  // in cm
  defaultHeight: number; // in cm
  properties: ItemPropertyDef[];
  // For 'repeatable' behavior: pattern tile SVG and dimensions
  patternSvg?: string;
  patternWidth?: number;  // tile width in px (viewBox units)
  patternHeight?: number; // tile height in px (viewBox units)
  // For 'path' behavior: stroke settings
  defaultStrokeWidth?: number; // in cm
  defaultStrokeColor?: string;
}

export interface Category {
  id: ItemCategory;
  name: string;
  icon: string; // lucide icon name
}

export interface CanvasObjectMeta {
  id: string;
  itemId: string;
  name: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  behavior: ItemBehavior;
}
