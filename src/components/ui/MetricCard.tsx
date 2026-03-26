import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: ReactNode;
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, trend, trendUp, icon, description, className }: MetricCardProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border p-6 shadow-sm relative overflow-hidden", className)}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">{value}</h2>
        
        {trend && (
          <span className={cn(
            "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
            trendUp ? "text-success bg-success/10" : "text-red-500 bg-red-500/10"
          )}>
            {trendUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
            {trend}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-muted/80 mt-2">{description}</p>
      )}
    </div>
  );
}
