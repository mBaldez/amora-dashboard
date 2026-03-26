import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { activityData } from '../../data/mockMetrics';
import { cn } from '../../lib/utils';

export function ActivityChart({ className, height = "h-[300px]" }: { className?: string, height?: string }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Global</h3>
          <p className="text-sm text-muted">Execuções e falhas dos subagentes nos últimos 7 dias</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted">Sucesso</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="text-muted">Falhas</span>
          </div>
        </div>
      </div>
      
      <div className={cn("w-full mt-auto", height)}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExecucoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFalhas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D2D45" />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#2D2D45', borderRadius: '8px', color: '#F1F5F9' }}
              itemStyle={{ color: '#F1F5F9' }}
            />
            <Area 
              type="monotone" 
              dataKey="execucoes" 
              stroke="#7C3AED" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorExecucoes)" 
            />
            <Area 
              type="monotone" 
              dataKey="falhas" 
              stroke="#EF4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorFalhas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
