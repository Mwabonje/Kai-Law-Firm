const fs = require('fs');

let typesCode = fs.readFileSync('src/types.ts', 'utf8');
typesCode = typesCode.replace(
  'amount: string; due: string; status: string; }',
  'amount: string; due: string; status: string; date?: string; lineItems?: any[]; }'
);
fs.writeFileSync('src/types.ts', typesCode);

