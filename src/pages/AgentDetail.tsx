import { useParams, useNavigate } from 'react-router-dom';
import { useAgentsStore } from '../store/agentsStore';
import { ArrowLeft, Play, Settings, TerminalSquare, Power } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents, toggleAgentStatus, executeAgent } = useAgentsStore();
  const [isRunning, setIsRunning] = useState(false);

  const agent = agents.find(a => a.id === id);

  if (!agent) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-white mb-4">Agente não encontrado</h2>
        <button onClick={() => navigate('/subagentes')} className="text-primary hover:underline">
          Voltar para a lista
        </button>
      </div>
    );
  }

  const handleExecute = async () => {
    setIsRunning(true);
    await executeAgent(agent.id);
    setIsRunning(false);
  };

  const statusVariant = agent.status === 'Ativo' ? 'success' : agent.status === 'Inativo' ? 'warning' : 'info';

  const overviewTab = (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sobre este Agente</h3>
        <p className="text-muted leading-relaxed mb-6">{agent.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <span className="text-xs text-muted font-medium mb-1 block">Data de Criação</span>
            <span className="text-sm text-foreground">{agent.createdAt}</span>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <span className="text-xs text-muted font-medium mb-1 block">Última Execução</span>
            <span className="text-sm text-foreground">{agent.lastExecution || 'N/A'}</span>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border md:col-span-2">
            <span className="text-xs text-muted font-medium mb-2 block">Categorias</span>
            <div className="flex flex-wrap gap-2">
              {agent.categories.map(cat => (
                <span key={cat} className="text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded bg-card text-foreground/70 border border-border">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const configTab = (
    <div className="bg-card border border-border p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Settings size={18} className="text-primary" />
        Configuração de Webhook (Fase 3 preview)
      </h3>
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="text-sm font-medium text-muted block mb-1">Endpoint URL</label>
          <input type="text" value={`https://api.equipadireta.com/v1/agents/${agent.id}/run`} disabled className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-muted/70 font-mono" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted block mb-1">Método HTTP</label>
            <select disabled className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-muted/70 appearance-none">
              <option>POST</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-muted block mb-1">Authorization Header</label>
            <input type="password" value="••••••••••••••••" disabled className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm text-muted/70 font-mono" />
          </div>
        </div>
      </div>
    </div>
  );

  const logsTab = (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <TerminalSquare size={18} className="text-primary" />
          Logs Recentes
        </h3>
        <span className="text-xs text-muted">Mostrando últimos 50 eventos</span>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-background/50 text-xs text-muted uppercase border-b border-border">
            <tr>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">Evento / Ação</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 text-muted font-mono">{new Date().toISOString().replace('T', ' ').slice(0, 19)}</td>
              <td className="px-6 py-4 text-foreground">Health check via API</td>
              <td className="px-6 py-4"><span className="text-success text-xs font-semibold px-2 py-1 rounded bg-success/10 border border-success/30">Sucesso</span></td>
              <td className="px-6 py-4 text-right text-muted">200ms</td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 text-muted font-mono">Ontem 14:32:00</td>
              <td className="px-6 py-4 text-foreground">Trigger manual executado</td>
              <td className="px-6 py-4"><span className="text-success text-xs font-semibold px-2 py-1 rounded bg-success/10 border border-success/30">Sucesso</span></td>
              <td className="px-6 py-4 text-right text-muted">2.4s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6 text-sm font-medium group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar
      </button>

      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: agent.color || 'var(--primary)' }} />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/10" style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
            {agent.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">{agent.name}</h1>
              <Badge variant={statusVariant}>{agent.status}</Badge>
            </div>
            <p className="text-muted text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: agent.color || 'var(--primary)' }}></span>
              ID Interno: <span className="font-mono text-foreground/70">{agent.id}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={() => toggleAgentStatus(agent.id)}
            className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Power size={16} className={agent.status === 'Ativo' ? 'text-red-500' : 'text-success'} />
            {agent.status === 'Ativo' ? 'Desativar' : 'Ativar'}
          </button>
          
          <button 
            onClick={handleExecute}
            disabled={isRunning || agent.status !== 'Ativo'}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Play size={16} className={cn(isRunning && "animate-pulse")} />
            {isRunning ? 'Processando...' : 'Executar Agora'}
          </button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs 
        tabs={[
          { id: 'overview', label: 'Visão Geral', content: overviewTab },
          { id: 'config', label: 'Configuração Webhook', content: configTab },
          { id: 'logs', label: 'Logs & Eventos', content: logsTab },
        ]} 
      />
    </div>
  );
}
