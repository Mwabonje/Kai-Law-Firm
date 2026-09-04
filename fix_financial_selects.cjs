const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

// 1. handleCreateInvoice
const oldCreate = /const handleCreateInvoice = async \(\) => \{[\s\S]*?setIsCreateOpen\(false\);\n  \};/;
const newCreate = `const handleCreateInvoice = async () => {
    if (!client || !matter || !total) return;
    const newInvoice = {
      no: "INV-" + Math.floor(4000 + Math.random() * 1000),
      client,
      matter,
      amount: "KES " + total.toLocaleString(),
      due: dueDate || new Date().toLocaleDateString('en-GB'),
      date: new Date().toLocaleDateString('en-GB'),
      status: "Pending",
      lineItems: lineItems
    };
    await db.invoices.add(newInvoice);
    setIsCreateOpen(false);
    setLineItems([{ id: 1, desc: '', sub: '', qty: 1, rate: 0 }]);
    setClient('');
    setMatter('');
  };`;
code = code.replace(oldCreate, newCreate);

// 2. Client select
const oldClientSelect = /<select value=\{client\}([\s\S]*?)<\/select>/;
const newClientSelect = `<select value={client} onChange={e => setClient(e.target.value)} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\\\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option value="">Select Client...</option>
                {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>`;
code = code.replace(oldClientSelect, newClientSelect);

// 3. Matter select (careful, it might match the second select)
const selectsMatch = code.match(/<select value=\{matter\}[\s\S]*?<\/select>/);
if (selectsMatch) {
  const newMatterSelect = `<select value={matter} onChange={e => setMatter(e.target.value)} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\\\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option value="">Select Matter...</option>
                {matters.map(m => <option key={m.id} value={m.no}>{m.no} - {m.title}</option>)}
              </select>`;
  code = code.replace(selectsMatch[0], newMatterSelect);
}

fs.writeFileSync('src/views/FinancialViews.tsx', code);
