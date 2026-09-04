const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');
code = code.replace(/  const invoices as staticInvoices = useLiveQuery[^\n]*\n/g, '');
code = code.replace(/  const payments as staticPayments = useLiveQuery[^\n]*\n/g, '');
code = code.replace(/  const invoices = useLiveQuery[^\n]*\n  const payments = useLiveQuery[^\n]*\n/, ''); // remove any duplicate
fs.writeFileSync('src/views/FinancialViews.tsx', code);
