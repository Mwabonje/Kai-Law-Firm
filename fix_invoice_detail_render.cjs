const fs = require('fs');

let code = fs.readFileSync('src/views/InvoiceDetail.tsx', 'utf8');

// The lineItems
const oldLineItemsDecl = /const lineItems = \[[\s\S]*?\];/;
const newLineItemsDecl = `const lineItems = invoice.lineItems || [];
  
  // Also get payments related to this invoice from DB
  const payments = useLiveQuery(() => db.payments.where('invoice').equals(invoice.no).toArray()) || [];
  
  const totalPaid = payments.reduce((sum, p) => {
    const amt = parseFloat(p.amount.replace(/[^0-9.-]+/g,""));
    return sum + (isNaN(amt) ? 0 : amt);
  }, 0);
  
  const invTotal = parseFloat(invoice.amount.replace(/[^0-9.-]+/g,"")) || 0;
  const balance = invTotal - totalPaid;
`;

code = code.replace(oldLineItemsDecl, newLineItemsDecl);

// Now the rendering part.
// The left side has a hardcoded client (Wanjiru Njoroge), email, matter (Sale of Diani Beach Villa Plot), etc.
code = code.replace(/Wanjiru Njoroge/g, '{invoice.client}');
code = code.replace(/Nyali, Mombasa/g, '');
code = code.replace(/wanjiru\.njoroge@gmail\.com/g, '{invoice.client.replace(/\\s+/g, "").toLowerCase()}@email.com');
code = code.replace(/KAI-2026-0142/g, '{invoice.matter}');
code = code.replace(/Sale of Diani Beach Villa Plot/g, 'Matter details');

// 27 Aug 2026 -> {invoice.date || 'Unknown'}
code = code.replace(/27 Aug 2026/g, '{invoice.date || invoice.added || "Unknown Date"}');
code = code.replace(/Due 2026-09-04/g, 'Due {invoice.due}');

// Payment History UI
// Old: 
/*
<div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">M-Pesa</div>
                  <div className="text-[12px] text-text-soft mt-0.5">30 Aug 2026 · PMT-1128</div>
                </div>
                <div className="text-[13.5px] font-bold text-success">KES 60,000</div>
              </div>
            </div>
*/

const oldPaymentHistory = /<div className="p-5">\s*<div className="flex justify-between items-center">\s*<div>\s*<div className="text-\[13\.5px\] font-semibold text-ink">M-Pesa<\/div>\s*<div className="text-\[12px\] text-text-soft mt-0\.5">30 Aug 2026 · PMT-1128<\/div>\s*<\/div>\s*<div className="text-\[13\.5px\] font-bold text-success">KES 60,000<\/div>\s*<\/div>\s*<\/div>/;

const newPaymentHistory = `<div className="p-5 flex flex-col gap-4">
              {payments.length === 0 && <div className="text-[13px] text-text-soft">No payments recorded.</div>}
              {payments.map(p => (
                <div key={p.id} className="flex justify-between items-center">
                  <div>
                    <div className="text-[13.5px] font-semibold text-ink">{p.method}</div>
                    <div className="text-[12px] text-text-soft mt-0.5">{p.date} · {p.paymentId}</div>
                  </div>
                  <div className="text-[13.5px] font-bold text-success">{p.amount}</div>
                </div>
              ))}
            </div>`;

code = code.replace(oldPaymentHistory, newPaymentHistory);

// Total Amount, Paid to date, Balance 
// KES 185,020 -> {invoice.amount}
// KES 60,000 -> KES {totalPaid.toLocaleString()}
// KES 125,020 -> KES {balance.toLocaleString()}
// 2026-09-04 -> {invoice.due}

// We need to carefully replace the exact strings.
code = code.replace(/KES 185,020/g, '{invoice.amount}');
code = code.replace(/KES 60,000/g, 'KES {totalPaid.toLocaleString()}');
code = code.replace(/KES 125,020/g, 'KES {balance.toLocaleString()}');
code = code.replace(/>2026-09-04</g, '>{invoice.due}<');

// Line items map: 
/*
{lineItems.map((item, index) => (
                  <tr key={index} className="border-b border-border-sub last:border-0">
                    <td className="py-3">
                      <div className="text-[13.5px] font-semibold text-ink">{item.desc}</div>
                      <div className="text-[12px] text-text-soft mt-0.5">{item.sub}</div>
                    </td>
                    <td className="py-3 text-right text-[13.5px] text-text-main">{item.qty}</td>
                    <td className="py-3 text-right text-[13.5px] text-text-main">{item.rate}</td>
                    <td className="py-3 text-right text-[13.5px] font-semibold text-ink">{item.amount}</td>
                  </tr>
                ))}
*/
// It's mostly correct! We just need to ensure rate/amount are formatted.
code = code.replace(/\{item.rate\}/g, '{typeof item.rate === "number" ? item.rate.toLocaleString() : item.rate}');
code = code.replace(/\{item.amount\}/g, '{((item.qty || 1) * (parseFloat(item.rate) || 0)).toLocaleString()}');

// Subtotal & VAT (previously hardcoded to KES 159,500 and 25,520)
code = code.replace(/KES 159,500/g, 'KES {(invTotal / 1.16).toLocaleString(undefined, {maximumFractionDigits:0})}');
code = code.replace(/KES 25,520/g, 'KES {(invTotal - (invTotal / 1.16)).toLocaleString(undefined, {maximumFractionDigits:0})}');

fs.writeFileSync('src/views/InvoiceDetail.tsx', code);
