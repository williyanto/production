/**
 * Data Mode "Warna & Bentuk" — bentuk dasar & warna untuk anak usia 4 tahun.
 */
const SHAPES_DATABASE = [
  { id: 'lingkaran', name: 'lingkaran', emoji: '⚪', svgInner: (c) => `<circle cx="50" cy="50" r="40" fill="${c}"/>` },
  { id: 'persegi', name: 'persegi', emoji: '⬜', svgInner: (c) => `<rect x="12" y="12" width="76" height="76" rx="10" fill="${c}"/>` },
  { id: 'segitiga', name: 'segitiga', emoji: '🔺', svgInner: (c) => `<polygon points="50,8 93,88 7,88" fill="${c}" stroke-linejoin="round"/>` },
  { id: 'bintang', name: 'bintang', emoji: '⭐', svgInner: (c) => `<polygon points="50,5 61,37 95,37 67,57 78,91 50,71 22,91 33,57 5,37 39,37" fill="${c}" stroke-linejoin="round"/>` },
  { id: 'hati', name: 'hati', emoji: '💖', svgInner: (c) => `<path d="M50,88 C20,66 6,48 6,30 C6,16 18,6 31,6 C40,6 46,11 50,18 C54,11 60,6 69,6 C82,6 94,16 94,30 C94,48 80,66 50,88 Z" fill="${c}"/>` },
  { id: 'oval', name: 'oval', emoji: '🥚', svgInner: (c) => `<ellipse cx="50" cy="50" rx="44" ry="30" fill="${c}"/>` }
];

const COLORS_DATABASE = [
  { id: 'merah', name: 'merah', hex: '#EF4444' },
  { id: 'biru', name: 'biru', hex: '#3B82F6' },
  { id: 'kuning', name: 'kuning', hex: '#FACC15' },
  { id: 'hijau', name: 'hijau', hex: '#22C55E' },
  { id: 'ungu', name: 'ungu', hex: '#A855F7' },
  { id: 'oranye', name: 'oranye', hex: '#F97316' },
  { id: 'merah muda', name: 'merah muda', hex: '#F472B6' }
];

function renderShapeSVG(shape, hex) {
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
    <g stroke="rgba(15,23,42,0.18)" stroke-width="4">${shape.svgInner(hex)}</g>
    <ellipse cx="36" cy="32" rx="10" ry="6" fill="#FFFFFF" opacity="0.35"/>
  </svg>`;
}
