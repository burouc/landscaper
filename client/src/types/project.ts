export interface Project {
  id: string;
  name: string;
  canvasJSON: string; // fabric.js serialized canvas
  unit: 'metric' | 'imperial';
  width: number;  // plan width in cm
  height: number; // plan height in cm
  createdAt: string;
  updatedAt: string;
}

export type UnitSystem = 'metric' | 'imperial';
