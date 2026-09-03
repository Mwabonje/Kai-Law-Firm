import React from 'react';
import { Badge, Button } from '../components/ui';
import { Download, Send, Plus, ChevronLeft } from 'lucide-react';

export function InvoiceDetail({ invoice, onBack, generatePDF }: { invoice: any, onBack: () => void, generatePDF: () => void }) {
  // Using hardcoded data from the image to match exactly for the sample invoice,
  // but we can try to make it slightly dynamic.
  // The image shows specific line items for INV-3021. Let's just use static ones that match the image for the demo.
  const lineItems = [
    { desc: "Professional fees — conveyancing", sub: "Due diligence, drafting and negotiation of sale agreement", qty: 1, rate: "120,000", amount: "120,000" },
    { desc: "Land Control Board consent application", sub: "Preparation and filing of consent application", qty: 1, rate: "25,000", amount: "25,000" },
    { desc: "Disbursements", sub: "Search fees, valuation report, courier and filing costs", qty: 1, rate: "14,500", amount: "14,500" },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] font-semibold text-text-soft hover:text-text-main transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Invoices
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Invoice {invoice.no}</h1>
          <Badge status={invoice.status}>{invoice.status}</Badge>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="secondary" onClick={generatePDF}>
            <Download className="w-[15px] h-[15px]" /> Download PDF
          </Button>
          <Button variant="secondary">
            <Send className="w-[15px] h-[15px]" /> Send to Client
          </Button>
          <Button variant="primary">
            <Plus className="w-[15px] h-[15px]" /> Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left Column - Invoice Document */}
        <div className="bg-surface rounded-xl border border-border-main p-8 md:p-10 shadow-sm flex flex-col min-h-[600px]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg">K</div>
                <div className="text-[20px] font-bold text-ink tracking-tight">KAI Advocates LLP</div>
              </div>
              <div className="text-[13px] text-text-soft leading-relaxed">
                5th Floor, Nkrumah Road, Mombasa, Kenya<br />
                P.O. Box 8842–80100 · LLP/2018/004421<br />
                info@kaiadvocates.co.ke
              </div>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-bold text-ink tracking-tight">Invoice</div>
              <div className="text-[13px] text-text-soft mt-1">{invoice.no}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border-sub border-dashed">
            <div>
              <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-2">Billed To</div>
              <div className="text-[13.5px] font-semibold text-ink">{invoice.client}</div>
              <div className="text-[13px] text-text-soft mt-1">Nyali, Mombasa<br />wanjiru.njoroge@gmail.com</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-2">Matter</div>
              <div className="text-[13.5px] font-semibold text-ink">{invoice.matter}</div>
              <div className="text-[13px] text-text-soft mt-1">Sale of Diani Beach Villa Plot</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-2">Invoice Date</div>
              <div className="text-[13.5px] font-semibold text-ink">27 Aug 2026</div>
              <div className="text-[13px] text-text-soft mt-1">Due {invoice.due}</div>
            </div>
          </div>

          <table className="w-full mb-10">
            <thead>
              <tr className="border-b border-border-sub">
                <th className="text-left text-[11px] font-bold text-text-mute uppercase tracking-wider pb-3">Description</th>
                <th className="text-right text-[11px] font-bold text-text-mute uppercase tracking-wider pb-3 w-[60px]">Qty</th>
                <th className="text-right text-[11px] font-bold text-text-mute uppercase tracking-wider pb-3 w-[100px]">Rate (KES)</th>
                <th className="text-right text-[11px] font-bold text-text-mute uppercase tracking-wider pb-3 w-[100px]">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, idx) => (
                <tr key={idx} className="border-b border-border-sub/50">
                  <td className="py-4 pr-4">
                    <div className="text-[13.5px] font-semibold text-ink">{item.desc}</div>
                    <div className="text-[12.5px] text-text-soft mt-0.5">{item.sub}</div>
                  </td>
                  <td className="py-4 text-right text-[13.5px] text-text-main align-top">{item.qty}</td>
                  <td className="py-4 text-right text-[13.5px] text-text-main align-top">{item.rate}</td>
                  <td className="py-4 text-right text-[13.5px] text-text-main align-top">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-16">
            <div className="w-[300px]">
              <div className="flex justify-between py-2 text-[13.5px]">
                <span className="text-text-soft">Subtotal</span>
                <span className="font-semibold text-ink">KES 159,500</span>
              </div>
              <div className="flex justify-between py-2 text-[13.5px] border-b border-border-sub mb-3 pb-3">
                <span className="text-text-soft">VAT (16%)</span>
                <span className="font-semibold text-ink">KES 25,520</span>
              </div>
              <div className="flex justify-between py-2 text-[15px] font-bold">
                <span className="text-ink">Total Due</span>
                <span className="text-ink">KES 185,020</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10">
            <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-2">Payment Terms</div>
            <div className="text-[12.5px] text-text-soft leading-relaxed max-w-[500px]">
              Payment due within 14 days of invoice date. Kindly reference the invoice number when making payment via bank transfer or M-Pesa Paybill 400200, Account {invoice.no}.<br /><br />
              Thank you for instructing KAI Advocates LLP.
            </div>
          </div>
        </div>

        {/* Right Column - Side Panels */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface rounded-xl border border-border-main p-6 shadow-sm">
            <h3 className="text-[14.5px] font-bold text-ink mb-6">Summary</h3>
            
            <div className="space-y-5">
              <div>
                <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-1.5">Status</div>
                <Badge status={invoice.status}>{invoice.status}</Badge>
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-1.5">Total Amount</div>
                <div className="text-[15px] font-semibold text-ink">KES 185,020</div>
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-1.5">Paid to Date</div>
                <div className="text-[15px] font-semibold text-ink">KES 60,000</div>
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-1.5">Balance</div>
                <div className="text-[15px] font-semibold text-danger">KES 125,020</div>
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-text-mute uppercase tracking-wider mb-1.5">Due Date</div>
                <div className="text-[14px] font-semibold text-ink">{invoice.due}</div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border-main shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border-sub">
              <h3 className="text-[14.5px] font-bold text-ink">Payment History</h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">M-Pesa</div>
                  <div className="text-[12px] text-text-soft mt-0.5">30 Aug 2026 · PMT-1128</div>
                </div>
                <div className="text-[13.5px] font-bold text-success">KES 60,000</div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border-main shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border-sub">
              <h3 className="text-[14.5px] font-bold text-ink">Related Matter</h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">Sale of Diani Beach Villa Plot</div>
                  <div className="text-[12px] text-text-soft mt-0.5">{invoice.matter} · Amina Mwangi</div>
                </div>
                <Badge status="In Progress">In Progress</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
