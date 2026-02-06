# Landscaper — AI Assistant Guide

## Overview
Top-down landscaping design tool with a library panel (left), Fabric.js canvas (center), and layers/properties panel (right). Plans first, 3D view later.

## Repo Structure
```
client/          Next.js 14 (App Router) + TypeScript + Tailwind CSS
  src/
    app/         Pages & layout
    components/  React components (Toolbar, Library, Canvas, Panels)
    stores/      Zustand stores (canvasStore, uiStore)
    types/       TypeScript types (items, project)
    data/        Library items definitions & SVGs
    lib/         Utilities (units, canvas/grid, snap, constraints)
server/          Express + TypeScript REST API
  src/
    routes/      API routes (projects CRUD)
    types/       Shared types
```

## Tech Stack
- **Canvas engine**: Fabric.js v5 — objects, selection, transforms, serialization
- **State**: Zustand — `useUIStore` (unit, snap, grid, zoom), `useCanvasStore` (objects, selection, undo/redo)
- **Styling**: Tailwind with custom palette (cream, terra, border, text-primary/secondary/muted)
- **Backend**: Express on port 3001, in-memory store (ready for DB)

## Item Behavior System
Three behavior types enforce different transform constraints:
- **`proportional`** — Trees, shrubs, decorative: uniform scale only (locked aspect ratio), all corners + rotation
- **`freeform`** — Grass, pavement, structures: free width/height scaling, all handles
- **`fixed`** — Furniture, lighting: no scaling, rotation handle only

Constraints applied via `lib/canvas/itemConstraints.ts` using Fabric.js control visibility + lock flags.

## Key Commands
```bash
# Client
cd client && npm install && npm run dev    # http://localhost:3000

# Server
cd server && npm install && npm run dev    # http://localhost:3001
```

## Conventions
- All internal measurements in **centimeters**; display converts via `lib/units.ts`
- Fabric objects carry custom properties: `itemUniqueId`, `itemId`, `itemName`, `itemBehavior`
- Undo/redo serialises full canvas JSON (max 50 states)
- Grid uses `destination-over` composite to draw behind objects
- Drag & drop: library items emit `application/landscaper-item` data transfer
- Colors: terra `#C4785C`, cream `#F5F0EB`, border `#E8E3DE`
