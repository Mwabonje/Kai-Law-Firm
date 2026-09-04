const fs = require('fs');
let code = fs.readFileSync('src/views/DashboardView.tsx', 'utf8');

const newStates = `
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
      type: newCase.type,
      status: 'Active',
      assignee: newCase.assignee,
      priority: newCase.priority as any,
      opened: new Date().toLocaleDateString('en-GB')
    });
    setNewCase({ title: '', client: '', type: 'Corporate Law', assignee: 'Amina Mwangi', priority: 'Medium', notes: '' });
    setIsQuickAddOpen(false);
  };
`;

code = code.replace(
  'const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);',
  newStates
);

const oldModalFooter = `footer={
          <>
            <Button variant="secondary" onClick={() => setIsQuickAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsQuickAddOpen(false)}>Create Case</Button>
          </>
        }`;

code = code.replace(oldModalFooter, `footer={
          <>
            <Button variant="secondary" onClick={() => setIsQuickAddOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleQuickAdd}>Create Case</Button>
          </>
        }`);

code = code.replace(/<input type="text" className="w-full(.*?)placeholder="e.g. Acme Corp Merger" \/>/, '<input type="text" className="w-full$1placeholder="e.g. Acme Corp Merger" value={newCase.title} onChange={e => setNewCase({...newCase, title: e.target.value})} />');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="Select client…" \/>/, '<input type="text" className="w-full$1placeholder="Select client…" value={newCase.client} onChange={e => setNewCase({...newCase, client: e.target.value})} />');

// 3 selects
const typeRe = /<select className="w-full([^>]*)>(\s*<option>Corporate Law<\/option>)/;
code = code.replace(typeRe, '<select className="w-full$1 value={newCase.type} onChange={e => setNewCase({...newCase, type: e.target.value})}>$2');

const assignRe = /<select className="w-full([^>]*)>(\s*<option>Robert Sterling, JD<\/option>)/;
code = code.replace(assignRe, '<select className="w-full$1 value={newCase.assignee} onChange={e => setNewCase({...newCase, assignee: e.target.value})}>$2');

const prioRe = /<select className="w-full([^>]*)>(\s*<option>Normal<\/option>)/;
code = code.replace(prioRe, '<select className="w-full$1 value={newCase.priority} onChange={e => setNewCase({...newCase, priority: e.target.value})}>$2');

code = code.replace(/<textarea className="w-full(.*?)placeholder="Brief scope of the case…"><\/textarea>/, '<textarea className="w-full$1placeholder="Brief scope of the case…" value={newCase.notes} onChange={e => setNewCase({...newCase, notes: e.target.value})}></textarea>');

fs.writeFileSync('src/views/DashboardView.tsx', code);
