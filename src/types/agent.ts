export type AgentStatus = 'Ativo' | 'Inativo' | 'Projeto';
export type AgentCategory = 'Conteúdo' | 'Código' | 'Pesquisa' | 'Organização' | 'Mídia' | 'Email' | 'Sistema';

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: AgentStatus;
  categories: AgentCategory[];
  lastExecution?: string;
  createdAt: string;
  color?: string;
}
