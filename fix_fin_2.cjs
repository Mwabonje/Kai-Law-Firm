const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

code = code.replace(
  'export function PaymentsView() {',
  `export function PaymentsView() {
  const payments = useLiveQuery(() => db.payments.toArray()) || [];`
);

fs.writeFileSync('src/views/FinancialViews.tsx', code);
