const fs = require('fs');

let code = fs.readFileSync('src/views/InvoiceDetail.tsx', 'utf8');

const queryDecl = `const payments = useLiveQuery(() => db.payments.where('invoice').equals(invoice.no).toArray()) || [];`;
const newQueryDecl = `const payments = useLiveQuery(() => db.payments.where('invoice').equals(invoice.no).toArray()) || [];
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const relatedMatter = matters.find(m => m.no === invoice.matter);
`;

code = code.replace(queryDecl, newQueryDecl);

// <div className="text-[13px] text-text-soft mt-1">Matter details</div>
code = code.replace(/<div className="text-\[13px\] text-text-soft mt-1">Matter details<\/div>/, '<div className="text-[13px] text-text-soft mt-1">{relatedMatter ? relatedMatter.title : "Matter details"}</div>');

// In Related Matter sidebar section:
// <div className="text-[13.5px] font-semibold text-ink">Sale of Diani Beach Villa Plot</div>
code = code.replace(/<div className="text-\[13\.5px\] font-semibold text-ink">Sale of Diani Beach Villa Plot<\/div>/, '<div className="text-[13.5px] font-semibold text-ink">{relatedMatter ? relatedMatter.title : "Unknown Matter"}</div>');

fs.writeFileSync('src/views/InvoiceDetail.tsx', code);
