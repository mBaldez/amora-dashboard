import { Activity, ShieldAlert, Wifi, ServerCrash } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { cn } from '../lib/utils';

export function Health() {
  const alerts = [
    { id: 1, agent: 'Scraper Lattes', error: 'Timeout de API Externa (Lattes)', time: 'Há 5 min', level: 'critical' },
    { id: 2, agent: 'Bot Twitter', error: 'Rate Limit Exceeded', time: 'Há 22 min', level: 'warning' },
    { id: 3, agent: 'Monitor de NFe', error: 'Certificado não validado', time: 'Há 1 hora', level: 'critical' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Proposições de Saúde</h1>
        <p className="text-muted text-sm">Monitoramento vital dos processos individuais e infraestrutura em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Latência Média" value="235ms" trend="-15ms" trendUp={true} icon={<Wifi size={20} />} />
        <MetricCard title="Uso Máx de CPU (Nós)" value="42%" trend="+4%" trendUp={false} icon={<Activity size={20} />} className="border-info/30" />
        <MetricCard title="Erros Críticos (24h)" value="3" trend="-2" trendUp={true} icon={<ShieldAlert size={20} />} className="border-red-500/30" />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
          <ServerCrash size={18} className="text-red-500" />
          Alertas Ativos (Timeouts/Crashes)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background/50 text-xs text-muted uppercase border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Subagente Responsável</th>
                <th className="px-6 py-3 font-medium">Diagnóstico</th>
                <th className="px-6 py-3 font-medium text-right">Gravidade</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} className="border-b border-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-muted font-mono">{alert.time}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{alert.agent}</td>
                  <td className="px-6 py-4 text-muted">{alert.error}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded inline-block border",
                      alert.level === 'critical' ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-warning/10 text-warning border-warning/30"
                    )}>
                      {alert.level === 'critical' ? 'Crítico' : 'Atenção'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {alerts.length === 0 && (
            <div className="text-center py-8 text-muted">
              Nenhum alerta crítico ativo. Saúde em 100%.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
