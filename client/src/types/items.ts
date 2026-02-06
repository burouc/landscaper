export type ItemBehavior = 'proportional' | 'freeform' | 'fixed';

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
