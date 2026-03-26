import { Filter, LayoutGrid, List } from 'lucide-react';
import { AgentGrid } from '../components/agents/AgentGrid';
import { useAgentsStore } from '../store/agentsStore';

export function Subagentes() {
  const { agents, statusFilter, setStatusFilter } = useAgentsStore();
  const statuses = ['Todos', 'Ativo', 'Inativo', 'Projeto'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Subagentes</h1>
          <p className="text-muted text-sm">
            Gerencie, monitore e configure os seus limites de {agents.length} agentes especializados em diversas tarefas e fluxos operacionais.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-card border border-border rounded-lg p-1">
            <button className="p-1.5 rounded bg-primary/20 text-primary shadow-sm">
              <LayoutGrid size={18} />
            </button>
            <button className="p-1.5 rounded text-muted hover:text-foreground transition-colors">
              <List size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 relative">
            <Filter size={14} className="text-muted ml-2" />
            <select 
              className="bg-transparent border-none text-sm text-foreground focus:ring-0 outline-none pr-3 py-1.5 cursor-pointer appearance-none pl-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-card text-foreground">{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-border to-transparent mb-6"></div>

      <AgentGrid />
    </div>
  );
}
