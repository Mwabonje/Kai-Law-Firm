const fs = require('fs');

let code = fs.readFileSync('src/views/InvoiceDetail.tsx', 'utf8');

// The modal in InvoiceDetail.tsx should be modified to also show the client, and actually save the payment to the DB.
const match = code.match(/const \[isPaymentOpen, setIsPaymentOpen\] = React\.useState\(false\);/);
if (match) {
    const newStates = `
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [newPayment, setNewPayment] = React.useState({ amount: '', method: 'M-Pesa', date: '', reference: '', notes: '' });

  const handleRecordPayment = async () => {
    if (!newPayment.amount) return;
    
    await db.payments.add({
      paymentId: newPayment.reference || "PMT-" + Math.floor(1000 + Math.random() * 9000),
      client: invoice.client,
      invoice: invoice.no,
      amount: "KES " + newPayment.amount,
      method: newPayment.method,
      date: newPayment.date || new Date().toLocaleDateString('en-GB'),
      status: 'Completed'
    });
    
    setNewPayment({ amount: '', method: 'M-Pesa', date: '', reference: '', notes: '' });
    setIsPaymentOpen(false);
  };
`;
    code = code.replace(/const \[isPaymentOpen, setIsPaymentOpen\] = React\.useState\(false\);/, newStates);
}

const modalRegex = /<Modal\s+isOpen=\{isPaymentOpen\}[\s\S]*?<\/Modal>/;
const modalMatch = code.match(modalRegex);
if (modalMatch) {
    const newModal = `
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
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-mute bg-ink-2 outline-none cursor-not-allowed" value={invoice.no} readOnly />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-mute bg-ink-2 outline-none cursor-not-allowed" value={invoice.client} readOnly />
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
      </Modal>`;

    code = code.replace(modalRegex, newModal);
}
fs.writeFileSync('src/views/InvoiceDetail.tsx', code);
