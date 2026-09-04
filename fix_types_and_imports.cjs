const fs = require('fs');

// 1. ClientViews.tsx
let clientCode = fs.readFileSync('src/views/ClientViews.tsx', 'utf8');
clientCode = clientCode.replace(
  /await db\.clients\.add\(\{[\s\S]*?\}\);/,
  `await db.clients.add({
      name: newClient.name,
      status: 'Active',
      type: newClient.type,
      phone: newClient.phone,
      email: newClient.email,
      added: new Date().toLocaleDateString('en-GB'),
      matters: 0
    });`
);
fs.writeFileSync('src/views/ClientViews.tsx', clientCode);

// 2. MatterViews.tsx
let matterCode = fs.readFileSync('src/views/MatterViews.tsx', 'utf8');
matterCode = matterCode.replace(
  /await db\.matters\.add\(\{[\s\S]*?\}\);/,
  `await db.matters.add({
      no: "KAI-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      title: newMatter.title,
      client: newMatter.client || 'Unknown',
      property: newMatter.property || 'N/A',
      lawyer: newMatter.assignee,
      status: 'Active',
      priority: newMatter.priority as any,
      opened: newMatter.opened || new Date().toLocaleDateString('en-GB')
    });`
);
fs.writeFileSync('src/views/MatterViews.tsx', matterCode);

// 3. DashboardView.tsx
let dashCode = fs.readFileSync('src/views/DashboardView.tsx', 'utf8');
dashCode = dashCode.replace(
  /await db\.matters\.add\(\{[\s\S]*?\}\);/,
  `await db.matters.add({
      no: "KAI-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      title: newCase.title,
      client: newCase.client || 'Unknown',
      property: 'N/A',
      lawyer: newCase.assignee,
      status: 'Active',
      priority: newCase.priority as any,
      opened: new Date().toLocaleDateString('en-GB')
    });`
);
fs.writeFileSync('src/views/DashboardView.tsx', dashCode);

// 4. PropertyViews.tsx
let propCode = fs.readFileSync('src/views/PropertyViews.tsx', 'utf8');
if (!propCode.includes("import React, { useState }")) {
  propCode = "import React, { useState } from 'react';\n" + propCode;
}
propCode = propCode.replace(
  /await db\.properties\.add\(\{[\s\S]*?\}\);/,
  `await db.properties.add({
      name: newProp.name,
      title: newProp.titleNo || 'Pending',
      owner: newProp.owner || 'Unknown',
      location: newProp.location || 'Unknown',
      matter: newProp.matter || 'N/A',
      type: 'Commercial',
      status: 'Active'
    });`
);
fs.writeFileSync('src/views/PropertyViews.tsx', propCode);

// 5. TaskViews.tsx
let taskCode = fs.readFileSync('src/views/TaskViews.tsx', 'utf8');
if (!taskCode.includes("import React, { useState }")) {
  taskCode = "import React, { useState } from 'react';\n" + taskCode;
}
taskCode = taskCode.replace(
  /await db\.tasks\.add\(\{[\s\S]*?\}\);/,
  `await db.tasks.add({
      name: newTask.name,
      matter: newTask.matter || 'General',
      assignee: newTask.assignee || 'Unassigned',
      due: newTask.due || 'No Date',
      priority: 'Medium',
      status: 'To Do',
      overdue: false
    });`
);
fs.writeFileSync('src/views/TaskViews.tsx', taskCode);

