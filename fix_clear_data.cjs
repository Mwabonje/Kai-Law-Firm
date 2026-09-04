const fs = require('fs');

// 1. Update src/db.ts
let dbCode = fs.readFileSync('src/db.ts', 'utf8');
dbCode = dbCode.replace("super('KaiAdvocatesDB');", "super('KaiAdvocatesDB_Live');");
dbCode = dbCode.replace(/export async function seedDatabase\(\) {[\s\S]*?}/, '');
fs.writeFileSync('src/db.ts', dbCode);

// 2. Update src/main.tsx
let mainCode = fs.readFileSync('src/main.tsx', 'utf8');
mainCode = mainCode.replace('import { seedDatabase } from "./db";\nseedDatabase();\n', '');
fs.writeFileSync('src/main.tsx', mainCode);

// 3. Update src/data.ts
let dataCode = fs.readFileSync('src/data.ts', 'utf8');
dataCode = dataCode.replace(/export const clients: Client\[\] = \[[\s\S]*?\];/g, 'export const clients: Client[] = [];');
dataCode = dataCode.replace(/export const properties: Property\[\] = \[[\s\S]*?\];/g, 'export const properties: Property[] = [];');
dataCode = dataCode.replace(/export const matters: Matter\[\] = \[[\s\S]*?\];/g, 'export const matters: Matter[] = [];');
dataCode = dataCode.replace(/export const tasks: Task\[\] = \[[\s\S]*?\];/g, 'export const tasks: Task[] = [];');
dataCode = dataCode.replace(/export const documents: Document\[\] = \[[\s\S]*?\];/g, 'export const documents: Document[] = [];');
dataCode = dataCode.replace(/export const invoices: Invoice\[\] = \[[\s\S]*?\];/g, 'export const invoices: Invoice[] = [];');
dataCode = dataCode.replace(/export const payments: Payment\[\] = \[[\s\S]*?\];/g, 'export const payments: Payment[] = [];');
dataCode = dataCode.replace(/export const users: User\[\] = \[[\s\S]*?\];/g, 'export const users: User[] = [];');
dataCode = dataCode.replace(/export const deadlines: Deadline\[\] = \[[\s\S]*?\];/g, 'export const deadlines: Deadline[] = [];');
dataCode = dataCode.replace(/export const activity: Activity\[\] = \[[\s\S]*?\];/g, 'export const activity: Activity[] = [];');
fs.writeFileSync('src/data.ts', dataCode);
