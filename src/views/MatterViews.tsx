import React, { useState } from 'react';
import { Button, Badge, PriorityBadge, Pagination, Modal } from '../components/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Plus, Search, ChevronLeft } from 'lucide-react';

export function MattersView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Matters</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">All open and closed legal matters handled by the practice.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Create Matter
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search matters…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All matter types</option>
          <option>Conveyancing</option>
          <option>Sale & Purchase</option>
          <option>Lease</option>
          <option>Land dispute</option>
          <option>Transfer</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Awaiting Client</option>
          <option>Closed</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All lawyers</option>
          <option>Amina Mwangi</option>
          <option>David Otieno</option>
          <option>Fatuma Ali</option>
        </select>
        <div className="flex-1 hidden 2xl:block"></div>
        <span className="text-[12.5px] text-text-mute hidden lg:inline-block">38 active matters</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Matter No.</th>
                <th>Matter Title</th>
                <th>Client</th>
                <th>Property</th>
                <th>Assigned Lawyer</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Date Opened</th>
              </tr>
            </thead>
            <tbody>
              {matters.map((m, i) => (
                <tr key={i} onClick={() => onNavigate('matterDetails')}>
                  <td className="text-text-soft">{m.no}</td>
                  <td className="font-semibold text-text-main">{m.title}</td>
                  <td className="text-text-soft">{m.client}</td>
                  <td className="text-text-soft">{m.property}</td>
                  <td className="text-text-soft">{m.lawyer}</td>
                  <td><Badge status={m.status}>{m.status}</Badge></td>
                  <td><PriorityBadge priority={m.priority} /></td>
                  <td className="text-text-soft">{m.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={38} label="Showing 1–8 of 38" />
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Create Matter"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>Create Matter</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Matter Title</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Sale of Diani Beach Villa Plot" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="Select client…" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Related Property</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="Select property…" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Matter Type</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>Conveyancing</option>
                <option>Sale & Purchase</option>
                <option>Lease Agreement</option>
                <option>Land Dispute</option>
                <option>Property Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Assigned Lawyer</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>Amina Mwangi</option>
                <option>David Otieno</option>
                <option>Fatuma Ali</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Priority</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option>Medium</option>
                <option>High</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Date Opened</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="dd/mm/yyyy" />
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Description</label>
            <textarea className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft min-h-[84px] resize-y" placeholder="Brief scope of the matter…"></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function MatterDetailsView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const tasks = useLiveQuery(() => db.tasks.toArray()) || [];
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];
  const activity = useLiveQuery(() => db.activity.toArray()) || [];
  const [activeTab, setActiveTab] = React.useState('overview');

  const matterTasks = tasks.filter(t => t.matter === "KAI-2026-0142");
  const matterDocs = documents.filter(d => d.matter === "KAI-2026-0142");
  const matterInvoices = invoices.filter(i => i.matter === "KAI-2026-0142");

  const timeline = [
    {t:"Sale agreement executed", d:"28 Aug 2026"},
    {t:"Draft sent to buyer's advocate", d:"24 Aug 2026"},
    {t:"Title deed obtained", d:"12 Aug 2026"},
    {t:"Matter opened", d:"3 Jun 2026"}
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <button onClick={() => onNavigate('matters')} className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft font-semibold mb-3.5 hover:text-text-main transition-colors">
        <ChevronLeft className="w-[13px] h-[13px]" />
        Back to Matters
      </button>

      <div className="bg-surface border border-border-main rounded-xl p-[22px] px-[26px] mb-0 flex flex-col sm:flex-row justify-between gap-5 items-start shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="w-[52px] h-[52px] rounded-xl bg-gold text-white flex items-center justify-center font-serif text-[18px] font-bold shrink-0 shadow-[0_4px_12px_rgba(88,80,236,0.22)]">
            MT
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-serif text-[20px] font-bold text-ink tracking-[-0.01em]">Sale of Diani Beach Villa Plot</span>
              <Badge status="In Progress">In Progress</Badge>
              <PriorityBadge priority="high" />
            </div>
            <div className="flex items-center gap-3.5 mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft">Matter No. KAI-2026-0142</div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft">Assigned to Amina Mwangi</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none justify-center">Upload Document</Button>
          <Button variant="secondary" className="flex-1 sm:flex-none justify-center">Add Task</Button>
          <Button variant="outline" className="flex-1 sm:flex-none justify-center">Edit Matter</Button>
        </div>
      </div>

      <div className="flex gap-0.5 border-b border-border-main my-5">
        {['overview', 'tasks', 'documents', 'activity', 'financial'].map((tab) => (
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
                <h3 className="text-[14.5px] font-semibold text-ink">Matter Overview</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Client</div>
                  <div className="text-[13.5px] text-text-main font-medium">Wanjiru Njoroge</div>
                </div>
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Related Property</div>
                  <div className="text-[13.5px] text-text-main font-medium">Diani Beach Villa Plot</div>
                </div>
                <div className="p-4 px-5 border-b border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Assigned Lawyer</div>
                  <div className="text-[13.5px] text-text-main font-medium">Amina Mwangi</div>
                </div>
                <div className="p-4 px-5 border-b sm:border-b-0 border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Matter Type</div>
                  <div className="text-[13.5px] text-text-main font-medium">Sale & Purchase</div>
                </div>
                <div className="p-4 px-5 border-b sm:border-b-0 border-border-sub">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Date Opened</div>
                  <div className="text-[13.5px] text-text-main font-medium">3 Jun 2026</div>
                </div>
                <div className="p-4 px-5">
                  <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Target Completion</div>
                  <div className="text-[13.5px] text-text-main font-medium">30 Sep 2026</div>
                </div>
              </div>
              <div className="p-4 px-[18px] border-t border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-2 uppercase tracking-wide">DESCRIPTION</div>
                <p className="text-[13.5px] text-text-soft leading-[1.65] m-0">Acting for the vendor, Wanjiru Njoroge, in the sale of a 0.85-acre beach plot in Diani to a foreign-registered buyer. Scope covers due diligence, drafting and negotiation of the sale agreement, land control board consent, and completion at the Kwale Lands Registry.</p>
              </div>
            </div>
            
            <div className="bg-surface border border-border-main rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
                <h3 className="text-[14.5px] font-semibold text-ink">Activity Timeline</h3>
              </div>
              <div className="p-5">
                {timeline.map((x, i) => (
                  <div key={i} className={`flex gap-3.5 relative ${i !== timeline.length - 1 ? 'pb-5' : ''}`}>
                    {i !== timeline.length - 1 && <div className="absolute left-[5px] top-[16px] bottom-[-4px] w-px bg-border-main"></div>}
                    <div className="w-[11px] h-[11px] rounded-full bg-surface border-2 border-accent shrink-0 mt-[3px] z-10"></div>
                    <div>
                      <div className="text-[13.5px] text-text-main font-medium">{x.t}</div>
                      <div className="text-[11.5px] text-text-mute mt-[3px]">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table min-w-full">
                <thead><tr><th>Task</th><th>Assigned</th><th>Due Date</th><th>Priority</th><th>Status</th></tr></thead>
                <tbody>
                  {matterTasks.map((t, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-text-main">{t.name}</td>
                      <td className="text-text-soft">{t.assignee}</td>
                      <td className="text-text-soft">{t.due}</td>
                      <td><PriorityBadge priority={t.priority} /></td>
                      <td><Badge status={t.status}>{t.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
            <div className="p-1.5">
              {matterDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-3 px-5 py-3 ${i !== matterDocs.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="w-[34px] h-[34px] rounded-md bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
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

        {activeTab === 'financial' && (
          <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table min-w-full">
                <thead><tr><th>Invoice</th><th>Amount</th><th>Due Date</th><th>Status</th></tr></thead>
                <tbody>
                  {matterInvoices.map((inv, i) => (
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
