import { AnimatePresence } from 'framer-motion';
import { useAgentsStore } from '../../store/agentsStore';
import { AgentCard } from './AgentCard';

export function AgentGrid() {
  const { agents, searchQuery, statusFilter } = useAgentsStore();

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || agent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (filteredAgents.length === 0) {
    return (
      <div className="h-64 mt-6 flex flex-col items-center justify-center text-muted border border-dashed border-border rounded-xl bg-card/30">
        <span className="text-4xl mb-4 opacity-50">🔍</span>
        <h3 className="text-lg font-semibold text-foreground mb-1">Nenhum agente encontrado</h3>
        <p className="text-sm">Tente ajustar seus filtros de busca ou status.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      <AnimatePresence>
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </AnimatePresence>
    </div>
  );
}
