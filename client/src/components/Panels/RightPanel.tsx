'use client';

import LayersPanel from './LayersPanel';
import PropertiesPanel from './PropertiesPanel';

export default function RightPanel() {
  return (
    <div className="flex flex-col w-[260px] border-l border-border bg-white h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <LayersPanel />
      </div>
      <PropertiesPanel />
    </div>
  );
}
