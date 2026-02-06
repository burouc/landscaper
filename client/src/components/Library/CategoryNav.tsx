'use client';

import { categories } from '@/data/libraryItems';
import { useUIStore } from '@/stores/uiStore';
import {
  TreePine,
  Layers,
  Armchair,
  Fence,
  Lightbulb,
  Flower2,
  type LucideIcon,
} from 'lucide-react';
import { ItemCategory } from '@/types/items';

const iconMap: Record<string, LucideIcon> = {
  TreePine,
  Layers,
  Armchair,
  Fence,
  Lightbulb,
  Flower2,
};

export default function CategoryNav() {
  const selected = useUIStore((s) => s.selectedCategory);
  const setCategory = useUIStore((s) => s.setSelectedCategory);

  return (
    <div className="flex flex-col items-center gap-1 py-2 border-r border-border bg-white w-12 shrink-0">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            title={cat.name}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              isActive
                ? 'bg-terra/10 text-terra'
                : 'text-text-secondary hover:bg-cream hover:text-text-primary'
            }`}
          >
            {Icon && <Icon size={18} />}
          </button>
        );
      })}
    </div>
  );
}
