'use client';

import { Search, X } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { categories } from '@/data/libraryItems';
import CategoryNav from './CategoryNav';
import ItemGrid from './ItemGrid';

export default function LibraryPanel() {
  const selectedCategory = useUIStore((s) => s.selectedCategory);
  const search = useUIStore((s) => s.librarySearch);
  const setSearch = useUIStore((s) => s.setLibrarySearch);

  const categoryName = categories.find((c) => c.id === selectedCategory)?.name ?? '';

  return (
    <div className="flex h-full">
      <CategoryNav />
      <div className="flex flex-col w-[232px] border-r border-border bg-white">
        {/* Category title */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">{categoryName}</h2>
        </div>

        {/* Items */}
        <ItemGrid />

        {/* Search bar */}
        <div className="px-3 py-2 border-t border-border">
          <div className="flex items-center gap-2 bg-cream rounded-lg px-2.5 py-1.5">
            <Search size={14} className="text-text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-text-primary placeholder:text-text-muted outline-none flex-1"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-text-muted hover:text-text-primary">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
