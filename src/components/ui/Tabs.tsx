import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex space-x-1 border-b border-border mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 focus-visible:outline-none",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground hover:border-border/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="outline-none">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
