import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Project, CreateProjectBody, UpdateProjectBody } from '../types/project';

const router = Router();

// In-memory store — swap for a real DB later
const projects: Map<string, Project> = new Map();

// GET /api/projects — list all projects
router.get('/', (_req: Request, res: Response) => {
  const list = Array.from(projects.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  res.json(list);
});

// POST /api/projects — create a project
router.post('/', (req: Request, res: Response) => {
  const body = req.body as CreateProjectBody;
  if (!body.name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const now = new Date().toISOString();
  const project: Project = {
    id: uuidv4(),
    name: body.name,
    canvasJSON: body.canvasJSON ?? '{}',
    unit: body.unit ?? 'metric',
    width: body.width ?? 2000,
    height: body.height ?? 1500,
    createdAt: now,
    updatedAt: now,
  };
  projects.set(project.id, project);
  res.status(201).json(project);
});

// GET /api/projects/:id — get a single project
router.get('/:id', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// PUT /api/projects/:id — update a project
router.put('/:id', (req: Request, res: Response) => {
  const project = projects.get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const body = req.body as UpdateProjectBody;
  if (body.name !== undefined) project.name = body.name;
  if (body.canvasJSON !== undefined) project.canvasJSON = body.canvasJSON;
  if (body.unit !== undefined) project.unit = body.unit;
  if (body.width !== undefined) project.width = body.width;
  if (body.height !== undefined) project.height = body.height;
  project.updatedAt = new Date().toISOString();

  projects.set(project.id, project);
  res.json(project);
});

// DELETE /api/projects/:id — delete a project
router.delete('/:id', (req: Request, res: Response) => {
  if (!projects.has(req.params.id)) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projects.delete(req.params.id);
  res.status(204).send();
});

export default router;
