const fs = require('fs');
let code = fs.readFileSync('src/views/FinancialViews.tsx', 'utf8');

code = code.replace(
  'const [isCreateOpen, setIsCreateOpen] = React.useState(false);',
  `const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [client, setClient] = React.useState('');
  const [matter, setMatter] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');`
);

fs.writeFileSync('src/views/FinancialViews.tsx', code);
