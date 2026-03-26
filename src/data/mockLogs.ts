export interface AgentLog {
  id: string;
  agentId: string;
  action: string;
  status: 'Sucesso' | 'Falha' | 'Processando';
  duration: number; // in seconds
  timestamp: string;
}

export const recentLogs: AgentLog[] = [
  { id: 'l1', agentId: '2', action: 'Revisão de PR #402', status: 'Sucesso', duration: 12, timestamp: 'Agora mesmo' },
  { id: 'l2', agentId: '4', action: 'Agendamento Twitter', status: 'Sucesso', duration: 4, timestamp: 'Há 5 min' },
  { id: 'l3', agentId: '8', action: 'Geração de Proposta', status: 'Processando', duration: 0, timestamp: 'Há 12 min' },
  { id: 'l4', agentId: '15', action: 'Monitoramento Sentry', status: 'Falha', duration: 34, timestamp: 'Há 1h' },
  { id: 'l5', agentId: '1', action: 'Classificar GDrive', status: 'Sucesso', duration: 89, timestamp: 'Há 2h' },
];
