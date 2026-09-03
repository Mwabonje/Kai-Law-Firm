import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { ClientsView, ClientProfileView } from './views/ClientViews';
import { PropertiesView, PropertyDetailsView } from './views/PropertyViews';
import { MattersView, MatterDetailsView } from './views/MatterViews';
import { TasksView, CalendarView } from './views/TaskViews';
import { InvoicesView, PaymentsView } from './views/FinancialViews';
import { DocumentsView, UsersView, ReportsView, SettingsView } from './views/OtherViews';

const viewTitles: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clients",
  clientProfile: "Wanjiru Njoroge",
  properties: "Properties",
  propertyDetails: "Diani Beach Villa Plot",
  matters: "Matters",
  matterDetails: "Sale of Diani Beach Villa Plot",
  tasks: "Tasks",
  calendar: "Calendar",
  documents: "Documents",
  invoices: "Invoices",
  payments: "Payments",
  users: "Users",
  reports: "Reports",
  settings: "Settings"
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView onNavigate={setActiveView} />;
      case 'clients': return <ClientsView onNavigate={setActiveView} />;
      case 'clientProfile': return <ClientProfileView onNavigate={setActiveView} />;
      case 'properties': return <PropertiesView onNavigate={setActiveView} />;
      case 'propertyDetails': return <PropertyDetailsView onNavigate={setActiveView} />;
      case 'matters': return <MattersView onNavigate={setActiveView} />;
      case 'matterDetails': return <MatterDetailsView onNavigate={setActiveView} />;
      case 'tasks': return <TasksView onNavigate={setActiveView} />;
      case 'calendar': return <CalendarView />;
      case 'invoices': return <InvoicesView />;
      case 'payments': return <PaymentsView />;
      case 'documents': return <DocumentsView />;
      case 'users': return <UsersView />;
      case 'reports': return <ReportsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView onNavigate={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} viewTitle={viewTitles[activeView] || activeView}>
      {renderView()}
    </Layout>
  );
}
