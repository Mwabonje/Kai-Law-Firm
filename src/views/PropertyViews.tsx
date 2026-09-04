import React, { useState } from 'react';
import { Button, Badge, IconButton, Pagination, Modal } from '../components/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Plus, Search, Map, ChevronLeft, Edit2, FileText } from 'lucide-react';

export function PropertiesView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({ name: '', titleNo: '', owner: '', location: '', matter: '' });

  const handleAddProp = async () => {
    if (!newProp.name) return;
    await db.properties.add({
      name: newProp.name,
      title: newProp.titleNo || 'Pending',
      owner: newProp.owner || 'Unknown',
      location: newProp.location || 'Unknown',
      matter: newProp.matter || 'N/A',
      type: 'Commercial',
      status: 'Active'
    });
    setNewProp({ name: '', titleNo: '', owner: '', location: '', matter: '' });
    setIsAddModalOpen(false);
  };

  const properties = useLiveQuery(() => db.properties.toArray()) || [];
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Properties</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Track parcels, titles and units connected to client matters.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Add Property
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search by title number…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 w-full sm:w-[220px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Map className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Location" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All types</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Agricultural land</option>
          <option>Vacant land</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All statuses</option>
          <option>Registered</option>
          <option>Under transfer</option>
          <option>Disputed</option>
          <option>Sold</option>
        </select>
        <div className="flex-1 hidden xl:block"></div>
        <span className="text-[12.5px] text-text-mute hidden xl:inline-block">212 properties</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Property</th>
                <th>Title Number</th>
                <th>Type</th>
                <th>Location</th>
                <th>Client / Owner</th>
                <th>Related Matter</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={i} onClick={() => onNavigate('propertyDetails')}>
                  <td className="font-semibold text-text-main">{p.name}</td>
                  <td className="text-text-soft">{p.title}</td>
                  <td className="text-text-soft">{p.type}</td>
                  <td className="text-text-soft">{p.location}</td>
                  <td className="text-text-soft">{p.owner}</td>
                  <td className="text-text-soft">{p.matter}</td>
                  <td><Badge status={p.status}>{p.status}</Badge></td>
                  <td>
                    <div className="flex gap-1 justify-end" onClick={e => e.stopPropagation()}>
                      <IconButton title="Edit"><Edit2 className="w-[15px] h-[15px]" /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={212} label="Showing 1–8 of 212" />
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add Property"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddProp}>Add Property</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Property Name</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Diani Beach Villa" value={newProp.name} onChange={e => setNewProp({...newProp, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Title Number</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. CR 10982" value={newProp.titleNo} onChange={e => setNewProp({...newProp, titleNo: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Owner</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" value={newProp.owner} onChange={e => setNewProp({...newProp, owner: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Location</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" value={newProp.location} onChange={e => setNewProp({...newProp, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Related Matter</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" value={newProp.matter} onChange={e => setNewProp({...newProp, matter: e.target.value})} />
          </div>
        </div>
      </Modal>
    </div>
  );
}


export function PropertyDetailsView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const properties = useLiveQuery(() => db.properties.toArray()) || [];
  const matters = useLiveQuery(() => db.matters.toArray()) || [];
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const propertyMatters = matters.filter(m => m.property === "Diani Beach Villa Plot");
  const propertyDocs = documents.filter(d => d.matter === "KAI-2026-0142"); // Assuming these are linked

  return (
    <div className="animate-in fade-in duration-300">
      <button onClick={() => onNavigate('properties')} className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft font-semibold mb-3.5 hover:text-text-main transition-colors">
        <ChevronLeft className="w-[13px] h-[13px]" />
        Back to Properties
      </button>

      <div className="bg-surface border border-border-main rounded-xl p-[22px] px-[26px] mb-0 flex flex-col sm:flex-row justify-between gap-5 items-start shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="w-[52px] h-[52px] rounded-xl bg-accent text-white flex items-center justify-center font-serif text-[18px] font-bold shrink-0 shadow-[0_4px_12px_rgba(88,80,236,0.22)]">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-serif text-[20px] font-bold text-ink tracking-[-0.01em]">Diani Beach Villa Plot</span>
              <Badge status="Under Transfer">Under Transfer</Badge>
            </div>
            <div className="flex items-center gap-3.5 mt-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft">Title No. MSA/BLOCK 12/0894</div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-text-soft">Residential land</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none justify-center">Edit Property</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start mt-5">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Property Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <div className="p-4 px-5 border-b border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Title Number</div>
                <div className="text-[13.5px] text-text-main font-medium">MSA/BLOCK 12/0894</div>
              </div>
              <div className="p-4 px-5 border-b border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Property Type</div>
                <div className="text-[13.5px] text-text-main font-medium">Residential land</div>
              </div>
              <div className="p-4 px-5 border-b border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Size</div>
                <div className="text-[13.5px] text-text-main font-medium">0.85 acres</div>
              </div>
              <div className="p-4 px-5 border-b border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Location</div>
                <div className="text-[13.5px] text-text-main font-medium">Diani, Ukunda</div>
              </div>
              <div className="p-4 px-5 border-b sm:border-b-0 border-border-sub">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">County</div>
                <div className="text-[13.5px] text-text-main font-medium">Kwale</div>
              </div>
              <div className="p-4 px-5">
                <div className="text-[11.5px] text-text-mute font-semibold mb-1.5 uppercase tracking-wide">Registration Date</div>
                <div className="text-[13.5px] text-text-main font-medium">18 Jul 2019</div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Related Matters</h3>
            </div>
            <div className="p-1.5">
              {propertyMatters.map((m, i) => (
                <div key={i} onClick={() => onNavigate('matterDetails')} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 cursor-pointer ${i !== propertyMatters.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis">{m.title}</div>
                    <div className="text-[12px] text-text-mute mt-0.5">{m.no} · {m.lawyer}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge status={m.status}>{m.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Ownership</h3>
            </div>
            <div className="p-[18px] px-5 flex flex-col gap-3">
              <div>
                <div className="text-[12px] text-text-mute mb-1">CURRENT OWNER</div>
                <div className="font-semibold text-text-main">Wanjiru Njoroge</div>
              </div>
              <div>
                <div className="text-[12px] text-text-mute mb-1">OWNERSHIP TYPE</div>
                <div className="font-semibold text-text-main">Freehold</div>
              </div>
              <div>
                <div className="text-[12px] text-text-mute mb-1">PREVIOUS OWNER</div>
                <div className="font-semibold text-text-main">Coastal Sands Ltd</div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Documents</h3>
            </div>
            <div className="p-1.5">
              {propertyDocs.map((d, i) => (
                <div key={i} className={`flex items-center gap-3 px-5 py-3 ${i !== propertyDocs.length - 1 ? 'border-b border-border-sub' : ''}`}>
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
        </div>
      </div>
    </div>
  );
}
