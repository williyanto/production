const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

console.log('=== EXACT RESET BUTTON FINDER ===\n');

const list = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match single button containing Reset
  const regex = /<button\b[^>]*>(?:(?!<\/button>)[\s\S])*?\bReset\b(?:(?!<\/button>)[\s\S])*?<\/button>/gi;
  const matches = [...content.matchAll(regex)];

  if (matches.length > 0) {
    matches.forEach(m => {
      const tag = m[0];
      const classMatch = tag.match(/class=["']([^"']+)["']/i);
      const classes = classMatch ? classMatch[1] : '';
      const isSolidRed = (classes.includes('bg-rose-500') || classes.includes('bg-rose-600') || classes.includes('bg-red-500') || classes.includes('bg-red-600')) && classes.includes('text-white');
      
      list.push({
        file: f,
        tag: tag.replace(/\s+/g, ' '),
        classes,
        isSolidRed
      });
    });
  } else {
    // Check if there's any button with id="reset..." or onclick="...reset..."
    const altRegex = /<button\b[^>]*\b(onclick|id)=["'][^"']*reset[^"']*["'][^>]*>(?:(?!<\/button>)[\s\S])*?<\/button>/gi;
    const altMatches = [...content.matchAll(altRegex)];
    altMatches.forEach(m => {
      const tag = m[0];
      const classMatch = tag.match(/class=["']([^"']+)["']/i);
      const classes = classMatch ? classMatch[1] : '';
      const isSolidRed = (classes.includes('bg-rose-500') || classes.includes('bg-rose-600') || classes.includes('bg-red-500') || classes.includes('bg-red-600')) && classes.includes('text-white');
      list.push({
        file: f,
        tag: tag.replace(/\s+/g, ' '),
        classes,
        isSolidRed
      });
    });
  }
});

list.forEach(item => {
  console.log(`File: ${item.file}`);
  console.log(`  Solid Red: ${item.isSolidRed}`);
  console.log(`  Classes  : ${item.classes}`);
  console.log(`  Button   : ${item.tag.substring(0, 160)}...`);
  console.log('---');
});
