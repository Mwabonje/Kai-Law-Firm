const fs = require('fs');
const glob = require('fs').readdirSync('src/views').filter(f => f.endsWith('.tsx'));

const collections = [
  'clients', 'properties', 'matters', 'tasks', 'documents',
  'invoices', 'payments', 'users', 'deadlines', 'activity'
];

for (const file of glob) {
  let code = fs.readFileSync('src/views/' + file, 'utf8');
  
  const componentRegex = /export\s+function\s+[A-Za-z0-9_]+\s*\([\s\S]*?\)\s*{/g;
  let match;
  let replacements = [];
  
  while ((match = componentRegex.exec(code)) !== null) {
    const startIdx = match.index + match[0].length;
    let endIdx = code.indexOf('export function', startIdx);
    if (endIdx === -1) endIdx = code.length;
    
    const body = code.substring(startIdx, endIdx);
    
    let injections = '';
    for (const c of collections) {
      const hookRegex = new RegExp(`const ${c}\\s*=\\s*useLiveQuery`);
      if (!hookRegex.test(body) && !code.substring(match.index, startIdx).includes(`const ${c} = useLiveQuery`)) {
        const wordRegex = new RegExp(`\\b${c}\\b`);
        if (wordRegex.test(body)) {
          injections += `\n  const ${c} = useLiveQuery(() => db.${c}.toArray()) || [];`;
        }
      }
    }
    
    if (injections) {
      replacements.push({
        orig: match[0],
        new: match[0] + injections
      });
    }
  }
  
  for (const r of replacements) {
    // replace first occurence just in case
    code = code.replace(r.orig, r.new);
  }
  
  fs.writeFileSync('src/views/' + file, code);
}
console.log('Fixed missing hooks.');
