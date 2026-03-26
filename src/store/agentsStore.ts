import { create } from 'zustand';
import type { Agent, AgentStatus } from '../types/agent';
import { mockAgents } from '../data/mockAgents';
import { fetchApi } from '../services/api';

interface AgentsState {
  agents: Agent[];
  searchQuery: string;
  statusFilter: string;
  isAgentFormOpen: boolean;
  agentToEdit: Agent | null;
  isMockMode: boolean;
  loadAgents: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  toggleAgentStatus: (id: string) => void;
  deleteAgent: (id: string) => void;
  executeAgent: (id: string) => Promise<void>;
  duplicateAgent: (agent: Agent) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  openAgentForm: (agent?: Agent) => void;
  closeAgentForm: () => void;
}

export const useAgentsStore = create<AgentsState>((set, get) => ({
  agents: mockAgents,
  searchQuery: '',
  statusFilter: 'Todos',
  isAgentFormOpen: false,
  agentToEdit: null,
  isMockMode: true, // Começará em mock na compilação primária
  
  loadAgents: async () => {
    try {
      // Tenta puxar da VPS
      const data = await fetchApi<Agent[]>('/agents');
      set({ agents: data, isMockMode: false });
    } catch (e) {
      // Fallback Visual
      set({ isMockMode: true });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setStatusFilter: (status) => set({ statusFilter: status }),
  
  toggleAgentStatus: (id) =>
    set((state) => ({
      agents: state.agents.map((agent) => {
        if (agent.id === id) {
          const newStatus: AgentStatus = agent.status === 'Ativo' ? 'Inativo' : 'Ativo';
          return { ...agent, status: newStatus };
        }
        return agent;
      }),
    })),
    
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id),
    })),
    
  executeAgent: async (id) => {
    const { isMockMode } = get();
    
    if (!isMockMode) {
      try {
        await fetchApi(`/agents/${id}/execute`, { method: 'POST' });
        // trigger de recarregamento caso precisássemos
      } catch(e) { /* fallback passivo visando demo */ }
    }
    // Mock sleep fallack para fins visuais
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
  
  duplicateAgent: (agent) =>
    set((state) => {
      const newAgent: Agent = {
        ...agent,
        id: Math.random().toString(36).substr(2, 9),
        name: `${agent.name} (Cópia)`,
        status: 'Projeto',
        createdAt: new Date().toISOString().split('T')[0],
        lastExecution: undefined,
      };
      
      return {
        agents: [newAgent, ...state.agents]
      };
    }),

  addAgent: (agent) => 
    set((state) => ({
      agents: [agent, ...state.agents],
      isAgentFormOpen: false,
    })),

  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((agent) => agent.id === id ? { ...agent, ...updates } : agent),
      isAgentFormOpen: false,
      agentToEdit: null,
    })),

  openAgentForm: (agent) => set({ isAgentFormOpen: true, agentToEdit: agent || null }),
  closeAgentForm: () => set({ isAgentFormOpen: false, agentToEdit: null }),
}));
