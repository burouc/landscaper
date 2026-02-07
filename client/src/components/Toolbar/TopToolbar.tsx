'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Undo2,
  Redo2,
  Grid3x3,
  Magnet,
  Ruler,
  ZoomIn,
  ZoomOut,
  Download,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react';
import { useUIStore, METRIC_GRID_SIZES, IMPERIAL_GRID_SIZES } from '@/stores/uiStore';
import { useCanvasStore } from '@/stores/canvasStore';

export default function TopToolbar() {
  const unit = useUIStore((s) => s.unit);
  const setUnit = useUIStore((s) => s.setUnit);
  const snapToGrid = useUIStore((s) => s.snapToGrid);
  const toggleSnap = useUIStore((s) => s.toggleSnap);
  const gridVisible = useUIStore((s) => s.gridVisible);
  const toggleGrid = useUIStore((s) => s.toggleGrid);
  const gridSize = useUIStore((s) => s.gridSize);
  const setGridSize = useUIStore((s) => s.setGridSize);
  const zoom = useUIStore((s) => s.zoom);
  const setZoom = useUIStore((s) => s.setZoom);
  const backgroundImage = useUIStore((s) => s.backgroundImage);
  const setBackgroundImage = useUIStore((s) => s.setBackgroundImage);

  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const undoStack = useCanvasStore((s) => s.undoStack);
  const redoStack = useCanvasStore((s) => s.redoStack);
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas);

  const [gridDropdownOpen, setGridDropdownOpen] = useState(false);
  const gridDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close grid dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (gridDropdownRef.current && !gridDropdownRef.current.contains(e.target as Node)) {
        setGridDropdownOpen(false);
      }
    };
    if (gridDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [gridDropdownOpen]);

  const gridSizes = unit === 'metric' ? METRIC_GRID_SIZES : IMPERIAL_GRID_SIZES;
  const gridLabel = unit === 'metric' ? 'm' : 'ft';

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

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      if (!src) return;

      // Get natural image dimensions
      const img = new window.Image();
      img.onload = () => {
        setBackgroundImage({
          src,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0.5,
          visible: true,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);

    // Reset input so re-uploading the same file works
    e.target.value = '';
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

        {/* Grid toggle + size dropdown */}
        <ToolbarButton
          icon={<Grid3x3 size={16} />}
          label="Grid"
          onClick={toggleGrid}
          active={gridVisible}
        />

        {/* Grid size selector */}
        <div className="relative" ref={gridDropdownRef}>
          <button
            onClick={() => setGridDropdownOpen(!gridDropdownOpen)}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[11px] text-text-secondary hover:bg-cream transition-colors"
            title="Grid size"
          >
            <span className="font-medium">{gridSize}{gridLabel}</span>
            <ChevronDown size={10} />
          </button>
          {gridDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg py-1 z-50 min-w-[80px]">
              {gridSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setGridSize(size);
                    setGridDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1 text-[11px] transition-colors ${
                    gridSize === size
                      ? 'bg-terra/10 text-terra font-medium'
                      : 'text-text-secondary hover:bg-cream'
                  }`}
                >
                  {size} {gridLabel}
                </button>
              ))}
            </div>
          )}
        </div>

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

        {/* Background image upload */}
        <ToolbarButton
          icon={<ImageIcon size={16} />}
          label="Add background image"
          onClick={() => fileInputRef.current?.click()}
          active={!!backgroundImage}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBackgroundUpload}
        />

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
