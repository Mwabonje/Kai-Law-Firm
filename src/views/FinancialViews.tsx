import { InvoiceDetail } from "./InvoiceDetail";
import React from 'react';
import { Button, Badge, IconButton, Pagination, getInitials, Modal } from '../components/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Plus, Search, Eye, AlertCircle, Clock, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function InvoicesView() {
  const clients = useLiveQuery(() => db.clients.toArray()) || [];
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];
  const [selectedInvoice, setSelectedInvoice] = React.useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [client, setClient] = React.useState('');
  const [matter, setMatter] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [lineItems, setLineItems] = React.useState([
    { id: 1, desc: '', sub: '', qty: 1, rate: 0 }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), desc: '', sub: '', qty: 1, rate: 0 }]);
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: number, field: string, value: any) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = lineItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const vat = subtotal * 0.16;
  const total = subtotal + vat;

  
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

  const overdueInvoices = invoices.filter(i => i.status === 'Overdue');
  const pendingInvoices = invoices.filter(i => i.status === 'Pending');

  if (selectedInvoice) {
    return (
      <InvoiceDetail 
        invoice={selectedInvoice} 
        onBack={() => setSelectedInvoice(null)} 
        generatePDF={() => generateInvoicePDF(selectedInvoice)} 
      />
    );
  }

  const generateInvoicePDF = (invoice: any) => {
    const doc = new jsPDF();
    
    // Firm Branding
    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.setFont('helvetica', 'bold');
    doc.text('KAI', 14, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont('helvetica', 'normal');
    doc.text('Advocates | Property & Land Law', 14, 27);
    
    doc.text('KAI Plaza, 4th Floor', 14, 34);
    doc.text('Nairobi, Kenya', 14, 39);
    doc.text('Email: billing@kaiadvocates.co.ke', 14, 44);
    doc.text('Phone: +254 700 000 000', 14, 49);

    // Invoice Details
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 120, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No:`, 120, 28);
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.no, 150, 28);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Date Issued:`, 120, 34);
    doc.setFont('helvetica', 'bold');
    doc.text(new Date().toLocaleDateString(), 150, 34);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Due Date:`, 120, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.due, 150, 40);

    // Client Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Billed To:', 14, 65);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.client, 14, 72);
    doc.text(`Matter: ${invoice.matter}`, 14, 78);

    // Table
    autoTable(doc, {
      startY: 90,
      head: [['Description', 'Amount']],
      body: [
        [`Professional legal services rendered for matter ${invoice.matter}`, invoice.amount],
        ['Disbursements and filling fees', 'Included'],
      ],
      foot: [['Total Due', invoice.amount]],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255], fontStyle: 'bold' },
      footStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: { 1: { halign: 'right' } }
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('Payment Terms: 14 Days from date of issue.', 14, (doc as any).lastAutoTable.finalY + 15);
    doc.text('Thank you for your business.', 14, (doc as any).lastAutoTable.finalY + 20);

    doc.save(`${invoice.no}_${invoice.client.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Invoices</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Billing across all clients and matters.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {overdueInvoices.length > 0 && (
          <div className="bg-danger-bg border border-danger/20 rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <div className="text-danger shrink-0 mt-0.5">
              <AlertCircle className="w-[18px] h-[18px]" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-danger uppercase tracking-wide">Action Required: Overdue Payments</h3>
              <p className="text-[12.5px] text-danger/80 mt-1 font-medium">
                {overdueInvoices.length} invoices are currently overdue. Please follow up with the respective clients.
              </p>
            </div>
          </div>
        )}
        {pendingInvoices.length > 0 && (
          <div className="bg-warning-bg border border-warning/20 rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <div className="text-warning shrink-0 mt-0.5">
              <Clock className="w-[18px] h-[18px]" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-warning uppercase tracking-wide">Upcoming Billing Deadlines</h3>
              <p className="text-[12.5px] text-warning/90 mt-1 font-medium">
                {pendingInvoices.length} invoices are pending payment. Review the schedule for upcoming due dates.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search invoices…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All statuses</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <div className="flex-1 hidden md:block"></div>
        <span className="text-[12.5px] text-text-mute hidden sm:inline-block">KES 4.2M outstanding</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Client</th>
                <th>Matter</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-text-main">{i.no}</td>
                  <td className="text-text-soft">{i.client}</td>
                  <td className="text-text-soft">{i.matter}</td>
                  <td className="font-semibold text-text-main">{i.amount}</td>
                  <td className="text-text-soft">{i.due}</td>
                  <td><Badge status={i.status}>{i.status}</Badge></td>
                  <td>
                    <div className="flex gap-1 justify-end">
                      <IconButton title="Download PDF" onClick={() => generateInvoicePDF(i)}><Download className="w-[15px] h-[15px]" /></IconButton>
                      <IconButton title="View" onClick={() => setSelectedInvoice(i)}><Eye className="w-[15px] h-[15px]" /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={61} label="Showing 1–8 of 61" />
      </div>

      <Modal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)}
        title="Create Invoice"
        maxWidth="max-w-[720px]"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label><select value={client} onChange={e => setClient(e.target.value)} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>Select Client...</option>
                <option>Wanjiru Njoroge</option>
                <option>Tembo Properties Ltd</option>
                <option>Coastal Sands Ltd</option>
              </select>
            </div>
            <div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Matter</label><select value={matter} onChange={e => setMatter(e.target.value)} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>Select Matter...</option>
                <option>KAI-2026-0142</option>
                <option>KAI-2026-0139</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Invoice Date</label>
              <input type="date" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" />
            </div>
            <div><label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Due Date</label><input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-sub">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[12.5px] font-bold text-ink uppercase tracking-wide">Line Items</label>
            </div>
            
            <div className="hidden sm:grid grid-cols-[1fr_60px_100px_100px_30px] gap-3 mb-2 text-[10px] font-bold text-text-mute uppercase tracking-wider">
              <div>Description</div>
              <div className="text-right">Qty</div>
              <div className="text-right">Rate</div>
              <div className="text-right">Amount</div>
              <div></div>
            </div>

            <div className="flex flex-col gap-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_60px_100px_100px_30px] gap-3 items-start sm:items-center bg-surface border border-border-main sm:border-none p-3 sm:p-0 rounded-md sm:rounded-none">
                  <div className="w-full flex flex-col gap-2">
                    <input type="text" value={item.desc} onChange={(e) => updateLineItem(item.id, 'desc', e.target.value)} className="w-full border border-border-main rounded-md px-3 py-2 text-[13px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft placeholder:text-text-mute" placeholder="Item description" />
                    <input type="text" value={item.sub} onChange={(e) => updateLineItem(item.id, 'sub', e.target.value)} className="w-full border border-border-main rounded-md px-3 py-1.5 text-[12px] text-text-soft bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft placeholder:text-text-mute" placeholder="Additional details (optional)" />
                  </div>
                  
                  <div className="w-full sm:w-auto flex items-center gap-2 sm:block">
                    <span className="sm:hidden text-[11px] font-bold text-text-mute uppercase tracking-wider w-12">Qty</span>
                    <input type="number" min="1" value={item.qty} onChange={(e) => updateLineItem(item.id, 'qty', parseInt(e.target.value) || 0)} className="w-full border border-border-main rounded-md px-2 py-2 text-[13px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft text-right" />
                  </div>

                  <div className="w-full sm:w-auto flex items-center gap-2 sm:block">
                    <span className="sm:hidden text-[11px] font-bold text-text-mute uppercase tracking-wider w-12">Rate</span>
                    <input type="number" min="0" value={item.rate || ''} onChange={(e) => updateLineItem(item.id, 'rate', parseInt(e.target.value) || 0)} className="w-full border border-border-main rounded-md px-2 py-2 text-[13px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft text-right" placeholder="0" />
                  </div>

                  <div className="w-full sm:w-auto flex items-center gap-2 sm:block">
                    <span className="sm:hidden text-[11px] font-bold text-text-mute uppercase tracking-wider w-12">Amt</span>
                    <div className="w-full text-right text-[13.5px] text-text-main font-semibold py-2">
                      {(item.qty * item.rate).toLocaleString()}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex justify-end">
                    <button onClick={() => removeLineItem(item.id)} className="w-7 h-7 rounded bg-transparent border-none text-text-soft hover:bg-danger-bg hover:text-danger flex items-center justify-center outline-none">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3">
              <Button variant="ghost" size="sm" onClick={addLineItem} className="text-accent hover:text-accent-hover hover:bg-accent-soft">
                <Plus className="w-3.5 h-3.5" /> Add Line Item
              </Button>
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-4 border-t border-border-sub">
            <div className="w-full sm:w-[240px]">
              <div className="flex justify-between py-1.5 text-[13px]">
                <span className="text-text-soft">Subtotal</span>
                <span className="font-semibold text-ink">{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 text-[13px] border-b border-border-sub mb-2 pb-2">
                <span className="text-text-soft">VAT (16%)</span>
                <span className="font-semibold text-ink">{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 text-[14.5px] font-bold">
                <span className="text-ink">Total Due</span>
                <span className="text-ink">KES {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function PaymentsView() {
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];
  const payments = useLiveQuery(() => db.payments.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Payments</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Payment records received against invoices.</p>
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
                  <td className="font-semibold text-text-main">{p.id}</td>
                  <td className="text-text-soft">{p.client}</td>
                  <td className="text-text-soft">{p.invoice}</td>
                  <td className="font-semibold text-text-main">{p.amount}</td>
                  <td className="text-text-soft">{p.method}</td>
                  <td className="text-text-soft">{p.date}</td>
                  <td><Badge status={p.status}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
