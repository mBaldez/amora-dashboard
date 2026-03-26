import { Search, Bell, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAgentsStore } from '../../store/agentsStore';

export function Topbar() {
  const { pathname } = useLocation();
  const title = pathname === '/subagentes' ? 'Subagentes de IA' : pathname === '/' ? 'Dashboard Overview' : 'Dashboard';
  const { searchQuery, setSearchQuery } = useAgentsStore();

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
        <div className="h-5 w-px bg-border mx-2"></div>
        <div className="text-sm text-muted">
          <span className="cursor-pointer hover:text-foreground transition-colors">Workspace</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar agentes (Ex: Coder, Verifier)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 bg-card border border-border rounded-full py-1.5 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted/70"
          />
        </div>

        <button className="relative text-muted hover:text-foreground transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-background">
            3
          </span>
        </button>

        <button onClick={() => useAgentsStore.getState().openAgentForm()} className="flex items-center gap-2 bg-success hover:bg-success/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-success/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Plus size={16} />
          Novo Agente
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-background ring-2 ring-border overflow-hidden cursor-pointer shadow-md">
          <span className="text-xs font-bold text-white">MB</span>
        </div>
      </div>
    </header>
  );
}
