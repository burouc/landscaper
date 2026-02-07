import { create } from 'zustand';
import { UnitSystem } from '@/types/project';
import { ItemCategory } from '@/types/items';

/** Grid size presets in display units (meters for metric, feet for imperial) */
export const METRIC_GRID_SIZES = [0.25, 0.5, 1, 2, 5];
export const IMPERIAL_GRID_SIZES = [0.5, 1, 2, 5, 10];

export interface BackgroundImageState {
  /** Data URL or object URL of the uploaded image */
  src: string;
  /** Canvas X position (cm) */
  x: number;
  /** Canvas Y position (cm) */
  y: number;
  /** Scale factor applied to the image */
  scale: number;
  /** Opacity 0-1 */
  opacity: number;
  /** Whether the background is visible */
  visible: boolean;
  /** Original image width in pixels */
  naturalWidth: number;
  /** Original image height in pixels */
  naturalHeight: number;
}

export type CalibratePhase = 'idle' | 'pick-start' | 'pick-end' | 'enter-distance';

export interface CalibrateState {
  phase: CalibratePhase;
  /** First point in canvas cm coords */
  startPoint: { x: number; y: number } | null;
  /** Second point in canvas cm coords */
  endPoint: { x: number; y: number } | null;
  /** Pixel distance between the two picked points on canvas */
  pixelDistance: number;
}

interface UIState {
  unit: UnitSystem;
  snapToGrid: boolean;
  gridVisible: boolean;
  /** Large grid spacing in display units (meters for metric, feet for imperial) */
  gridSize: number;
  zoom: number;
  selectedCategory: ItemCategory;
  librarySearch: string;

  /** Background image */
  backgroundImage: BackgroundImageState | null;
  /** Calibration tool state */
  calibrate: CalibrateState;

  setUnit: (unit: UnitSystem) => void;
  toggleSnap: () => void;
  toggleGrid: () => void;
  setGridSize: (size: number) => void;
  setZoom: (zoom: number) => void;
  setSelectedCategory: (category: ItemCategory) => void;
  setLibrarySearch: (search: string) => void;

  setBackgroundImage: (bg: BackgroundImageState | null) => void;
  updateBackgroundImage: (updates: Partial<BackgroundImageState>) => void;
  removeBackgroundImage: () => void;

  startCalibration: () => void;
  setCalibratePoint: (point: { x: number; y: number }) => void;
  setCalibrateDistance: (pixelDistance: number) => void;
  cancelCalibration: () => void;
  finishCalibration: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  unit: 'metric',
  snapToGrid: true,
  gridVisible: true,
  gridSize: 1, // 1 meter (metric) or 1 foot (imperial)
  zoom: 1,
  selectedCategory: 'trees-shrubs',
  librarySearch: '',
  backgroundImage: null,
  calibrate: {
    phase: 'idle',
    startPoint: null,
    endPoint: null,
    pixelDistance: 0,
  },

  setUnit: (unit) => {
    // Reset grid size to default for the new unit
    set({ unit, gridSize: 1 });
  },
  toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),
  setGridSize: (gridSize) => set({ gridSize }),
  setZoom: (zoom) => set({ zoom: Math.min(4, Math.max(0.25, zoom)) }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLibrarySearch: (search) => set({ librarySearch: search }),

  setBackgroundImage: (bg) => set({ backgroundImage: bg }),
  updateBackgroundImage: (updates) => {
    const current = get().backgroundImage;
    if (!current) return;
    set({ backgroundImage: { ...current, ...updates } });
  },
  removeBackgroundImage: () => set({ backgroundImage: null }),

  startCalibration: () =>
    set({
      calibrate: {
        phase: 'pick-start',
        startPoint: null,
        endPoint: null,
        pixelDistance: 0,
      },
    }),
  setCalibratePoint: (point) => {
    const { calibrate } = get();
    if (calibrate.phase === 'pick-start') {
      set({
        calibrate: { ...calibrate, phase: 'pick-end', startPoint: point },
      });
    } else if (calibrate.phase === 'pick-end') {
      const start = calibrate.startPoint!;
      const dx = point.x - start.x;
      const dy = point.y - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      set({
        calibrate: {
          ...calibrate,
          phase: 'enter-distance',
          endPoint: point,
          pixelDistance: dist,
        },
      });
    }
  },
  setCalibrateDistance: (pixelDistance) => {
    set((s) => ({
      calibrate: { ...s.calibrate, pixelDistance },
    }));
  },
  cancelCalibration: () =>
    set({
      calibrate: {
        phase: 'idle',
        startPoint: null,
        endPoint: null,
        pixelDistance: 0,
      },
    }),
  finishCalibration: () =>
    set({
      calibrate: {
        phase: 'idle',
        startPoint: null,
        endPoint: null,
        pixelDistance: 0,
      },
    }),
}));
