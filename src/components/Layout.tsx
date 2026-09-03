import React from 'react';
import { LayoutDashboard, Users, Map, Briefcase, CheckSquare, Calendar, Receipt, CreditCard, Files, Users as UsersIcon, BarChart2, Settings, Bell, ChevronDown, Search, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  viewTitle: string;
}

export function Layout({ children, activeView, setActiveView, viewTitle }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'clients', label: 'Clients', icon: Users, group: 'CLIENT MANAGEMENT' },
    { view: 'properties', label: 'Properties', icon: Map, group: 'PROPERTY MANAGEMENT' },
    { view: 'matters', label: 'Matters', icon: Briefcase, group: 'LEGAL MATTERS' },
    { view: 'tasks', label: 'Tasks', icon: CheckSquare, group: 'LEGAL MATTERS' },
    { view: 'calendar', label: 'Calendar', icon: Calendar, group: 'LEGAL MATTERS' },
    { view: 'invoices', label: 'Invoices', icon: Receipt, group: 'FINANCIAL' },
    { view: 'payments', label: 'Payments', icon: CreditCard, group: 'FINANCIAL' },
    { view: 'documents', label: 'Documents', icon: Files, group: 'DOCUMENTS' },
    { view: 'users', label: 'Users', icon: UsersIcon, group: 'ADMINISTRATION' },
    { view: 'reports', label: 'Reports', icon: BarChart2, group: 'ADMINISTRATION' },
    { view: 'settings', label: 'Settings', icon: Settings, group: 'ADMINISTRATION' },
  ];

  const groupedNav = navItems.reduce((acc, item) => {
    const group = item.group || 'GENERAL';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`w-[260px] min-w-[260px] bg-sidebar text-slate-300 flex flex-col fixed top-0 left-0 bottom-0 z-40 border-r border-slate-800 transition-transform duration-250 ease-in-out ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 md:shadow-none'}`}>
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-white shrink-0">
            K
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">KAI</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-3 space-y-1 scrollbar-hide">
          {Object.entries(groupedNav).map(([group, items], idx) => (
            <div key={group} className={`${idx === 0 ? 'mt-2' : 'mt-6'}`}>
              {group !== 'GENERAL' && (
                <div className="text-[11px] font-bold text-slate-500 tracking-wider px-2 pb-2 uppercase">
                  {group}
                </div>
              )}
              {items.map((item) => {
                const isActive = activeView === item.view || (activeView.startsWith(item.view.replace(/s$/, '')) && item.view !== 'dashboard');
                return (
                  <div 
                    key={item.view} 
                    onClick={() => { setActiveView(item.view); setSidebarOpen(false); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] mb-1 cursor-pointer transition-colors duration-120 relative ${isActive ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    {isActive && <span className="absolute left-0 w-1 h-5 rounded-r-md bg-accent"></span>}
                    <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-accent' : 'opacity-75'}`} />
                    {item.label}
                    {item.view === 'tasks' && <span className={`ml-auto text-[11px] px-2 py-0.5 rounded uppercase font-bold ${isActive ? 'bg-accent text-white' : 'bg-slate-800 text-slate-300'}`}>23</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
            <div className="w-9 h-9 rounded-full bg-slate-600 text-white flex items-center justify-center text-[12px] font-semibold shrink-0">SK</div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis">Susan Kai</div>
              <div className="text-[11.5px] text-slate-400">Owner</div>
            </div>
            <button className="text-slate-400 p-1 rounded hover:bg-slate-700 hover:text-white outline-none">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Scrim */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/35 z-39 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col md:ml-[260px]">
        {/* Topbar */}
        <header className="h-[62px] bg-white/82 backdrop-blur-[8px] border-b border-border-main flex items-center justify-between px-[30px] sticky top-0 z-30">
          <div className="flex items-center gap-[10px] min-w-0">
            <button 
              className="md:hidden bg-transparent border-none text-text-main p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-gold"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[14.5px] font-semibold text-text-main">{viewTitle}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="hidden md:flex items-center gap-2 bg-ink-2 border border-transparent rounded-md px-3 py-[7px] w-[270px] text-text-mute transition-colors focus-within:bg-surface focus-within:border-accent">
              <Search className="w-[15px] h-[15px] shrink-0" />
              <input 
                type="text" 
                placeholder="Search clients, matters, properties…"
                className="border-none bg-transparent outline-none text-[13px] text-text-main w-full placeholder:text-text-mute"
              />
            </div>
            
            <button className="w-[34px] h-[34px] rounded-md flex items-center justify-center bg-transparent border-none text-text-soft relative hover:bg-paper hover:text-text-main outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-danger border-[1.5px] border-surface"></span>
            </button>
            
            <div className="flex items-center gap-2 px-1.5 py-1 pl-2.5 rounded-md hover:bg-paper cursor-pointer">
              <div className="w-[30px] h-[30px] rounded-full bg-accent text-white flex items-center justify-center text-[11.5px] font-semibold">SK</div>
              <ChevronDown className="w-3.5 h-3.5 text-text-mute" />
            </div>
          </div>
        </header>

        <main className="p-4 md:pt-[26px] md:px-[28px] md:pb-[60px] max-w-[1360px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
