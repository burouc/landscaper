import { LibraryItem, Category, ItemCategory } from '@/types/items';

export const categories: Category[] = [
  { id: 'trees-shrubs', name: 'Trees & Shrubs', icon: 'TreePine' },
  { id: 'ground-cover', name: 'Ground Cover', icon: 'Layers' },
  { id: 'furniture', name: 'Furniture', icon: 'Armchair' },
  { id: 'structures', name: 'Structures', icon: 'Fence' },
  { id: 'lighting', name: 'Lighting', icon: 'Lightbulb' },
  { id: 'decorative', name: 'Decorative', icon: 'Flower2' },
];

export const libraryItems: LibraryItem[] = [
  // ═══════════════════════════════════════════
  // ── Trees & Shrubs ─────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'oak-tree',
    name: 'Oak Tree',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Canopy — irregular lobed outline -->
      <path d="M50 6 C62 4, 78 10, 86 22 C94 34, 96 48, 92 60 C88 72, 78 84, 66 90 C54 96, 38 96, 26 88 C14 80, 6 68, 5 54 C4 40, 8 24, 18 14 C28 6, 40 4, 50 6 Z"
        fill="#c2d6a4" stroke="#4a5e3a" stroke-width="1.4"/>
      <!-- Internal lobe lines -->
      <path d="M50 50 Q38 28, 24 20" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <path d="M50 50 Q66 30, 78 22" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <path d="M50 50 Q74 56, 88 54" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <path d="M50 50 Q62 72, 62 86" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <path d="M50 50 Q32 68, 28 84" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <path d="M50 50 Q22 50, 8 48" fill="none" stroke="#6b8050" stroke-width="0.7" opacity="0.6"/>
      <!-- Stippling dots for foliage texture -->
      <circle cx="30" cy="22" r="1" fill="#4a5e3a" opacity="0.35"/>
      <circle cx="42" cy="16" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="62" cy="14" r="1" fill="#4a5e3a" opacity="0.35"/>
      <circle cx="76" cy="28" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="84" cy="42" r="1" fill="#4a5e3a" opacity="0.35"/>
      <circle cx="82" cy="62" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="70" cy="78" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="52" cy="86" r="0.9" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="34" cy="80" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="18" cy="64" r="0.9" fill="#4a5e3a" opacity="0.35"/>
      <circle cx="14" cy="40" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="22" cy="32" r="0.8" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="58" cy="30" r="1" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="38" cy="38" r="0.8" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="66" cy="46" r="1" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="40" cy="60" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="60" cy="64" r="0.8" fill="#4a5e3a" opacity="0.25"/>
      <!-- Trunk -->
      <circle cx="50" cy="50" r="4" fill="#8c7355" stroke="#5c4a32" stroke-width="1"/>
    </svg>`,
    defaultWidth: 400,
    defaultHeight: 400,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2000, step: 50, unit: 'cm', defaultValue: 500 },
    ],
  },
  {
    id: 'pine-tree',
    name: 'Pine Tree',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Conifer canopy — radiating needle fans -->
      <circle cx="50" cy="50" r="44" fill="#a4bfa0" stroke="#3a5434" stroke-width="1.2"/>
      <!-- Radiating branch lines -->
      <line x1="50" y1="50" x2="50" y2="7" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="88" y2="18" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="93" y2="50" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="88" y2="82" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="50" y2="93" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="12" y2="82" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="7" y2="50" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <line x1="50" y1="50" x2="12" y2="18" stroke="#3a5434" stroke-width="0.8" opacity="0.5"/>
      <!-- Short needle ticks along branches -->
      <path d="M50 30 L46 28 M50 30 L54 28" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M50 20 L46 17 M50 20 L54 17" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M70 34 L72 30 M70 34 L68 30" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M80 26 L83 23 M80 26 L77 23" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M72 50 L74 46 M72 50 L74 54" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M82 50 L84 46 M82 50 L84 54" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M30 66 L28 62 M30 66 L32 62" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M20 74 L17 71 M20 74 L23 71" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M30 34 L28 30 M30 34 L26 36" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M70 66 L72 63 M70 66 L73 69" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <path d="M50 70 L47 73 M50 70 L53 73" stroke="#3a5434" stroke-width="0.6" fill="none" opacity="0.4"/>
      <!-- Trunk -->
      <circle cx="50" cy="50" r="4.5" fill="#7a6548" stroke="#4a3824" stroke-width="1.2"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 300,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2500, step: 50, unit: 'cm', defaultValue: 800 },
    ],
  },
  {
    id: 'bush',
    name: 'Bush',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Clustered cloud-like shrub blobs -->
      <path d="M50 14 C64 10, 80 18, 84 32 C88 46, 82 58, 76 66 C70 74, 58 82, 46 84 C34 86, 20 78, 14 64 C8 50, 10 34, 20 22 C30 12, 40 12, 50 14 Z"
        fill="#b8ceaa" stroke="#4a5e3a" stroke-width="1.2"/>
      <!-- Internal lobe arcs -->
      <path d="M34 26 Q42 18, 54 20" fill="none" stroke="#6b8050" stroke-width="0.8" opacity="0.5"/>
      <path d="M68 30 Q78 40, 76 54" fill="none" stroke="#6b8050" stroke-width="0.8" opacity="0.5"/>
      <path d="M70 64 Q60 76, 44 76" fill="none" stroke="#6b8050" stroke-width="0.8" opacity="0.5"/>
      <path d="M26 70 Q16 56, 18 42" fill="none" stroke="#6b8050" stroke-width="0.8" opacity="0.5"/>
      <!-- Stipple dots -->
      <circle cx="36" cy="32" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="56" cy="28" r="0.9" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="70" cy="42" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="64" cy="60" r="0.9" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="44" cy="68" r="1" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="26" cy="54" r="0.9" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="30" cy="40" r="0.8" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="50" cy="48" r="1" fill="#4a5e3a" opacity="0.2"/>
    </svg>`,
    defaultWidth: 150,
    defaultHeight: 150,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 30, max: 300, step: 10, unit: 'cm', defaultValue: 100 },
    ],
  },
  {
    id: 'silver-birch',
    name: 'Silver Birch',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#8CBF6E" stroke="#74A756" stroke-width="2"/>
      <circle cx="38" cy="38" r="18" fill="#9ECF80" opacity="0.7"/>
      <circle cx="62" cy="42" r="16" fill="#A6D78A" opacity="0.6"/>
      <circle cx="50" cy="60" r="14" fill="#9ECF80" opacity="0.5"/>
      <circle cx="50" cy="50" r="4" fill="#E8E0D4" stroke="#D0C8BC" stroke-width="1"/>
    </svg>`,
    defaultWidth: 350,
    defaultHeight: 350,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 1800, step: 50, unit: 'cm', defaultValue: 600 },
    ],
  },
  {
    id: 'european-beech',
    name: 'European Beech',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#3E6B3A" stroke="#2D5A2E" stroke-width="2"/>
      <circle cx="50" cy="50" r="34" fill="#4A7C45" stroke="#3E6B3A" stroke-width="1"/>
      <circle cx="42" cy="42" r="16" fill="#568D50" opacity="0.6"/>
      <circle cx="58" cy="56" r="14" fill="#568D50" opacity="0.5"/>
      <circle cx="50" cy="50" r="5" fill="#2D5A2E"/>
    </svg>`,
    defaultWidth: 450,
    defaultHeight: 450,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2500, step: 50, unit: 'cm', defaultValue: 700 },
    ],
  },
  {
    id: 'english-elm',
    name: 'English Elm',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="44" ry="42" fill="#4F7942" stroke="#3D6730" stroke-width="2"/>
      <ellipse cx="40" cy="40" rx="20" ry="18" fill="#5F8952" opacity="0.6"/>
      <ellipse cx="62" cy="55" rx="18" ry="16" fill="#5F8952" opacity="0.5"/>
      <ellipse cx="45" cy="62" rx="14" ry="12" fill="#6F9962" opacity="0.4"/>
      <circle cx="50" cy="50" r="5" fill="#3D6730"/>
    </svg>`,
    defaultWidth: 500,
    defaultHeight: 500,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2500, step: 50, unit: 'cm', defaultValue: 800 },
    ],
  },
  {
    id: 'linden',
    name: 'Linden',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" fill="#5C8A4D" stroke="#4A7840" stroke-width="2"/>
      <circle cx="50" cy="50" r="32" fill="#6C9A5D" stroke="#5C8A4D" stroke-width="1"/>
      <circle cx="50" cy="50" r="18" fill="#7CAA6D" stroke="#6C9A5D" stroke-width="1"/>
      <circle cx="50" cy="50" r="6" fill="#4A7840"/>
    </svg>`,
    defaultWidth: 400,
    defaultHeight: 400,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2200, step: 50, unit: 'cm', defaultValue: 700 },
    ],
  },
  {
    id: 'horse-chestnut',
    name: 'Horse Chestnut',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#3D7A3D" stroke="#2C692C" stroke-width="2"/>
      <circle cx="35" cy="38" r="16" fill="#4D8A4D" opacity="0.7"/>
      <circle cx="65" cy="38" r="15" fill="#4D8A4D" opacity="0.65"/>
      <circle cx="35" cy="62" r="14" fill="#4D8A4D" opacity="0.6"/>
      <circle cx="65" cy="62" r="15" fill="#4D8A4D" opacity="0.55"/>
      <circle cx="50" cy="50" r="12" fill="#5D9A5D" opacity="0.5"/>
      <circle cx="50" cy="50" r="5" fill="#2C692C"/>
    </svg>`,
    defaultWidth: 500,
    defaultHeight: 500,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2000, step: 50, unit: 'cm', defaultValue: 700 },
    ],
  },
  {
    id: 'weeping-willow',
    name: 'Weeping Willow',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#7BA66E" stroke="#6B965E" stroke-width="1.5" opacity="0.7"/>
      <circle cx="50" cy="50" r="34" fill="#8BB67E" stroke="#7BA66E" stroke-width="1" opacity="0.8"/>
      <ellipse cx="30" cy="60" rx="12" ry="20" fill="#8BB67E" opacity="0.4"/>
      <ellipse cx="70" cy="60" rx="12" ry="20" fill="#8BB67E" opacity="0.4"/>
      <ellipse cx="50" cy="62" rx="10" ry="18" fill="#9BC68E" opacity="0.35"/>
      <circle cx="50" cy="46" r="10" fill="#6B965E" opacity="0.5"/>
      <circle cx="50" cy="46" r="4" fill="#5A854D"/>
    </svg>`,
    defaultWidth: 550,
    defaultHeight: 550,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 1500, step: 50, unit: 'cm', defaultValue: 600 },
    ],
  },
  {
    id: 'italian-cypress',
    name: 'Italian Cypress',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="16" ry="42" fill="#2D5A3D" stroke="#1A4028" stroke-width="2"/>
      <ellipse cx="50" cy="50" rx="10" ry="34" fill="#3A6B4A" opacity="0.6"/>
      <ellipse cx="50" cy="50" rx="5" ry="20" fill="#4A7C59" opacity="0.4"/>
      <circle cx="50" cy="50" r="3" fill="#1A4028"/>
    </svg>`,
    defaultWidth: 120,
    defaultHeight: 120,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 200, max: 2500, step: 50, unit: 'cm', defaultValue: 1000 },
    ],
  },
  {
    id: 'olive-tree',
    name: 'Olive Tree',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="48" rx="38" ry="34" fill="#8A9A6C" stroke="#7A8A5C" stroke-width="2"/>
      <ellipse cx="38" cy="42" rx="16" ry="14" fill="#9AAA7C" opacity="0.6"/>
      <ellipse cx="64" cy="50" rx="14" ry="12" fill="#9AAA7C" opacity="0.5"/>
      <ellipse cx="48" cy="58" rx="12" ry="10" fill="#A0B080" opacity="0.4"/>
      <circle cx="50" cy="48" r="5" fill="#6A7A50"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 300,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 1200, step: 50, unit: 'cm', defaultValue: 400 },
    ],
  },
  {
    id: 'scots-pine',
    name: 'Scots Pine',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="48" r="32" fill="#3A6B4A" stroke="#2A5B3A" stroke-width="2"/>
      <circle cx="36" cy="40" r="16" fill="#4A7C5A" opacity="0.7"/>
      <circle cx="64" cy="44" r="14" fill="#4A7C5A" opacity="0.6"/>
      <circle cx="50" cy="58" r="12" fill="#4A7C5A" opacity="0.5"/>
      <circle cx="50" cy="48" r="5" fill="#8B6F47" stroke="#7A5F37" stroke-width="1"/>
    </svg>`,
    defaultWidth: 350,
    defaultHeight: 350,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 2500, step: 50, unit: 'cm', defaultValue: 900 },
    ],
  },
  {
    id: 'english-yew',
    name: 'English Yew',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="#2A5030" stroke="#1A4020" stroke-width="2"/>
      <circle cx="50" cy="50" r="30" fill="#3A6040" stroke="#2A5030" stroke-width="1"/>
      <circle cx="42" cy="42" r="12" fill="#4A7050" opacity="0.5"/>
      <circle cx="58" cy="56" r="10" fill="#4A7050" opacity="0.4"/>
      <circle cx="50" cy="50" r="4" fill="#1A4020"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 300,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 100, max: 1500, step: 50, unit: 'cm', defaultValue: 500 },
    ],
  },
  {
    id: 'hedge',
    name: 'Hedge',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Scalloped organic hedgerow -->
      <path d="M8 30 C8 16, 18 8, 30 8 C38 8, 44 12, 50 8 C56 4, 66 4, 76 8 C86 12, 90 6, 100 6 C110 6, 116 12, 124 8 C132 4, 142 4, 150 8 C158 12, 164 8, 172 8 C184 8, 192 18, 192 30 C192 42, 184 52, 172 52 C164 52, 158 48, 150 52 C142 56, 132 56, 124 52 C116 48, 110 54, 100 54 C90 54, 86 48, 76 52 C66 56, 56 56, 50 52 C44 48, 38 52, 30 52 C18 52, 8 42, 8 30 Z"
        fill="#b0c89e" stroke="#4a5e3a" stroke-width="1.2"/>
      <!-- Cross-hatch texture lines -->
      <line x1="24" y1="18" x2="36" y2="44" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="48" y1="14" x2="56" y2="46" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="72" y1="12" x2="80" y2="48" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="96" y1="10" x2="104" y2="50" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="120" y1="12" x2="128" y2="48" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="144" y1="12" x2="152" y2="48" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <line x1="168" y1="16" x2="176" y2="44" stroke="#5c7244" stroke-width="0.5" opacity="0.3"/>
      <!-- Stipple -->
      <circle cx="40" cy="24" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="66" cy="22" r="0.8" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="112" cy="20" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="158" cy="24" r="0.8" fill="#4a5e3a" opacity="0.25"/>
      <circle cx="88" cy="38" r="0.9" fill="#4a5e3a" opacity="0.3"/>
      <circle cx="136" cy="40" r="0.8" fill="#4a5e3a" opacity="0.25"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 60,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 30, max: 250, step: 10, unit: 'cm', defaultValue: 120 },
    ],
  },

  // ═══════════════════════════════════════════
  // ── Ground Cover ───────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'lawn',
    name: 'Lawn',
    category: 'ground-cover',
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#dce8d0" stroke="#7a9a62" stroke-width="1.2" stroke-dasharray="3 2"/>
      <!-- Hand-drawn grass tufts -->
      <path d="M20 80 Q21 70,18 62" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M22 80 Q24 72,26 64" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M50 75 Q49 65,47 58" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M52 75 Q54 67,56 60" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M78 82 Q77 72,75 66" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M80 82 Q82 74,84 68" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M35 42 Q34 34,32 28" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M37 42 Q39 36,41 30" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M68 38 Q67 28,65 22" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <path d="M70 38 Q72 30,74 24" stroke="#7a9a62" stroke-width="0.7" fill="none"/>
      <!-- Stipple dots -->
      <circle cx="14" cy="30" r="0.8" fill="#7a9a62" opacity="0.3"/>
      <circle cx="44" cy="54" r="0.7" fill="#7a9a62" opacity="0.25"/>
      <circle cx="86" cy="44" r="0.8" fill="#7a9a62" opacity="0.3"/>
      <circle cx="60" cy="88" r="0.7" fill="#7a9a62" opacity="0.25"/>
      <circle cx="28" cy="16" r="0.6" fill="#7a9a62" opacity="0.2"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="#dce8d0"/>
      <!-- Grass tufts — two-stroke V shapes -->
      <path d="M8 44 Q7 36,5 30" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M10 44 Q12 38,14 32" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M30 42 Q29 34,27 28" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M32 42 Q34 36,36 30" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M20 22 Q19 14,17 8" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M22 22 Q24 16,26 10" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M42 20 Q41 14,40 8" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <path d="M44 20 Q45 14,46 8" stroke="#7a9a62" stroke-width="0.6" fill="none"/>
      <!-- Stray stipple dots -->
      <circle cx="4" cy="14" r="0.5" fill="#7a9a62" opacity="0.25"/>
      <circle cx="38" cy="38" r="0.5" fill="#7a9a62" opacity="0.2"/>
      <circle cx="16" cy="40" r="0.4" fill="#7a9a62" opacity="0.2"/>
    </svg>`,
    patternWidth: 48,
    patternHeight: 48,
    defaultWidth: 500,
    defaultHeight: 500,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#dce8d0' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
    ],
  },
  {
    id: 'paver-patio',
    name: 'Paver Patio',
    category: 'ground-cover',
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#e6ddd0" stroke="#8a7e6e" stroke-width="1.2"/>
      <!-- Running-bond brick pattern preview -->
      <line x1="2" y1="26" x2="98" y2="26" stroke="#a89884" stroke-width="0.6"/>
      <line x1="2" y1="50" x2="98" y2="50" stroke="#a89884" stroke-width="0.6"/>
      <line x1="2" y1="74" x2="98" y2="74" stroke="#a89884" stroke-width="0.6"/>
      <line x1="34" y1="2" x2="34" y2="26" stroke="#a89884" stroke-width="0.6"/>
      <line x1="66" y1="2" x2="66" y2="26" stroke="#a89884" stroke-width="0.6"/>
      <line x1="18" y1="26" x2="18" y2="50" stroke="#a89884" stroke-width="0.6"/>
      <line x1="50" y1="26" x2="50" y2="50" stroke="#a89884" stroke-width="0.6"/>
      <line x1="82" y1="26" x2="82" y2="50" stroke="#a89884" stroke-width="0.6"/>
      <line x1="34" y1="50" x2="34" y2="74" stroke="#a89884" stroke-width="0.6"/>
      <line x1="66" y1="50" x2="66" y2="74" stroke="#a89884" stroke-width="0.6"/>
      <line x1="18" y1="74" x2="18" y2="98" stroke="#a89884" stroke-width="0.6"/>
      <line x1="50" y1="74" x2="50" y2="98" stroke="#a89884" stroke-width="0.6"/>
      <line x1="82" y1="74" x2="82" y2="98" stroke="#a89884" stroke-width="0.6"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="32" fill="#e6ddd0"/>
      <!-- Row 1: full bricks -->
      <rect x="0.5" y="0.5" width="30" height="14" fill="none" stroke="#a89884" stroke-width="0.5"/>
      <rect x="33" y="0.5" width="30" height="14" fill="none" stroke="#a89884" stroke-width="0.5"/>
      <!-- Row 2: offset bricks (running bond) -->
      <rect x="-14" y="16.5" width="30" height="14" fill="none" stroke="#a89884" stroke-width="0.5"/>
      <rect x="17.5" y="16.5" width="30" height="14" fill="none" stroke="#a89884" stroke-width="0.5"/>
      <rect x="49" y="16.5" width="30" height="14" fill="none" stroke="#a89884" stroke-width="0.5"/>
    </svg>`,
    patternWidth: 64,
    patternHeight: 32,
    defaultWidth: 400,
    defaultHeight: 400,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#e6ddd0' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
    ],
  },
  {
    id: 'gravel',
    name: 'Gravel Path',
    category: 'ground-cover',
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#e2dace" stroke="#a09484" stroke-width="1.2"/>
      <!-- Stipple gravel dots -->
      <circle cx="15" cy="18" r="1.8" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="38" cy="12" r="1.4" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="62" cy="20" r="2" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="84" cy="14" r="1.2" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="22" cy="42" r="1.6" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="50" cy="38" r="1.8" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="76" cy="44" r="1.4" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="12" cy="66" r="1.4" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="36" cy="62" r="2" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="60" cy="68" r="1.6" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="86" cy="64" r="1.8" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="24" cy="86" r="1.6" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="52" cy="84" r="1.2" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <circle cx="74" cy="88" r="1.8" fill="none" stroke="#9a8e7e" stroke-width="0.6"/>
      <!-- Fill dots -->
      <circle cx="28" cy="28" r="0.6" fill="#9a8e7e" opacity="0.4"/>
      <circle cx="70" cy="34" r="0.5" fill="#9a8e7e" opacity="0.35"/>
      <circle cx="44" cy="52" r="0.6" fill="#9a8e7e" opacity="0.4"/>
      <circle cx="18" cy="54" r="0.5" fill="#9a8e7e" opacity="0.35"/>
      <circle cx="66" cy="56" r="0.6" fill="#9a8e7e" opacity="0.4"/>
      <circle cx="88" cy="80" r="0.5" fill="#9a8e7e" opacity="0.35"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" fill="#e2dace"/>
      <!-- Tiny pebble circles (outlines only, like pen ink) -->
      <circle cx="6" cy="8" r="2" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="20" cy="5" r="1.5" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="34" cy="10" r="2.2" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="12" cy="22" r="1.8" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="28" cy="20" r="1.4" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="5" cy="34" r="1.6" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="22" cy="34" r="2" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <circle cx="36" cy="30" r="1.4" fill="none" stroke="#9a8e7e" stroke-width="0.5"/>
      <!-- Fill dots -->
      <circle cx="16" cy="14" r="0.4" fill="#9a8e7e" opacity="0.4"/>
      <circle cx="32" cy="24" r="0.4" fill="#9a8e7e" opacity="0.35"/>
      <circle cx="8" cy="28" r="0.4" fill="#9a8e7e" opacity="0.35"/>
      <circle cx="28" cy="38" r="0.4" fill="#9a8e7e" opacity="0.4"/>
    </svg>`,
    patternWidth: 40,
    patternHeight: 40,
    defaultWidth: 300,
    defaultHeight: 100,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#e2dace' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
    ],
  },
  {
    id: 'pond',
    name: 'Pond',
    category: 'ground-cover',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Organic water shape with concentric shoreline rings -->
      <path d="M60 6 C82 4, 106 16, 112 36 C118 56, 104 70, 80 74 C56 78, 24 76, 12 58 C0 40, 10 14, 34 8 C44 5, 52 5, 60 6 Z"
        fill="#c4d8e8" stroke="#5a7a90" stroke-width="1.2"/>
      <!-- Inner water rings -->
      <path d="M60 18 C76 16, 96 26, 100 38 C104 50, 94 62, 76 64 C58 66, 32 64, 22 52 C12 40, 20 22, 38 18 C46 16, 54 16, 60 18 Z"
        fill="none" stroke="#7a9ab0" stroke-width="0.6" opacity="0.5"/>
      <path d="M60 28 C72 26, 86 32, 88 40 C90 48, 84 56, 72 58 C60 60, 40 58, 34 48 C28 38, 34 30, 46 28 C52 27, 56 27, 60 28 Z"
        fill="none" stroke="#7a9ab0" stroke-width="0.5" opacity="0.35"/>
      <!-- Stipple water dots -->
      <circle cx="50" cy="40" r="0.7" fill="#5a7a90" opacity="0.2"/>
      <circle cx="66" cy="36" r="0.6" fill="#5a7a90" opacity="0.2"/>
      <circle cx="42" cy="48" r="0.7" fill="#5a7a90" opacity="0.2"/>
      <circle cx="72" cy="50" r="0.6" fill="#5a7a90" opacity="0.2"/>
    </svg>`,
    defaultWidth: 360,
    defaultHeight: 240,
    properties: [
      { key: 'fill', label: 'Water Color', type: 'color', defaultValue: '#c4d8e8' },
    ],
  },

  // ═══════════════════════════════════════════
  // ── Furniture ──────────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'chair',
    name: 'Chair',
    category: 'furniture',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Top-down chair: seat + backrest outline -->
      <rect x="10" y="18" width="40" height="34" rx="2" fill="#f0e8dc" stroke="#6e5a42" stroke-width="1.2"/>
      <!-- Backrest -->
      <path d="M10 18 Q12 8, 30 6 Q48 8, 50 18" fill="none" stroke="#6e5a42" stroke-width="1.4"/>
      <!-- Seat hatch -->
      <line x1="18" y1="24" x2="18" y2="46" stroke="#a8967e" stroke-width="0.5" opacity="0.3"/>
      <line x1="30" y1="24" x2="30" y2="46" stroke="#a8967e" stroke-width="0.5" opacity="0.3"/>
      <line x1="42" y1="24" x2="42" y2="46" stroke="#a8967e" stroke-width="0.5" opacity="0.3"/>
    </svg>`,
    defaultWidth: 60,
    defaultHeight: 60,
    properties: [],
  },
  {
    id: 'table-round',
    name: 'Round Table',
    category: 'furniture',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Top-down round table -->
      <circle cx="40" cy="40" r="34" fill="#f0e8dc" stroke="#6e5a42" stroke-width="1.4"/>
      <!-- Shadow line -->
      <path d="M16 56 Q40 68, 64 56" fill="none" stroke="#6e5a42" stroke-width="0.6" opacity="0.3"/>
      <!-- Center pedestal -->
      <circle cx="40" cy="40" r="4" fill="none" stroke="#6e5a42" stroke-width="1"/>
      <circle cx="40" cy="40" r="1.2" fill="#6e5a42"/>
    </svg>`,
    defaultWidth: 120,
    defaultHeight: 120,
    properties: [],
  },
  {
    id: 'bench',
    name: 'Bench',
    category: 'furniture',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Top-down bench: seat boards + armrests -->
      <rect x="6" y="10" width="108" height="22" rx="1" fill="#f0e8dc" stroke="#6e5a42" stroke-width="1.2"/>
      <!-- Seat plank lines -->
      <line x1="6" y1="16" x2="114" y2="16" stroke="#a8967e" stroke-width="0.5" opacity="0.4"/>
      <line x1="6" y1="21" x2="114" y2="21" stroke="#a8967e" stroke-width="0.5" opacity="0.4"/>
      <line x1="6" y1="26" x2="114" y2="26" stroke="#a8967e" stroke-width="0.5" opacity="0.4"/>
      <!-- Backrest line -->
      <path d="M6 10 L114 10" stroke="#6e5a42" stroke-width="1.8"/>
      <!-- Leg marks -->
      <rect x="10" y="8" width="4" height="26" rx="1" fill="none" stroke="#6e5a42" stroke-width="0.8"/>
      <rect x="106" y="8" width="4" height="26" rx="1" fill="none" stroke="#6e5a42" stroke-width="0.8"/>
    </svg>`,
    defaultWidth: 150,
    defaultHeight: 50,
    properties: [],
  },
  {
    id: 'umbrella',
    name: 'Umbrella',
    category: 'furniture',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Top-down umbrella: scalloped circle with ribs -->
      <path d="M40 6 C50 4, 62 8, 70 16 C78 24, 78 34, 76 40 C78 46, 78 56, 70 64 C62 72, 50 76, 40 74 C30 76, 18 72, 10 64 C2 56, 2 46, 4 40 C2 34, 2 24, 10 16 C18 8, 30 4, 40 6 Z"
        fill="#f2e0cc" stroke="#8a6e52" stroke-width="1.2"/>
      <!-- Rib lines -->
      <line x1="40" y1="6" x2="40" y2="74" stroke="#8a6e52" stroke-width="0.6" opacity="0.4"/>
      <line x1="6" y1="40" x2="74" y2="40" stroke="#8a6e52" stroke-width="0.6" opacity="0.4"/>
      <line x1="14" y1="14" x2="66" y2="66" stroke="#8a6e52" stroke-width="0.6" opacity="0.4"/>
      <line x1="66" y1="14" x2="14" y2="66" stroke="#8a6e52" stroke-width="0.6" opacity="0.4"/>
      <!-- Center pole -->
      <circle cx="40" cy="40" r="3" fill="#8a6e52" stroke="#5c4a36" stroke-width="0.8"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 200,
    properties: [],
  },

  // ═══════════════════════════════════════════
  // ── Structures ─────────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'fence',
    name: 'Fence',
    category: 'structures',
    behavior: 'path',
    svgPath: `<svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
      <!-- Fence: dashed line with X-marks for pickets -->
      <line x1="4" y1="10" x2="196" y2="10" stroke="#8a7e6e" stroke-width="2"/>
      <!-- Post crosses -->
      <g stroke="#6e5a42" stroke-width="1" opacity="0.7">
        <line x1="18" y1="2" x2="26" y2="18"/><line x1="26" y1="2" x2="18" y2="18"/>
        <line x1="58" y1="2" x2="66" y2="18"/><line x1="66" y1="2" x2="58" y2="18"/>
        <line x1="98" y1="2" x2="106" y2="18"/><line x1="106" y1="2" x2="98" y2="18"/>
        <line x1="138" y1="2" x2="146" y2="18"/><line x1="146" y1="2" x2="138" y2="18"/>
        <line x1="178" y1="2" x2="186" y2="18"/><line x1="186" y1="2" x2="178" y2="18"/>
      </g>
      <!-- Post dots -->
      <circle cx="22" cy="10" r="2" fill="#6e5a42"/>
      <circle cx="62" cy="10" r="2" fill="#6e5a42"/>
      <circle cx="102" cy="10" r="2" fill="#6e5a42"/>
      <circle cx="142" cy="10" r="2" fill="#6e5a42"/>
      <circle cx="182" cy="10" r="2" fill="#6e5a42"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 20,
    defaultStrokeWidth: 6,
    defaultStrokeColor: '#8a7e6e',
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 250, step: 10, unit: 'cm', defaultValue: 120 },
      { key: 'strokeWidth', label: 'Thickness', type: 'number', min: 2, max: 30, step: 1, unit: 'px', defaultValue: 6 },
    ],
  },
  {
    id: 'wall',
    name: 'Wall',
    category: 'structures',
    behavior: 'path',
    svgPath: `<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
      <!-- Wall: solid filled bar with brick hatching -->
      <rect x="2" y="2" width="196" height="26" fill="#d4cabe" stroke="#6e6256" stroke-width="1.4"/>
      <!-- Brick course lines -->
      <line x1="2" y1="10" x2="198" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="2" y1="20" x2="198" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <!-- Vertical joints row 1 -->
      <line x1="36" y1="2" x2="36" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="72" y1="2" x2="72" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="108" y1="2" x2="108" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="144" y1="2" x2="144" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="180" y1="2" x2="180" y2="10" stroke="#9a8e7e" stroke-width="0.5"/>
      <!-- Vertical joints row 2 (offset) -->
      <line x1="20" y1="10" x2="20" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="56" y1="10" x2="56" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="92" y1="10" x2="92" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="128" y1="10" x2="128" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="164" y1="10" x2="164" y2="20" stroke="#9a8e7e" stroke-width="0.5"/>
      <!-- Vertical joints row 3 -->
      <line x1="36" y1="20" x2="36" y2="28" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="72" y1="20" x2="72" y2="28" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="108" y1="20" x2="108" y2="28" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="144" y1="20" x2="144" y2="28" stroke="#9a8e7e" stroke-width="0.5"/>
      <line x1="180" y1="20" x2="180" y2="28" stroke="#9a8e7e" stroke-width="0.5"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 30,
    defaultStrokeWidth: 14,
    defaultStrokeColor: '#9a8e7e',
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 300, step: 10, unit: 'cm', defaultValue: 180 },
      { key: 'strokeWidth', label: 'Thickness', type: 'number', min: 2, max: 40, step: 1, unit: 'px', defaultValue: 14 },
    ],
  },
  {
    id: 'pergola',
    name: 'Pergola',
    category: 'structures',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Pergola: open frame with dashed overhead beams -->
      <rect x="6" y="6" width="108" height="108" fill="none" stroke="#6e5a42" stroke-width="1.8"/>
      <!-- Corner posts (filled squares) -->
      <rect x="4" y="4" width="8" height="8" fill="#6e5a42"/>
      <rect x="108" y="4" width="8" height="8" fill="#6e5a42"/>
      <rect x="4" y="108" width="8" height="8" fill="#6e5a42"/>
      <rect x="108" y="108" width="8" height="8" fill="#6e5a42"/>
      <!-- Overhead beams (dashed = open to sky) -->
      <line x1="6" y1="30" x2="114" y2="30" stroke="#8a7e6e" stroke-width="1.2" stroke-dasharray="6 4"/>
      <line x1="6" y1="50" x2="114" y2="50" stroke="#8a7e6e" stroke-width="1.2" stroke-dasharray="6 4"/>
      <line x1="6" y1="70" x2="114" y2="70" stroke="#8a7e6e" stroke-width="1.2" stroke-dasharray="6 4"/>
      <line x1="6" y1="90" x2="114" y2="90" stroke="#8a7e6e" stroke-width="1.2" stroke-dasharray="6 4"/>
      <!-- Shadow stipple -->
      <circle cx="30" cy="40" r="0.6" fill="#6e5a42" opacity="0.2"/>
      <circle cx="60" cy="60" r="0.6" fill="#6e5a42" opacity="0.2"/>
      <circle cx="90" cy="40" r="0.6" fill="#6e5a42" opacity="0.2"/>
      <circle cx="45" cy="80" r="0.6" fill="#6e5a42" opacity="0.2"/>
      <circle cx="75" cy="80" r="0.6" fill="#6e5a42" opacity="0.2"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 300,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 200, max: 400, step: 10, unit: 'cm', defaultValue: 250 },
    ],
  },
  {
    id: 'deck',
    name: 'Deck',
    category: 'structures',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Deck: planking with wood grain -->
      <rect x="2" y="2" width="146" height="96" fill="#ede4d6" stroke="#6e5a42" stroke-width="1.4"/>
      <!-- Plank lines -->
      <line x1="2" y1="18" x2="148" y2="18" stroke="#b0a08a" stroke-width="0.6"/>
      <line x1="2" y1="34" x2="148" y2="34" stroke="#b0a08a" stroke-width="0.6"/>
      <line x1="2" y1="50" x2="148" y2="50" stroke="#b0a08a" stroke-width="0.6"/>
      <line x1="2" y1="66" x2="148" y2="66" stroke="#b0a08a" stroke-width="0.6"/>
      <line x1="2" y1="82" x2="148" y2="82" stroke="#b0a08a" stroke-width="0.6"/>
      <!-- Subtle wood grain curves -->
      <path d="M20 6 Q24 12, 20 18" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
      <path d="M60 22 Q64 28, 60 34" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
      <path d="M100 38 Q104 44, 100 50" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
      <path d="M40 54 Q44 60, 40 66" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
      <path d="M120 70 Q124 76, 120 82" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
      <path d="M80 86 Q84 92, 80 98" fill="none" stroke="#c0b0a0" stroke-width="0.3" opacity="0.4"/>
    </svg>`,
    defaultWidth: 400,
    defaultHeight: 300,
    properties: [],
  },

  // ═══════════════════════════════════════════
  // ── Lighting ───────────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'path-light',
    name: 'Path Light',
    category: 'lighting',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <!-- Light glow halo -->
      <circle cx="15" cy="15" r="13" fill="#faf4e0" stroke="#c8b878" stroke-width="0.6" stroke-dasharray="2 1.5" opacity="0.5"/>
      <!-- Fixture body -->
      <circle cx="15" cy="15" r="5" fill="#faf0d0" stroke="#8a7a4a" stroke-width="1.2"/>
      <!-- Center filament -->
      <circle cx="15" cy="15" r="1.5" fill="#c8a840"/>
      <!-- Radial glow lines -->
      <line x1="15" y1="3" x2="15" y2="8" stroke="#c8b878" stroke-width="0.4" opacity="0.4"/>
      <line x1="15" y1="22" x2="15" y2="27" stroke="#c8b878" stroke-width="0.4" opacity="0.4"/>
      <line x1="3" y1="15" x2="8" y2="15" stroke="#c8b878" stroke-width="0.4" opacity="0.4"/>
      <line x1="22" y1="15" x2="27" y2="15" stroke="#c8b878" stroke-width="0.4" opacity="0.4"/>
    </svg>`,
    defaultWidth: 30,
    defaultHeight: 30,
    properties: [],
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    category: 'lighting',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Beam cone (dashed arc) -->
      <path d="M10 36 Q20 10, 30 36" fill="#faf4e0" fill-opacity="0.3" stroke="#c8b878" stroke-width="0.6" stroke-dasharray="2 1"/>
      <!-- Fixture housing -->
      <rect x="15" y="28" width="10" height="8" rx="2" fill="#f0e8dc" stroke="#5a5248" stroke-width="1.2"/>
      <!-- Lens -->
      <circle cx="20" cy="28" r="3" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.8"/>
    </svg>`,
    defaultWidth: 40,
    defaultHeight: 40,
    properties: [],
  },
  {
    id: 'string-lights',
    name: 'String Lights',
    category: 'lighting',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
      <!-- Catenary wire -->
      <path d="M6,12 Q50,4 100,14 Q150,24 194,12" fill="none" stroke="#5a5248" stroke-width="0.8"/>
      <!-- Bulbs with glow -->
      <circle cx="28" cy="9" r="5" fill="#faf4e0" stroke="#c8b878" stroke-width="0.5" opacity="0.4"/>
      <circle cx="28" cy="9" r="2.5" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.6"/>
      <circle cx="64" cy="7" r="5" fill="#faf4e0" stroke="#c8b878" stroke-width="0.5" opacity="0.4"/>
      <circle cx="64" cy="7" r="2.5" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.6"/>
      <circle cx="100" cy="14" r="5" fill="#faf4e0" stroke="#c8b878" stroke-width="0.5" opacity="0.4"/>
      <circle cx="100" cy="14" r="2.5" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.6"/>
      <circle cx="136" cy="21" r="5" fill="#faf4e0" stroke="#c8b878" stroke-width="0.5" opacity="0.4"/>
      <circle cx="136" cy="21" r="2.5" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.6"/>
      <circle cx="172" cy="14" r="5" fill="#faf4e0" stroke="#c8b878" stroke-width="0.5" opacity="0.4"/>
      <circle cx="172" cy="14" r="2.5" fill="#fae8b0" stroke="#8a7a4a" stroke-width="0.6"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 30,
    properties: [],
  },

  // ═══════════════════════════════════════════
  // ── Decorative ─────────────────────────────
  // ═══════════════════════════════════════════
  {
    id: 'flower-pot',
    name: 'Flower Pot',
    category: 'decorative',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Pot rim (top-down circle) -->
      <circle cx="25" cy="25" r="20" fill="#e8d8c4" stroke="#8a6e52" stroke-width="1.4"/>
      <!-- Inner pot edge -->
      <circle cx="25" cy="25" r="15" fill="#d4c0a8" stroke="#8a6e52" stroke-width="0.6"/>
      <!-- Plant foliage in pot -->
      <circle cx="20" cy="20" r="4" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="30" cy="22" r="3.5" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="25" cy="28" r="3" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <!-- Flower marks -->
      <circle cx="22" cy="18" r="1.2" fill="#c87070"/>
      <circle cx="30" cy="20" r="1" fill="#d4a0d4"/>
      <circle cx="26" cy="26" r="1.1" fill="#c87070"/>
    </svg>`,
    defaultWidth: 50,
    defaultHeight: 50,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 20, max: 100, step: 5, unit: 'cm', defaultValue: 40 },
    ],
  },
  {
    id: 'rock',
    name: 'Rock',
    category: 'decorative',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Irregular boulder outline with stipple shading -->
      <path d="M35 8 C48 6, 60 12, 64 24 C68 36, 62 48, 52 52 C42 56, 26 56, 16 48 C6 40, 4 26, 12 16 C20 8, 28 6, 35 8 Z"
        fill="#dcd4c8" stroke="#6e6256" stroke-width="1.2"/>
      <!-- Stipple shadow on right side -->
      <circle cx="50" cy="28" r="0.8" fill="#6e6256" opacity="0.3"/>
      <circle cx="54" cy="36" r="0.7" fill="#6e6256" opacity="0.25"/>
      <circle cx="48" cy="42" r="0.8" fill="#6e6256" opacity="0.3"/>
      <circle cx="56" cy="32" r="0.6" fill="#6e6256" opacity="0.25"/>
      <circle cx="52" cy="44" r="0.7" fill="#6e6256" opacity="0.2"/>
      <circle cx="44" cy="46" r="0.6" fill="#6e6256" opacity="0.2"/>
      <circle cx="58" cy="40" r="0.6" fill="#6e6256" opacity="0.2"/>
      <!-- Crack line -->
      <path d="M28 18 Q34 28, 30 38" fill="none" stroke="#9a8e7e" stroke-width="0.5" opacity="0.4"/>
    </svg>`,
    defaultWidth: 70,
    defaultHeight: 60,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 10, max: 150, step: 5, unit: 'cm', defaultValue: 30 },
    ],
  },
  {
    id: 'sculpture',
    name: 'Sculpture',
    category: 'decorative',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Pedestal base (square) -->
      <rect x="6" y="6" width="28" height="28" rx="1" fill="#ece4d8" stroke="#6e6256" stroke-width="1.2"/>
      <!-- Sculpture form (abstract shape) -->
      <path d="M20 12 C26 10, 30 16, 28 22 C26 28, 22 30, 20 28 C18 30, 14 28, 12 22 C10 16, 14 10, 20 12 Z"
        fill="none" stroke="#5a5248" stroke-width="1"/>
      <!-- Highlight dot -->
      <circle cx="20" cy="20" r="1.5" fill="#5a5248" opacity="0.4"/>
    </svg>`,
    defaultWidth: 60,
    defaultHeight: 60,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 30, max: 200, step: 10, unit: 'cm', defaultValue: 80 },
    ],
  },
  {
    id: 'garden-bed',
    name: 'Garden Bed',
    category: 'decorative',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Mulch/soil bed with organic edge -->
      <path d="M10 40 C8 24, 18 10, 36 8 C54 6, 68 10, 84 8 C100 6, 112 18, 112 34 C114 50, 106 66, 88 70 C70 74, 54 72, 36 72 C18 72, 8 58, 10 40 Z"
        fill="#c8b8a4" stroke="#6e5a42" stroke-width="1.2"/>
      <!-- Plant symbols -->
      <circle cx="32" cy="26" r="8" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="32" cy="26" r="3" fill="none" stroke="#5a7a44" stroke-width="0.6"/>
      <circle cx="60" cy="22" r="6" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="60" cy="22" r="2" fill="none" stroke="#5a7a44" stroke-width="0.6"/>
      <circle cx="86" cy="28" r="9" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="86" cy="28" r="4" fill="none" stroke="#5a7a44" stroke-width="0.6"/>
      <circle cx="40" cy="52" r="7" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="40" cy="52" r="2.5" fill="none" stroke="#5a7a44" stroke-width="0.6"/>
      <circle cx="68" cy="54" r="8" fill="none" stroke="#5a7a44" stroke-width="0.8"/>
      <circle cx="68" cy="54" r="3" fill="none" stroke="#5a7a44" stroke-width="0.6"/>
      <!-- Flower marks -->
      <circle cx="30" cy="24" r="1.2" fill="#c87070" opacity="0.7"/>
      <circle cx="62" cy="20" r="1" fill="#d4a0d4" opacity="0.7"/>
      <circle cx="84" cy="26" r="1.3" fill="#c87070" opacity="0.7"/>
      <circle cx="42" cy="50" r="1.1" fill="#d4a0d4" opacity="0.7"/>
      <circle cx="70" cy="52" r="1.2" fill="#c87070" opacity="0.7"/>
      <!-- Mulch stipple -->
      <circle cx="22" cy="38" r="0.6" fill="#6e5a42" opacity="0.25"/>
      <circle cx="50" cy="40" r="0.5" fill="#6e5a42" opacity="0.2"/>
      <circle cx="78" cy="44" r="0.6" fill="#6e5a42" opacity="0.25"/>
      <circle cx="96" cy="48" r="0.5" fill="#6e5a42" opacity="0.2"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 120,
    properties: [],
  },
];

export function getItemsByCategory(category: ItemCategory): LibraryItem[] {
  return libraryItems.filter((item) => item.category === category);
}
