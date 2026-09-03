import React from 'react';
import { LucideProps } from 'lucide-react';

export function getBadgeClass(status: string) {
  const s = status.toLowerCase();
  if(["active","paid","registered","cleared","done","closed"].includes(s)) return "bg-success-bg text-success";
  if(["pending","open","not started","prospective"].includes(s)) return "bg-info-bg text-info";
  if(["overdue","disputed"].includes(s)) return "bg-danger-bg text-danger";
  if(["in progress","under transfer","awaiting client","partial"].includes(s)) return "bg-warning-bg text-warning";
  return "bg-paper text-text-soft";
}

export function getPriorityClass(priority: string) {
  const p = priority.toLowerCase();
  if (p === 'high') return 'text-danger';
  if (p === 'medium') return 'text-warning';
  return 'text-text-mute';
}

export function getInitials(name: string) {
  return name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
}

export const Badge = ({ children, status }: { children: React.ReactNode, status?: string }) => {
  return (
    <span className={`inline-flex items-center justify-center text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide whitespace-nowrap ${status ? getBadgeClass(status) : 'bg-ink-3 text-text-soft'}`}>
      {children}
    </span>
  );
};

export const PriorityBadge = ({ priority }: { priority: string }) => {
  return (
    <span className={`inline-flex items-center gap-[5px] text-[10px] font-bold uppercase tracking-wide ${getPriorityClass(priority)}`}>
      <span className="w-1.5 h-1.5 rounded-[1px] bg-current transform rotate-45"></span>
      {priority}
    </span>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'outline'|'danger'|'ghost', size?: 'sm'|'md' }>(
  ({ className = '', variant = 'secondary', size = 'md', ...props }, ref) => {
    let classes = "inline-flex items-center justify-center gap-[7px] rounded-md font-semibold border border-transparent transition-all duration-120 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ";
    
    if (size === 'md') classes += "text-[13px] px-[14px] py-[8px] ";
    if (size === 'sm') classes += "text-[12.5px] px-[11px] py-[6px] ";

    if (variant === 'primary') classes += "bg-accent text-white shadow-sm hover:bg-accent-hover active:translate-y-px ";
    if (variant === 'secondary') classes += "bg-surface text-text-main border-border-main shadow-sm hover:border-[#D6D5D2] hover:bg-ink-2 ";
    if (variant === 'outline') classes += "bg-transparent text-accent border-[#CFCBFB] hover:bg-accent-soft hover:border-accent ";
    if (variant === 'danger') classes += "bg-transparent text-danger border-[#F0CCC7] hover:bg-danger-bg ";
    if (variant === 'ghost') classes += "bg-transparent text-text-soft hover:bg-ink-2 hover:text-text-main ";

    return <button ref={ref} className={classes + className} {...props} />
  }
);
Button.displayName = 'Button';

export const IconButton = ({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`w-[28px] h-[28px] rounded-[7px] border-none bg-transparent text-text-mute flex items-center justify-center hover:bg-ink-3 hover:text-text-main outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`} {...props} />
);

export const Pagination = ({ total, label }: { total: number, label: string }) => {
  return (
    <div className="flex items-center justify-between px-5 py-[14px] border-t border-border-main">
      <span className="text-[12.5px] text-text-mute">{label}</span>
      <div className="flex items-center gap-1">
        <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2">‹</button>
        <button className="w-[28px] h-[28px] rounded-[7px] border border-accent bg-accent text-white flex items-center justify-center text-[12.5px] font-semibold">1</button>
        <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2">2</button>
        <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2">3</button>
        <button className="w-[28px] h-[28px] rounded-[7px] border border-border-main bg-surface flex items-center justify-center text-text-soft text-[12.5px] font-semibold hover:bg-ink-2">›</button>
      </div>
    </div>
  )
}

export const Modal = ({ isOpen, onClose, title, children, footer }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, footer: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] z-[100] flex items-start justify-center py-[60px] px-5 overflow-y-auto animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-surface rounded-xl w-full max-w-[520px] shadow-xl border border-border-main animate-in slide-in-from-bottom-2 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-[18px] px-[22px] border-b border-border-sub">
          <h3 className="text-[15.5px] font-semibold text-ink">{title}</h3>
          <button className="bg-transparent border-none text-text-mute w-7 h-7 rounded-md flex items-center justify-center hover:bg-ink-2 hover:text-text-main" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-5 px-[22px] max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-end gap-2 p-4 px-[22px] border-t border-border-sub">
          {footer}
        </div>
      </div>
    </div>
  );
}
