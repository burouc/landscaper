'use client';

import {
  Undo2,
  Redo2,
  Grid3x3,
  Magnet,
  Ruler,
  ZoomIn,
  ZoomOut,
  Download,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useCanvasStore } from '@/stores/canvasStore';

export default function TopToolbar() {
  const unit = useUIStore((s) => s.unit);
  const setUnit = useUIStore((s) => s.setUnit);
  const snapToGrid = useUIStore((s) => s.snapToGrid);
  const toggleSnap = useUIStore((s) => s.toggleSnap);
  const gridVisible = useUIStore((s) => s.gridVisible);
  const toggleGrid = useUIStore((s) => s.toggleGrid);
  const zoom = useUIStore((s) => s.zoom);
  const setZoom = useUIStore((s) => s.setZoom);

  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const undoStack = useCanvasStore((s) => s.undoStack);
  const redoStack = useCanvasStore((s) => s.redoStack);
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas);

  const handleExportJSON = () => {
    if (!fabricCanvas) return;
    const json = JSON.stringify(
      (fabricCanvas as any).toJSON(['itemUniqueId', 'itemId', 'itemName', 'itemBehavior']),
      null,
      2,
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landscape-plan.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex items-center justify-between h-11 px-4 border-b border-border bg-white shrink-0">
      {/* Left: brand */}
      <div className="flex items-center gap-3">
        <span className="text-base font-bold tracking-wide text-text-primary">
          LANDSCAPER
        </span>
      </div>

      {/* Center: tools */}
      <div className="flex items-center gap-1">
        {/* Undo / Redo */}
        <ToolbarButton
          icon={<Undo2 size={16} />}
          label="Undo"
          onClick={undo}
          disabled={undoStack.length === 0}
        />
        <ToolbarButton
          icon={<Redo2 size={16} />}
          label="Redo"
          onClick={redo}
          disabled={redoStack.length === 0}
        />

        <Divider />

        {/* Grid */}
        <ToolbarButton
          icon={<Grid3x3 size={16} />}
          label="Grid"
          onClick={toggleGrid}
          active={gridVisible}
        />
        {/* Snap */}
        <ToolbarButton
          icon={<Magnet size={16} />}
          label="Snap to grid"
          onClick={toggleSnap}
          active={snapToGrid}
        />

        <Divider />

        {/* Unit toggle */}
        <button
          onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-text-secondary hover:bg-cream transition-colors"
          title="Toggle unit system"
        >
          <Ruler size={14} />
          <span className="font-medium uppercase">{unit === 'metric' ? 'M' : 'FT'}</span>
        </button>

        <Divider />

        {/* Zoom */}
        <ToolbarButton
          icon={<ZoomOut size={16} />}
          label="Zoom out"
          onClick={() => setZoom(zoom - 0.1)}
          disabled={zoom <= 0.25}
        />
        <span className="text-[11px] text-text-secondary w-10 text-center select-none">
          {Math.round(zoom * 100)}%
        </span>
        <ToolbarButton
          icon={<ZoomIn size={16} />}
          label="Zoom in"
          onClick={() => setZoom(zoom + 0.1)}
          disabled={zoom >= 4}
        />
      </div>

      {/* Right: export */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-1.5 bg-terra text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-terra-dark transition-colors"
        >
          <Download size={14} />
          Export
        </button>
      </div>
    </header>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
  active,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors
        ${active ? 'bg-terra/10 text-terra' : 'text-text-secondary hover:bg-cream hover:text-text-primary'}
        ${disabled ? 'opacity-30 pointer-events-none' : ''}
      `}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-1" />;
}
