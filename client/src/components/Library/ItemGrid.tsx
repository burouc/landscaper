'use client';

import { useUIStore } from '@/stores/uiStore';
import { getItemsByCategory } from '@/data/libraryItems';
import { LibraryItem } from '@/types/items';

export default function ItemGrid() {
  const category = useUIStore((s) => s.selectedCategory);
  const search = useUIStore((s) => s.librarySearch);

  let items = getItemsByCategory(category);

  if (search.trim()) {
    const q = search.toLowerCase();
    items = items.filter((item) => item.name.toLowerCase().includes(q));
  }

  const handleDragStart = (e: React.DragEvent, item: LibraryItem) => {
    e.dataTransfer.setData('application/landscaper-item', item.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-3 overflow-y-auto flex-1">
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          className="flex flex-col items-center gap-1 p-2 rounded-lg border border-transparent hover:border-border hover:bg-cream/50 cursor-grab active:cursor-grabbing transition-colors select-none"
        >
          <div
            className="w-full aspect-square bg-cream/60 rounded flex items-center justify-center p-2"
            dangerouslySetInnerHTML={{ __html: item.svgPath }}
          />
          <span className="text-[11px] text-text-secondary text-center leading-tight truncate w-full">
            {item.name}
          </span>
        </div>
      ))}
      {items.length === 0 && (
        <p className="col-span-2 text-xs text-text-muted text-center py-4">
          No items found
        </p>
      )}
    </div>
  );
}
