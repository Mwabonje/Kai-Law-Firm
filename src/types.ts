export interface Client {
  name: string;
  type: string;
  phone: string;
  email: string;
  matters: number;
  added: string;
  status: string;
}

export interface Property {
  name: string;
  title: string;
  type: string;
  location: string;
  owner: string;
  matter: string;
  status: string;
}

export interface Matter {
  no: string;
  title: string;
  client: string;
  property: string;
  lawyer: string;
  status: string;
  priority: string;
  opened: string;
}

export interface Task {
  name: string;
  matter: string;
  assignee: string;
  due: string;
  priority: string;
  status: string;
  overdue: boolean;
}

export interface Document {
  name: string;
  type: string;
  client: string;
  matter: string;
  date: string;
  by: string;
}

export interface Invoice {
  no: string;
  client: string;
  matter: string;
  amount: string;
  due: string;
  status: string;
}

export interface Payment {
  id: string;
  client: string;
  invoice: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

export interface User {
  name: string;
  role: string;
  email: string;
  matters: number;
  status: string;
}

export interface Deadline {
  matter: string;
  task: string;
  date: string;
  overdue: boolean;
}

export interface Activity {
  text: string;
  time: string;
}
