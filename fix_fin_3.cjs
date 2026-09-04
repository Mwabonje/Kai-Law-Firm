const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

// Add states
code = code.replace(
  'const [lineItems, setLineItems] = React.useState([',
  `const [client, setClient] = React.useState('');
  const [matter, setMatter] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [lineItems, setLineItems] = React.useState([`
);

const submitFunc = `
  const handleCreateInvoice = async () => {
    if (!client || !matter || !total) return;
    const newInvoice = {
      no: "INV-" + Math.floor(4000 + Math.random() * 1000),
      client,
      matter,
      amount: "KES " + total.toLocaleString(),
      due: dueDate || "10 Sep 2026",
      status: "Pending"
    };
    await db.invoices.add(newInvoice);
    setIsCreateOpen(false);
  };
`;

code = code.replace(
  'const overdueInvoices = invoices.filter',
  submitFunc + '\n  const overdueInvoices = invoices.filter'
);

code = code.replace(
  '<Button variant="primary" onClick={() => setIsCreateOpen(false)}>Create Invoice</Button>',
  '<Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>'
);

code = code.replace(
  '<select className="w-full border',
  '<select value={client} onChange={e => setClient(e.target.value)} className="w-full border'
);

// We need to do the second select for matter too
// Let's just do a string replacement with caution
