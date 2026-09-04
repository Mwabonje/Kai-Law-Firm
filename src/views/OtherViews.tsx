import React from 'react';
import { Button, Badge, IconButton, Pagination, getInitials } from '../components/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Plus, Search, Upload, Download, Edit2, BarChart2 } from 'lucide-react';

export function DocumentsView() {
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const users = useLiveQuery(() => db.users.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Documents</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Titles, agreements, correspondence and filings — securely organised.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center">
            <Upload className="w-[15px] h-[15px]" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search documents…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All types</option>
          <option>Title Deed</option>
          <option>Sale Agreement</option>
          <option>Lease</option>
          <option>Correspondence</option>
          <option>Court Filing</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All matters</option>
          <option>KAI-2026-0142</option>
          <option>KAI-2026-0139</option>
        </select>
        <div className="flex-1 hidden md:block"></div>
        <span className="text-[12.5px] text-text-mute hidden sm:inline-block">614 documents</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Related Client</th>
                <th>Related Matter</th>
                <th>Uploaded</th>
                <th>Uploaded By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-accent-soft text-accent flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
                      </div>
                      <span className="font-semibold text-text-main">{d.name}</span>
                    </div>
                  </td>
                  <td className="text-text-soft">{d.type}</td>
                  <td className="text-text-soft">{d.client}</td>
                  <td className="text-text-soft">{d.matter}</td>
                  <td className="text-text-soft">{d.date}</td>
                  <td className="text-text-soft">{d.by}</td>
                  <td>
                    <div className="flex gap-1 justify-end">
                      <IconButton title="Download"><Download className="w-[15px] h-[15px]" /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={614} label="Showing 1–8 of 614" />
      </div>
    </div>
  );
}

export function UsersView() {
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const users = useLiveQuery(() => db.users.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Users</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Manage staff access to the practice management system.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center">
            <Plus className="w-[15px] h-[15px]" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Matters Assigned</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-[30px] h-[30px] rounded-full bg-ink text-white flex items-center justify-center text-[11px] font-semibold">
                        {getInitials(u.name)}
                      </div>
                      <span className="font-semibold text-text-main">{u.name}</span>
                    </div>
                  </td>
                  <td className="text-text-soft">{u.role}</td>
                  <td className="text-text-soft">{u.email}</td>
                  <td className="text-text-soft">{u.matters}</td>
                  <td><Badge status={u.status}>{u.status}</Badge></td>
                  <td>
                    <div className="flex gap-1 justify-end">
                      <IconButton title="Edit"><Edit2 className="w-[15px] h-[15px]" /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ReportsView() {
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const users = useLiveQuery(() => db.users.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Reports</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Practice performance at a glance.</p>
        </div>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm flex flex-col items-center justify-center py-16 px-5 text-center">
        <div className="w-[52px] h-[52px] rounded-xl bg-accent-soft flex items-center justify-center text-accent mb-4">
          <BarChart2 className="w-6 h-6" />
        </div>
        <div className="text-[14.5px] font-semibold text-text-main mb-1.25">Reports are being prepared</div>
        <div className="text-[12.5px] text-text-mute mb-4.5 max-w-[280px]">Matter, billing and client reports will appear here once configured for your practice.</div>
        <Button variant="secondary">Configure Reports</Button>
      </div>
    </div>
  );
}

export function SettingsView() {
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const users = useLiveQuery(() => db.users.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Settings</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Firm details, preferences and system configuration.</p>
        </div>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
          <h3 className="text-[14.5px] font-semibold text-ink">Firm Profile</h3>
        </div>
        <div className="p-[18px] px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div className="mb-4 sm:mb-0">
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Firm Name</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" defaultValue="KAI Advocates LLP" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Registration No.</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" defaultValue="LLP/2018/004421" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div className="mb-4 sm:mb-0">
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Office Address</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" defaultValue="5th Floor, Nkrumah Road, Mombasa" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Support Email</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" defaultValue="info@kaiadvocates.co.ke" />
            </div>
          </div>
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
