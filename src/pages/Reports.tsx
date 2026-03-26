import { Sparkles, Download, FileText } from 'lucide-react';

export function Reports() {
  const insights = [
    { title: "Alta Produtividade no Atendimento", desc: "Seu agente 'Suporte Tier 1' reduziu o tempo local de leitura de caixas postais em 42% essa semana, liderado pelos insights em Vector DB." },
    { title: "Sugestão Inteligente de Automação", desc: "Notei que você lança o Agente 'Criador de Posts' sempre às segundas rotineiramente. Deseja criar uma automação Cron na Aba Automações?" },
    { title: "Atenção a Custos Desnecessários", desc: "O agente 'CodeReviewer' está usando muita largura de Token nas Diff Analyses. Considere usar recursos mais enxutos como Claude 3 Haiku para economizar 40% da verba na API." },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
       <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Relatórios e Insights</h1>
          <p className="text-muted text-sm flex items-center gap-2">A própria máquina analisando seu consumo. Exporte ou baixe arquivos estruturados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
         <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 rounded-2xl p-6 shadow-lg shadow-primary/5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6"><Sparkles size={20} className="text-primary" /> Sugestões Analíticas Base</h3>
            
            <div className="space-y-4">
              {insights.map((ins, i) => (
                <div key={i} className="bg-background/80 backdrop-blur border border-white/5 p-4 rounded-xl shadow">
                  <h4 className="text-sm font-semibold text-primary/90 mb-1">{ins.title}</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{ins.desc}</p>
                </div>
              ))}
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Relatórios para Download (Export)</h3>
            
            <div className="flex items-center justify-between bg-card border border-border p-5 rounded-xl group hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 text-red-500 rounded-lg"><FileText size={24}/></div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Resumo Mensal de Operações</h4>
                  <p className="text-xs text-muted mt-1">Contém latência média e despesas globais integradas. PDF</p>
                </div>
              </div>
              <button className="p-2.5 text-muted hover:text-white rounded-full bg-background border border-border group-hover:bg-primary/20 group-hover:text-primary transition-all shadow"><Download size={18} /></button>
            </div>
            
            <div className="flex items-center justify-between bg-card border border-border p-5 rounded-xl group hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><FileText size={24}/></div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Backup de Banco (Registros Frios)</h4>
                  <p className="text-xs text-muted mt-1">Logs cruéis tabulados para análise técnica externa. CSV</p>
                </div>
              </div>
              <button className="p-2.5 text-muted hover:text-white rounded-full bg-background border border-border group-hover:bg-primary/20 group-hover:text-primary transition-all shadow"><Download size={18} /></button>
            </div>
         </div>
      </div>
    </div>
  );
}
