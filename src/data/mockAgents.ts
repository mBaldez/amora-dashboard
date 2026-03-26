import type { Agent } from '../types/agent';

export const mockAgents: Agent[] = [
  { id: '1', name: 'Organizer', description: 'Organiza e classifica arquivos e tarefas de forma autônoma', icon: '📁', status: 'Ativo', categories: ['Organização'], lastExecution: 'Executado há 2h', createdAt: '2023-10-01', color: '#3B82F6' },
  { id: '2', name: 'Coder', description: 'Escreve e revisa código automaticamente', icon: '💻', status: 'Ativo', categories: ['Código'], lastExecution: 'Executado há 30m', createdAt: '2023-10-02', color: '#7C3AED' },
  { id: '3', name: 'Verifier', description: 'Valida outputs e identifica erros estruturais', icon: '✅', status: 'Inativo', categories: ['Sistema'], lastExecution: 'Executado ontem', createdAt: '2023-10-03', color: '#10B981' },
  { id: '4', name: 'Twitter Curator', description: 'Curadoria e agendamento de conteúdo no Twitter/X', icon: '🐦', status: 'Ativo', categories: ['Mídia', 'Conteúdo'], lastExecution: 'Executado há 1h', createdAt: '2023-10-04', color: '#0EA5E9' },
  { id: '5', name: 'YouTube Curator', description: 'Analisa e cura vídeos em trending no YouTube', icon: '🎬', status: 'Projeto', categories: ['Mídia'], createdAt: '2023-10-05', color: '#EF4444' },
  { id: '6', name: 'Reddit Curator', description: 'Monitora e extrai insights virais do Reddit', icon: '📰', status: 'Ativo', categories: ['Pesquisa', 'Mídia'], lastExecution: 'Executado há 4h', createdAt: '2023-10-06', color: '#F97316' },
  { id: '7', name: 'Email Scanner', description: 'Lê e classifica e-mails importantes automaticamente', icon: '📧', status: 'Inativo', categories: ['Email', 'Organização'], createdAt: '2023-10-07', color: '#6366F1' },
  { id: '8', name: 'Proposal Manager', description: 'Gerencia e cria propostas de negócios completas', icon: '📝', status: 'Ativo', categories: ['Conteúdo'], lastExecution: 'Executado hoje', createdAt: '2023-10-08', color: '#8B5CF6' },
  { id: '9', name: 'Niche Researcher', description: 'Pesquisa nichos rentáveis e tendências de mercado', icon: '🔍', status: 'Ativo', categories: ['Pesquisa'], lastExecution: 'Executado há 12h', createdAt: '2023-10-09', color: '#F59E0B' },
  { id: '10', name: 'Content Writer', description: 'Produz conteúdo longo para blogs e redes sociais', icon: '✍️', status: 'Projeto', categories: ['Conteúdo'], createdAt: '2023-10-10', color: '#EC4899' },
  { id: '11', name: 'Brainstormer', description: 'Gera ideias e variações criativas infinitas', icon: '🧠', status: 'Ativo', categories: ['Pesquisa', 'Conteúdo'], lastExecution: 'Executado há 15m', createdAt: '2023-10-11', color: '#D946EF' },
  { id: '12', name: 'Researcher', description: 'Pesquisa profunda em fontes e artigos diversos', icon: '🔬', status: 'Inativo', categories: ['Pesquisa'], createdAt: '2023-10-12', color: '#06B6D4' },
  { id: '13', name: 'Code Reviewer', description: 'Revisa pull requests e audita a qualidade do código', icon: '🔎', status: 'Ativo', categories: ['Código', 'Sistema'], lastExecution: 'Executado há 5m', createdAt: '2023-10-13', color: '#14B8A6' },
  { id: '14', name: 'QA Tester', description: 'Executa testes automáticos (E2E) e de qualidade', icon: '🧪', status: 'Projeto', categories: ['Código', 'Sistema'], createdAt: '2023-10-14', color: '#22C55E' },
  { id: '15', name: 'Debugger', description: 'Monitora, identifica e resolve bugs recorrentes no código', icon: '🐛', status: 'Ativo', categories: ['Código', 'Sistema'], lastExecution: 'Executado ontem', createdAt: '2023-10-15', color: '#EAB308' },
  { id: '16', name: 'System Analyst', description: 'Analisa arquitetura e sugere refatorações de performance', icon: '🏗️', status: 'Ativo', categories: ['Sistema'], lastExecution: 'Executado há 3 dias', createdAt: '2023-10-16', color: '#64748B' },
];
