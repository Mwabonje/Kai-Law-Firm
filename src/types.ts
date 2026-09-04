export interface Client { id?: number; name: string; type: string; phone: string; email: string; matters: number; added: string; status: string; }
export interface Property { id?: number; name: string; title: string; type: string; location: string; owner: string; matter: string; status: string; }
export interface Matter { id?: number; no: string; title: string; client: string; property: string; lawyer: string; status: string; priority: string; opened: string; }
export interface Task { id?: number; name: string; matter: string; assignee: string; due: string; priority: string; status: string; overdue: boolean; }
export interface Document { id?: number; name: string; type: string; client: string; matter: string; date: string; by: string; }
export interface Invoice { id?: number; no: string; client: string; matter: string; amount: string; due: string; status: string; date?: string; lineItems?: any[]; }
export interface Payment { id?: number; paymentId: string; client: string; invoice: string; amount: string; method: string; date: string; status: string; }
export interface User { id?: number; name: string; role: string; email: string; matters: number; status: string; }
export interface Deadline { id?: number; matter: string; task: string; date: string; overdue: boolean; }
export interface Activity { id?: number; text: string; time: string; }
