import React from 'react';
import { Button, Badge, PriorityBadge, Pagination } from '../components/ui';
import { tasks, deadlines } from '../data';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export function TasksView({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Tasks</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Everything the team needs to action, across all matters.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center">
            <Plus className="w-[15px] h-[15px]" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-[18px] flex-wrap">
        <div className="flex items-center gap-2 bg-surface border border-border-main rounded-md px-3 py-2 min-w-[240px] flex-1 max-w-none sm:max-w-[320px] transition-colors focus-within:border-accent focus-within:ring-3 focus-within:ring-accent-soft">
          <Search className="w-[15px] h-[15px] text-text-mute shrink-0" />
          <input type="text" placeholder="Search tasks…" className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute" />
        </div>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All statuses</option>
          <option>Not started</option>
          <option>In progress</option>
          <option>Done</option>
          <option>Overdue</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All assignees</option>
          <option>Amina Mwangi</option>
          <option>David Otieno</option>
          <option>Fatuma Ali</option>
          <option>Brian Kiptoo</option>
        </select>
        <select className="bg-surface border border-border-main rounded-md py-2 pr-[30px] pl-3 text-[13px] text-text-soft appearance-none min-w-[130px] cursor-pointer hover:border-[#D6D5D2] transition-colors" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2363636B' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 11px center' }}>
          <option>All priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <div className="flex-1 hidden 2xl:block"></div>
        <span className="text-[12.5px] text-text-mute hidden lg:inline-block">23 pending</span>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table min-w-full">
            <thead>
              <tr>
                <th>Task</th>
                <th>Related Matter</th>
                <th>Assigned</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, i) => (
                <tr key={i}>
                  <td className="font-semibold text-text-main">{t.name}</td>
                  <td className="text-text-soft">{t.matter}</td>
                  <td className="text-text-soft">{t.assignee}</td>
                  <td className={t.overdue ? "text-danger font-semibold" : "text-text-soft font-medium"}>{t.due}</td>
                  <td><PriorityBadge priority={t.priority} /></td>
                  <td><Badge status={t.status}>{t.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={23} label="Showing 1–8 of 23" />
      </div>
    </div>
  );
}

export function CalendarView() {
  const allDeadlines = deadlines.concat([
    {matter:"Sale — Old Town Heritage House", task:"Handover keys to buyer", date:"9 Sep 2026", overdue:false},
    {matter:"Lease Renewal — Likoni Warehouse Yard", task:"Client review meeting", date:"15 Sep 2026", overdue:false},
  ]);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-[25px] font-bold text-ink tracking-[-0.02em]">Calendar</h1>
          <p className="text-[13.5px] text-text-soft mt-1.5 max-w-[560px]">Deadlines, hearings and appointments across the firm.</p>
        </div>
        <div className="flex shrink-0 w-full sm:w-auto">
          <Button variant="primary" className="flex-1 sm:flex-none justify-center">
            <Plus className="w-[15px] h-[15px]" />
            New Event
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border-main rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-sub">
          <h3 className="text-[14.5px] font-semibold text-ink">September 2026</h3>
          <div className="flex gap-1.5">
            <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="p-1.5">
          {allDeadlines.map((d, i) => (
            <div key={i} className={`flex items-center gap-3.5 px-5 py-[13px] hover:bg-ink-2 ${i !== allDeadlines.length - 1 ? 'border-b border-border-sub' : ''}`}>
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
    </div>
  );
}
