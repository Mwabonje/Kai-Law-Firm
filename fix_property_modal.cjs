const fs = require('fs');
let code = fs.readFileSync('src/views/PropertyViews.tsx', 'utf8');

code = code.replace("import { Button, Badge, IconButton } from '../components/ui';", "import { Button, Badge, IconButton, Modal } from '../components/ui';");

const newStates = `
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({ name: '', titleNo: '', owner: '', location: '', matter: '' });

  const handleAddProp = async () => {
    if (!newProp.name) return;
    await db.properties.add({
      name: newProp.name,
      title: newProp.titleNo || 'Pending',
      owner: newProp.owner || 'Unknown',
      location: newProp.location || 'Unknown',
      matter: newProp.matter || 'N/A'
    });
    setNewProp({ name: '', titleNo: '', owner: '', location: '', matter: '' });
    setIsAddModalOpen(false);
  };
`;
code = code.replace("export function PropertiesView({ onNavigate }: { onNavigate: (view: string) => void }) {", "export function PropertiesView({ onNavigate }: { onNavigate: (view: string) => void }) {" + newStates);

code = code.replace('<Button variant="primary" className="flex-1 sm:flex-none justify-center">', '<Button variant="primary" className="flex-1 sm:flex-none justify-center" onClick={() => setIsAddModalOpen(true)}>');

const modalJSX = `
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
`;
code = code.replace("    </div>\n  );\n}\n\nexport function PropertyDetailsView", modalJSX + "\n\nexport function PropertyDetailsView");

fs.writeFileSync('src/views/PropertyViews.tsx', code);
