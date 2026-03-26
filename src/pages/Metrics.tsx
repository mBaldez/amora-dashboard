import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Cpu } from 'lucide-react';

export function Metrics() {
  const tokenData = [
    { name: '01', cust: 120, revenue: 800 },
    { name: '05', cust: 230, revenue: 1200 },
    { name: '10', cust: 340, revenue: 2500 },
    { name: '15', cust: 200, revenue: 1900 },
    { name: '20', cust: 420, revenue: 3800 },
    { name: '25', cust: 390, revenue: 3100 },
    { name: '30', cust: 510, revenue: 4700 },
  ];

  const pieData = [
    { name: 'Código', value: 400, color: '#7C3AED' },
    { name: 'Conteúdo', value: 300, color: '#3B82F6' },
    { name: 'Análise', value: 300, color: '#10B981' },
    { name: 'Imagens', value: 200, color: '#F59E0B' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Métricas e Análise</h1>
        <p className="text-muted text-sm flex items-center gap-2">Análise profunda de telemetria baseada no custo computacional de APIs (LLM).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><DollarSign size={18}/> Retorno sobre Inteligência (ROI)</h3>
                <p className="text-sm text-muted">Custo de Tokens estimados (OpenAI/Anthropic) VS Receita Projetada.</p>
             </div>
             <div className="flex gap-4 text-xs font-semibold">
               <span className="text-success flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success"></span> Receita Estimada</span>
               <span className="text-red-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Custo com API Estimado</span>
             </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F0F1A', border: '1px solid #1E1E2E' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="cust" stroke="#EF4444" strokeWidth={2} fillOpacity={0.1} fill="#EF4444" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Cpu size={18}/> Consumo por Categoria</h3>
               <p className="text-sm text-muted mb-4">Distribuição do volume das suas tarefas.</p>
            </div>
            
            <div className="h-[200px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map(d => (
                <div key={d.name} className="flex flex-col gap-1 text-sm bg-background p-2 rounded border border-border">
                   <div className="flex items-center gap-1.5 font-medium text-foreground"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span> {d.name}</div>
                   <div className="text-muted font-mono">{d.value} runs</div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
