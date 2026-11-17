const fs = require('fs');

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

function findFuzzyMatch(word) {
  if (word.length < 4) return null;
  if (commonVocabulary.has(word)) return null; // already correct
  for (const vocab of commonVocabulary) {
    if (damerau1(word, vocab)) {
      return vocab;
    }
  }
  return null;
}

const fuzzyTests = ['sekoalh', 'komptuer', 'belajr', 'jangn', 'makn', 'tidr'];
fuzzyTests.forEach(w => {
  console.log(w, '->', findFuzzyMatch(w));
});
