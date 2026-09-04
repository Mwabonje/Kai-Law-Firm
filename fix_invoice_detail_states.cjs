const fs = require('fs');
let code = fs.readFileSync('src/views/InvoiceDetail.tsx', 'utf8');

const oldState = `const [isPaymentOpen, setIsPaymentOpen] = useState(false);`;
const newStates = `
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({ amount: '', method: 'M-Pesa', date: '', reference: '', notes: '' });

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
code = code.replace(oldState, newStates);
fs.writeFileSync('src/views/InvoiceDetail.tsx', code);
