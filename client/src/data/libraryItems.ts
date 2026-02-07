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
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" rx="3" fill="#7EC88B" stroke="#6AB878" stroke-width="2" stroke-dasharray="4 2"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" fill="#7EC88B"/>
      <path d="M5 38 L7 28 L9 38" stroke="#6AB878" stroke-width="0.8" fill="none"/>
      <path d="M18 38 L20 30 L22 38" stroke="#5A9E6A" stroke-width="0.8" fill="none"/>
      <path d="M32 38 L34 32 L36 38" stroke="#6AB878" stroke-width="0.8" fill="none"/>
      <path d="M12 20 L14 12 L16 20" stroke="#6AB878" stroke-width="0.8" fill="none"/>
      <path d="M26 20 L28 10 L30 20" stroke="#5A9E6A" stroke-width="0.8" fill="none"/>
      <path d="M2 20 L4 14 L6 20" stroke="#5A9E6A" stroke-width="0.8" fill="none"/>
    </svg>`,
    patternWidth: 40,
    patternHeight: 40,
    defaultWidth: 500,
    defaultHeight: 500,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#7EC88B' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
    ],
  },
  {
    id: 'paver-patio',
    name: 'Paver Patio',
    category: 'ground-cover',
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#C4A882" stroke="#B09870" stroke-width="2"/>
      <line x1="33" y1="2" x2="33" y2="98" stroke="#B09870" stroke-width="1"/>
      <line x1="66" y1="2" x2="66" y2="98" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="33" x2="98" y2="33" stroke="#B09870" stroke-width="1"/>
      <line x1="2" y1="66" x2="98" y2="66" stroke="#B09870" stroke-width="1"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" fill="#C4A882"/>
      <rect x="1" y="1" width="28" height="28" fill="#CCBA96" stroke="#B09870" stroke-width="0.5"/>
      <rect x="31" y="1" width="28" height="28" fill="#C4A882" stroke="#B09870" stroke-width="0.5"/>
      <rect x="1" y="31" width="28" height="28" fill="#C4A882" stroke="#B09870" stroke-width="0.5"/>
      <rect x="31" y="31" width="28" height="28" fill="#CCBA96" stroke="#B09870" stroke-width="0.5"/>
    </svg>`,
    patternWidth: 60,
    patternHeight: 60,
    defaultWidth: 400,
    defaultHeight: 400,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#C4A882' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
    ],
  },
  {
    id: 'gravel',
    name: 'Gravel Path',
    category: 'ground-cover',
    behavior: 'repeatable',
    svgPath: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" fill="#D4C5A9" stroke="#C4B599" stroke-width="2"/>
      <circle cx="20" cy="25" r="4" fill="#C4B599"/><circle cx="45" cy="15" r="3" fill="#BEA88E"/>
      <circle cx="70" cy="30" r="5" fill="#C4B599"/><circle cx="80" cy="60" r="3" fill="#BEA88E"/>
    </svg>`,
    patternSvg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" fill="#D4C5A9"/>
      <circle cx="10" cy="12" r="3.5" fill="#C4B599" opacity="0.8"/>
      <circle cx="30" cy="8" r="2.5" fill="#BEA88E" opacity="0.7"/>
      <circle cx="45" cy="18" r="4" fill="#C4B599" opacity="0.8"/>
      <circle cx="18" cy="32" r="3" fill="#BEA88E" opacity="0.7"/>
      <circle cx="38" cy="35" r="3.5" fill="#C4B599" opacity="0.8"/>
      <circle cx="8" cy="45" r="2.5" fill="#BEA88E" opacity="0.7"/>
      <circle cx="28" cy="46" r="3" fill="#C4B599" opacity="0.8"/>
      <circle cx="46" cy="42" r="2" fill="#BEA88E" opacity="0.7"/>
    </svg>`,
    patternWidth: 50,
    patternHeight: 50,
    defaultWidth: 300,
    defaultHeight: 100,
    properties: [
      { key: 'fill', label: 'Color', type: 'color', defaultValue: '#D4C5A9' },
      { key: 'patternAngle', label: 'Pattern Direction', type: 'number', min: 0, max: 360, step: 15, defaultValue: 0, unit: '°' },
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
    behavior: 'path',
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
    defaultStrokeWidth: 8,
    defaultStrokeColor: '#C4A882',
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 250, step: 10, unit: 'cm', defaultValue: 120 },
      { key: 'strokeWidth', label: 'Thickness', type: 'number', min: 2, max: 30, step: 1, unit: 'px', defaultValue: 8 },
    ],
  },
  {
    id: 'wall',
    name: 'Wall',
    category: 'structures',
    behavior: 'path',
    svgPath: `<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="26" fill="#9E8E7E" stroke="#8E7E6E" stroke-width="2"/>
      <line x1="40" y1="2" x2="40" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="80" y1="2" x2="80" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="120" y1="2" x2="120" y2="28" stroke="#8E7E6E" stroke-width="1"/>
      <line x1="160" y1="2" x2="160" y2="28" stroke="#8E7E6E" stroke-width="1"/>
    </svg>`,
    defaultWidth: 300,
    defaultHeight: 30,
    defaultStrokeWidth: 12,
    defaultStrokeColor: '#9E8E7E',
    properties: [
      { key: 'height', label: 'Height', type: 'number', min: 50, max: 300, step: 10, unit: 'cm', defaultValue: 180 },
      { key: 'strokeWidth', label: 'Thickness', type: 'number', min: 2, max: 40, step: 1, unit: 'px', defaultValue: 12 },
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
