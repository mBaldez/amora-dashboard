import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, Activity, Zap, Server, BarChart2, FileText, User, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const mainLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Bot, label: 'Agentes de IA', to: '/subagentes', badge: '16' },
    { icon: Activity, label: 'Proposições de Saúde', to: '/health' },
    { icon: Zap, label: 'Automação', to: '/automation' },
    { icon: Server, label: 'Status Operação', to: '/status' },
    { icon: BarChart2, label: 'Métricas & Análise', to: '/metrics' },
    { icon: FileText, label: 'Relatórios & Insights', to: '/reports' },
  ];

  return (
    <aside className="w-[240px] flex-shrink-0 bg-sidebar border-r border-border h-screen sticky top-0 flex flex-col transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3 text-primary">
          <Bot size={28} className="text-primary" />
          <span className="font-bold text-lg text-foreground tracking-wide">Equipe Direta</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 overflow-y-auto">
        <div className="space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted hover:bg-card hover:text-foreground"
                  )
                }
              >
                <Icon size={18} className="transition-transform group-hover:scale-110" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-auto bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-border space-y-1">
        <p className="px-3 text-xs font-semibold text-muted/70 uppercase tracking-wider mb-2">Minha Área</p>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-card hover:text-foreground transition-all">
          <User size={18} />
          <span>Perfil</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-card hover:text-foreground transition-all">
          <Settings size={18} />
          <span>Configurações</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all mt-2">
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
