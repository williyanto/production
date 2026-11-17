const fs = require('fs');

const commonSlangAndTypo = {
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
  'dimana': 'di mana', 'kemana': 'ke mana'
};

function matchCase(sourceWord, replacementWord) {
  if (sourceWord === sourceWord.toUpperCase() && sourceWord.length > 1) {
    return replacementWord.toUpperCase();
  }
  if (sourceWord[0] === sourceWord[0].toUpperCase()) {
    return replacementWord.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  return replacementWord.toLowerCase();
}

function processTypo(text, markMode = 'html') {
  const log = [];
  // Tokenize by word boundaries while preserving whitespace and punctuation
  const tokens = text.split(/([a-zA-Z0-9_]+)/);
  const processedTokens = tokens.map(token => {
    if (!token || !/^[a-zA-Z0-9_]+$/.test(token)) return token;
    const lower = token.toLowerCase();
    if (commonSlangAndTypo[lower]) {
      const replaced = matchCase(token, commonSlangAndTypo[lower]);
      log.push({ from: token, to: replaced });
      if (markMode === 'html') {
        return `<mark class="typo-mark font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-b-2 border-amber-500 px-1 rounded inline-block" title="Typo: ${token} → ${replaced}">${replaced}</mark>`;
      } else if (markMode === 'bracket') {
        return `[${replaced}]`;
      }
      return replaced;
    }
    return token;
  });

  return {
    text: processedTokens.join(''),
    raw: tokens.map(t => {
      const lower = t.toLowerCase();
      return commonSlangAndTypo[lower] ? matchCase(t, commonSlangAndTypo[lower]) : t;
    }).join(''),
    log
  };
}

const tests = [
  'halo jangn lupa mkn ya',
  'Jangn pergi dlu, sdh jam brapa skrg?',
  'Praktek dokter di apotik buka jam 9',
  'JANGN LUPA MAKAN'
];

tests.forEach(t => {
  const res = processTypo(t, 'html');
  const bracketRes = processTypo(t, 'bracket');
  console.log('INPUT  :', t);
  console.log('HTML   :', res.text);
  console.log('BRACKET:', bracketRes.text);
  console.log('RAW    :', res.raw);
  console.log('LOG    :', JSON.stringify(res.log));
  console.log('---');
});
