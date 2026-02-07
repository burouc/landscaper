'use client';

import { useEffect, useState, useCallback } from 'react';
import { useCanvasStore } from '@/stores/canvasStore';
import { useUIStore } from '@/stores/uiStore';
import { libraryItems } from '@/data/libraryItems';
import { cmToDisplay } from '@/lib/units';
import { createFabricPattern } from '@/lib/canvas/patternManager';
import {
  enterEditMode,
  exitEditMode,
  isEditing,
  addPointAfter,
  removePoint,
  togglePointCurve,
  getEditPoints,
  curveAllObjectPoints,
  straightenAllObjectPoints,
} from '@/lib/canvas/pathEditor';
import { RotateCw, Pencil, Plus, Minus, Spline } from 'lucide-react';

interface ObjectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  itemId: string;
  behavior: string;
  patternAngle: number;
  pointCount: number;
  hasCurves: boolean;
  curveTension: number;
  customProps: Record<string, number | string>;
}

export default function PropertiesPanel() {
  const selectedIds = useCanvasStore((s) => s.selectedIds);
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas);
  const saveUndoState = useCanvasStore((s) => s.saveUndoState);
  const syncObjectsFromCanvas = useCanvasStore((s) => s.syncObjectsFromCanvas);
  const editingObjectId = useCanvasStore((s) => s.editingObjectId);
  const setEditingObjectId = useCanvasStore((s) => s.setEditingObjectId);
  const unit = useUIStore((s) => s.unit);

  const [props, setProps] = useState<ObjectProps | null>(null);
  const [patternAngle, setPatternAngle] = useState(0);

  const readProps = useCallback(() => {
    // Use editingObjectId as fallback when editing (handles steal selection)
    const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
    if (!fabricCanvas || !targetId) {
      setProps(null);
      return;
    }
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === targetId);
    if (!obj) {
      setProps(null);
      return;
    }
    const pathPoints = obj.itemPathPoints;
    const hasCurves = Array.isArray(pathPoints)
      ? pathPoints.some((p: any) => p.curve === true)
      : false;
    setProps({
      x: Math.round(obj.left ?? 0),
      y: Math.round(obj.top ?? 0),
      width: Math.round((obj.width ?? 0) * (obj.scaleX ?? 1)),
      height: Math.round((obj.height ?? 0) * (obj.scaleY ?? 1)),
      rotation: Math.round(obj.angle ?? 0),
      itemId: obj.itemId ?? '',
      behavior: obj.itemBehavior ?? 'freeform',
      patternAngle: obj.itemPatternAngle ?? 0,
      pointCount: Array.isArray(pathPoints) ? pathPoints.length : 0,
      hasCurves,
      curveTension: obj.itemCurveTension ?? 0.3,
      customProps: {},
    });
    setPatternAngle(obj.itemPatternAngle ?? 0);
  }, [fabricCanvas, selectedIds, editingObjectId]);

  useEffect(() => {
    readProps();
    // Listen for canvas events to update properties live
    if (!fabricCanvas) return;
    const fc = fabricCanvas as any;
    fc.on('object:modified', readProps);
    fc.on('object:moving', readProps);
    fc.on('object:scaling', readProps);
    fc.on('object:rotating', readProps);
    return () => {
      fc.off('object:modified', readProps);
      fc.off('object:moving', readProps);
      fc.off('object:scaling', readProps);
      fc.off('object:rotating', readProps);
    };
  }, [fabricCanvas, readProps]);

  if (!props) {
    return (
      <div className="px-3 py-2.5 border-t border-border">
        <h2 className="text-sm font-semibold text-text-primary mb-2">Properties</h2>
        <p className="text-xs text-text-muted">Select an object to view its properties.</p>
      </div>
    );
  }

  const libraryItem = libraryItems.find((i) => i.id === props.itemId);
  const behaviorLabel =
    props.behavior === 'proportional'
      ? 'Proportional'
      : props.behavior === 'fixed'
        ? 'Fixed size'
        : props.behavior === 'repeatable'
          ? 'Repeatable'
          : props.behavior === 'path'
            ? 'Path'
            : 'Freeform';

  const isRepeatableOrPath = props.behavior === 'repeatable' || props.behavior === 'path';

  const applyProp = (key: string, value: number) => {
    const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
    if (!fabricCanvas || !targetId) return;
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === targetId);
    if (!obj) return;

    saveUndoState();

    if (key === 'x') obj.set('left', value);
    if (key === 'y') obj.set('top', value);
    if (key === 'rotation') obj.set('angle', value);
    if (key === 'width') {
      const newScaleX = value / (obj.width ?? 1);
      obj.set('scaleX', newScaleX);
      if (props.behavior === 'proportional') {
        obj.set('scaleY', newScaleX);
      }
    }
    if (key === 'height') {
      const newScaleY = value / (obj.height ?? 1);
      obj.set('scaleY', newScaleY);
      if (props.behavior === 'proportional') {
        obj.set('scaleX', newScaleY);
      }
    }

    obj.setCoords();
    (fabricCanvas as any).requestRenderAll();
    syncObjectsFromCanvas();
    readProps();
  };

  const handlePatternAngleChange = (angle: number) => {
    const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
    if (!fabricCanvas || !targetId) return;
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === targetId);
    if (!obj || obj.itemBehavior !== 'repeatable') return;

    setPatternAngle(angle);
    obj.itemPatternAngle = angle;

    // Recreate the pattern with the new angle
    const svgStr = obj.itemPatternSvg;
    const pw = obj.itemPatternWidth;
    const ph = obj.itemPatternHeight;
    if (!svgStr || !pw || !ph) return;

    import('fabric').then(({ fabric }) => {
      createFabricPattern(fabric, svgStr, pw, ph, angle, (pattern) => {
        obj.set('fill', pattern);
        (fabricCanvas as any).requestRenderAll();
      });
    });
  };

  const handleEditPoints = () => {
    const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
    if (!fabricCanvas || !targetId) return;
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === targetId);
    if (!obj) return;

    if (isEditing()) {
      // Exit edit mode
      exitEditMode();
      setEditingObjectId(null);
      saveUndoState();
    } else {
      // Enter edit mode
      import('fabric').then(({ fabric }) => {
        setEditingObjectId(obj.itemUniqueId);
        enterEditMode(fabric, fabricCanvas as any, obj, () => {
          syncObjectsFromCanvas();
          readProps();
        });
      });
    }
  };

  const handleStrokeWidthChange = (value: number) => {
    const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
    if (!fabricCanvas || !targetId) return;
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === targetId);
    if (!obj || obj.itemBehavior !== 'path') return;

    saveUndoState();
    obj.set('strokeWidth', value);
    obj.setCoords();
    (fabricCanvas as any).requestRenderAll();
    syncObjectsFromCanvas();
    readProps();
  };

  return (
    <div className="px-3 py-2.5 border-t border-border overflow-y-auto">
      <h2 className="text-sm font-semibold text-text-primary mb-3">Properties</h2>

      {/* Item type badge */}
      <div className="mb-3">
        <span className="text-[11px] bg-cream text-text-secondary px-2 py-0.5 rounded-full">
          {behaviorLabel}
        </span>
        {libraryItem && (
          <span className="text-[11px] text-text-muted ml-1.5">{libraryItem.name}</span>
        )}
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
        <PropField
          label="X"
          value={props.x}
          suffix={unit === 'metric' ? 'cm' : '"'}
          onChange={(v) => applyProp('x', v)}
        />
        <PropField
          label="Y"
          value={props.y}
          suffix={unit === 'metric' ? 'cm' : '"'}
          onChange={(v) => applyProp('y', v)}
        />
      </div>

      {/* Size (not for fixed, repeatable, or path) */}
      {props.behavior !== 'fixed' && !isRepeatableOrPath && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
          <PropField
            label="W"
            value={props.width}
            suffix={unit === 'metric' ? 'cm' : '"'}
            onChange={(v) => applyProp('width', v)}
          />
          <PropField
            label="H"
            value={props.height}
            suffix={unit === 'metric' ? 'cm' : '"'}
            onChange={(v) => applyProp('height', v)}
            disabled={props.behavior === 'proportional'}
          />
        </div>
      )}

      {/* Rotation */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
        <PropField
          label={<RotateCw size={12} />}
          value={props.rotation}
          suffix="°"
          onChange={(v) => applyProp('rotation', v)}
        />
      </div>

      {/* Path/Repeatable: Edit Points button */}
      {isRepeatableOrPath && (
        <div className="mb-3">
          <button
            onClick={handleEditPoints}
            className={`w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-[11px] rounded border transition-colors ${
              editingObjectId
                ? 'bg-terra text-white border-terra'
                : 'bg-cream text-text-secondary border-border hover:border-terra'
            }`}
          >
            <Pencil size={12} />
            {editingObjectId ? 'Finish Editing' : 'Edit Points'}
          </button>
          {editingObjectId && (
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-text-muted">
                {props.pointCount} points · Dbl-click vertex to toggle curve
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    const pts = getEditPoints();
                    if (pts) addPointAfter(pts.length - 1);
                    readProps();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] bg-cream text-text-secondary rounded border border-border hover:border-terra"
                  title="Add point at end"
                >
                  <Plus size={10} /> Add Point
                </button>
                <button
                  onClick={() => {
                    const pts = getEditPoints();
                    if (pts && pts.length > 0) removePoint(pts.length - 1);
                    readProps();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] bg-cream text-text-secondary rounded border border-border hover:border-terra"
                  title="Remove last point"
                >
                  <Minus size={10} /> Remove
                </button>
              </div>
              <button
                onClick={() => {
                  const pts = getEditPoints();
                  if (pts && pts.length > 0) {
                    togglePointCurve(pts.length - 1);
                    readProps();
                  }
                }}
                className="w-full flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] bg-cream text-text-secondary rounded border border-border hover:border-terra"
                title="Toggle curve on last point"
              >
                <Spline size={10} /> Toggle Curve (last point)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Curve options for repeatable/path items */}
      {isRepeatableOrPath && (
        <div className="mb-3">
          <label className="text-[11px] text-text-secondary mb-1 block">Curves</label>
          <div className="flex gap-1 mb-1.5">
            <button
              onClick={() => {
                const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
                if (!fabricCanvas || !targetId) return;
                const obj = (fabricCanvas as any)
                  .getObjects()
                  .find((o: any) => o.itemUniqueId === targetId);
                if (!obj) return;
                saveUndoState();
                import('fabric').then(({ fabric }) => {
                  curveAllObjectPoints(fabric, obj, obj.itemCurveTension || 0.3);
                  (fabricCanvas as any).requestRenderAll();
                  syncObjectsFromCanvas();
                  readProps();
                });
              }}
              className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1.5 text-[10px] bg-cream text-text-secondary rounded border border-border hover:border-terra transition-colors"
              title="Curve all corners"
            >
              <Spline size={10} /> Curve All
            </button>
            <button
              onClick={() => {
                const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
                if (!fabricCanvas || !targetId) return;
                const obj = (fabricCanvas as any)
                  .getObjects()
                  .find((o: any) => o.itemUniqueId === targetId);
                if (!obj) return;
                saveUndoState();
                import('fabric').then(({ fabric }) => {
                  straightenAllObjectPoints(fabric, obj);
                  (fabricCanvas as any).requestRenderAll();
                  syncObjectsFromCanvas();
                  readProps();
                });
              }}
              className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1.5 text-[10px] bg-cream text-text-secondary rounded border border-border hover:border-terra transition-colors"
              title="Straighten all corners"
            >
              Straighten
            </button>
          </div>
          {props.hasCurves && (
            <div>
              <label className="text-[10px] text-text-muted mb-0.5 block">Smoothness</label>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={Math.round(props.curveTension * 100)}
                onChange={(e) => {
                  const tension = Number(e.target.value) / 100;
                  const targetId = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
                  if (!fabricCanvas || !targetId) return;
                  const obj = (fabricCanvas as any)
                    .getObjects()
                    .find((o: any) => o.itemUniqueId === targetId);
                  if (!obj) return;
                  import('fabric').then(({ fabric }) => {
                    curveAllObjectPoints(fabric, obj, tension);
                    (fabricCanvas as any).requestRenderAll();
                    readProps();
                  });
                }}
                onMouseUp={() => {
                  saveUndoState();
                  syncObjectsFromCanvas();
                }}
                onTouchEnd={() => {
                  saveUndoState();
                  syncObjectsFromCanvas();
                }}
                className="w-full accent-terra h-1"
              />
              <div className="text-[10px] text-text-muted text-right">
                {Math.round(props.curveTension * 100)}%
              </div>
            </div>
          )}
        </div>
      )}

      {/* Path: Stroke width */}
      {props.behavior === 'path' && (
        <div className="mb-3">
          <label className="text-[11px] text-text-secondary mb-0.5 block">Thickness</label>
          <input
            type="range"
            min={2}
            max={40}
            step={1}
            value={(() => {
              const tid = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
              if (!fabricCanvas || !tid) return 10;
              const obj = (fabricCanvas as any)
                .getObjects()
                .find((o: any) => o.itemUniqueId === tid);
              return obj?.strokeWidth ?? 10;
            })()}
            onChange={(e) => handleStrokeWidthChange(Number(e.target.value))}
            className="w-full accent-terra h-1"
          />
          <div className="text-[10px] text-text-muted text-right">
            {(() => {
              const tid = editingObjectId || (selectedIds.length === 1 ? selectedIds[0] : null);
              if (!fabricCanvas || !tid) return '10px';
              const obj = (fabricCanvas as any)
                .getObjects()
                .find((o: any) => o.itemUniqueId === tid);
              return `${obj?.strokeWidth ?? 10}px`;
            })()}
          </div>
        </div>
      )}

      {/* Repeatable: Pattern direction */}
      {props.behavior === 'repeatable' && (
        <div className="mb-3">
          <label className="text-[11px] text-text-secondary mb-0.5 block">Pattern Direction</label>
          <input
            type="range"
            min={0}
            max={360}
            step={15}
            value={patternAngle}
            onChange={(e) => handlePatternAngleChange(Number(e.target.value))}
            className="w-full accent-terra h-1"
          />
          <div className="text-[10px] text-text-muted text-right">{patternAngle}°</div>
        </div>
      )}

      {/* Custom item properties (excluding ones we handle specially) */}
      {libraryItem?.properties
        .filter((p) => p.key !== 'patternAngle' && p.key !== 'strokeWidth')
        .map((propDef) => (
          <div key={propDef.key} className="mb-2">
            {propDef.type === 'number' && (
              <div>
                <label className="text-[11px] text-text-secondary mb-0.5 block">{propDef.label}</label>
                <input
                  type="range"
                  min={propDef.min}
                  max={propDef.max}
                  step={propDef.step}
                  defaultValue={propDef.defaultValue as number}
                  className="w-full accent-terra h-1"
                />
                <div className="text-[10px] text-text-muted text-right">
                  {cmToDisplay(propDef.defaultValue as number, unit)}
                </div>
              </div>
            )}
            {propDef.type === 'color' && (
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-text-secondary">{propDef.label}</label>
                <input
                  type="color"
                  defaultValue={propDef.defaultValue as string}
                  className="w-6 h-6 rounded border border-border cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

function PropField({
  label,
  value,
  suffix,
  onChange,
  disabled,
}: {
  label: React.ReactNode;
  value: number;
  suffix?: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  const commit = () => {
    setEditing(false);
    const n = parseFloat(draft);
    if (!isNaN(n)) onChange(n);
  };

  return (
    <div className={`flex items-center gap-1.5 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <span className="text-[11px] text-text-muted w-3 shrink-0 flex justify-center">{label}</span>
      <div className="flex items-center bg-cream rounded px-1.5 py-0.5 flex-1 min-w-0">
        <input
          type="text"
          value={editing ? draft : String(value)}
          onFocus={() => { setEditing(true); setDraft(String(value)); }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && commit()}
          className="bg-transparent text-[11px] text-text-primary outline-none w-full min-w-0"
        />
        {suffix && <span className="text-[10px] text-text-muted ml-0.5 shrink-0">{suffix}</span>}
      </div>
    </div>
  );
}
