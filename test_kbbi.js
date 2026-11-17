const kbbiDict = {
  // Preposisi tempat & arah
  'dimana': 'di mana', 'kemana': 'ke mana', 'disana': 'di sana', 'kesana': 'ke sana',
  'disini': 'di sini', 'kesini': 'ke sini', 'darimana': 'dari mana',
  'diatas': 'di atas', 'dibawah': 'di bawah', 'didalam': 'di dalam', 'diluar': 'di luar',
  'didepan': 'di depan', 'dibelakang': 'di belakang', 'disamping': 'di samping',
  'dirumah': 'di rumah', 'disekolah': 'di sekolah', 'dikantor': 'di kantor', 'dipasar': 'di pasar',
  'keatas': 'ke atas', 'kebawah': 'ke bawah', 'kedalam': 'ke dalam',
  'kerumah': 'ke rumah', 'kesekolah': 'ke sekolah', 'kekantor': 'ke kantor',
  // Baku KBBI
  'antri': 'antre', 'antrian': 'antrean',
  'praktek': 'praktik', 'praktekkan': 'praktikkan', 'mempraktekkan': 'mempraktikkan', 'praktik': 'praktik',
  'apotik': 'apotek', 'apotiker': 'apoteker',
  'ijin': 'izin', 'mengijinkan': 'mengizinkan', 'diijinkan': 'diizinkan', 'perijinan': 'perizinan',
  'analisa': 'analisis', 'menganalisa': 'menganalisis',
  'nasehat': 'nasihat', 'menasehati': 'menasihati', 'penasehat': 'penasihat',
  'jadual': 'jadwal',
  'merubah': 'mengubah', 'dirubah': 'diubah',
  'kwalitas': 'kualitas', 'kwantitas': 'kuantitas',
  'aktifitas': 'aktivitas', 'kreatifitas': 'kreativitas', 'efektifitas': 'efektivitas',
  'resiko': 'risiko', 'beresiko': 'berisiko',
  'silahkan': 'silakan',
  'faham': 'paham', 'fikir': 'pikir', 'fikiran': 'pikiran',
  'obyek': 'objek', 'subyek': 'subjek',
  'cidera': 'cedera', 'hutang': 'utang', 'jaman': 'zaman',
  'hakekat': 'hakikat', 'sekedar': 'sekadar', 'kharisma': 'karisma',
  'tehnik': 'teknik', 'tehnologi': 'teknologi',
  'karir': 'karier', 'lobang': 'lubang', 'nafas': 'napas',
  'terlantar': 'telantar', 'kwitansi': 'kuitansi', 'frekwensi': 'frekuensi',
  'standarisasi': 'standardisasi', 'standart': 'standar', 'standard': 'standar',
  'elit': 'elite', 'cendikiawan': 'cendekiawan', 'difinisi': 'definisi', 'defenisi': 'definisi',
  'diagnosa': 'diagnosis', 'extra': 'ekstra', 'pondasi': 'fondasi', 'photo': 'foto',
  'geladi': 'gladi', 'hapal': 'hafal', 'himbau': 'imbau', 'himbauan': 'imbauan',
  'indera': 'indra', 'insyaf': 'insaf', 'hisap': 'isap', 'jenasah': 'jenazah', 'jendral': 'jenderal',
  'kaos': 'kaus', 'kuatir': 'khawatir', 'komplit': 'komplet', 'lembab': 'lembap', 'mahluk': 'makhluk',
  'managemen': 'manajemen', 'menejemen': 'manajemen', 'manager': 'manajer', 'massal': 'masal',
  'mempengaruhi': 'memengaruhi', 'mengkonsumsi': 'mengonsumsi', 'mencontek': 'menyontek',
  'metoda': 'metode', 'milyar': 'miliar', 'musium': 'museum', 'nahkoda': 'nakhoda',
  'omset': 'omzet', 'pasport': 'paspor', 'pengrajin': 'perajin', 'prosentase': 'persentase',
  'propinsi': 'provinsi', 'projek': 'proyek', 'putera': 'putra', 'puteri': 'putri',
  'rame': 'ramai', 'rapih': 'rapi', 'rejeki': 'rezeki', 'rubuh': 'roboh', 'syah': 'sah',
  'seksama': 'saksama', 'syaraf': 'saraf', 'sekertaris': 'sekretaris', 'sprei': 'seprai',
  'sistim': 'sistem', 'stress': 'stres', 'sutera': 'sutra', 'sukur': 'syukur',
  'tahta': 'takhta', 'tarip': 'tarif', 'toladan': 'teladan', 'trampil': 'terampil',
  'terimakasih': 'terima kasih',
  // Singkatan percakapan ke formal KBBI
  'jangn': 'jangan', 'jgn': 'jangan', 'jgan': 'jangan',
  'yg': 'yang', 'dgn': 'dengan', 'dngn': 'dengan', 'utk': 'untuk',
  'sdh': 'sudah', 'udh': 'sudah', 'udah': 'sudah',
  'blm': 'belum', 'belom': 'belum',
  'karna': 'karena', 'krn': 'karena',
  'bgt': 'sangat', 'bgtt': 'sangat',
  'tdk': 'tidak', 'gak': 'tidak', 'nggak': 'tidak', 'ga': 'tidak',
  'sy': 'saya', 'km': 'kamu', 'kmu': 'kamu', 'kt': 'kita', 'mrk': 'mereka',
  'tp': 'tetapi', 'tpi': 'tetapi', 'kalo': 'kalau', 'kl': 'kalau', 'klo': 'kalau',
  'adlh': 'adalah', 'bkn': 'bukan',
  'tau': 'tahu', 'liat': 'melihat', 'denger': 'mendengar',
  'mkn': 'makan', 'mnm': 'minum', 'tdr': 'tidur',
  'krja': 'kerja', 'rmh': 'rumah', 'tmn': 'teman', 'org': 'orang',
  'skrg': 'sekarang', 'kmrn': 'kemarin', 'bsk': 'besok', 'hrs': 'harus',
  'makasih': 'terima kasih', 'bener': 'benar', 'cuman': 'hanya', 'aja': 'saja',
  'pake': 'memakai', 'bikin': 'membuat', 'knp': 'mengapa', 'gmn': 'bagaimana'
};

