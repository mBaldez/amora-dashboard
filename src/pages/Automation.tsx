import { GitMerge, ArrowRight, Play, Server, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function Automation() {
  const workflows = [
    { title: "Curadoria Matinal", status: "ative", trigger: "0 8 * * 1-5", steps: 3, lastRun: "Hoje 08:00" },
    { title: "Onboarding de Leads", status: "ative", trigger: "Webhook Push", steps: 5, lastRun: "Há 2 horas" },
    { title: "Backup de Insights", status: "paused", trigger: "Manual", steps: 2, lastRun: "Semana passada" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in zoom-in-95 duration-500 delay-200">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Editor de Automação</h1>
          <p className="text-muted text-sm flex items-center gap-2">Crie cadeias de ações entre Subagentes. <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded">BETA</span></p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
          <GitMerge size={16} /> Novo Workflow
        </button>
      </div>

      {/* Visual Workflow Simulator */}
      <h3 className="text-lg font-semibold text-foreground mb-4">Pipeline Visual (Preview)</h3>
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex items-center justify-center gap-4 overflow-x-auto mb-8 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-48 bg-background border border-border p-4 rounded-xl shadow-lg relative cursor-pointer hover:border-primary/50 transition-colors">
            <div className="text-xs text-muted mb-2 font-medium flex items-center gap-1.5 uppercase tracking-wider"><Clock size={12}/> Evento Inicial</div>
            <div className="text-sm font-semibold text-foreground">Novo Email Lead (Gmail)</div>
          </div>
        </div>

        <ArrowRight className="text-primary/50 mx-2 relative z-10 w-6 h-6" />

        <div className="relative z-10 flex flex-col items-center gap-2">
           <div className="w-48 bg-primary/10 border border-primary/40 p-4 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.2)] cursor-pointer hover:border-primary transition-colors">
            <div className="text-xs text-primary mb-2 font-medium flex items-center gap-1.5 uppercase tracking-wider"><Play size={12}/> Agente de IA</div>
            <div className="text-sm font-bold text-white">Analisador de Vendas</div>
          </div>
        </div>

        <ArrowRight className="text-primary/50 mx-2 relative z-10 w-6 h-6" />

        <div className="relative z-10 flex flex-col items-center gap-2">
           <div className="w-48 bg-background border border-border p-4 rounded-xl shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
            <div className="text-xs text-muted mb-2 font-medium flex items-center gap-1.5 uppercase tracking-wider"><Server size={12}/> Ação Externa</div>
            <div className="text-sm font-semibold text-foreground">Webhook (CRM HubSpot)</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-4">Seus Workflows</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((wf) => (
          <div key={wf.title} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
               <h3 className="font-semibold text-foreground text-lg mb-1">{wf.title}</h3>
               <span className={cn(
                 "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border",
                 wf.status === 'ative' ? "bg-success/10 text-success border-success/30" : "bg-muted/10 text-muted border-border"
               )}>
                 {wf.status === 'ative' ? 'ON' : 'OFF'}
               </span>
            </div>
            <p className="text-sm text-muted mb-4 font-mono">{wf.trigger}</p>
            <div className="flex justify-between items-center text-sm border-t border-border pt-4">
              <span className="text-muted/70">{wf.steps} Etapas</span>
              <span className="text-foreground/70 font-medium">Últ. Run: {wf.lastRun}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
