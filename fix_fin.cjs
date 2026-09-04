const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

// Replace InvoicesView signature and add hook
code = code.replace(
  'export function InvoicesView() {',
  `export function InvoicesView() {
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];`
);

// We need to change the type of selectedInvoice
code = code.replace(
  'const [selectedInvoice, setSelectedInvoice] = React.useState<typeof invoices[0] | null>(null);',
  'const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);'
);
code = code.replace(
  'const generateInvoicePDF = (invoice: typeof invoices[0]) => {',
  'const generateInvoicePDF = (invoice: any) => {'
);

fs.writeFileSync('src/views/FinancialViews.tsx', code);
