const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

code = code.replace(
  /<div>\s*<label className="block text-\[12.5px\] font-semibold text-text-main mb-1.5">Client<\/label>\s*<select className="w-full border/g,
  '<div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label><select value={client} onChange={e => setClient(e.target.value)} className="w-full border'
);

code = code.replace(
  /<div>\s*<label className="block text-\[12.5px\] font-semibold text-text-main mb-1.5">Matter<\/label>\s*<select className="w-full border/g,
  '<div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Matter</label><select value={matter} onChange={e => setMatter(e.target.value)} className="w-full border'
);

code = code.replace(
  /<div>\s*<label className="block text-\[12.5px\] font-semibold text-text-main mb-1.5">Due Date<\/label>\s*<input type="date" className="w-full border/g,
  '<div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Due Date</label><input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full border'
);

fs.writeFileSync('src/views/FinancialViews.tsx', code);
