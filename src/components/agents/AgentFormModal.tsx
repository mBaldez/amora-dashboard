import { useState, useEffect } from 'react';
import type { Agent } from '../../types/agent';
import { useAgentsStore } from '../../store/agentsStore';
import { X, Save, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AgentFormModal() {
  const { isAgentFormOpen, closeAgentForm, agentToEdit, addAgent, updateAgent } = useAgentsStore();
  
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: '',
    description: '',
    icon: '🤖',
    color: '#7C3AED',
    status: 'Projeto',
    categories: ['Sistema'],
  });

  useEffect(() => {
    if (agentToEdit) {
      setFormData(agentToEdit);
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '🤖',
        color: '#7C3AED',
        status: 'Projeto',
        categories: ['Sistema'],
      });
    }
  }, [agentToEdit, isAgentFormOpen]);

  if (!isAgentFormOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agentToEdit) {
      updateAgent(agentToEdit.id, formData);
    } else {
      addAgent({
        ...formData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString().split('T')[0],
      } as Agent);
    }
  };

  const handlePreview = () => {
    // Phase 3 webhook preview helper
    alert("Teste de Webhook simulado para: " + (formData.name || 'Agente'));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAgentForm}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-card/50">
            <h2 className="text-xl font-bold text-white">
              {agentToEdit ? 'Editar Agente' : 'Novo Agente de IA'}
            </h2>
            <button 
              onClick={closeAgentForm}
              className="p-2 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <form id="agent-form" onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-muted mb-1">Nome</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Ex: Curador Social"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Ícone</label>
                    <input 
                      type="text" 
                      value={formData.icon || ''}
                      onChange={e => setFormData({...formData, icon: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-center"
                      placeholder="🤖"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Descrição</label>
                  <textarea 
                    required
                    value={formData.description || ''}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="O que este agente faz?"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Configurações Base</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Status Inicial</label>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value as Agent['status']})}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                    >
                      <option value="Projeto">Projeto</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Cor Temática</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={formData.color || '#7C3AED'}
                        onChange={e => setFormData({...formData, color: e.target.value})}
                        className="h-10 w-full cursor-pointer rounded bg-background border border-border"
                      />
                      <span className="text-sm font-mono text-muted">{formData.color}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Agendamento (Cron)</label>
                    <input 
                      type="text" 
                      placeholder="0 * * * *"
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                    <span className="text-xs text-muted/70 mt-1 block">Ex: a cada hora.</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">URL Webhook Externo</label>
                    <input 
                      type="url" 
                      placeholder="https://api..."
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-card/50 flex justify-between items-center gap-4">
            <button 
              type="button"
              onClick={handlePreview}
              className="px-4 py-2 bg-background border border-border hover:bg-white/5 text-muted hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              Testar Webhook
            </button>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={closeAgentForm}
                className="px-4 py-2 text-muted hover:text-white text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                form="agent-form"
                className="px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
              >
                <Save size={16} />
                {agentToEdit ? 'Salvar Alterações' : 'Criar Agente'}
              </button>
            </div>
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
