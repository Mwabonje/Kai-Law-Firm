const fs = require('fs');
let code = fs.readFileSync('src/views/MatterViews.tsx', 'utf8');

const newStates = `
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMatter, setNewMatter] = useState({
    title: '', client: '', property: '', type: 'Conveyancing', assignee: 'Amina Mwangi', priority: 'Medium', opened: '', description: ''
  });

  const handleAddMatter = async () => {
    if (!newMatter.title) return;
    await db.matters.add({
      no: "KAI-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      title: newMatter.title,
      client: newMatter.client || 'Unknown',
      property: newMatter.property || 'N/A',
      type: newMatter.type,
      status: 'Active',
      assignee: newMatter.assignee,
      priority: newMatter.priority as any,
      opened: newMatter.opened || new Date().toLocaleDateString('en-GB')
    });
    setNewMatter({ title: '', client: '', property: '', type: 'Conveyancing', assignee: 'Amina Mwangi', priority: 'Medium', opened: '', description: '' });
    setIsAddModalOpen(false);
  };
`;

code = code.replace(
  'const [isAddModalOpen, setIsAddModalOpen] = useState(false);',
  newStates
);

const oldModalFooter = `footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>Create Matter</Button>
          </>
        }`;

code = code.replace(oldModalFooter, `footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddMatter}>Create Matter</Button>
          </>
        }`);

code = code.replace(/<input type="text" className="w-full(.*?)placeholder="e.g. Sale of Diani Beach Villa Plot" \/>/, '<input type="text" className="w-full$1placeholder="e.g. Sale of Diani Beach Villa Plot" value={newMatter.title} onChange={e => setNewMatter({...newMatter, title: e.target.value})} />');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="Select client…" \/>/, '<input type="text" className="w-full$1placeholder="Select client…" value={newMatter.client} onChange={e => setNewMatter({...newMatter, client: e.target.value})} />');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="Select property…" \/>/, '<input type="text" className="w-full$1placeholder="Select property…" value={newMatter.property} onChange={e => setNewMatter({...newMatter, property: e.target.value})} />');

// 3 selects: Type, Assignee, Priority
// We need a more robust replace for selects
const typeRe = /<select className="w-full([^>]*)>(\s*<option>Conveyancing<\/option>)/;
code = code.replace(typeRe, '<select className="w-full$1 value={newMatter.type} onChange={e => setNewMatter({...newMatter, type: e.target.value})}>$2');

const assignRe = /<select className="w-full([^>]*)>(\s*<option>Amina Mwangi<\/option>)/;
code = code.replace(assignRe, '<select className="w-full$1 value={newMatter.assignee} onChange={e => setNewMatter({...newMatter, assignee: e.target.value})}>$2');

const prioRe = /<select className="w-full([^>]*)>(\s*<option>Medium<\/option>)/;
code = code.replace(prioRe, '<select className="w-full$1 value={newMatter.priority} onChange={e => setNewMatter({...newMatter, priority: e.target.value})}>$2');

code = code.replace(/<input type="text" className="w-full(.*?)placeholder="dd\/mm\/yyyy" \/>/, '<input type="text" className="w-full$1placeholder="dd/mm/yyyy" value={newMatter.opened} onChange={e => setNewMatter({...newMatter, opened: e.target.value})} />');
code = code.replace(/<textarea className="w-full(.*?)placeholder="Brief scope of the matter…"><\/textarea>/, '<textarea className="w-full$1placeholder="Brief scope of the matter…" value={newMatter.description} onChange={e => setNewMatter({...newMatter, description: e.target.value})}></textarea>');

fs.writeFileSync('src/views/MatterViews.tsx', code);
