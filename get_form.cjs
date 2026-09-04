const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');
const lines = code.split('\n');
let modalStart = lines.findIndex(l => l.includes('title="Create Invoice"'));
console.log(lines.slice(modalStart - 10, modalStart + 25).join('\n'));
