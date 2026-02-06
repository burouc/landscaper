export interface Project {
  id: string;
  name: string;
  canvasJSON: string;
  unit: 'metric' | 'imperial';
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectBody {
  name: string;
  canvasJSON?: string;
  unit?: 'metric' | 'imperial';
  width?: number;
  height?: number;
}

export interface UpdateProjectBody {
  name?: string;
  canvasJSON?: string;
  unit?: 'metric' | 'imperial';
  width?: number;
  height?: number;
}
