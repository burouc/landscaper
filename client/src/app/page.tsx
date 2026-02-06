'use client';

import dynamic from 'next/dynamic';
import TopToolbar from '@/components/Toolbar/TopToolbar';
import LibraryPanel from '@/components/Library/LibraryPanel';
import RightPanel from '@/components/Panels/RightPanel';

// Fabric.js requires the DOM — load canvas client-side only
const CanvasEditor = dynamic(() => import('@/components/Canvas/CanvasEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-cream text-text-muted text-sm">
      Loading canvas…
    </div>
  ),
});

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopToolbar />
      <div className="flex flex-1 overflow-hidden">
        <LibraryPanel />
        <CanvasEditor />
        <RightPanel />
      </div>
    </div>
  );
}
