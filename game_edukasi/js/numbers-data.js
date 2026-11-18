/**
 * Numbers & Counting Data for 4-Year-Old Children
 * Features interactive items that can be tapped to count,
 * with adorable SVGs and encouraging audio hints
 */
const NUMBERS_DATABASE = [
  {
    number: 1,
    itemName: 'Matahari Tersenyum',
    itemWord: 'matahari',
    themeColor: '#F59E0B',
    bgColor: '#FFFBEB',
    voicePrompt: 'Ada berapa matahari cerah di langit?',
    options: [1, 2, 3],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Sinar Matahari -->
      <g stroke="#F59E0B" stroke-width="6" stroke-linecap="round">
        <line x1="50" y1="10" x2="50" y2="20"/>
        <line x1="50" y1="80" x2="50" y2="90"/>
        <line x1="10" y1="50" x2="20" y2="50"/>
        <line x1="80" y1="50" x2="90" y2="50"/>
        <line x1="22" y1="22" x2="29" y2="29"/>
        <line x1="71" y1="71" x2="78" y2="78"/>
        <line x1="22" y1="78" x2="29" y2="71"/>
        <line x1="71" y1="29" x2="78" y2="22"/>
      </g>
      <!-- Lingkaran Matahari -->
      <circle cx="50" cy="50" r="28" fill="#FBBF24" filter="drop-shadow(0 4px 6px rgba(245,158,11,0.4))"/>
      <!-- Mata -->
      <circle cx="42" cy="46" r="3.5" fill="#78350F"/>
      <circle cx="58" cy="46" r="3.5" fill="#78350F"/>
      <!-- Senyum & Pipi -->
      <path d="M44,55 Q50,62 56,55" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="37" cy="53" r="3" fill="#F87171" opacity="0.8"/>
      <circle cx="63" cy="53" r="3" fill="#F87171" opacity="0.8"/>
    </svg>`
  },
  {
    number: 2,
    itemName: 'Kelinci Lucu',
    itemWord: 'kelinci',
    themeColor: '#EC4899',
    bgColor: '#FDF2F8',
    voicePrompt: 'Ada berapa kelinci lucu yang melompat?',
    options: [2, 1, 3],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Telinga -->
      <ellipse cx="40" cy="28" rx="8" ry="20" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="2"/>
      <ellipse cx="40" cy="28" rx="4" ry="14" fill="#FBCFE8"/>
      <ellipse cx="60" cy="28" rx="8" ry="20" fill="#F3F4F6" stroke="#E5E7EB" stroke-width="2"/>
      <ellipse cx="60" cy="28" rx="4" ry="14" fill="#FBCFE8"/>
      <!-- Kepala -->
      <circle cx="50" cy="62" r="26" fill="#F3F4F6" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
      <!-- Mata -->
      <circle cx="40" cy="58" r="4" fill="#1F2937"/>
      <circle cx="60" cy="58" r="4" fill="#1F2937"/>
      <circle cx="42" cy="56" r="1.5" fill="#FFFFFF"/>
      <circle cx="62" cy="56" r="1.5" fill="#FFFFFF"/>
      <!-- Hidung & Senyum -->
      <polygon points="50,66 47,63 53,63" fill="#EC4899"/>
      <path d="M47,68 Q50,72 53,68" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Pipi -->
      <circle cx="34" cy="64" r="4" fill="#F472B6" opacity="0.6"/>
      <circle cx="66" cy="64" r="4" fill="#F472B6" opacity="0.6"/>
    </svg>`
  },
  {
    number: 3,
    itemName: 'Bebek Kuning',
    itemWord: 'bebek',
    themeColor: '#F59E0B',
    bgColor: '#FEF3C7',
    voicePrompt: 'Ayo hitung, ada berapa bebek berenang?',
    options: [2, 3, 4],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <path d="M25,65 C22,50 40,42 55,45 C68,45 80,52 82,62 C85,72 72,78 50,78 C30,78 24,75 25,65 Z" fill="#FACC15" filter="drop-shadow(0 4px 6px rgba(245,158,11,0.3))"/>
      <path d="M22,62 Q14,54 20,48 Q26,53 28,58 Z" fill="#FACC15"/>
      <circle cx="66" cy="38" r="15" fill="#FACC15"/>
      <path d="M78,38 Q92,41 82,47 Z" fill="#F97316"/>
      <circle cx="71" cy="34" r="3.5" fill="#1E293B"/>
      <circle cx="72" cy="33" r="1" fill="#FFFFFF"/>
      <ellipse cx="50" cy="62" rx="10" ry="7" fill="#EAB308"/>
    </svg>`
  },
  {
    number: 4,
    itemName: 'Apel Merah',
    itemWord: 'apel',
    themeColor: '#EF4444',
    bgColor: '#FEE2E2',
    voicePrompt: 'Wah manisnya! Ada berapa buah apel?',
    options: [3, 4, 5],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <path d="M50,22 Q53,10 60,8" stroke="#78350F" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M53,16 Q72,10 68,22 Q58,24 53,16 Z" fill="#10B981"/>
      <path d="M50,30 C32,20 16,36 18,60 C20,84 42,90 50,86 C58,90 80,84 82,60 C84,36 68,20 50,30 Z" fill="#EF4444" filter="drop-shadow(0 4px 6px rgba(239,68,68,0.3))"/>
      <ellipse cx="36" cy="44" rx="8" ry="14" transform="rotate(-25 36 44)" fill="#FFFFFF" opacity="0.4"/>
    </svg>`
  },
  {
    number: 5,
    itemName: 'Bintang Berkilau',
    itemWord: 'bintang',
    themeColor: '#8B5CF6',
    bgColor: '#EDE9FE',
    voicePrompt: 'Kelip-kelip! Ada berapa bintang di malam hari?',
    options: [4, 5, 6],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <polygon points="50,12 61,36 86,39 67,56 72,82 50,68 28,82 33,56 14,39 39,36" fill="#FBBF24" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round" filter="drop-shadow(0 4px 8px rgba(245,158,11,0.35))"/>
      <circle cx="43" cy="46" r="3" fill="#78350F"/>
      <circle cx="57" cy="46" r="3" fill="#78350F"/>
      <path d="M46,55 Q50,60 54,55" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="38" cy="52" r="2.5" fill="#F43F5E" opacity="0.7"/>
      <circle cx="62" cy="52" r="2.5" fill="#F43F5E" opacity="0.7"/>
    </svg>`
  },
  {
    number: 6,
    itemName: 'Balon Terbang',
    itemWord: 'balon',
    themeColor: '#06D6A0',
    bgColor: '#E6FAF5',
    voicePrompt: 'Tinggi sekali! Ada berapa balon warna-warni?',
    options: [5, 6, 7],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Tali Balon -->
      <path d="M50,75 Q45,82 54,88 Q48,93 50,98" stroke="#94A3B8" stroke-width="2.5" fill="none"/>
      <!-- Simpul Balon -->
      <polygon points="46,75 54,75 50,71" fill="#06D6A0"/>
      <!-- Balon -->
      <ellipse cx="50" cy="42" rx="28" ry="32" fill="#06D6A0" filter="drop-shadow(0 4px 6px rgba(6,214,160,0.3))"/>
      <ellipse cx="38" cy="30" rx="6" ry="12" transform="rotate(-20 38 30)" fill="#FFFFFF" opacity="0.45"/>
    </svg>`
  },
  {
    number: 7,
    itemName: 'Permen Manis',
    itemWord: 'permen',
    themeColor: '#EC4899',
    bgColor: '#FDF2F8',
    voicePrompt: 'Yummy! Ada berapa permen manis di sini?',
    options: [6, 7, 8],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Bungkus Kiri & Kanan -->
      <polygon points="25,50 8,36 12,64" fill="#F472B6"/>
      <polygon points="75,50 92,36 88,64" fill="#F472B6"/>
      <!-- Bulatan Permen -->
      <circle cx="50" cy="50" r="26" fill="#EC4899" filter="drop-shadow(0 4px 6px rgba(236,72,153,0.3))"/>
      <!-- Motif Spiral Putih -->
      <path d="M38,38 Q50,45 62,38" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M34,50 Q50,56 66,50" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M38,62 Q50,55 62,62" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    number: 8,
    itemName: 'Kupu-kupu Cantik',
    itemWord: 'kupu-kupu',
    themeColor: '#3B82F6',
    bgColor: '#EFF6FF',
    voicePrompt: 'Sayapnya indah! Ada berapa kupu-kupu terbang?',
    options: [7, 8, 9],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Sayap Kiri -->
      <ellipse cx="32" cy="38" rx="18" ry="14" fill="#60A5FA" transform="rotate(-20 32 38)"/>
      <ellipse cx="34" cy="62" rx="14" ry="10" fill="#93C5FD" transform="rotate(15 34 62)"/>
      <!-- Sayap Kanan -->
      <ellipse cx="68" cy="38" rx="18" ry="14" fill="#60A5FA" transform="rotate(20 68 38)"/>
      <ellipse cx="66" cy="62" rx="14" ry="10" fill="#93C5FD" transform="rotate(-15 66 62)"/>
      <!-- Pola Sayap -->
      <circle cx="30" cy="38" r="5" fill="#FDE047"/>
      <circle cx="70" cy="38" r="5" fill="#FDE047"/>
      <!-- Badan -->
      <ellipse cx="50" cy="50" rx="5" ry="22" fill="#1E3A8A"/>
      <!-- Antena -->
      <path d="M48,32 Q42,20 38,22" stroke="#1E3A8A" stroke-width="2" fill="none"/>
      <path d="M52,32 Q58,20 62,22" stroke="#1E3A8A" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    number: 9,
    itemName: 'Kue Donat',
    itemWord: 'donat',
    themeColor: '#F97316',
    bgColor: '#FFF7ED',
    voicePrompt: 'Nyam nyam! Ada berapa kue donat lezat?',
    options: [8, 9, 10],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <!-- Donat Dasar -->
      <circle cx="50" cy="50" r="32" fill="#FBBF24" filter="drop-shadow(0 4px 6px rgba(249,115,22,0.3))"/>
      <!-- Cokelat / Glaze Stroberi -->
      <path d="M50,22 C68,22 78,32 78,50 C78,60 74,68 64,74 C56,72 52,78 46,76 C38,80 26,72 24,58 C22,42 32,22 50,22 Z" fill="#FB7185"/>
      <!-- Lubang Tengah -->
      <circle cx="50" cy="50" r="10" fill="#FFF7ED"/>
      <!-- Meses Warna Warni -->
      <line x1="38" y1="34" x2="44" y2="36" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="36" x2="64" y2="42" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/>
      <line x1="35" y1="56" x2="40" y2="60" stroke="#4ADE80" stroke-width="3" stroke-linecap="round"/>
      <line x1="62" y1="58" x2="56" y2="62" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    number: 10,
    itemName: 'Ikan Warna-Warni',
    itemWord: 'ikan',
    themeColor: '#0EA5E9',
    bgColor: '#F0F9FF',
    voicePrompt: 'Banyak sekali! Ayo hitung sepuluh ikan berenang!',
    options: [8, 9, 10],
    svg: `<svg viewBox="0 0 100 100" class="count-item-svg">
      <path d="M22,50 L8,32 Q18,50 8,68 Z" fill="#F59E0B"/>
      <path d="M22,50 C26,24 64,22 86,48 C64,74 26,72 22,50 Z" fill="#0EA5E9" filter="drop-shadow(0 4px 6px rgba(14,165,233,0.3))"/>
      <circle cx="72" cy="44" r="5" fill="#FFFFFF"/>
      <circle cx="74" cy="43" r="2.5" fill="#0C4A6E"/>
      <path d="M48,27 Q58,15 70,25" fill="#F59E0B"/>
      <circle cx="64" cy="52" r="3" fill="#FB7185" opacity="0.8"/>
    </svg>`
  }
];

