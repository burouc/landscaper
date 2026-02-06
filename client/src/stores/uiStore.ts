import { create } from 'zustand';
import { UnitSystem } from '@/types/project';
import { ItemCategory } from '@/types/items';

interface UIState {
  unit: UnitSystem;
  snapToGrid: boolean;
  gridVisible: boolean;
  zoom: number;
  selectedCategory: ItemCategory;
  librarySearch: string;

  setUnit: (unit: UnitSystem) => void;
  toggleSnap: () => void;
  toggleGrid: () => void;
  setZoom: (zoom: number) => void;
  setSelectedCategory: (category: ItemCategory) => void;
  setLibrarySearch: (search: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  unit: 'metric',
  snapToGrid: true,
  gridVisible: true,
  zoom: 1,
  selectedCategory: 'trees-shrubs',
  librarySearch: '',

  setUnit: (unit) => set({ unit }),
  toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),
  setZoom: (zoom) => set({ zoom: Math.min(4, Math.max(0.25, zoom)) }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setLibrarySearch: (search) => set({ librarySearch: search }),
}));
