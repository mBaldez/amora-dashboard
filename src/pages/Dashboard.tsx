import { Bot, Zap, Target, AlertTriangle } from 'lucide-react';
import { dashboardMetrics } from '../data/mockMetrics';
import { MetricCard } from '../components/ui/MetricCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { RecentFeed } from '../components/dashboard/RecentFeed';

export function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Overview</h1>
        <p className="text-muted text-sm">
          Visão panorâmica do desempenho da sua frota de Agentes de IA
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Total Ativos" 
          value={dashboardMetrics.totalActive} 
          trend={dashboardMetrics.totalActiveTrend} 
          trendUp={true} 
          icon={<Bot size={20} />} 
        />
        <MetricCard 
          title="Execuções (24h)" 
          value={dashboardMetrics.executions24h} 
          trend={dashboardMetrics.executionsTrend} 
          trendUp={true} 
          icon={<Zap size={20} />} 
        />
        <MetricCard 
          title="Taxa de Sucesso" 
          value={`${dashboardMetrics.successRate}%`} 
          trend={dashboardMetrics.successRateTrend} 
          trendUp={true} 
          icon={<Target size={20} />} 
        />
        <MetricCard 
          title="Alertas Críticos" 
          value={dashboardMetrics.alerts} 
          trend={dashboardMetrics.alertsTrend} 
          trendUp={false} 
          icon={<AlertTriangle size={20} />} 
          className="border-warning/30 relative"
        />
      </div>

      {/* Charts & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart height="h-[430px]" />
        </div>
        <div className="lg:col-span-1 h-[430px]">
          <RecentFeed />
        </div>
      </div>
    </div>
  );
}
