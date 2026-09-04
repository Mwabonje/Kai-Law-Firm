import React, { useState } from 'react';
import { Button, Badge, getBadgeClass, Modal } from '../components/ui';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Plus, FileText, Briefcase, Users, Map, CheckSquare } from 'lucide-react';

export function DashboardView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const tasks = useLiveQuery(() => db.tasks.toArray()) || [];
  const deadlines = useLiveQuery(() => db.deadlines.toArray()) || [];
  const activity = useLiveQuery(() => db.activity.toArray()) || [];
  
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [newCase, setNewCase] = useState({
    title: '', client: '', type: 'Corporate Law', assignee: 'Amina Mwangi', priority: 'Medium', notes: ''
  });

  const handleQuickAdd = async () => {
    if (!newCase.title) return;
    await db.matters.add({
      no: "KAI-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      title: newCase.title,
      client: newCase.client || 'Unknown',
      property: 'N/A',
      lawyer: newCase.assignee,
      status: 'Active',
      priority: newCase.priority as any,
      opened: new Date().toLocaleDateString('en-GB')
    });
    setNewCase({ title: '', client: '', type: 'Corporate Law', assignee: 'Amina Mwangi', priority: 'Medium', notes: '' });
    setIsQuickAddOpen(false);
  };


  // Dynamic greeting and date in EAT (East Africa Time)
  const now = new Date();
  const eatDateFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const dateString = eatDateFormatter.format(now);

  const eatHourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Nairobi',
    hour: 'numeric',
    hour12: false,
  });
  const hour = parseInt(eatHourFormatter.format(now), 10);
  
  let greeting = 'Good evening';
  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 18) greeting = 'Good afternoon';

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">{greeting}, Susan</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Here's what's happening across the practice today, {dateString}.</p>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none justify-center" onClick={() => {}}>
            <Plus className="w-[15px] h-[15px]" />
            Add Task
          </Button>
          <Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsQuickAddOpen(true)}>
            <Plus className="w-[15px] h-[15px]" />
            Quick Add Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
        <div className="bg-surface p-5 rounded-xl border border-border-main shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-bold text-text-soft uppercase tracking-wider">Active Matters</p>
            <Briefcase className="w-4 h-4 text-accent opacity-80" />
          </div>
          <p className="text-3xl font-bold text-ink">38</p>
          <p className="text-xs text-success mt-2 font-medium">+4 this month</p>
        </div>
        
        <div className="bg-surface p-5 rounded-xl border border-border-main shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-bold text-text-soft uppercase tracking-wider">Total Clients</p>
            <Users className="w-4 h-4 text-accent opacity-80" />
          </div>
          <p className="text-3xl font-bold text-ink">146</p>
          <p className="text-xs text-success mt-2 font-medium">+7 this month</p>
        </div>
        
        <div className="bg-surface p-5 rounded-xl border border-border-main shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-bold text-text-soft uppercase tracking-wider">Total Properties</p>
            <Map className="w-4 h-4 text-accent opacity-80" />
          </div>
          <p className="text-3xl font-bold text-ink">212</p>
          <p className="text-xs text-text-mute mt-2 font-medium">Across 6 counties</p>
        </div>
        
        <div className="bg-surface p-5 rounded-xl border border-border-main shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-bold text-text-soft uppercase tracking-wider">Pending Tasks</p>
            <CheckSquare className="w-4 h-4 text-accent opacity-80" />
          </div>
          <p className="text-3xl font-bold text-danger">23</p>
          <p className="text-xs text-danger mt-2 font-medium">5 overdue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4 items-start">
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Upcoming Deadlines</h3>
              <button onClick={() => onNavigate('calendar')} className="text-[12.5px] text-accent font-semibold hover:underline">View calendar</button>
            </div>
            <div className="p-1.5">
              {deadlines.map((d, i) => (
                <div key={i} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 ${i !== deadlines.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis">{d.task}</div>
                    <div className="text-[12px] text-text-mute mt-0.5">{d.matter}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-[12.5px] ${d.overdue ? 'text-danger font-semibold' : 'text-text-soft font-medium'}`}>{d.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Pending Tasks</h3>
              <button onClick={() => onNavigate('tasks')} className="text-[12.5px] text-accent font-semibold hover:underline">View all</button>
            </div>
            <div className="p-1.5">
              {tasks.slice(0, 5).map((t, i) => (
                <div key={i} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 ${i !== 4 ? 'border-b border-border-sub' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-text-main whitespace-nowrap overflow-hidden text-ellipsis">{t.name}</div>
                    <div className="text-[12px] text-text-mute mt-0.5">{t.assignee} · {t.matter}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-[12.5px] ${t.overdue ? 'text-danger font-semibold' : 'text-text-soft font-medium'}`}>{t.due}</div>
                    <div className="mt-1"><Badge status={t.status}>{t.status}</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-border-main rounded-xl shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
              <h3 className="text-[14.5px] font-semibold text-ink">Recent Activity</h3>
            </div>
            <div className="p-1.5">
              {activity.map((a, i) => (
                <div key={i} className={`flex gap-3 px-5 py-3 ${i !== activity.length - 1 ? 'border-b border-border-sub' : ''}`}>
                  <div className="w-[7px] h-[7px] rounded-full bg-accent mt-1.5 shrink-0"></div>
                  <div>
                    <div className="text-[13px] text-text-main leading-relaxed" dangerouslySetInnerHTML={{__html: a.text}}></div>
                    <div className="text-[11.5px] text-text-mute mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)}
        title="Quick Add Case"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsQuickAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleQuickAdd}>Create Case</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Case Title</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Acme Corp Merger" value={newCase.title} onChange={e => setNewCase({...newCase, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Client</label>
              <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="Select client…" value={newCase.client} onChange={e => setNewCase({...newCase, client: e.target.value})} />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Practice Area</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }} value={newCase.type} onChange={e => setNewCase({...newCase, type: e.target.value})}>
                <option>Corporate Law</option>
                <option>Civil Litigation</option>
                <option>Criminal Defense</option>
                <option>Family Law</option>
                <option>Real Estate</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Assigned Attorney</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }} value={newCase.assignee} onChange={e => setNewCase({...newCase, assignee: e.target.value})}>
                <option>Robert Sterling, JD</option>
                <option>Amina Mwangi</option>
                <option>David Otieno</option>
                <option>Fatuma Ali</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Priority</label>
              <select className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft appearance-none cursor-pointer" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }} value={newCase.priority} onChange={e => setNewCase({...newCase, priority: e.target.value})}>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Initial Notes</label>
            <textarea className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft min-h-[84px] resize-y" placeholder="Brief scope of the case…" value={newCase.notes} onChange={e => setNewCase({...newCase, notes: e.target.value})}></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}
