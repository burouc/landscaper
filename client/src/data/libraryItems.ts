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
  // ── Trees & Shrubs ──
  {
    id: 'oak-tree',
    name: 'Oak Tree',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#4A7C59" stroke="#3D6B4A" stroke-width="2"/>
      <circle cx="50" cy="50" r="30" fill="#5A8C69" stroke="#4A7C59" stroke-width="1"/>
      <circle cx="50" cy="50" r="15" fill="#6A9C79" stroke="#5A8C69" stroke-width="1"/>
      <circle cx="50" cy="50" r="5" fill="#3D6B4A"/>
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
      <polygon points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" fill="#2D5A3D" stroke="#1A4028" stroke-width="2"/>
      <circle cx="50" cy="50" r="8" fill="#1A4028"/>
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
      <ellipse cx="50" cy="50" rx="42" ry="38" fill="#6BAF7B" stroke="#5A9E6A" stroke-width="2"/>
      <ellipse cx="35" cy="40" rx="15" ry="12" fill="#7BBF8B" opacity="0.7"/>
      <ellipse cx="65" cy="55" rx="12" ry="10" fill="#7BBF8B" opacity="0.6"/>
    </svg>`,
    defaultWidth: 150,
    defaultHeight: 150,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 30, max: 300, step: 10, unit: 'cm', defaultValue: 100 },
    ],
  },
  {
    id: 'hedge',
    name: 'Hedge',
    category: 'trees-shrubs',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="190" height="50" rx="10" fill="#4A7C59" stroke="#3D6B4A" stroke-width="2"/>
      <rect x="15" y="15" width="170" height="30" rx="5" fill="#5A8C69" opacity="0.5"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 60,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 30, max: 250, step: 10, unit: 'cm', defaultValue: 120 },
    ],
  },

  // ── Ground Cover ──
  {
    id: 'lawn',
    name: 'Lawn',
    category: 'ground-cover',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" rx="3" fill="#7EC88B" stroke="#6AB878" stroke-width="2" stroke-dasharray="4 2"/>
    </svg>`,
    defaultWidth: 500,
    defaultHeight: 500,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#7EC88B' },
    ],
  },
  {
    id: 'paver-patio',
    name: 'Paver Patio',
    category: 'ground-cover',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#C4A882" stroke="#B09870" stroke-width="2"/>
      <line x1="33" y1="2" x2="33" y2="98" stroke="#B09870" stroke-width="1"/>
      <line x1="66" y1="2" x2="66" y2="98" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="33" x2="98" y2="33" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="66" x2="98" y2="66" stroke="#B09870" stroke-width="1"/>
    </svg>`,
    defaultWidth: 400,
    defaultHeight: 400,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#C4A882' },
    ],
  },
  {
    id: 'gravel',
    name: 'Gravel Path',
    category: 'ground-cover',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#D4C5A9" stroke="#C4B599" stroke-width="2"/>
      <circle cx="20" cy="25" r="4" fill="#C4B599"/><circle cx="45" cy="15" r="3" fill="#BEA88E"/>
      <circle cx="70" cy="30" r="5" fill="#C4B599"/><circle cx="30" cy="55" r="3" fill="#BEA88E"/>
      <circle cx="55" cy="50" r="4" fill="#C4B599"/><circle cx="80" cy="60" r="3" fill="#BEA88E"/>
      <circle cx="25" cy="80" r="4" fill="#C4B599"/><circle cx="60" cy="85" r="3" fill="#BEA88E"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 100,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#D4C5A9' },
    ],
  },
  {
    id: 'pond',
    name: 'Pond',
    category: 'ground-cover',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="40" rx="55" ry="35" fill="#5B9BD5" stroke="#4A8AC4" stroke-width="2"/>
      <ellipse cx="50" cy="35" rx="30" ry="18" fill="#6BABE5" opacity="0.5"/>
    </svg>`,
    defaultWidth: 360,
    defaultHeight: 240,
    properties: [
      { key: 'fill', label: 'Water Color', type: 'color', defaultValue: '#5B9BD5' },
    ],
  },

  // ── Furniture ──
  {
    id: 'chair',
    name: 'Chair',
    category: 'furniture',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="5" width="40" height="10" rx="2" fill="#8B6F47" stroke="#7A5F37" stroke-width="1.5"/>
      <rect x="10" y="15" width="40" height="35" rx="2" fill="#A0824E" stroke="#8B6F47" stroke-width="1.5"/>
      <rect x="8" y="13" width="5" height="40" rx="1" fill="#8B6F47"/>
      <rect x="47" y="13" width="5" height="40" rx="1" fill="#8B6F47"/>
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
      <circle cx="40" cy="40" r="35" fill="#A0824E" stroke="#8B6F47" stroke-width="2"/>
      <circle cx="40" cy="40" r="5" fill="#8B6F47"/>
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
      <rect x="5" y="5" width="110" height="30" rx="3" fill="#8B6F47" stroke="#7A5F37" stroke-width="2"/>
      <rect x="10" y="10" width="100" height="20" rx="2" fill="#A0824E"/>
      <rect x="5" y="5" width="8" height="30" rx="2" fill="#7A5F37"/>
      <rect x="107" y="5" width="8" height="30" rx="2" fill="#7A5F37"/>
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
      <circle cx="40" cy="40" r="35" fill="#E8A87C" stroke="#D4956C" stroke-width="2"/>
      <line x1="40" y1="5" x2="40" y2="75" stroke="#D4956C" stroke-width="1"/>
      <line x1="5" y1="40" x2="75" y2="40" stroke="#D4956C" stroke-width="1"/>
      <circle cx="40" cy="40" r="3" fill="#C4855C"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 200,
    properties: [],
  },

  // ── Structures ──
  {
    id: 'fence',
    name: 'Fence',
    category: 'structures',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="16" fill="#C4A882" stroke="#B09870" stroke-width="2"/>
      <rect x="10" y="0" width="4" height="20" fill="#B09870"/>
      <rect x="50" y="0" width="4" height="20" fill="#B09870"/>
      <rect x="90" y="0" width="4" height="20" fill="#B09870"/>
      <rect x="130" y="0" width="4" height="20" fill="#B09870"/>
      <rect x="170" y="0" width="4" height="20" fill="#B09870"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 20,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 250, step: 10, unit: 'cm', defaultValue: 120 },
    ],
  },
  {
    id: 'wall',
    name: 'Wall',
    category: 'structures',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="26" fill="#9E8E7E" stroke="#8E7E6E" stroke-width="2"/>
      <line x1="40" y1="2" x2="40" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="80" y1="2" x2="80" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="120" y1="2" x2="120" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="160" y1="2" x2="160" y2="28" stroke="#8E7E6E" stroke-width="1"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 30,
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 300, step: 10, unit: 'cm', defaultValue: 180 },
    ],
  },
  {
    id: 'pergola',
    name: 'Pergola',
    category: 'structures',
    behavior: 'freeform',
    svgPath: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="110" height="110" fill="none" stroke="#B09870" stroke-width="3"/>
      <rect x="5" y="5" width="8" height="8" fill="#8B6F47"/>
      <rect x="107" y="5" width="8" height="8" fill="#8B6F47"/>
      <rect x="5" y="107" width="8" height="8" fill="#8B6F47"/>
      <rect x="107" y="107" width="8" height="8" fill="#8B6F47"/>
      <line x1="5" y1="35" x2="115" y2="35" stroke="#C4A882" stroke-width="2"/>
      <line x1="5" y1="60" x2="115" y2="60" stroke="#C4A882" stroke-width="2"/>
      <line x1="5" y1="85" x2="115" y2="85" stroke="#C4A882" stroke-width="2"/>
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
      <rect x="2" y="2" width="146" height="96" fill="#C4A882" stroke="#B09870" stroke-width="2"/>
      <line x1="2" y1="22" x2="148" y2="22" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="42" x2="148" y2="42" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="62" x2="148" y2="62" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="82" x2="148" y2="82" stroke="#B09870" stroke-width="1"/>
    </svg>`,
    defaultWidth: 400,
    defaultHeight: 300,
    properties: [],
  },

  // ── Lighting ──
  {
    id: 'path-light',
    name: 'Path Light',
    category: 'lighting',
    behavior: 'fixed',
    svgPath: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12" fill="#FFF3C4" stroke="#E8D5A0" stroke-width="2" opacity="0.6"/>
      <circle cx="15" cy="15" r="6" fill="#FFE082" stroke="#D4B85C" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="2" fill="#D4B85C"/>
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
      <circle cx="20" cy="20" r="15" fill="#FFF3C4" stroke="#E8D5A0" stroke-width="1" opacity="0.4"/>
      <rect x="16" y="12" width="8" height="16" rx="2" fill="#555" stroke="#444" stroke-width="1"/>
      <circle cx="20" cy="12" r="4" fill="#FFE082"/>
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
      <path d="M5,15 Q50,5 100,15 Q150,25 195,15" fill="none" stroke="#555" stroke-width="1.5"/>
      <circle cx="25" cy="12" r="4" fill="#FFE082"/><circle cx="60" cy="9" r="4" fill="#FFE082"/>
      <circle cx="100" cy="15" r="4" fill="#FFE082"/><circle cx="140" cy="21" r="4" fill="#FFE082"/>
      <circle cx="175" cy="18" r="4" fill="#FFE082"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 30,
    properties: [],
  },

  // ── Decorative ──
  {
    id: 'flower-pot',
    name: 'Flower Pot',
    category: 'decorative',
    behavior: 'proportional',
    svgPath: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="20" fill="#D4956C" stroke="#C4855C" stroke-width="2"/>
      <circle cx="25" cy="25" r="14" fill="#6BAF7B" stroke="#5A9E6A" stroke-width="1"/>
      <circle cx="25" cy="25" r="5" fill="#5A9E6A"/>
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
      <ellipse cx="35" cy="30" rx="30" ry="25" fill="#9E8E7E" stroke="#8E7E6E" stroke-width="2"/>
      <ellipse cx="28" cy="25" rx="12" ry="8" fill="#AE9E8E" opacity="0.5"/>
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
      <rect x="8" y="8" width="24" height="24" rx="3" fill="#9E8E7E" stroke="#8E7E6E" stroke-width="2"/>
      <circle cx="20" cy="20" r="8" fill="#AE9E8E" stroke="#8E7E6E" stroke-width="1"/>
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
      <rect x="2" y="2" width="116" height="76" rx="5" fill="#5A3E2B" stroke="#4A2E1B" stroke-width="2"/>
      <circle cx="25" cy="25" r="8" fill="#6BAF7B" opacity="0.8"/>
      <circle cx="55" cy="20" r="6" fill="#8BC49B" opacity="0.8"/>
      <circle cx="85" cy="28" r="9" fill="#5A9E6A" opacity="0.8"/>
      <circle cx="35" cy="55" r="7" fill="#7BBF8B" opacity="0.8"/>
      <circle cx="65" cy="55" r="8" fill="#6BAF7B" opacity="0.8"/>
      <circle cx="95" cy="52" r="6" fill="#8BC49B" opacity="0.8"/>
    </svg>`,
    defaultWidth: 200,
    defaultHeight: 120,
    properties: [],
  },
];

export function getItemsByCategory(category: ItemCategory): LibraryItem[] {
  return libraryItems.filter((item) => item.category === category);
}
