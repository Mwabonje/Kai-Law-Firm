import Dexie, { Table } from 'dexie';
import { Client, Property, Matter, Task, Document, Invoice, Payment, User, Deadline, Activity } from './types';

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
    super('KaiAdvocatesDB_Live');
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
