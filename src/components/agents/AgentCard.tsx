import { Play, Edit2, MoreVertical, Copy, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Agent } from '../../types/agent';
import { Badge } from '../ui/Badge';
import { ContextMenu } from '../ui/ContextMenu';
import { useAgentsStore } from '../../store/agentsStore';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();
  const { executeAgent } = useAgentsStore();
  const [isRunning, setIsRunning] = useState(false);

  const handleExecute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning(true);
    await executeAgent(agent.id);
    setIsRunning(false);
  };

  const statusVariant = 
    agent.status === 'Ativo' ? 'success' : 
    agent.status === 'Inativo' ? 'warning' : 'info';

  const statusDotColor = 
    agent.status === 'Ativo' ? 'bg-success' : 
    agent.status === 'Inativo' ? 'bg-warning' : 'bg-info';

  return (
    <motion.div
      layout
      onClick={() => navigate(`/subagentes/${agent.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-primary/5 transition-all overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Background glow base on agent color */}
      <div 
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ backgroundColor: agent.color || 'var(--primary)' }}
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/5"
          style={{ 
            backgroundColor: `${agent.color}15`, 
            color: agent.color 
          }}
        >
          {agent.icon}
        </div>
        
        <Badge variant={statusVariant} className="flex items-center gap-1.5 pl-1.5 shadow-sm">
          <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", statusDotColor)} />
          {agent.status}
        </Badge>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-bold text-lg text-white mb-1 tracking-tight">{agent.name}</h3>
        <p className="text-sm text-muted line-clamp-2 leading-relaxed h-[42px] mb-4">
          {agent.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {agent.categories.map(cat => (
            <span key={cat} className="text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded bg-background text-foreground/70 border border-border">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted/70 font-medium">
          {agent.lastExecution || 'Nunca executado'}
        </span>
        
        <div className="flex items-center gap-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <button 
            onClick={handleExecute}
            disabled={isRunning || agent.status !== 'Ativo'}
            className="p-1.5 rounded-md hover:bg-success/20 text-muted hover:text-success disabled:opacity-50 transition-colors"
            title="Executar agora"
          >
            <Play size={16} className={cn(isRunning && "animate-pulse text-success")} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <ContextMenu 
              trigger={<div className="p-1 text-muted hover:text-foreground hover:bg-white/5 rounded transition-colors group-hover:text-foreground/80"><MoreVertical size={18} /></div>}
              items={[
                { label: 'Editar', icon: <Edit2 size={14} />, onClick: () => useAgentsStore.getState().openAgentForm(agent) },
                { label: 'Duplicar', icon: <Copy size={14} />, onClick: () => useAgentsStore.getState().duplicateAgent(agent) },
                { label: 'Excluir', icon: <Trash2 size={14} />, onClick: () => useAgentsStore.getState().deleteAgent(agent.id), destructive: true },
              ]}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
