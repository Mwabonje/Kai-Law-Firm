const fs = require('fs');
let code = fs.readFileSync('src/views/TaskViews.tsx', 'utf8');

// 1. imports
code = code.replace("import { Button, Badge, IconButton } from '../components/ui';", "import { Button, Badge, IconButton, Modal } from '../components/ui';");

// 2. state & handler
const newStates = `
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', matter: '', assignee: '', due: '' });

  const handleAddTask = async () => {
    if (!newTask.name) return;
    await db.tasks.add({
      name: newTask.name,
      matter: newTask.matter || 'General',
      assignee: newTask.assignee || 'Unassigned',
      due: newTask.due || 'No Date'
    });
    setNewTask({ name: '', matter: '', assignee: '', due: '' });
    setIsAddModalOpen(false);
  };
`;
code = code.replace("export function TasksView({ onNavigate }: { onNavigate: (view: string) => void }) {", "export function TasksView({ onNavigate }: { onNavigate: (view: string) => void }) {" + newStates);

// 3. onClick
code = code.replace('<Button variant="primary" className="flex-1 sm:flex-none justify-center">', '<Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsAddModalOpen(true)}>');

// 4. Modal JSX
const modalJSX = `
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add Task"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Task Description</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Draft contract" value={newTask.name} onChange={e => setNewTask({...newTask, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Related Matter</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="Select matter..." value={newTask.matter} onChange={e => setNewTask({...newTask, matter: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Assignee</label>
            <input type="text" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" placeholder="e.g. Amina Mwangi" value={newTask.assignee} onChange={e => setNewTask({...newTask, assignee: e.target.value})} />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-text-main mb-1.5">Due Date</label>
            <input type="date" className="w-full border border-border-main rounded-md px-3 py-[9px] text-[13.5px] text-text-main bg-surface outline-none transition-all focus:border-accent focus:ring-3 focus:ring-accent-soft" value={newTask.due} onChange={e => setNewTask({...newTask, due: e.target.value})} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
`;
code = code.replace(/    <\/div>\s*<div className="bg-surface border border-border-main rounded-lg overflow-hidden">/g, "    </div>\n      {/* TABLE START */}\n      <div className=\"bg-surface border border-border-main rounded-lg overflow-hidden\">");

// inject at bottom of TasksView
// We know TasksView ends right before export function CalendarView()
code = code.replace("    </div>\n  );\n}\n\nexport function CalendarView()", modalJSX + "\n\nexport function CalendarView()");

fs.writeFileSync('src/views/TaskViews.tsx', code);
