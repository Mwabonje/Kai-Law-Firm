import React, { useState } from 'react';
import { Button, Badge, IconButton, Pagination, getInitials, Modal } from '../components/ui';
import { clients, matters, properties, documents, invoices } from '../data';
import { Plus, Search, MoreHorizontal, Edit2, Phone, Mail, Calendar, ChevronLeft, Download, FileText } from 'lucide-react';

export function ClientsView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Clients</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Manage individuals, companies and institutions the firm represents.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search clients by name or phone…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All client types</option>
          <option>Individual</option>
          <option>Company</option>
          <option>Institution</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All statuses</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Prospective</option>
        </select>
        <div className="flex-1 hidden sm:block"></div>
        <span className="text-[12.5px] text-text-mute hidden sm:inline-block">146 clients</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Type</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Active Matters</th>
                <th>Date Added</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={i} onClick={() => onNavigate('clientProfile')}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-[30px] h-[30px] rounded-full bg-ink text-white flex items-center justify-center text-[11px] font-semibold">
                        {getInitials(c.name)}
                      </div>
                      <span className="font-semibold text-text-main">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-text-soft">{c.type}</td>
                  <td className="text-text-soft">{c.phone}</td>
                  <td className="text-text-soft">{c.email}</td>
                  <td className="text-text-soft">{c.matters}</td>
                  <td className="text-text-soft">{c.added}</td>
                  <td><Badge status={c.status}>{c.status}</Badge></td>
                  <td>
                    <div className="flex gap-1 justify-end" onClick={e => e.stopPropagation()}>
                      <IconButton title="Edit"><Edit2 className="w-[15px] h-[15px]" /></IconButton>
                      <IconButton title="More"><MoreHorizontal className="w-[15px] h-[15px]" /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={146} label="Showing 1–8 of 146" />
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add Client"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>Add Client</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client Type</label>
            <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
              <option>Individual</option>
              <option>Company</option>
              <option>Institution</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Full Name</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Wanjiru Njoroge" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Phone Number</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="+254 7…" />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Email Address</label>
            <input type="email" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="name@email.com" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">ID / Passport / Registration No.</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. 22841076" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Notes</label>
            <textarea className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft min-h-[84px] resize-y" placeholder="Optional internal notes…"></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function ClientProfileView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeTab, setActiveTab] = React.useState('overview');

  const clientMatters = matters.filter(m => m.client === "Wanjiru Njoroge");
  const clientProperties = properties.filter(p => p.owner === "Wanjiru Njoroge");
  const clientDocs = documents.filter(d => d.client === "Wanjiru Njoroge");
  const clientInvoices = invoices.filter(i => i.client === "Wanjiru Njoroge");

  return (
    <div className="animate-in fade-in duration-300">
      <button onClick={() => onNavigate('clients')} className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft font-semibold mb-3.5 hover:text-text-main transition-colors">
        <ChevronLeft className="w-[13px] h-[13px]" />
        Back to Clients
      </button>

      <div className="bg-surface border border-border-main rounded-xl p-[22px] px-[26px] mb-0 flex flex-col sm:flex-row justify-between gap-5 items-start shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="w-[52px] h-[52px] rounded-xl bg-accent text-white flex items-center justify-center font-serif text-[18px] font-bold shrink-0 shadow-[0_4px_12px_rgba(88,80,236,0.22)]">
            WN
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-serif text-[20px] font-bold text-ink tracking-[-0.01em]">Wanjiru Njoroge</span>
              <Badge status="Active">Active</Badge>
              <Badge>Individual</Badge>
            </div>
            <div className="flex items-center gap-3.5 mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft"><Phone className="w-3.5 h-3.5 text-text-mute" />+254 722 456 981</div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft"><Mail className="w-3.5 h-3.5 text-text-mute" />wanjiru.njoroge@gmail.com</div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft"><Calendar className="w-3.5 h-3.5 text-text-mute" />Client since 12 Mar 2023</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none justify-center">Edit Client</Button>
          <Button variant="outline" className="flex-1 sm:flex-none justify-center">New Matter</Button>
        </div>
      </div>

      <div className="flex gap-0.5 border-b border-border-main my-5">
        {['overview', 'matters', 'properties', 'documents', 'payments'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-2.5 mr-6 text-[13px] font-semibold border-b-2 bg-transparent transition-colors duration-120 ${activeTab === tab ? 'text-ink border-accent' : 'text-text-mute border-transparent hover:text-text-main'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
            <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
                <h3 className="text-[14.5px] font-semibold text-ink">Client Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">ID / PASSPORT NO.</div>
                  <div className="text-[13.5px] text-text-main font-medium">22841076</div>
                </div>
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">KRA PIN</div>
                  <div className="text-[13.5px] text-text-main font-medium">A011234567P</div>
                </div>
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Postal Address</div>
                  <div className="text-[13.5px] text-text-main font-medium">P.O. Box 8842–80100, Mombasa</div>
                </div>
                <div className="p-4 px-5 border-b sm:border-b-0 border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Physical Address</div>
                  <div className="text-[13.5px] text-text-main font-medium">Nyali, Mombasa</div>
                </div>
                <div className="p-4 px-5 border-b sm:border-b-0 border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Referred By</div>
                  <div className="text-[13.5px] text-text-main font-medium">Julius Kamau</div>
                </div>
                <div className="p-4 px-5">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Relationship Manager</div>
                  <div className="text-[13.5px] text-text-main font-medium">Amina Mwangi</div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface border border-border-main rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
                <h3 className="text-[14.5px] font-semibold text-ink">Activity</h3>
              </div>
              <div className="p-1.5">
                {[
                  {t:"Matter KAI-2026-0142 opened", d:"3 Jun 2026"},
                  {t:"Document uploaded: Title Deed", d:"12 Aug 2026"},
                  {t:"Invoice INV-3021 issued", d:"27 Aug 2026"},
                ].map((a, i) => (
                  <div key={i} className={`flex gap-3 px-5 py-3 ${i !== 2 ? 'border-b border-border-sub' : ''}`}>
                    <div className="w-[7px] h-[7px] rounded-full bg-accent mt-1.5 shrink-0"></div>
                    <div>
                      <div className="text-[13px] text-text-main">{a.t}</div>
                      <div className="text-[11.5px] text-text-mute mt-0.5">{a.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matters' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Matters</h3>
            </div>
            <div className="p-1.5">
              {clientMatters.map((m, i) => (
                <div key={i} onClick={() => onNavigate('matterDetails')} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 cursor-pointer ${i !== clientMatters.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis">{m.title}</div>
                    <div className="text-[12px] text-text-mute mt-0.5">{m.no}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge status={m.status}>{m.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Properties</h3>
            </div>
            <div className="p-1.5">
              {clientProperties.map((p, i) => (
                <div key={i} onClick={() => onNavigate('propertyDetails')} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 cursor-pointer ${i !== clientProperties.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis">{p.name}</div>
                    <div className="text-[12px] text-text-mute mt-0.5">{p.title}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge status={p.status}>{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Documents</h3>
            </div>
            <div className="p-1.5">
              {clientDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-3 px-5 py-3 ${i !== clientDocs.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="w-[34px] h-[34px] rounded-md bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-text-main">{d.name}</div>
                    <div className="text-[11.5px] text-text-mute mt-0.5">{d.date} · {d.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table min-w-full">
                <thead><tr><th>Invoice</th><th>Amount</th><th>Due Date</th><th>Status</th></tr></thead>
                <tbody>
                  {clientInvoices.map((inv, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-text-main">{inv.no}</td>
                      <td className="text-text-soft">{inv.amount}</td>
                      <td className="text-text-soft">{inv.due}</td>
                      <td><Badge status={inv.status}>{inv.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
