/**
 * Sticker Album & Rewards Data for 4-Year-Old Children
 * Unlocks as the child earns stars through gameplay
 */
const STICKERS_DATABASE = [
  {
    id: 'star_first',
    name: 'Bintang Pertama',
    starsRequired: 1,
    desc: 'Kamu hebat memulai belajar!',
    color: '#FFD166',
    svg: `<svg viewBox="0 0 100 100">
      <polygon points="50,10 62,35 88,38 68,57 74,84 50,70 26,84 32,57 12,38 38,35" fill="#FFD166" stroke="#F59E0B" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="42" cy="48" r="4" fill="#78350F"/>
      <circle cx="58" cy="48" r="4" fill="#78350F"/>
      <path d="M44,58 Q50,65 56,58" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="36" cy="54" r="3.5" fill="#FF70A6" opacity="0.8"/>
      <circle cx="64" cy="54" r="3.5" fill="#FF70A6" opacity="0.8"/>
    </svg>`
  },
  {
    id: 'ice_cream',
    name: 'Es Krim Pelangi',
    starsRequired: 3,
    desc: 'Manis, segar, dan lezat!',
    color: '#FF85A1',
    svg: `<svg viewBox="0 0 100 100">
      <!-- Corong Kerucut -->
      <polygon points="32,54 68,54 50,92" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
      <line x1="38" y1="62" x2="62" y2="78" stroke="#D97706" stroke-width="2"/>
      <line x1="62" y1="62" x2="38" y2="78" stroke="#D97706" stroke-width="2"/>
      <!-- Bola Es Krim Bawah (Stroberi) -->
      <circle cx="50" cy="50" r="22" fill="#FF85A1"/>
      <!-- Bola Es Krim Atas (Cokelat/Mint) -->
      <circle cx="50" cy="34" r="18" fill="#48CAE4"/>
      <!-- Ceri Manis di Atas -->
      <circle cx="50" cy="16" r="8" fill="#EF4444"/>
      <path d="M50,16 Q58,6 64,8" stroke="#78350F" stroke-width="2.5" fill="none"/>
    </svg>`
  },
  {
    id: 'balloon_sky',
    name: 'Balon Udara',
    starsRequired: 5,
    desc: 'Terbang tinggi di langit!',
    color: '#06D6A0',
    svg: `<svg viewBox="0 0 100 100">
      <!-- Balon -->
      <ellipse cx="50" cy="40" rx="30" ry="34" fill="#06D6A0"/>
      <path d="M50,6 L50,74" stroke="#FFFFFF" stroke-width="4" opacity="0.6"/>
      <path d="M35,10 Q25,40 35,70" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M65,10 Q75,40 65,70" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.6"/>
      <!-- Tali -->
      <line x1="40" y1="74" x2="44" y2="82" stroke="#64748B" stroke-width="2"/>
      <line x1="60" y1="74" x2="56" y2="82" stroke="#64748B" stroke-width="2"/>
      <!-- Keranjang -->
      <rect x="42" y="82" width="16" height="12" rx="3" fill="#B45309"/>
    </svg>`
  },
  {
    id: 'rocket',
    name: 'Roket Bintang',
    starsRequired: 8,
    desc: 'Meluncur cepat ke angkasa!',
    color: '#3A86FF',
    svg: `<svg viewBox="0 0 100 100">
      <!-- Sayap Kiri & Kanan -->
      <polygon points="32,60 16,78 35,76" fill="#EF4444"/>
      <polygon points="68,60 84,78 65,76" fill="#EF4444"/>
      <!-- Api Knalpot -->
      <polygon points="44,82 50,96 56,82" fill="#FBBF24"/>
      <!-- Badan Roket -->
      <ellipse cx="50" cy="48" rx="20" ry="34" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <path d="M30,34 Q50,10 70,34 Z" fill="#EF4444"/>
      <!-- Jendela Kaca -->
      <circle cx="50" cy="46" r="10" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/>
      <circle cx="52" cy="43" r="3" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'crown',
    name: 'Mahkota Emas',
    starsRequired: 12,
    desc: 'Kamu raja & ratu pintar!',
    color: '#F59E0B',
    svg: `<svg viewBox="0 0 100 100">
      <polygon points="20,70 15,35 36,54 50,26 64,54 85,35 80,70" fill="#FBBF24" stroke="#D97706" stroke-width="3" stroke-linejoin="round"/>
      <rect x="20" y="70" width="60" height="12" rx="4" fill="#D97706"/>
      <!-- Permata -->
      <circle cx="50" cy="32" r="5" fill="#EF4444"/>
      <circle cx="17" cy="40" r="4" fill="#3B82F6"/>
      <circle cx="83" cy="40" r="4" fill="#10B981"/>
      <circle cx="35" cy="76" r="3" fill="#EC4899"/>
      <circle cx="50" cy="76" r="3" fill="#38BDF8"/>
      <circle cx="65" cy="76" r="3" fill="#EC4899"/>
    </svg>`
  },
  {
    id: 'trophy',
    name: 'Piala Juara',
    starsRequired: 16,
    desc: 'Hebat sekali, jagoan kecil!',
    color: '#FBBF24',
    svg: `<svg viewBox="0 0 100 100">
      <!-- Gagang Kiri & Kanan -->
      <path d="M28,32 C12,32 12,58 28,58" stroke="#D97706" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M72,32 C88,32 88,58 72,58" stroke="#D97706" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Cangkir Piala -->
      <path d="M26,24 L74,24 L70,55 C70,70 58,74 50,74 C42,74 30,70 30,55 Z" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
      <!-- Tiang & Tatakan -->
      <rect x="46" y="74" width="8" height="12" fill="#D97706"/>
      <rect x="34" y="86" width="32" height="10" rx="3" fill="#78350F"/>
      <!-- Bintang di Cangkir -->
      <polygon points="50,38 53,46 61,46 55,50 57,58 50,53 43,58 45,50 39,46 47,46" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: 'rainbow',
    name: 'Pelangi Bahagia',
    starsRequired: 20,
    desc: 'Dunia penuh warna warni ceria!',
    color: '#EC4899',
    svg: `<svg viewBox="0 0 100 100">
      <path d="M15,80 A35,35 0 0,1 85,80" stroke="#EF4444" stroke-width="6" fill="none"/>
      <path d="M21,80 A29,29 0 0,1 79,80" stroke="#F59E0B" stroke-width="6" fill="none"/>
      <path d="M27,80 A23,23 0 0,1 73,80" stroke="#10B981" stroke-width="6" fill="none"/>
      <path d="M33,80 A17,17 0 0,1 67,80" stroke="#3B82F6" stroke-width="6" fill="none"/>
      <path d="M39,80 A11,11 0 0,1 61,80" stroke="#8B5CF6" stroke-width="6" fill="none"/>
      <!-- Awan di Ujung Kiri & Kanan -->
      <circle cx="18" cy="80" r="10" fill="#E2E8F0"/>
      <circle cx="82" cy="80" r="10" fill="#E2E8F0"/>
    </svg>`
  },
  {
    id: 'super_hero',
    name: 'Medali Super Hero',
    starsRequired: 25,
    desc: 'Kamu bintang terhebat!',
    color: '#8B5CF6',
    svg: `<svg viewBox="0 0 100 100">
      <!-- Pita Merah Putih -->
      <polygon points="35,12 25,48 42,42" fill="#EF4444"/>
      <polygon points="65,12 75,48 58,42" fill="#3B82F6"/>
      <!-- Keping Medali Emas -->
      <circle cx="50" cy="58" r="28" fill="#FBBF24" stroke="#D97706" stroke-width="4"/>
      <circle cx="50" cy="58" r="22" fill="#FCD34D"/>
      <!-- Ikon Huruf Pintar "A+" -->
      <text x="50" y="66" font-size="20" font-weight="900" fill="#78350F" text-anchor="middle" font-family="sans-serif">A+</text>
    </svg>`
  }
];

