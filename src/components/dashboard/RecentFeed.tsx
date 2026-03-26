import { recentLogs } from '../../data/mockLogs';
import { useAgentsStore } from '../../store/agentsStore';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function RecentFeed({ className }: { className?: string }) {
  const { agents } = useAgentsStore();

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Sucesso': return <CheckCircle2 size={18} className="text-success" />;
      case 'Falha': return <AlertCircle size={18} className="text-red-500" />;
      case 'Processando': return <Loader2 size={18} className="text-info animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-1">Feed de Atividade</h3>
      <p className="text-sm text-muted mb-6">Ações recentes executadas pelos agentes</p>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
        {recentLogs.map((log) => {
          const agent = agents.find(a => a.id === log.agentId);
          if (!agent) return null;
          
          return (
            <div key={log.id} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="mt-1 bg-background rounded-full p-0.5 border border-border">
                  {getStatusIcon(log.status)}
                </div>
                <div className="w-px h-full bg-border mt-1 group-last:hidden" />
              </div>
              
              <div className="pb-4 border-b border-border/50 group-last:border-0 w-full">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-foreground">
                    <Link to={`/subagentes/${agent.id}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
                      <span className="text-lg">{agent.icon}</span>
                      {agent.name}
                    </Link>
                  </p>
                  <span className="text-xs text-muted/80 whitespace-nowrap">{log.timestamp}</span>
                </div>
                
                <p className="text-sm text-muted mb-2">
                  Executando: <span className="text-foreground/80 font-medium">{log.action}</span>
                </p>
                
                {log.status !== 'Processando' && (
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded border inline-block",
                    log.status === 'Sucesso' ? "text-success border-success/30 bg-success/10" : "text-red-500 border-red-500/30 bg-red-500/10"
                  )}>
                    Duração: {log.duration}s
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
