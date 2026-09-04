const fs = require('fs');
let code = fs.readFileSync('src/views/ClientViews.tsx', 'utf8');

const newStates = `
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    type: 'Individual', name: '', phone: '', email: '', idNo: '', notes: ''
  });

  const handleAddClient = async () => {
    if (!newClient.name) return;
    await db.clients.add({
      name: newClient.name,
      status: 'Active',
      type: newClient.type,
      phone: newClient.phone,
      email: newClient.email,
      idNo: newClient.idNo,
      notes: newClient.notes,
      matters: 0,
      balance: "KES 0"
    });
    setNewClient({ type: 'Individual', name: '', phone: '', email: '', idNo: '', notes: '' });
    setIsAddModalOpen(false);
  };
`;

code = code.replace(
  'const [isAddModalOpen, setIsAddModalOpen] = useState(false);',
  newStates
);

// Replace modal
const oldModalStart = `<Modal \n        isOpen={isAddModalOpen} \n        onClose={() => setIsAddModalOpen(false)}\n        title="Add Client"`;

const oldModalFooter = `footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>Add Client</Button>
          </>
        }`;

code = code.replace(oldModalFooter, `footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddClient}>Add Client</Button>
          </>
        }`);

code = code.replace(/<select className="w-full(.*?)"(.*?)/, '<select className="w-full$1"$2 value={newClient.type} onChange={e => setNewClient({...newClient, type: e.target.value})}');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="e.g. Wanjiru Njoroge" \/>/, '<input type="text" className="w-full$1placeholder="e.g. Wanjiru Njoroge" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="\+254 7…" \/>/, '<input type="text" className="w-full$1placeholder="+254 7…" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} />');
code = code.replace(/<input type="email" className="w-full(.*?)placeholder="name@email.com" \/>/, '<input type="email" className="w-full$1placeholder="name@email.com" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} />');
code = code.replace(/<input type="text" className="w-full(.*?)placeholder="e.g. 22841076" \/>/, '<input type="text" className="w-full$1placeholder="e.g. 22841076" value={newClient.idNo} onChange={e => setNewClient({...newClient, idNo: e.target.value})} />');
code = code.replace(/<textarea className="w-full(.*?)placeholder="Optional internal notes…"><\/textarea>/, '<textarea className="w-full$1placeholder="Optional internal notes…" value={newClient.notes} onChange={e => setNewClient({...newClient, notes: e.target.value})}></textarea>');

fs.writeFileSync('src/views/ClientViews.tsx', code);
