import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AgentFormModal } from '../agents/AgentFormModal';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Sidebar />
      <AgentFormModal />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-x-hidden pt-4 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
