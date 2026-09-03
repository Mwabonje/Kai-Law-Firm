import { InvoiceDetail } from "./InvoiceDetail";
import React from 'react';
import { Button, Badge, IconButton, Pagination, getInitials } from '../components/ui';
import { invoices, payments } from '../data';
import { Plus, Search, Eye, AlertCircle, Clock, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function InvoicesView() {
  const [selectedInvoice, setSelectedInvoice] = React.useState<typeof invoices[0] | null>(null);

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

  const generateInvoicePDF = (invoice: typeof invoices[0]) => {
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
          <Button variant="primary" className="flex-1 sm:flex-none justify-center">
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
    </div>
  );
}

export function PaymentsView() {
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
