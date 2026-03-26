import { Server, Database, CloudRain, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

export function Status() {
  const nodes = [
    { title: 'API OpenAI', type: 'External', status: 'operational', icon: CloudRain, uptime: '99.9%' },
    { title: 'Anthropic Claude', type: 'External', status: 'operational', icon: CloudRain, uptime: '100%' },
    { title: 'Vector Database (Pincone)', type: 'Database', status: 'operational', icon: Database, uptime: '99.99%' },
    { title: 'Servidor Webhook (NodeJS)', type: 'Core Internal', status: 'operational', icon: Server, uptime: '99.5%' },
    { title: 'CRON Dispatcher (Schedulers)', type: 'Core Internal', status: 'warning', icon: Server, uptime: '94.2%' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500 delay-150 fill-mode-both">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Status da Operação</h1>
          <p className="text-muted text-sm">Resumo da integridade estrutural e disponibilidade da frota.</p>
        </div>
        <div className="flex items-center gap-2 bg-success/10 border border-success/30 px-3 py-1.5 rounded-lg text-success text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Sistemas Operacionais
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {nodes.map(node => (
          <div key={node.title} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-background rounded-lg text-primary group-hover:bg-primary/10 transition-colors">
                <node.icon size={20} />
              </div>
              {node.status === 'operational' ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded">
                  <CheckCircle2 size={12} /> Operacional
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-warning bg-warning/10 px-2 py-1 rounded">
                  <ShieldAlert size={12} /> Instável
                </div>
              )}
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-1">{node.title}</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted font-medium">{node.type}</span>
              <span className="text-foreground font-mono">Uptime: {node.uptime}</span>
            </div>
            
            <div className="mt-4 flex gap-1 h-8 rounded overflow-hidden">
               {/* Uptime bars mock (90 dias) */}
               {Array.from({length: 45}).map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "flex-1", 
                     node.status === 'warning' && i > 30 && i < 35 ? "bg-warning opacity-80" : "bg-success opacity-80"
                   )} 
                  />
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
