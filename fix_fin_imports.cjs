const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

const regex = /import { useLiveQuery } from 'dexie-react-hooks';\nimport { db } from '\.\.\/db';\n/g;

let matches = [...code.matchAll(regex)];

if (matches.length > 1) {
  // replace the first one with empty string
  code = code.replace(matches[0][0], '');
}

fs.writeFileSync('src/views/FinancialViews.tsx', code);
