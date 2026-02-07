import { UnitSystem } from '@/types/project';

// Base unit is always cm internally.
// Display converts to the selected unit system.

export interface GridConfig {
  /** Small grid spacing in cm */
  smallStep: number;
  /** Large grid spacing in cm */
  largeStep: number;
  /** Label for small steps */
  smallLabel: string;
  /** Label for large steps */
  largeLabel: string;
}

const METRIC_GRID: GridConfig = {
  smallStep: 10,     // 10 cm
  largeStep: 100,    // 1 m
  smallLabel: 'cm',
  largeLabel: 'm',
};

const IMPERIAL_GRID: GridConfig = {
  smallStep: 15.24,  // 6 inches in cm
  largeStep: 30.48,  // 1 foot in cm
  smallLabel: 'in',
  largeLabel: 'ft',
};

/**
 * Get grid config for the given unit system and optional custom grid size.
 * @param unit - 'metric' or 'imperial'
 * @param gridSize - Large grid spacing in display units (meters or feet). Defaults to 1.
 */
export function getGridConfig(unit: UnitSystem, gridSize?: number): GridConfig {
  if (!gridSize || gridSize <= 0) {
    return unit === 'metric' ? METRIC_GRID : IMPERIAL_GRID;
  }

  if (unit === 'metric') {
    const largeCm = gridSize * 100; // meters to cm
    return {
      smallStep: largeCm / 10,
      largeStep: largeCm,
      smallLabel: 'cm',
      largeLabel: 'm',
    };
  } else {
    const largeCm = gridSize * 30.48; // feet to cm
    return {
      smallStep: largeCm / 10,
      largeStep: largeCm,
      smallLabel: 'in',
      largeLabel: 'ft',
    };
  }
}

export function cmToDisplay(cm: number, unit: UnitSystem): string {
  if (unit === 'metric') {
    if (cm >= 100) return `${(cm / 100).toFixed(1)}m`;
    return `${Math.round(cm)}cm`;
  }
  const inches = cm / 2.54;
  if (inches >= 12) {
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return remainingInches > 0 ? `${feet}'${remainingInches}"` : `${feet}'`;
  }
  return `${Math.round(inches)}"`;
}

export function displayToCm(value: number, unit: UnitSystem, subUnit: 'small' | 'large' = 'small'): number {
  if (unit === 'metric') {
    return subUnit === 'large' ? value * 100 : value;
  }
  return subUnit === 'large' ? value * 30.48 : value * 2.54;
}
