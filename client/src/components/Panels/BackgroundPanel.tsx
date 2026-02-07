'use client';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Trash2,
  Ruler,
  Move,
  X,
  Check,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { cmToDisplay, displayToCm } from '@/lib/units';

export default function BackgroundPanel() {
  const backgroundImage = useUIStore((s) => s.backgroundImage);
  const updateBackgroundImage = useUIStore((s) => s.updateBackgroundImage);
  const removeBackgroundImage = useUIStore((s) => s.removeBackgroundImage);
  const calibrate = useUIStore((s) => s.calibrate);
  const startCalibration = useUIStore((s) => s.startCalibration);
  const cancelCalibration = useUIStore((s) => s.cancelCalibration);
  const finishCalibration = useUIStore((s) => s.finishCalibration);
  const unit = useUIStore((s) => s.unit);

  const [calibrateInputValue, setCalibrateInputValue] = useState('');

  if (!backgroundImage) return null;

  const handleOpacityChange = (opacity: number) => {
    updateBackgroundImage({ opacity });
  };

  const handleScaleChange = (scale: number) => {
    updateBackgroundImage({ scale: Math.max(0.01, scale) });
  };

  const handleToggleVisibility = () => {
    updateBackgroundImage({ visible: !backgroundImage.visible });
  };

  const handleStartCalibration = () => {
    startCalibration();
    setCalibrateInputValue('');
  };

  const handleApplyCalibration = () => {
    const enteredValue = parseFloat(calibrateInputValue);
    if (isNaN(enteredValue) || enteredValue <= 0) return;

    // Convert entered value to cm
    const realDistanceCm = displayToCm(enteredValue, unit, 'large');

    // The pixelDistance is the distance in canvas units (cm at scale=1)
    // between the two picked points. But the background image has a scale applied.
    // The actual distance on the image in canvas cm = pixelDistance
    // We need: realDistanceCm = pixelDistance * newScale / oldScale
    // Wait, the pixelDistance is already in canvas coordinates which account for the current scale.
    // So: currentPixelDistance (in cm on canvas) should become realDistanceCm
    // New scale = oldScale * (realDistanceCm / pixelDistance)
    const pixelDist = calibrate.pixelDistance;
    if (pixelDist <= 0) return;

    const newScale = backgroundImage.scale * (realDistanceCm / pixelDist);
    updateBackgroundImage({ scale: Math.max(0.001, newScale) });
    finishCalibration();
  };

  const handleCancelCalibration = () => {
    cancelCalibration();
    setCalibrateInputValue('');
  };

  const widthCm = backgroundImage.naturalWidth * backgroundImage.scale;
  const heightCm = backgroundImage.naturalHeight * backgroundImage.scale;

  return (
    <div className="px-3 py-2.5 border-t border-border">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-text-primary">Background</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleVisibility}
            className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-cream transition-colors"
            title={backgroundImage.visible ? 'Hide background' : 'Show background'}
          >
            {backgroundImage.visible ? <Eye size={13} /> : <EyeOff size={13} />}
          </button>
          <button
            onClick={removeBackgroundImage}
            className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Remove background"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Image dimensions info */}
      <div className="text-[10px] text-text-muted mb-2">
        {backgroundImage.naturalWidth} x {backgroundImage.naturalHeight}px
        &nbsp;&middot;&nbsp;
        {cmToDisplay(widthCm, unit)} x {cmToDisplay(heightCm, unit)}
      </div>

      {/* Opacity */}
      <div className="mb-2.5">
        <label className="text-[11px] text-text-secondary mb-0.5 block">Opacity</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={Math.round(backgroundImage.opacity * 100)}
            onChange={(e) => handleOpacityChange(Number(e.target.value) / 100)}
            className="flex-1 accent-terra h-1"
          />
          <span className="text-[10px] text-text-muted w-8 text-right">
            {Math.round(backgroundImage.opacity * 100)}%
          </span>
        </div>
      </div>

      {/* Scale */}
      <div className="mb-2.5">
        <label className="text-[11px] text-text-secondary mb-0.5 block">Scale</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={1}
            max={500}
            step={1}
            value={Math.round(backgroundImage.scale * 100)}
            onChange={(e) => handleScaleChange(Number(e.target.value) / 100)}
            className="flex-1 accent-terra h-1"
          />
          <span className="text-[10px] text-text-muted w-8 text-right">
            {Math.round(backgroundImage.scale * 100)}%
          </span>
        </div>
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-text-muted w-3 shrink-0 flex justify-center">
            <Move size={10} />
          </span>
          <div className="flex items-center bg-cream rounded px-1.5 py-0.5 flex-1 min-w-0">
            <input
              type="number"
              value={Math.round(backgroundImage.x)}
              onChange={(e) => updateBackgroundImage({ x: Number(e.target.value) })}
              className="bg-transparent text-[11px] text-text-primary outline-none w-full min-w-0"
            />
            <span className="text-[10px] text-text-muted ml-0.5 shrink-0">X</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-text-muted w-3 shrink-0" />
          <div className="flex items-center bg-cream rounded px-1.5 py-0.5 flex-1 min-w-0">
            <input
              type="number"
              value={Math.round(backgroundImage.y)}
              onChange={(e) => updateBackgroundImage({ y: Number(e.target.value) })}
              className="bg-transparent text-[11px] text-text-primary outline-none w-full min-w-0"
            />
            <span className="text-[10px] text-text-muted ml-0.5 shrink-0">Y</span>
          </div>
        </div>
      </div>

      {/* Calibration tool */}
      <div className="border-t border-border pt-2">
        <label className="text-[11px] text-text-secondary mb-1 block">Scale Calibration</label>
        <p className="text-[10px] text-text-muted mb-1.5">
          Measure a known distance on the image to fit it to the grid.
        </p>

        {calibrate.phase === 'idle' && (
          <button
            onClick={handleStartCalibration}
            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-[11px] rounded border bg-cream text-text-secondary border-border hover:border-terra transition-colors"
          >
            <Ruler size={12} />
            Calibrate Scale
          </button>
        )}

        {(calibrate.phase === 'pick-start' || calibrate.phase === 'pick-end') && (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-blue-600 flex-1">
              {calibrate.phase === 'pick-start'
                ? 'Click start point on canvas...'
                : 'Click end point on canvas...'}
            </span>
            <button
              onClick={handleCancelCalibration}
              className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Cancel"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {calibrate.phase === 'enter-distance' && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-text-muted">
              Enter the real-world distance between the two points:
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-cream rounded px-1.5 py-1 flex-1 min-w-0 border border-border focus-within:border-terra">
                <input
                  type="number"
                  step="0.1"
                  min="0.01"
                  placeholder="Distance"
                  value={calibrateInputValue}
                  onChange={(e) => setCalibrateInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCalibration()}
                  autoFocus
                  className="bg-transparent text-[11px] text-text-primary outline-none w-full min-w-0"
                />
                <span className="text-[10px] text-text-muted ml-0.5 shrink-0">
                  {unit === 'metric' ? 'm' : 'ft'}
                </span>
              </div>
              <button
                onClick={handleApplyCalibration}
                className="w-6 h-6 flex items-center justify-center rounded bg-terra text-white hover:bg-terra-dark transition-colors"
                title="Apply"
              >
                <Check size={12} />
              </button>
              <button
                onClick={handleCancelCalibration}
                className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Cancel"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
