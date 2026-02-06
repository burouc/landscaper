'use client';

import { useEffect, useState, useCallback } from 'react';
import { useCanvasStore } from '@/stores/canvasStore';
import { useUIStore } from '@/stores/uiStore';
import { libraryItems } from '@/data/libraryItems';
import { cmToDisplay } from '@/lib/units';
import { RotateCw } from 'lucide-react';

interface ObjectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  itemId: string;
  behavior: string;
  customProps: Record<string, number | string>;
}

export default function PropertiesPanel() {
  const selectedIds = useCanvasStore((s) => s.selectedIds);
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas);
  const saveUndoState = useCanvasStore((s) => s.saveUndoState);
  const syncObjectsFromCanvas = useCanvasStore((s) => s.syncObjectsFromCanvas);
  const unit = useUIStore((s) => s.unit);

  const [props, setProps] = useState<ObjectProps | null>(null);

  const readProps = useCallback(() => {
    if (!fabricCanvas || selectedIds.length !== 1) {
      setProps(null);
      return;
    }
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === selectedIds[0]);
    if (!obj) {
      setProps(null);
      return;
    }
    setProps({
      x: Math.round(obj.left ?? 0),
      y: Math.round(obj.top ?? 0),
      width: Math.round((obj.width ?? 0) * (obj.scaleX ?? 1)),
      height: Math.round((obj.height ?? 0) * (obj.scaleY ?? 1)),
      rotation: Math.round(obj.angle ?? 0),
      itemId: obj.itemId ?? '',
      behavior: obj.itemBehavior ?? 'freeform',
      customProps: {},
    });
  }, [fabricCanvas, selectedIds]);

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
        : 'Freeform';

  const applyProp = (key: string, value: number) => {
    if (!fabricCanvas || selectedIds.length !== 1) return;
    const obj = (fabricCanvas as any)
      .getObjects()
      .find((o: any) => o.itemUniqueId === selectedIds[0]);
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

  return (
    <div className="px-3 py-2.5 border-t border-border">
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

      {/* Size (not for fixed) */}
      {props.behavior !== 'fixed' && (
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

      {/* Custom item properties */}
      {libraryItem?.properties.map((propDef) => (
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
