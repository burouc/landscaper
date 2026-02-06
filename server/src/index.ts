import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/projects', projectsRouter);

app.listen(PORT, () => {
  console.log(`Landscaper API running on http://localhost:${PORT}`);
});

export default app;