function matchCase(sourceWord, replacementWord) {
  if (sourceWord === sourceWord.toUpperCase() && sourceWord.length > 1) {
    return replacementWord.toUpperCase();
  }
  if (sourceWord.length > 0 && sourceWord[0] === sourceWord[0].toUpperCase()) {
    return replacementWord.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  return replacementWord.toLowerCase();
}

function convertToKBBI(text) {
  // 1. Bersihkan spasi tanda baca ("halo , apa kabar ?" -> "halo, apa kabar?")
  let cleaned = text.replace(/\s+([,.:;!?])/g, '$1');
  cleaned = cleaned.replace(/,{2,}/g, ',');
  cleaned = cleaned.replace(/\?{2,}/g, '?');
  cleaned = cleaned.replace(/!{2,}/g, '!');
  // Tambah spasi setelah koma/titik jika belum ada
  cleaned = cleaned.replace(/([,.:;!?])([a-zA-Z])/g, '$1 $2');
  cleaned = cleaned.replace(/\s+/g, ' ');

  // 2. Tokenisasi
  const tokens = cleaned.split(/([a-zA-Z0-9_\u00C0-\u024F]+)/);
  const tokenObjects = [];
  const log = [];

  for (const token of tokens) {
    if (!token) continue;
    const isWord = /^[a-zA-Z0-9_\u00C0-\u024F]+$/.test(token);
    if (!isWord) {
      tokenObjects.push({ text: token, isWord: false });
      continue;
    }

    const lower = token.toLowerCase();
    if (kbbiDict[lower]) {
      const rep = matchCase(token, kbbiDict[lower]);
      log.push({ from: token, to: rep });
      tokenObjects.push({ text: rep, isWord: true, isTypo: true, from: token });
    } else {
      tokenObjects.push({ text: token, isWord: true, isTypo: false });
    }
  }

  // 3. Sentence case
  let capitalizeNext = true;
  const transformed = tokenObjects.map(t => {
    if (t.isWord) {
      if (capitalizeNext) {
        capitalizeNext = false;
        const cap = t.text.split(' ').map((w, idx) => idx === 0 ? (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) : w.toLowerCase()).join(' ');
        return { ...t, text: cap };
      } else {
        return { ...t, text: t.text.toLowerCase() };
      }
    } else {
      if (/[.!?]/.test(t.text)) {
        capitalizeNext = true;
      }
      return t;
    }
  });

  return {
    result: transformed.map(t => t.text).join(''),
    log
  };
}

const testSample = 'sy tdk tau knp dia antri di apotik , pdhl praktek dokter sdh buka . jangn lupa mkn ya . dimana rumahnya ?';
const res = convertToKBBI(testSample);
console.log('INPUT : ', testSample);
console.log('OUTPUT: ', res.result);
console.log('LOG   : ', res.log);
