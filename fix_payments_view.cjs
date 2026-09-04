const fs = require('fs');

let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

const regex = /export function PaymentsView\(\) \{([\s\S]*?)\n\}\n/m;
const match = code.match(regex);
if (match) {
    const originalBody = match[1];
    
    const newBody = `
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];
  const payments = useLiveQuery(() => db.payments.toArray()) || [];
  
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [newPayment, setNewPayment] = React.useState({ invoiceId: '', amount: '', method: 'M-Pesa', date: '', reference: '', notes: '' });

  const selectedInvoice = invoices.find(inv => inv.id === parseInt(newPayment.invoiceId) || inv.no === newPayment.invoiceId);
  const clientName = selectedInvoice ? selectedInvoice.client : 'Select an invoice first';

  const handleRecordPayment = async () => {
    if (!newPayment.invoiceId || !newPayment.amount) return;
    
    await db.payments.add({
      paymentId: newPayment.reference || "PMT-" + Math.floor(1000 + Math.random() * 9000),
      client: clientName,
      invoice: selectedInvoice ? selectedInvoice.no : newPayment.invoiceId,
      amount: "KES " + newPayment.amount,
      method: newPayment.method,
      date: newPayment.date || new Date().toLocaleDateString('en-GB'),
      status: 'Completed'
    });
    
    setNewPayment({ invoiceId: '', amount: '', method: 'M-Pesa', date: '', reference: '', notes: '' });
    setIsPaymentOpen(false);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Payments</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Payment records received against invoices.</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsPaymentOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Client</th>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-text-main">{p.paymentId}</td>
                  <td className="text-text-soft">{p.client}</td>
                  <td className="text-text-soft">{p.invoice}</td>
                  <td className="font-semibold text-text-main">{p.amount}</td>
                  <td className="text-text-soft">{p.method}</td>
                  <td className="text-text-soft">{p.date}</td>
                  <td><Badge status={p.status}>{p.status}</Badge></td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text-mute text-[13px]">No payments recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)}
        title="Record Payment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsPaymentOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleRecordPayment}>Save Payment</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Invoice</label>
              <select value={newPayment.invoiceId} onChange={e => setNewPayment({...newPayment, invoiceId: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\\\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option value="">Select Invoice...</option>
                {invoices.map(inv => (
                  <option key={inv.id} value={inv.no}>{inv.no} - {inv.amount}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-mute bg-ink-2 outline-none cursor-not-allowed" value={clientName} readOnly />
            </div>
          </div>
          
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Amount (KES)</label>
            <input type="text" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. 60,000" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Payment Method</label>
              <select value={newPayment.method} onChange={e => setNewPayment({...newPayment, method: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\\\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>M-Pesa</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
                <option>Cash</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Date Received</label>
              <input type="date" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Reference / Transaction ID</label>
            <input type="text" value={newPayment.reference} onChange={e => setNewPayment({...newPayment, reference: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. PMT-1128" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Internal Notes (Optional)</label>
            <textarea value={newPayment.notes} onChange={e => setNewPayment({...newPayment, notes: e.target.value})} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft min-h-[64px] resize-y" placeholder="Any additional notes..."></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );`;

    const replaced = code.replace(match[0], `export function PaymentsView() {\n${newBody}\n}\n`);
    fs.writeFileSync('src/views/FinancialViews.tsx', replaced);
}
