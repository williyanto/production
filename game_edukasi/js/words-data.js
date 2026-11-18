/**
 * Words Data for 4-Year-Old Children
 * Curated simple words with cute inline SVGs and cheerful descriptions
 */
const WORDS_DATABASE = [
  {
    id: 'bola',
    word: 'BOLA',
    letters: ['B', 'O', 'L', 'A'],
    category: 'Mainan',
    themeColor: '#FF6B6B',
    bgColor: '#FFF0F0',
    soundText: 'BOLA',
    sentence: 'Ini Bola! Ayo tendang bolanya!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <radialGradient id="ballGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="30%" stop-color="#FF5E7E" />
          <stop offset="100%" stop-color="#D61C4E" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="68" fill="url(#ballGrad)" filter="drop-shadow(0 8px 12px rgba(214,28,78,0.3))"/>
      <path d="M45,45 Q80,25 115,45 Q135,80 115,115 Q80,135 45,115 Q25,80 45,45 Z" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-dasharray="16, 8"/>
      <circle cx="80" cy="80" r="22" fill="#FFD166" stroke="#FFFFFF" stroke-width="4"/>
      <circle cx="58" cy="55" r="10" fill="#FFFFFF" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'apel',
    word: 'APEL',
    letters: ['A', 'P', 'E', 'L'],
    category: 'Buah Manis',
    themeColor: '#E63946',
    bgColor: '#FDECEF',
    soundText: 'APEL',
    sentence: 'Apel merah rasanya manis dan sehat!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FF8A8A" />
          <stop offset="40%" stop-color="#E63946" />
          <stop offset="100%" stop-color="#9E0A1E" />
        </radialGradient>
      </defs>
      <!-- Tangkai & Daun -->
      <path d="M80,35 Q85,15 95,12" stroke="#6F4E37" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M85,25 Q115,15 110,32 Q95,35 85,25 Z" fill="#2EC4B6"/>
      <!-- Badan Apel -->
      <path d="M80,45 C50,30 25,55 28,95 C30,135 65,145 80,138 C95,145 130,135 132,95 C135,55 110,30 80,45 Z" fill="url(#appleGrad)" filter="drop-shadow(0 8px 14px rgba(158,10,30,0.3))"/>
      <!-- Highlight -->
      <ellipse cx="56" cy="65" rx="14" ry="24" transform="rotate(-25 56 65)" fill="#FFFFFF" opacity="0.45"/>
    </svg>`
  },
  {
    id: 'ikan',
    word: 'IKAN',
    letters: ['I', 'K', 'A', 'N'],
    category: 'Hewan Air',
    themeColor: '#3A86FF',
    bgColor: '#EDF5FF',
    soundText: 'IKAN',
    sentence: 'Ikan berenang gembira di dalam air!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="fishGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#60EFFF" />
          <stop offset="60%" stop-color="#3A86FF" />
          <stop offset="100%" stop-color="#0043A8" />
        </linearGradient>
      </defs>
      <!-- Ekor -->
      <path d="M35,80 L12,50 Q28,80 12,110 Z" fill="#FFBE0B"/>
      <!-- Badan Ikan -->
      <path d="M35,80 C40,40 100,35 135,75 C100,115 40,110 35,80 Z" fill="url(#fishGrad)" filter="drop-shadow(0 8px 12px rgba(0,67,168,0.25))"/>
      <!-- Sirip Atas -->
      <path d="M70,42 Q85,25 105,40" fill="#FFBE0B" stroke="#FFBE0B" stroke-width="8" stroke-linecap="round"/>
      <!-- Sirip Bawah -->
      <path d="M75,108 Q88,125 100,105" fill="#FFBE0B" stroke="#FFBE0B" stroke-width="6" stroke-linecap="round"/>
      <!-- Mata Lucu -->
      <circle cx="115" cy="68" r="9" fill="#FFFFFF"/>
      <circle cx="117" cy="67" r="5" fill="#1D3557"/>
      <circle cx="119" cy="65" r="2" fill="#FFFFFF"/>
      <!-- Senyum & Pipik -->
      <path d="M125,82 Q130,86 126,90" stroke="#1D3557" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="106" cy="82" r="5" fill="#FF70A6" opacity="0.8"/>
      <!-- Sisik -->
      <path d="M75,65 Q85,75 75,85" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.5"/>
      <path d="M60,68 Q70,78 60,88" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'susu',
    word: 'SUSU',
    letters: ['S', 'U', 'S', 'U'],
    category: 'Minuman Sehat',
    themeColor: '#06D6A0',
    bgColor: '#E6FAF5',
    soundText: 'SUSU',
    sentence: 'Susu membuat tubuh kuat dan cerdas!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="milkBox" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#48CAE4"/>
          <stop offset="100%" stop-color="#0096C7"/>
        </linearGradient>
      </defs>
      <!-- Atap Kotak Susu -->
      <polygon points="50,55 80,30 110,55" fill="#90E0EF"/>
      <polygon points="80,30 80,20 95,20 95,30" fill="#CAF0F8"/>
      <!-- Kotak Badan -->
      <rect x="50" y="55" width="60" height="75" rx="8" fill="url(#milkBox)" filter="drop-shadow(0 8px 12px rgba(0,150,199,0.25))"/>
      <!-- Label Putih Susu -->
      <circle cx="80" cy="92" r="20" fill="#FFFFFF"/>
      <!-- Gambar Tetesan Susu -->
      <path d="M80,82 C75,90 73,95 73,98 C73,103 76,106 80,106 C84,106 87,103 87,98 C87,95 85,90 80,82 Z" fill="#06D6A0"/>
      <!-- Bintang kecil -->
      <circle cx="63" cy="70" r="3" fill="#FFD166"/>
      <circle cx="97" cy="115" r="3" fill="#FFD166"/>
    </svg>`
  },
  {
    id: 'buku',
    word: 'BUKU',
    letters: ['B', 'U', 'K', 'U'],
    category: 'Peralatan Belajar',
    themeColor: '#7209B7',
    bgColor: '#F5EEF9',
    soundText: 'BUKU',
    sentence: 'Buku jendela ilmu, seru sekali dibaca!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#9D4EDD"/>
          <stop offset="100%" stop-color="#5A189A"/>
        </linearGradient>
      </defs>
      <!-- Sampul Bawah -->
      <rect x="25" y="45" width="110" height="85" rx="10" fill="url(#bookCover)" filter="drop-shadow(0 8px 14px rgba(90,24,154,0.3))"/>
      <!-- Halaman Kertas Putih Tebal -->
      <rect x="30" y="40" width="100" height="80" rx="8" fill="#F8F9FA"/>
      <!-- Halaman Kertas Depan Terbuka -->
      <path d="M35,45 Q80,52 80,115 Q35,108 35,45 Z" fill="#FFFFFF" stroke="#E9ECEF" stroke-width="2"/>
      <path d="M125,45 Q80,52 80,115 Q125,108 125,45 Z" fill="#FFFFFF" stroke="#E9ECEF" stroke-width="2"/>
      <!-- Garis Tulisan Kartun Lucu -->
      <line x1="45" y1="62" x2="70" y2="62" stroke="#FFB703" stroke-width="4" stroke-linecap="round"/>
      <line x1="45" y1="74" x2="68" y2="74" stroke="#48CAE4" stroke-width="4" stroke-linecap="round"/>
      <line x1="45" y1="86" x2="64" y2="86" stroke="#FB8500" stroke-width="4" stroke-linecap="round"/>
      <!-- Bintang / Bookmark -->
      <path d="M92,58 L95,66 L104,66 L97,71 L99,80 L92,75 L85,80 L87,71 L80,66 L89,66 Z" fill="#FFD166"/>
      <!-- Garis tengah jilid -->
      <line x1="80" y1="42" x2="80" y2="118" stroke="#D8B4E2" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'roti',
    word: 'ROTI',
    letters: ['R', 'O', 'T', 'I'],
    category: 'Makanan Lezat',
    themeColor: '#D97706',
    bgColor: '#FFFBEB',
    soundText: 'ROTI',
    sentence: 'Roti hangat enak dimakan saat sarapan!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <!-- Roti Tawar Ceria -->
      <path d="M35,65 C35,45 50,35 80,35 C110,35 125,45 125,65 C132,80 132,105 122,122 C115,128 45,128 38,122 C28,105 28,80 35,65 Z" 
            fill="#B45309" filter="drop-shadow(0 8px 12px rgba(180,83,9,0.3))"/>
      <!-- Bagian Dalam Roti Empuk -->
      <path d="M42,68 C42,52 55,44 80,44 C105,44 118,52 118,68 C124,80 124,102 115,116 C110,120 50,120 45,116 C36,102 36,80 42,68 Z" 
            fill="#FDE68A"/>
      <!-- Mata Lucu Roti -->
      <circle cx="68" cy="78" r="6" fill="#78350F"/>
      <circle cx="92" cy="78" r="6" fill="#78350F"/>
      <circle cx="70" cy="76" r="2" fill="#FFFFFF"/>
      <circle cx="94" cy="76" r="2" fill="#FFFFFF"/>
      <!-- Senyum & Pipi Merona -->
      <path d="M74,88 Q80,95 86,88" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="60" cy="86" r="5" fill="#F43F5E" opacity="0.6"/>
      <circle cx="100" cy="86" r="5" fill="#F43F5E" opacity="0.6"/>
      <!-- Mentega Meleleh -->
      <rect x="72" y="55" width="16" height="12" rx="3" fill="#FBBF24"/>
    </svg>`
  },
  {
    id: 'mata',
    word: 'MATA',
    letters: ['M', 'A', 'T', 'A'],
    category: 'Panca Indera',
    themeColor: '#0EA5E9',
    bgColor: '#F0F9FF',
    soundText: 'MATA',
    sentence: 'Mata kita untuk melihat indahnya dunia!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <!-- Sepasang Mata Ceria -->
      <!-- Mata Kiri -->
      <ellipse cx="55" cy="80" rx="28" ry="32" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" filter="drop-shadow(0 6px 10px rgba(2,132,199,0.25))"/>
      <circle cx="58" cy="80" r="16" fill="#0369A1"/>
      <circle cx="61" cy="77" r="7" fill="#0C4A6E"/>
      <circle cx="64" cy="74" r="5" fill="#FFFFFF"/>
      <circle cx="54" cy="86" r="2.5" fill="#FFFFFF"/>
      <!-- Bulu Mata Kiri -->
      <path d="M42,50 Q48,44 55,46" stroke="#0284C7" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Mata Kanan -->
      <ellipse cx="105" cy="80" rx="28" ry="32" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" filter="drop-shadow(0 6px 10px rgba(2,132,199,0.25))"/>
      <circle cx="102" cy="80" r="16" fill="#0369A1"/>
      <circle cx="99" cy="77" r="7" fill="#0C4A6E"/>
      <circle cx="102" cy="74" r="5" fill="#FFFFFF"/>
      <circle cx="94" cy="86" r="2.5" fill="#FFFFFF"/>
      <!-- Bulu Mata Kanan -->
      <path d="M105,46 Q112,44 118,50" stroke="#0284C7" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Bintang Sparkle -->
      <polygon points="80,68 82,75 89,77 82,79 80,86 78,79 71,77 78,75" fill="#FACC15"/>
    </svg>`
  },
  {
    id: 'topi',
    word: 'TOPI',
    letters: ['T', 'O', 'P', 'I'],
    category: 'Pakaian',
    themeColor: '#EC4899',
    bgColor: '#FDF2F8',
    soundText: 'TOPI',
    sentence: 'Topi keren melindungi kepala dari panas terik!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="hatGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F472B6"/>
          <stop offset="100%" stop-color="#DB2777"/>
        </linearGradient>
      </defs>
      <!-- Kubah Topi -->
      <path d="M45,100 C40,55 120,55 115,100 Z" fill="url(#hatGrad)" filter="drop-shadow(0 8px 12px rgba(219,39,119,0.3))"/>
      <!-- Garis Lidah Topi Baseball -->
      <ellipse cx="95" cy="106" rx="48" ry="12" fill="#F59E0B"/>
      <!-- Kancing Atas Topi -->
      <circle cx="80" cy="55" r="7" fill="#FCD34D"/>
      <!-- Garis Hiasan Putih -->
      <path d="M80,56 Q80,78 80,100" stroke="#FFFFFF" stroke-width="3" opacity="0.6" fill="none"/>
      <path d="M80,56 Q62,75 52,100" stroke="#FFFFFF" stroke-width="3" opacity="0.6" fill="none"/>
      <path d="M80,56 Q98,75 108,100" stroke="#FFFFFF" stroke-width="3" opacity="0.6" fill="none"/>
      <!-- Badge Bintang di Depan Topi -->
      <circle cx="80" cy="82" r="10" fill="#FFFFFF"/>
      <polygon points="80,75 82,80 87,80 83,83 85,88 80,85 75,88 77,83 73,80 78,80" fill="#F43F5E"/>
    </svg>`
  },
  {
    id: 'bebek',
    word: 'BEBEK',
    letters: ['B', 'E', 'B', 'E', 'K'],
    category: 'Hewan Lucu',
    themeColor: '#F59E0B',
    bgColor: '#FEF3C7',
    soundText: 'BEBEK',
    sentence: 'Kwek kwek kwek! Bebek berenang gembira!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <radialGradient id="duckGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="60%" stop-color="#FACC15"/>
          <stop offset="100%" stop-color="#EAB308"/>
        </radialGradient>
      </defs>
      <!-- Ombak Air -->
      <path d="M20,130 Q35,124 50,130 Q65,136 80,130 Q95,124 110,130 Q125,136 140,130" stroke="#38BDF8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Badan Bebek Karet -->
      <path d="M40,105 C35,80 60,70 85,75 C105,75 125,85 130,100 C135,115 115,126 80,126 C50,126 38,120 40,105 Z" fill="url(#duckGrad)" filter="drop-shadow(0 6px 10px rgba(234,179,8,0.3))"/>
      <!-- Ekor Mencuat -->
      <path d="M35,100 Q22,90 32,80 Q42,88 45,95 Z" fill="#FACC15"/>
      <!-- Kepala Bebek -->
      <circle cx="102" cy="62" r="24" fill="url(#duckGrad)"/>
      <!-- Paruh Oranye -->
      <path d="M120,62 Q144,66 126,76 Z" fill="#F97316"/>
      <!-- Mata Bulat Cantik -->
      <circle cx="110" cy="56" r="5.5" fill="#1E293B"/>
      <circle cx="112" cy="54" r="2" fill="#FFFFFF"/>
      <!-- Pipi Merona -->
      <circle cx="98" cy="68" r="4.5" fill="#FB7185" opacity="0.7"/>
      <!-- Sayap Lucu -->
      <ellipse cx="78" cy="100" rx="16" ry="11" fill="#EAB308"/>
    </svg>`
  },
  {
    id: 'mobil',
    word: 'MOBIL',
    letters: ['M', 'O', 'B', 'I', 'L'],
    category: 'Kendaraan',
    themeColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    soundText: 'MOBIL',
    sentence: 'Brem brem! Mobil melaju kencang di jalan!',
    svg: `<svg viewBox="0 0 160 160" width="100%" height="100%">
      <defs>
        <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#A78BFA"/>
          <stop offset="100%" stop-color="#7C3AED"/>
        </linearGradient>
      </defs>
      <!-- Atap & Kaca Mobil -->
      <path d="M48,82 L62,55 Q65,50 72,50 L102,50 Q108,50 112,55 L124,82 Z" fill="#C4B5FD"/>
      <!-- Jendela Kiri & Kanan -->
      <polygon points="65,56 84,56 84,78 54,78" fill="#E0E7FF"/>
      <polygon points="88,56 108,56 118,78 88,78" fill="#E0E7FF"/>
      <!-- Badan Mobil -->
      <rect x="25" y="80" width="115" height="34" rx="12" fill="url(#carGrad)" filter="drop-shadow(0 8px 12px rgba(124,58,237,0.3))"/>
      <!-- Lampu Depan & Belakang -->
      <rect x="135" y="88" width="7" height="12" rx="3" fill="#FDE047"/>
      <rect x="23" y="88" width="5" height="10" rx="2" fill="#EF4444"/>
      <!-- Roda Kiri -->
      <circle cx="52" cy="114" r="16" fill="#334155"/>
      <circle cx="52" cy="114" r="7" fill="#E2E8F0"/>
      <!-- Roda Kanan -->
      <circle cx="112" cy="114" r="16" fill="#334155"/>
      <circle cx="112" cy="114" r="7" fill="#E2E8F0"/>
      <!-- Asap Knalpot Lucu -->
      <circle cx="18" cy="106" r="4" fill="#CBD5E1" opacity="0.6"/>
      <circle cx="10" cy="102" r="3" fill="#CBD5E1" opacity="0.4"/>
    </svg>`
  }
];

