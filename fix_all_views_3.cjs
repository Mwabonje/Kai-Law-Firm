const fs = require('fs');
const glob = require('fs').readdirSync('src/views').filter(f => f.endsWith('.tsx'));

for (const file of glob) {
  if (file === 'FinancialViews.tsx') continue; // already fixed
  let code = fs.readFileSync('src/views/' + file, 'utf8');
  
  // Find which ones we need to inject
  const dataImportMatch = code.match(/import {([^}]+)}\s+from\s+'\.\.\/data';/);
  if (dataImportMatch) {
    const vars = dataImportMatch[1].split(',').map(s => s.trim());
    
    // Instead of regex on the function signature, just find `export function X(y) {` or similar
    // We can do it by finding `export function ` and the first `{` after it.
    
    let parts = code.split(/export function /);
    for (let i = 1; i < parts.length; i++) {
      let part = parts[i];
      let firstBrace = part.indexOf('{');
      if (firstBrace !== -1) {
        let beforeBrace = part.substring(0, firstBrace);
        let afterBrace = part.substring(firstBrace + 1);
        let injections = vars.map(v => `  const ${v} = useLiveQuery(() => db.${v}.toArray()) || [];`).join('\n') + '\n';
        parts[i] = beforeBrace + '{\n' + injections + afterBrace;
      }
    }
    
    code = parts.join('export function ');
    
    // add import if missing
    if (!code.includes('import { db }')) {
       code = `import { useLiveQuery } from 'dexie-react-hooks';\nimport { db } from '../db';\n` + code;
    }
    
    fs.writeFileSync('src/views/' + file, code);
  }
}
