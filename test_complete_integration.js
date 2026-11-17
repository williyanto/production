// Test the complete integration of typo detection, case conversion, and marking

const typoDict = {
  'jangn': 'jangan', 'jgn': 'jangan', 'jgan': 'jangan', 'jngn': 'jangan',
  'yg': 'yang', 'yng': 'yang',
  'dgn': 'dengan', 'dngn': 'dengan', 'dg': 'dengan', 'dengn': 'dengan',
  'utk': 'untuk', 'untk': 'untuk',
  'sdh': 'sudah', 'udh': 'sudah', 'udah': 'sudah', 'suda': 'sudah',
  'blm': 'belum', 'blom': 'belum', 'belom': 'belum', 'blum': 'belum',
  'karna': 'karena', 'krn': 'karena', 'krena': 'karena',
  'bgt': 'banget', 'bgtt': 'banget', 'bngt': 'banget',
  'tdk': 'tidak', 'tak': 'tidak', 'gk': 'tidak', 'gak': 'tidak', 'ngga': 'tidak', 'nggak': 'tidak',
  'bsa': 'bisa', 'bsi': 'bisa',
  'mkn': 'makan', 'makn': 'makan',
  'mnm': 'minum', 'minm': 'minum',
  'tdr': 'tidur', 'tidr': 'tidur',
  'tmn': 'teman', 'temen': 'teman',
  'org': 'orang', 'orng': 'orang',
  'rmh': 'rumah', 'rumh': 'rumah',
  'krja': 'kerja', 'krj': 'kerja',
  'skrg': 'sekarang', 'skrng': 'sekarang',
  'kmrn': 'kemarin', 'kmren': 'kemarin',
  'bsk': 'besok', 'bsok': 'besok',
  'hrs': 'harus', 'hrus': 'harus',
  'smua': 'semua', 'sy': 'saya', 'km': 'kamu', 'kmu': 'kamu', 'kt': 'kita', 'mrk': 'mereka',
  'adlh': 'adalah', 'tp': 'tapi', 'tpi': 'tapi', 'kalo': 'kalau', 'kl': 'kalau', 'klo': 'kalau',
  'antri': 'antre', 'praktek': 'praktik', 'apotik': 'apotek', 'ijin': 'izin', 'analisa': 'analisis',
  'jadual': 'jadwal', 'merubah': 'mengubah', 'kwalitas': 'kualitas', 'resiko': 'risiko', 'silahkan': 'silakan',
  'dimana': 'di mana', 'kemana': 'ke mana', 'disana': 'di sana', 'kesana': 'ke sana', 'disini': 'di sini', 'kesini': 'ke sini'
};

const commonVocabulary = new Set([
  'jangan', 'dengan', 'untuk', 'sudah', 'belum', 'karena', 'banget', 'tidak', 'bisa', 'makan',
  'minum', 'tidur', 'teman', 'orang', 'rumah', 'kerja', 'sekarang', 'kemarin', 'besok', 'harus',
  'semua', 'saya', 'kamu', 'kita', 'mereka', 'adalah', 'bukan', 'tapi', 'kalau', 'tahu', 'lihat',
  'dengar', 'bicara', 'bilang', 'kapan', 'dulu', 'nanti', 'sebentar', 'cepat', 'bagus', 'tanya',
  'jawab', 'bahasa', 'tulisan', 'surat', 'pesan', 'nomor', 'jalan', 'kabar', 'tolong', 'benar',
  'selalu', 'sering', 'pulang', 'datang', 'pergi', 'sampai', 'hanya', 'juga', 'dalam', 'kemana',
  'dimana', 'sekolah', 'komputer', 'aplikasi', 'belajar', 'masalah', 'keluarga', 'pekerjaan',
  'pemerintah', 'pendidikan', 'informasi', 'komunikasi', 'pembayaran', 'pengiriman', 'selamat'
]);

function damerau1(a, b) {
  if (a === b) return false;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  if (la === lb) {
    let diffs = [];
    for (let i = 0; i < la; i++) {
      if (a[i] !== b[i]) diffs.push(i);
    }
    if (diffs.length === 1) return true;
    if (diffs.length === 2 && diffs[1] === diffs[0] + 1) {
      return a[diffs[0]] === b[diffs[1]] && a[diffs[1]] === b[diffs[0]];
    }
    return false;
  }
  const [longer, shorter] = la > lb ? [a, b] : [b, a];
  let i = 0, j = 0, diff = 0;
  while (i < longer.length && j < shorter.length) {
    if (longer[i] !== shorter[j]) {
      diff++;
      if (diff > 1) return false;
      i++;
    } else {
      i++; j++;
    }
  }
  return true;
}

function findFuzzy(word) {
  if (word.length < 4) return null;
  if (commonVocabulary.has(word)) return null;
  for (const vocab of commonVocabulary) {
    if (damerau1(word, vocab)) return vocab;
  }
  return null;
}

