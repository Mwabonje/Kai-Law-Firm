import Dexie, { Table } from 'dexie';
import { Client, Property, Matter, Task, Document, Invoice, Payment, User, Deadline, Activity } from './types';
import * as initialData from './data';

export class AppDatabase extends Dexie {
  clients!: Table<Client, number>;
  properties!: Table<Property, number>;
  matters!: Table<Matter, number>;
  tasks!: Table<Task, number>;
  documents!: Table<Document, number>;
  invoices!: Table<Invoice, number>;
  payments!: Table<Payment, number>;
  users!: Table<User, number>;
  deadlines!: Table<Deadline, number>;
  activity!: Table<Activity, number>;

  constructor() {
    super('KaiAdvocatesDB');
    this.version(1).stores({
      clients: '++id, name, status',
      properties: '++id, name, title, matter',
      matters: '++id, no, title, client, status',
      tasks: '++id, name, matter, assignee',
      documents: '++id, name, matter, client',
      invoices: '++id, no, client, status',
      payments: '++id, paymentId, invoice, client',
      users: '++id, name, email',
      deadlines: '++id, matter, task',
      activity: '++id, time'
    });
  }
}

export const db = new AppDatabase();

export async function seedDatabase() {
  const count = await db.clients.count();
  if (count === 0) {
    console.log("Seeding database with initial data...");
    await db.clients.bulkAdd(initialData.clients as any[]);
    await db.properties.bulkAdd(initialData.properties as any[]);
    await db.matters.bulkAdd(initialData.matters as any[]);
    await db.tasks.bulkAdd(initialData.tasks as any[]);
    await db.documents.bulkAdd(initialData.documents as any[]);
    await db.invoices.bulkAdd(initialData.invoices as any[]);
    await db.payments.bulkAdd(initialData.payments as any[]);
    await db.users.bulkAdd(initialData.users as any[]);
    await db.deadlines.bulkAdd(initialData.deadlines as any[]);
    await db.activity.bulkAdd(initialData.activity as any[]);
  }
}
