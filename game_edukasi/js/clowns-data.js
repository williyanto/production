/**
 * Clowns Data & SVG Animations for Educational Milestone Rewards
 * 4 Distinct, Adorable, Kid-Friendly Clown Models
 */
const CLOWNS_DATABASE = [
  {
    id: 'boni',
    name: 'Badut Boni si Pelangi 🌈',
    role: 'Badut Ceria & Bola Putar',
    themeColor: '#FF477E',
    bgColor: '#FFF0F5',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg clown-boni" width="100%" height="100%">
      <defs>
        <radialGradient id="boniNose" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF8A8A"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </radialGradient>
        <radialGradient id="boniBall1" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#FDE047"/><stop offset="100%" stop-color="#EAB308"/></radialGradient>
        <radialGradient id="boniBall2" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#67E8F9"/><stop offset="100%" stop-color="#06B6D4"/></radialGradient>
        <radialGradient id="boniBall3" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#F472B6"/><stop offset="100%" stop-color="#DB2777"/></radialGradient>
      </defs>

      <!-- Juggling Balls (Animated Orbit) -->
      <g class="clown-prop clown-juggling-balls">
        <circle cx="50" cy="40" r="13" fill="url(#boniBall1)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
        <circle cx="100" cy="18" r="14" fill="url(#boniBall2)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
        <circle cx="150" cy="40" r="13" fill="url(#boniBall3)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
      </g>

      <!-- Feet (Tapping shoes) -->
      <g class="clown-feet">
        <!-- Sepatu Kiri -->
        <ellipse cx="65" cy="222" rx="26" ry="14" fill="#F97316" stroke="#C2410C" stroke-width="3"/>
        <circle cx="45" cy="218" r="8" fill="#FBBF24"/>
        <!-- Sepatu Kanan -->
        <ellipse cx="135" cy="222" rx="26" ry="14" fill="#F97316" stroke="#C2410C" stroke-width="3"/>
        <circle cx="155" cy="218" r="8" fill="#FBBF24"/>
      </g>

      <!-- Body / Costume (Polka dot overalls) -->
      <g class="clown-body">
        <path d="M60,140 Q100,130 140,140 L150,215 Q100,225 50,215 Z" fill="#06D6A0" stroke="#059669" stroke-width="3"/>
        <!-- Celana Kaki -->
        <path d="M50,212 L96,212 L96,175 L50,175 Z" fill="#06D6A0"/>
        <path d="M104,212 L150,212 L150,175 L104,175 Z" fill="#06D6A0"/>
        <line x1="100" y1="175" x2="100" y2="215" stroke="#047857" stroke-width="4"/>
        <!-- Polka dots -->
        <circle cx="75" cy="165" r="7" fill="#FDE047"/>
        <circle cx="125" cy="165" r="7" fill="#F472B6"/>
        <circle cx="90" cy="195" r="8" fill="#38BDF8"/>
        <circle cx="130" cy="198" r="6" fill="#FDE047"/>
        <circle cx="70" cy="195" r="6" fill="#A78BFA"/>
        <!-- Suspenders -->
        <path d="M72,138 L76,175" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
        <path d="M128,138 L124,175" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
        <circle cx="76" cy="175" r="5" fill="#FBBF24"/>
        <circle cx="124" cy="175" r="5" fill="#FBBF24"/>
      </g>

      <!-- Arms (Waving up & down) -->
      <g class="clown-arms">
        <!-- Lengan Kiri -->
        <path d="M62,145 Q30,120 42,95" stroke="#F43F5E" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="42" cy="95" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
        <!-- Lengan Kanan -->
        <path d="M138,145 Q170,120 158,95" stroke="#F43F5E" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="158" cy="95" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
      </g>

      <!-- Rainbow Curly Afro Hair -->
      <g class="clown-hair">
        <circle cx="55" cy="85" r="18" fill="#EF4444"/>
        <circle cx="45" cy="105" r="16" fill="#F59E0B"/>
        <circle cx="50" cy="125" r="15" fill="#10B981"/>
        <circle cx="145" cy="85" r="18" fill="#3B82F6"/>
        <circle cx="155" cy="105" r="16" fill="#8B5CF6"/>
        <circle cx="150" cy="125" r="15" fill="#EC4899"/>
        <circle cx="75" cy="65" r="16" fill="#FBBF24"/>
        <circle cx="125" cy="65" r="16" fill="#06B6D4"/>
      </g>

      <!-- Head & Face -->
      <g class="clown-head">
        <circle cx="100" cy="105" r="38" fill="#FFFBEB" stroke="#FCD34D" stroke-width="3"/>
        <!-- Riasan Putih Mulut & Mata -->
        <ellipse cx="100" cy="118" rx="24" ry="16" fill="#FFFFFF"/>
        <!-- Rosy Cheeks -->
        <circle cx="75" cy="112" r="9" fill="#FDA4AF" opacity="0.85"/>
        <circle cx="125" cy="112" r="9" fill="#FDA4AF" opacity="0.85"/>
        <!-- Happy Eyes -->
        <path d="M78,96 Q86,88 92,96" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M108,96 Q114,88 122,96" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="85" cy="86" r="3" fill="#38BDF8"/>
        <circle cx="115" cy="86" r="3" fill="#38BDF8"/>
        <!-- Giant Smile -->
        <path d="M82,118 Q100,136 118,118" stroke="#DC2626" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- Big Round Red Clown Nose -->
        <circle cx="100" cy="104" r="13" fill="url(#boniNose)" filter="drop-shadow(0 3px 6px rgba(220,38,38,0.4))"/>
        <circle cx="96" cy="100" r="3.5" fill="#FFFFFF" opacity="0.8"/>
      </g>

      <!-- Giant Polka Bow Tie -->
      <g class="clown-bowtie">
        <polygon points="100,138 72,125 74,152" fill="#F43F5E" stroke="#BE123C" stroke-width="2"/>
        <polygon points="100,138 128,125 126,152" fill="#F43F5E" stroke="#BE123C" stroke-width="2"/>
        <circle cx="100" cy="138" r="8" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
      </g>
    </svg>`
  },

  {
    id: 'bobo',
    name: 'Badut Bobo si Sirkus 🎪',
    role: 'Badut Sirkus & Piring Putar',
    themeColor: '#3B82F6',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg clown-bobo" width="100%" height="100%">
      <defs>
        <radialGradient id="boboNose" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FB7185"/>
          <stop offset="100%" stop-color="#E11D48"/>
        </radialGradient>
      </defs>

      <!-- Spinning Star Plate on Stick (Prop) -->
      <g class="clown-prop clown-spinning-plate">
        <line x1="165" y1="50" x2="165" y2="120" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
        <!-- Star Plate -->
        <ellipse cx="165" cy="50" rx="24" ry="9" fill="#FDE047" stroke="#EAB308" stroke-width="2.5"/>
        <polygon points="165,42 168,48 174,48 170,52 172,58 165,54 158,58 160,52 156,48 162,48" fill="#EF4444"/>
      </g>

      <!-- Feet (Big Blue Clown Boots) -->
      <g class="clown-feet">
        <ellipse cx="65" cy="222" rx="26" ry="14" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3"/>
        <circle cx="45" cy="218" r="7" fill="#FDE047"/>
        <ellipse cx="135" cy="222" rx="26" ry="14" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3"/>
        <circle cx="155" cy="218" r="7" fill="#FDE047"/>
      </g>

      <!-- Striped Circus Jumpsuit -->
      <g class="clown-body">
        <path d="M60,140 Q100,130 140,140 L152,215 Q100,225 48,215 Z" fill="#EF4444" stroke="#DC2626" stroke-width="3"/>
        <!-- White Stripes -->
        <path d="M72,138 L65,214" stroke="#FFFFFF" stroke-width="9"/>
        <path d="M96,135 L96,215" stroke="#FFFFFF" stroke-width="9"/>
        <path d="M120,135 L124,215" stroke="#FFFFFF" stroke-width="9"/>
        <line x1="100" y1="178" x2="100" y2="216" stroke="#B91C1C" stroke-width="4"/>
        <!-- Pom Poms on Suit -->
        <circle cx="100" cy="155" r="7" fill="#FDE047" stroke="#EAB308" stroke-width="2"/>
        <circle cx="100" cy="180" r="7" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
      </g>

      <!-- Arms -->
      <g class="clown-arms">
        <!-- Left arm waving -->
        <path d="M62,145 Q28,115 38,85" stroke="#3B82F6" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="38" cy="85" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
        <!-- Right arm balancing stick -->
        <path d="M138,145 Q160,135 165,120" stroke="#3B82F6" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="165" cy="120" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
      </g>

      <!-- Hair Puffs -->
      <g class="clown-hair">
        <circle cx="55" cy="100" r="16" fill="#F43F5E"/>
        <circle cx="50" cy="118" r="15" fill="#FB7185"/>
        <circle cx="145" cy="100" r="16" fill="#F43F5E"/>
        <circle cx="150" cy="118" r="15" fill="#FB7185"/>
      </g>

      <!-- Head & Face -->
      <g class="clown-head">
        <circle cx="100" cy="110" r="38" fill="#FFFBEB" stroke="#FCD34D" stroke-width="3"/>
        <circle cx="76" cy="116" r="8" fill="#F472B6" opacity="0.75"/>
        <circle cx="124" cy="116" r="8" fill="#F472B6" opacity="0.75"/>
        <!-- Star Painted Eyes -->
        <polygon points="85,94 88,102 96,102 90,107 92,115 85,110 78,115 80,107 74,102 82,102" fill="#3B82F6"/>
        <polygon points="115,94 118,102 126,102 120,107 122,115 115,110 108,115 110,107 104,102 112,102" fill="#EF4444"/>
        <circle cx="85" cy="103" r="3.5" fill="#1E293B"/>
        <circle cx="115" cy="103" r="3.5" fill="#1E293B"/>
        <!-- Cute Smile -->
        <path d="M84,124 Q100,138 116,124" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- Round Nose -->
        <circle cx="100" cy="110" r="12" fill="url(#boboNose)" filter="drop-shadow(0 3px 5px rgba(225,29,72,0.4))"/>
        <circle cx="97" cy="107" r="3" fill="#FFFFFF" opacity="0.8"/>
      </g>

      <!-- Giant Circus Cone Hat -->
      <g class="clown-hat">
        <polygon points="100,20 74,80 126,80" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
        <path d="M78,65 L122,65" stroke="#EF4444" stroke-width="6"/>
        <path d="M86,45 L114,45" stroke="#3B82F6" stroke-width="5"/>
        <circle cx="100" cy="18" r="10" fill="#EC4899"/>
      </g>

      <!-- Ruffled Elizabethan Collar -->
      <g class="clown-collar">
        <path d="M68,138 Q80,150 90,138 Q100,150 110,138 Q120,150 132,138" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M68,138 Q80,150 90,138 Q100,150 110,138 Q120,150 132,138" stroke="#38BDF8" stroke-width="3" fill="none"/>
      </g>
    </svg>`
  },

  {
    id: 'kiko',
    name: 'Badut Kiko si Pesulap 🎩',
    role: 'Badut Sulap & Kelinci Ajaib',
    themeColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg clown-kiko" width="100%" height="100%">
      <defs>
        <radialGradient id="kikoNose" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#F472B6"/>
          <stop offset="100%" stop-color="#C026D3"/>
        </radialGradient>
      </defs>

      <!-- Sparkles from Magic Wand -->
      <g class="clown-prop clown-magic-sparkles">
        <polygon points="35,35 37,41 43,41 38,45 40,51 35,47 30,51 32,45 27,41 33,41" fill="#FDE047"/>
        <polygon points="55,20 57,24 61,24 58,27 59,31 55,28 51,31 52,27 49,24 53,24" fill="#38BDF8"/>
        <circle cx="28" cy="60" r="4" fill="#F472B6"/>
        <circle cx="62" cy="45" r="3.5" fill="#A78BFA"/>
      </g>

      <!-- Feet -->
      <g class="clown-feet">
        <ellipse cx="65" cy="222" rx="26" ry="14" fill="#8B5CF6" stroke="#6D28D9" stroke-width="3"/>
        <circle cx="45" cy="218" r="7" fill="#FDE047"/>
        <ellipse cx="135" cy="222" rx="26" ry="14" fill="#8B5CF6" stroke="#6D28D9" stroke-width="3"/>
        <circle cx="155" cy="218" r="7" fill="#FDE047"/>
      </g>

      <!-- Magician Suit Body -->
      <g class="clown-body">
        <path d="M60,140 Q100,130 140,140 L150,215 Q100,225 50,215 Z" fill="#7C3AED" stroke="#5B21B6" stroke-width="3"/>
        <!-- Yellow Vest Inside -->
        <polygon points="80,140 120,140 110,185 90,185" fill="#FEF08A"/>
        <circle cx="100" cy="155" r="3" fill="#B45309"/>
        <circle cx="100" cy="170" r="3" fill="#B45309"/>
        <!-- Tailcoat Flaps -->
        <path d="M60,140 L80,195 L65,212 Z" fill="#6D28D9"/>
        <path d="M140,140 L120,195 L135,212 Z" fill="#6D28D9"/>
      </g>

      <!-- Arms -->
      <g class="clown-arms">
        <!-- Left arm holding Magic Wand -->
        <path d="M62,145 Q35,115 45,75" stroke="#7C3AED" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="45" cy="75" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
        <!-- Magic Wand -->
        <line x1="45" y1="85" x2="35" y2="40" stroke="#1E293B" stroke-width="5" stroke-linecap="round"/>
        <polygon points="35,32 38,39 46,39 40,43 42,50 35,46 28,50 30,43 24,39 32,39" fill="#FBBF24"/>
        <!-- Right arm waving -->
        <path d="M138,145 Q168,125 156,95" stroke="#7C3AED" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="156" cy="95" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
      </g>

      <!-- Curly Orange Hair -->
      <g class="clown-hair">
        <circle cx="55" cy="98" r="16" fill="#F97316"/>
        <circle cx="48" cy="116" r="15" fill="#FB923C"/>
        <circle cx="145" cy="98" r="16" fill="#F97316"/>
        <circle cx="152" cy="116" r="15" fill="#FB923C"/>
      </g>

      <!-- Head & Face -->
      <g class="clown-head">
        <circle cx="100" cy="108" r="38" fill="#FFFBEB" stroke="#FCD34D" stroke-width="3"/>
        <circle cx="76" cy="116" r="8" fill="#F472B6" opacity="0.8"/>
        <circle cx="124" cy="116" r="8" fill="#F472B6" opacity="0.8"/>
        <!-- Cute Wink Eyes -->
        <path d="M78,98 Q85,92 92,98" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none"/>
        <circle cx="114" cy="98" r="5" fill="#1E293B"/>
        <circle cx="116" cy="96" r="1.8" fill="#FFFFFF"/>
        <!-- Smile -->
        <path d="M84,122 Q100,136 116,122" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- Button Nose -->
        <circle cx="100" cy="108" r="12" fill="url(#kikoNose)" filter="drop-shadow(0 3px 5px rgba(192,38,211,0.4))"/>
        <circle cx="97" cy="105" r="3" fill="#FFFFFF" opacity="0.8"/>
      </g>

      <!-- Magician Top Hat with Cute Bunny Inside -->
      <g class="clown-hat">
        <!-- Bunny Ears popping out -->
        <ellipse cx="90" cy="32" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <ellipse cx="90" cy="32" rx="3.5" ry="12" fill="#FBCFE8"/>
        <ellipse cx="110" cy="32" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <ellipse cx="110" cy="32" rx="3.5" ry="12" fill="#FBCFE8"/>
        <circle cx="100" cy="46" r="14" fill="#FFFFFF"/>
        <circle cx="96" cy="44" r="2" fill="#1E293B"/>
        <circle cx="104" cy="44" r="2" fill="#1E293B"/>
        <polygon points="100,48 98,46 102,46" fill="#F472B6"/>
        <!-- Top Hat Body -->
        <rect x="70" y="44" width="60" height="36" rx="4" fill="#1E1B4B"/>
        <ellipse cx="100" cy="44" rx="30" ry="7" fill="#312E81"/>
        <rect x="70" y="70" width="60" height="8" fill="#FBBF24"/>
        <ellipse cx="100" cy="78" rx="42" ry="9" fill="#1E1B4B"/>
      </g>

      <!-- Golden Bow Tie -->
      <g class="clown-bowtie">
        <polygon points="100,138 78,128 80,148" fill="#FBBF24"/>
        <polygon points="100,138 122,128 120,148" fill="#FBBF24"/>
        <circle cx="100" cy="138" r="7" fill="#EF4444"/>
      </g>
    </svg>`
  },

  {
    id: 'jojo',
    name: 'Badut Jojo si Pesta Disko 🤹',
    role: 'Badut Disko & Terompet Ceria',
    themeColor: '#10B981',
    bgColor: '#ECFDF5',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg clown-jojo" width="100%" height="100%">
      <defs>
        <radialGradient id="jojoNose" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FBBF24"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </radialGradient>
      </defs>

      <!-- Floating Music Notes from Horn -->
      <g class="clown-prop clown-music-notes">
        <text x="32" y="45" font-size="22" fill="#F43F5E" font-weight="900">♪</text>
        <text x="46" y="28" font-size="26" fill="#3B82F6" font-weight="900">♫</text>
        <text x="24" y="24" font-size="20" fill="#FBBF24" font-weight="900">♩</text>
      </g>

      <!-- Feet (Lime Green Shoes) -->
      <g class="clown-feet">
        <ellipse cx="65" cy="222" rx="26" ry="14" fill="#10B981" stroke="#047857" stroke-width="3"/>
        <circle cx="45" cy="218" r="7" fill="#F43F5E"/>
        <ellipse cx="135" cy="222" rx="26" ry="14" fill="#10B981" stroke="#047857" stroke-width="3"/>
        <circle cx="155" cy="218" r="7" fill="#F43F5E"/>
      </g>

      <!-- Sparkly Disco Outfit -->
      <g class="clown-body">
        <path d="M60,140 Q100,130 140,140 L152,215 Q100,225 48,215 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="3"/>
        <!-- Shiny Disco Vest -->
        <polygon points="76,140 124,140 114,195 86,195" fill="#FDE047" stroke="#CA8A04" stroke-width="2"/>
        <circle cx="92" cy="155" r="4" fill="#38BDF8"/>
        <circle cx="108" cy="155" r="4" fill="#A855F7"/>
        <circle cx="100" cy="172" r="4" fill="#10B981"/>
        <circle cx="92" cy="188" r="4" fill="#F43F5E"/>
        <circle cx="108" cy="188" r="4" fill="#3B82F6"/>
      </g>

      <!-- Arms -->
      <g class="clown-arms">
        <!-- Left arm blowing Horn -->
        <path d="M62,145 Q40,125 72,118" stroke="#06B6D4" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="72" cy="118" r="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
        <!-- Golden Party Horn / Trumpet -->
        <path d="M72,118 L44,82 L34,70 L28,88 L38,88 Z" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
        <!-- Right arm pointing up dance move -->
        <path d="M138,145 Q165,115 155,75" stroke="#06B6D4" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="155" cy="75" r="13" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2.5"/>
      </g>

      <!-- Neon Cyan Afro Hair -->
      <g class="clown-hair">
        <circle cx="55" cy="90" r="18" fill="#06B6D4"/>
        <circle cx="45" cy="110" r="17" fill="#0891B2"/>
        <circle cx="145" cy="90" r="18" fill="#06B6D4"/>
        <circle cx="155" cy="110" r="17" fill="#0891B2"/>
        <circle cx="78" cy="70" r="16" fill="#22D3EE"/>
        <circle cx="122" cy="70" r="16" fill="#22D3EE"/>
        <circle cx="100" cy="65" r="18" fill="#06B6D4"/>
      </g>

      <!-- Head & Face -->
      <g class="clown-head">
        <circle cx="100" cy="108" r="38" fill="#FFFBEB" stroke="#FCD34D" stroke-width="3"/>
        <circle cx="76" cy="118" r="8" fill="#FDA4AF" opacity="0.8"/>
        <circle cx="124" cy="118" r="8" fill="#FDA4AF" opacity="0.8"/>
        <!-- Big Star Sunglasses (Iconic Disco Look!) -->
        <g class="clown-sunglasses">
          <polygon points="80,90 84,98 94,98 87,103 90,111 80,106 70,111 73,103 66,98 76,98" fill="#FBBF24" stroke="#D97706" stroke-width="2.5"/>
          <polygon points="120,90 124,98 134,98 127,103 130,111 120,106 110,111 113,103 106,98 116,98" fill="#FBBF24" stroke="#D97706" stroke-width="2.5"/>
          <line x1="92" y1="98" x2="108" y2="98" stroke="#D97706" stroke-width="3"/>
          <circle cx="80" cy="101" r="5" fill="#1E293B"/>
          <circle cx="120" cy="101" r="5" fill="#1E293B"/>
        </g>
        <!-- Big Open Smile -->
        <path d="M82,124 Q100,140 118,124" stroke="#DC2626" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- Orange Shiny Nose -->
        <circle cx="100" cy="112" r="12" fill="url(#jojoNose)" filter="drop-shadow(0 3px 5px rgba(234,88,12,0.4))"/>
        <circle cx="97" cy="109" r="3" fill="#FFFFFF" opacity="0.8"/>
      </g>

      <!-- Big Neon Bow Tie -->
      <g class="clown-bowtie">
        <polygon points="100,138 74,126 76,150" fill="#10B981" stroke="#047857" stroke-width="2"/>
        <polygon points="100,138 126,126 124,150" fill="#10B981" stroke="#047857" stroke-width="2"/>
        <circle cx="100" cy="138" r="7" fill="#FBBF24"/>
      </g>
    </svg>`
  },
  {
    id: 'robot',
    name: 'Robot Riko si Joget 🤖',
    role: 'Robot Disko & Lampu Kelap-Kelip',
    icon: '🤖',
    animClass: 'anim-robot',
    themeColor: '#06B6D4',
    bgColor: '#ECFEFF',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg char-robot" width="100%" height="100%">
      <!-- Antena Berkedip -->
      <line x1="100" y1="42" x2="100" y2="20" stroke="#64748B" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="16" r="10" fill="#FACC15" class="robot-antenna-bulb"/>
      <!-- Telinga Sinyal -->
      <rect x="44" y="64" width="12" height="28" rx="6" fill="#F97316"/>
      <rect x="144" y="64" width="12" height="28" rx="6" fill="#F97316"/>
      <!-- Kepala -->
      <rect x="54" y="42" width="92" height="72" rx="22" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
      <rect x="64" y="54" width="72" height="34" rx="12" fill="#0F172A"/>
      <!-- Mata LED -->
      <circle cx="84" cy="71" r="8" fill="#4ADE80"/>
      <circle cx="116" cy="71" r="8" fill="#4ADE80"/>
      <circle cx="86" cy="68" r="2.5" fill="#FFFFFF"/>
      <circle cx="118" cy="68" r="2.5" fill="#FFFFFF"/>
      <!-- Mulut Speaker -->
      <rect x="78" y="96" width="44" height="10" rx="5" fill="#FEF08A"/>
      <!-- Badan -->
      <rect x="60" y="120" width="80" height="72" rx="18" fill="#0EA5E9" stroke="#0369A1" stroke-width="4"/>
      <rect x="74" y="134" width="52" height="36" rx="10" fill="#E0F2FE"/>
      <circle cx="100" cy="152" r="11" fill="#F43F5E" class="robot-heart"/>
      <!-- Tangan -->
      <path d="M60,138 L34,116" stroke="#94A3B8" stroke-width="11" stroke-linecap="round"/>
      <circle cx="32" cy="114" r="10" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>
      <path d="M140,138 L166,116" stroke="#94A3B8" stroke-width="11" stroke-linecap="round"/>
      <circle cx="168" cy="114" r="10" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>
      <!-- Kaki & Sepatu Roda -->
      <rect x="72" y="192" width="16" height="24" rx="6" fill="#64748B"/>
      <rect x="112" y="192" width="16" height="24" rx="6" fill="#64748B"/>
      <rect x="62" y="212" width="34" height="16" rx="8" fill="#F97316"/>
      <rect x="104" y="212" width="34" height="16" rx="8" fill="#F97316"/>
    </svg>`
  },
  {
    id: 'dino',
    name: 'Dino Dodo si Gemas 🦕',
    role: 'Dino Lucu & Lompat Riang',
    icon: '🦕',
    animClass: 'anim-dino',
    themeColor: '#22C55E',
    bgColor: '#F0FDF4',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg char-dino" width="100%" height="100%">
      <!-- Ekor Goyang -->
      <path d="M56,178 Q20,175 18,144 Q38,162 62,162 Z" fill="#22C55E" stroke="#15803D" stroke-width="3"/>
      <!-- Duri Punggung -->
      <polygon points="72,56 58,64 70,74" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
      <polygon points="68,84 52,92 66,102" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
      <polygon points="64,114 48,122 62,132" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
      <!-- Badan Gemuk -->
      <ellipse cx="104" cy="158" rx="46" ry="54" fill="#4ADE80" stroke="#16A34A" stroke-width="4"/>
      <ellipse cx="112" cy="164" rx="28" ry="38" fill="#DCFCE7"/>
      <!-- Kepala Dino -->
      <ellipse cx="104" cy="78" rx="42" ry="36" fill="#4ADE80" stroke="#16A34A" stroke-width="4"/>
      <!-- Pipi & Mata -->
      <circle cx="88" cy="70" r="7" fill="#0F172A"/>
      <circle cx="90" cy="68" r="2.5" fill="#FFFFFF"/>
      <circle cx="122" cy="70" r="7" fill="#0F172A"/>
      <circle cx="124" cy="68" r="2.5" fill="#FFFFFF"/>
      <circle cx="78" cy="84" r="7" fill="#FDA4AF" opacity="0.8"/>
      <circle cx="132" cy="84" r="7" fill="#FDA4AF" opacity="0.8"/>
      <path d="M90,88 Q105,102 120,88" stroke="#14532D" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Tangan Mungil -->
      <path d="M68,142 Q46,136 52,154" stroke="#16A34A" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M140,142 Q162,136 156,154" stroke="#16A34A" stroke-width="10" fill="none" stroke-linecap="round"/>
      <!-- Kaki -->
      <ellipse cx="80" cy="214" rx="18" ry="12" fill="#22C55E" stroke="#15803D" stroke-width="3"/>
      <ellipse cx="128" cy="214" rx="18" ry="12" fill="#22C55E" stroke="#15803D" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'panda',
    name: 'Panda Pipo si Gendut 🐼',
    role: 'Panda Goyang & Bambu Segar',
    icon: '🐼',
    animClass: 'anim-panda',
    themeColor: '#10B981',
    bgColor: '#ECFDF5',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg char-panda" width="100%" height="100%">
      <!-- Telinga Hitam -->
      <circle cx="62" cy="52" r="18" fill="#1E293B"/>
      <circle cx="138" cy="52" r="18" fill="#1E293B"/>
      <!-- Badan -->
      <ellipse cx="100" cy="166" rx="48" ry="48" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
      <path d="M56,144 Q100,160 144,144 L148,164 Q100,178 52,164 Z" fill="#1E293B"/>
      <!-- Kepala -->
      <ellipse cx="100" cy="90" rx="46" ry="40" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3"/>
      <!-- Lingkar Mata -->
      <ellipse cx="80" cy="88" rx="14" ry="17" transform="rotate(-15 80 88)" fill="#1E293B"/>
      <ellipse cx="120" cy="88" rx="14" ry="17" transform="rotate(15 120 88)" fill="#1E293B"/>
      <circle cx="82" cy="86" r="4.5" fill="#FFFFFF"/>
      <circle cx="118" cy="86" r="4.5" fill="#FFFFFF"/>
      <circle cx="64" cy="102" r="7" fill="#FDA4AF" opacity="0.85"/>
      <circle cx="136" cy="102" r="7" fill="#FDA4AF" opacity="0.85"/>
      <!-- Hidung & Senyum -->
      <ellipse cx="100" cy="98" rx="7" ry="5" fill="#1E293B"/>
      <path d="M90,108 Q100,118 110,108" stroke="#1E293B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Tangan & Bambu -->
      <ellipse cx="52" cy="152" rx="15" ry="22" transform="rotate(25 52 152)" fill="#1E293B"/>
      <ellipse cx="148" cy="152" rx="15" ry="22" transform="rotate(-25 148 152)" fill="#1E293B"/>
      <rect x="152" y="96" width="10" height="72" rx="4" fill="#22C55E" transform="rotate(14 157 132)"/>
      <ellipse cx="166" cy="104" rx="11" ry="5" fill="#4ADE80" transform="rotate(-20 166 104)"/>
      <!-- Kaki -->
      <ellipse cx="74" cy="212" rx="20" ry="13" fill="#1E293B"/>
      <ellipse cx="126" cy="212" rx="20" ry="13" fill="#1E293B"/>
    </svg>`
  },
  {
    id: 'penguin',
    name: 'Pinguin Pingo si Lincah 🐧',
    role: 'Pinguin Topi Baling-Baling',
    icon: '🐧',
    animClass: 'anim-penguin',
    themeColor: '#3B82F6',
    bgColor: '#EFF6FF',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg char-penguin" width="100%" height="100%">
      <!-- Topi Baling-Baling -->
      <path d="M74,48 Q100,24 126,48 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5"/>
      <rect x="97" y="24" width="6" height="10" fill="#FACC15"/>
      <ellipse cx="100" cy="24" rx="24" ry="5" fill="#38BDF8" stroke="#0284C7" stroke-width="2" class="penguin-propeller"/>
      <!-- Badan Pinguin -->
      <ellipse cx="100" cy="136" rx="52" ry="74" fill="#1E293B"/>
      <ellipse cx="100" cy="146" rx="38" ry="56" fill="#FFFFFF"/>
      <!-- Sayap Mengepak -->
      <ellipse cx="44" cy="136" rx="14" ry="34" transform="rotate(24 44 136)" fill="#1E293B"/>
      <ellipse cx="156" cy="136" rx="14" ry="34" transform="rotate(-24 156 136)" fill="#1E293B"/>
      <!-- Wajah -->
      <circle cx="82" cy="84" r="7" fill="#0F172A"/>
      <circle cx="84" cy="82" r="2.5" fill="#FFFFFF"/>
      <circle cx="118" cy="84" r="7" fill="#0F172A"/>
      <circle cx="120" cy="82" r="2.5" fill="#FFFFFF"/>
      <circle cx="72" cy="96" r="7" fill="#FDA4AF" opacity="0.8"/>
      <circle cx="128" cy="96" r="7" fill="#FDA4AF" opacity="0.8"/>
      <!-- Paruh & Syal -->
      <polygon points="90,94 110,94 100,108" fill="#F59E0B" stroke="#D97706" stroke-width="2" stroke-linejoin="round"/>
      <path d="M62,114 Q100,126 138,114 L142,126 Q100,138 58,126 Z" fill="#EC4899"/>
      <!-- Kaki Oranye -->
      <ellipse cx="76" cy="214" rx="20" ry="10" fill="#F97316"/>
      <ellipse cx="124" cy="214" rx="20" ry="10" fill="#F97316"/>
    </svg>`
  },
  {
    id: 'rocket',
    name: 'Astronot Ciko & Roket 🚀',
    role: 'Kucing Ciko Terbang ke Bulan',
    icon: '🚀',
    animClass: 'anim-rocket',
    themeColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    svg: `<svg viewBox="0 0 200 240" class="clown-svg char-rocket" width="100%" height="100%">
      <!-- Api Roket -->
      <path d="M84,186 Q100,236 116,186 Z" fill="#F97316" class="rocket-flame"/>
      <path d="M90,186 Q100,220 110,186 Z" fill="#FDE047" class="rocket-flame"/>
      <!-- Sirip Roket -->
      <polygon points="62,150 38,186 68,180" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5"/>
      <polygon points="138,150 162,186 132,180" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5"/>
      <!-- Badan Roket -->
      <path d="M62,180 C62,90 78,42 100,22 C122,42 138,90 138,180 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/>
      <path d="M80,44 Q100,32 120,44 L100,22 Z" fill="#EF4444"/>
      <!-- Jendela Kaca + Ciko -->
      <circle cx="100" cy="108" r="30" fill="#BAE6FD" stroke="#38BDF8" stroke-width="5"/>
      <!-- Telinga & Kepala Ciko -->
      <polygon points="84,96 78,80 94,88" fill="#F8B400"/>
      <polygon points="116,96 122,80 106,88" fill="#F8B400"/>
      <circle cx="100" cy="110" r="20" fill="#FFDE7D"/>
      <circle cx="93" cy="107" r="3" fill="#1E293B"/>
      <circle cx="107" cy="107" r="3" fill="#1E293B"/>
      <path d="M95,115 Q100,120 105,115" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Bintang Sekitar -->
      <polygon points="34,70 37,78 45,78 39,83 41,91 34,86 27,91 29,83 23,78 31,78" fill="#FACC15"/>
      <polygon points="166,56 168,62 174,62 169,66 171,72 166,68 161,72 163,66 158,62 164,62" fill="#FACC15"/>
    </svg>`
  }
];