function matchCase(source, target) {
  if (source === source.toUpperCase() && source.length > 1) {
    return target.toUpperCase();
  }
  if (source.length > 0 && source[0] === source[0].toUpperCase()) {
    return target.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  return target.toLowerCase();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
}

function processTypoEngine(text, mode = 'proper', markStyle = 'highlight') {
  if (!text) return { plain: '', html: '', log: [] };

  // Tokenize preserving spaces, punctuation, words
  const tokens = text.split(/([a-zA-Z0-9_\u00C0-\u024F]+)/);
  const tokenObjects = [];
  const log = [];

  for (const token of tokens) {
    if (!token) continue;
    const isWord = /^[a-zA-Z0-9_\u00C0-\u024F]+$/.test(token);
    if (!isWord) {
      tokenObjects.push({ raw: token, text: token, isWord: false });
      continue;
    }

    const lower = token.toLowerCase();
    let replacement = null;

    if (typoDict[lower]) {
      replacement = matchCase(token, typoDict[lower]);
    } else {
      const fuzzy = findFuzzy(lower);
      if (fuzzy) {
        replacement = matchCase(token, fuzzy);
      }
    }

    if (replacement && replacement.toLowerCase() !== lower) {
      log.push({ from: token, to: replacement });
      tokenObjects.push({ raw: token, text: replacement, isWord: true, isTypo: true, from: token });
    } else {
      tokenObjects.push({ raw: token, text: token, isWord: true, isTypo: false });
    }
  }

  // Apply Mode Transformation on tokenObjects
  let transformed = tokenObjects;
  if (mode === 'upper') {
    transformed = tokenObjects.map(t => ({ ...t, text: t.text.toUpperCase() }));
  } else if (mode === 'title') {
    transformed = tokenObjects.map(t => {
      if (!t.isWord) return t;
      const cap = t.text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      return { ...t, text: cap };
    });
  } else if (mode === 'proper') {
    let capitalizeNext = true;
    transformed = tokenObjects.map(t => {
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
  } else if (mode === 'split') {
    // Collect only words
    const words = tokenObjects.filter(t => t.isWord);
    const plain = words.map(t => {
      if (t.isTypo && markStyle === 'bracket') return `[${t.text}]`;
      return t.text;
    }).join('\n');

    const html = words.map(t => {
      const esc = escapeHtml(t.text);
      if (t.isTypo) {
        if (markStyle === 'bracket') return `<mark class="typo-mark">[${esc}]</mark>`;
        if (markStyle === 'highlight') return `<mark class="typo-mark font-semibold bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 px-1 py-0.5 rounded border-b-2 border-amber-500 cursor-help" title="Typo: ${escapeHtml(t.from)} → ${esc}">${esc}<span class="text-[9px] text-amber-600 dark:text-amber-400 font-bold ml-0.5 select-none">✓</span></mark>`;
      }
      return esc;
    }).join('\n');

    return { plain, html, log };
  } else if (mode === 'chaos') {
    // Random casing
    transformed = tokenObjects.map(t => {
      if (!t.isWord) return t;
      const c = t.text.split('').map(ch => Math.random() > 0.5 ? ch.toUpperCase() : ch.toLowerCase()).join('');
      return { ...t, text: c };
    });
  }

  // Build Plain and HTML
  const plainParts = [];
  const htmlParts = [];

  for (const t of transformed) {
    if (!t.isWord) {
      plainParts.push(t.text);
      htmlParts.push(escapeHtml(t.text));
      continue;
    }

    if (t.isTypo) {
      if (markStyle === 'bracket') {
        plainParts.push(`[${t.text}]`);
        htmlParts.push(`<mark class="typo-mark bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 px-1 rounded font-semibold border-b-2 border-amber-500" title="Typo: ${escapeHtml(t.from)} → ${escapeHtml(t.text)}">[${escapeHtml(t.text)}]</mark>`);
      } else if (markStyle === 'highlight') {
        plainParts.push(t.text);
        htmlParts.push(`<mark class="typo-mark inline-flex items-center gap-0.5 bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 px-1.5 py-0.5 rounded font-semibold border-b-2 border-amber-500 cursor-help" title="Typo dikoreksi: ${escapeHtml(t.from)} → ${escapeHtml(t.text)}">${escapeHtml(t.text)}<span class="text-[9px] text-amber-600 dark:text-amber-400 font-bold ml-0.5 select-none">✓</span></mark>`);
      } else {
        plainParts.push(t.text);
        htmlParts.push(escapeHtml(t.text));
      }
    } else {
      plainParts.push(t.text);
      htmlParts.push(escapeHtml(t.text));
    }
  }

  return {
    plain: plainParts.join(''),
    html: htmlParts.join(''),
    log
  };
}

console.log('--- TEST 1: jangn ---');
const r1 = processTypoEngine('halo jangn lupa mkn ya. kmren gmn?', 'proper', 'highlight');
console.log('Plain:', r1.plain);
console.log('HTML :', r1.html);
console.log('Log  :', r1.log);

console.log('--- TEST 2: Huruf Kapital ---');
const r2 = processTypoEngine('halo jangn lupa mkn ya.', 'upper', 'highlight');
console.log('Plain:', r2.plain);
console.log('HTML :', r2.html);

console.log('--- TEST 3: Bracket Style ---');
const r3 = processTypoEngine('halo jangn lupa mkn ya.', 'proper', 'bracket');
console.log('Plain:', r3.plain);
console.log('HTML :', r3.html);
