const fs = require('fs');
const glob = require('fs').readdirSync('src/views').filter(f => f.endsWith('.tsx'));

for (const file of glob) {
  let code = fs.readFileSync('src/views/' + file, 'utf8');
  
  const dataImportMatch = code.match(/import\s+{([^}]+)}\s+from\s+'\.\.\/data';/);
  if (dataImportMatch) {
    const vars = dataImportMatch[1].split(',').map(s => s.trim());
    
    // Remove the old import and add new imports
    code = code.replace(dataImportMatch[0], 
      `import { useLiveQuery } from 'dexie-react-hooks';\nimport { db } from '../db';`
    );

    // Find all export function ComponentName() {
    const componentRegex = /export\s+function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*{/g;
    let match;
    let replacements = [];
    while ((match = componentRegex.exec(code)) !== null) {
      let injections = vars.map(v => `  const ${v} = useLiveQuery(() => db.${v}.toArray()) || [];`).join('\n');
      replacements.push({
        orig: match[0],
        new: match[0] + '\n' + injections
      });
    }

    for (const r of replacements) {
      code = code.replace(r.orig, r.new);
    }
    
    fs.writeFileSync('src/views/' + file, code);
  }
}
