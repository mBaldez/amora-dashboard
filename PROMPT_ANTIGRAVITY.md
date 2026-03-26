# Prompt para o Antigravity — Dashboard de Gerenciador de Agentes de IA

---

## PROMPT PRINCIPAL

```
Crie um dashboard completo de gerenciamento de Agentes de IA com as seguintes especificações:

---

### CONTEXTO E OBJETIVO
Um painel administrativo privado, acessível via link único em VPS, para gerenciar e monitorar múltiplos agentes de IA. O dashboard é para uso pessoal/profissional com visual moderno, dark mode, e organização por categorias de agentes.

---

### STACK TECNOLÓGICA
- Frontend: React + TypeScript + Vite
- Estilização: Tailwind CSS + shadcn/ui
- Ícones: Lucide React + Emojis como avatares de agentes
- Roteamento: React Router v6
- Estado global: Zustand ou Context API
- Animações: Framer Motion (transições suaves)
- Tema: Dark mode como padrão (fundo #0F0F1A, tons de roxo/azul escuro)

---

### LAYOUT GERAL

#### 1. SIDEBAR (esquerda, fixa, ~240px)
- Logo/Nome do projeto no topo ("Equipe Direta" ou personalizável)
- Navegação principal com ícones:
  - 🏠 Dashboard (visão geral / métricas)
  - 🤖 Agentes de IA (lista e gerenciamento)
    - Sub-item: Subagentes
    - Sub-item: Agentes Principais
  - 📊 Proposições de Saúde (status de saúde dos agentes)
  - ⚡ Automação (fluxos e pipelines)
  - 📈 Status Operação (uptime, logs)
  - 📉 Métricas & Análise
  - 📋 Relatórios & Insights
- Seção "Minha Área" no rodapé:
  - Perfil do usuário
  - Configurações
  - Logout

#### 2. TOPBAR (horizontal, fixa)
- Breadcrumb dinâmico mostrando a página atual
- Barra de busca global (buscar agentes por nome/categoria)
- Filtros rápidos: Status (Todos / Ativo / Inativo / Projeto)
- Botão "+ Novo Agente" (verde, destaque)
- Notificações (sino com badge de contagem)
- Avatar do usuário

#### 3. ÁREA PRINCIPAL — PÁGINA DE SUBAGENTES

**Header da seção:**
- Título "Subagentes" com contagem total
- Subtítulo/descrição
- Filtros inline: por status, por categoria, por data de criação
- Toggle de visualização: Grid | Lista

**Grid de Cards de Agentes (layout responsivo, 4 colunas no desktop):**

Cada card contém:
- Ícone/emoji colorido com fundo suave (círculo com cor temática)
- Badge de status no canto superior direito:
  - 🟢 Ativo (verde)
  - 🟡 Inativo (amarelo/laranja)
  - 🔵 Projeto (azul/roxo)
- Nome do agente (bold, branco)
- Descrição curta (2 linhas máximo, cinza claro)
- Linha de tags/categorias (ex: "Conteúdo", "Código", "Pesquisa")
- Ações rápidas no hover: ▶ Executar | ✏️ Editar | ⋮ Mais opções
- Indicador de última execução (ex: "Executado há 2h")

**Agentes pré-cadastrados (exemplos iniciais):**
1. 📁 Organizer — Organiza e classifica arquivos e tarefas
2. 💻 Coder — Escreve e revisa código automaticamente
3. ✅ Verifier — Valida outputs e identifica erros
4. 🐦 Twitter Curator — Curadoria e agendamento de conteúdo no Twitter/X
5. 🎬 YouTube Curator — Analisa e cura vídeos do YouTube
6. 📰 Reddit Curator — Monitora e extrai insights do Reddit
7. 📧 Email Scanner — Lê e classifica e-mails importantes
8. 📝 Proposal Manager — Gerencia e cria propostas de negócio
9. 🔍 Niche Researcher — Pesquisa nichos e tendências de mercado
10. ✍️ Content Writer — Produz conteúdo para blogs e redes sociais
11. 🧠 Brainstormer — Gera ideias e variações criativas
12. 🔬 Researcher — Pesquisa profunda em fontes diversas
13. 🔎 Code Reviewer — Revisa pull requests e qualidade de código
14. 🧪 QA Tester — Executa testes automáticos e de qualidade
15. 🐛 Debugger — Identifica e resolve bugs no código
16. 🏗️ System Analyst — Analisa arquitetura e performance do sistema

---

### PÁGINAS ADICIONAIS (estrutura preparada para expansão)

#### Página: Dashboard (Home)
- Cards de métricas no topo:
  - Total de Agentes Ativos
  - Execuções nas últimas 24h
  - Taxa de Sucesso (%)
  - Agentes com Alerta
- Gráfico de execuções por dia (últimos 7 dias) — linha ou barras
- Lista de últimas execuções com status
- Feed de atividade recente

#### Página: Detalhe do Agente
- Header com nome, ícone, status e botões de ação
- Abas: Visão Geral | Configuração | Logs | Histórico | Métricas
- Formulário de configuração do agente (endpoint, API key, parâmetros)
- Tabela de logs de execução com filtros
- Gráfico de performance individual

#### Página: Criar / Editar Agente (Modal ou página dedicada)
- Campos: Nome, Descrição, Categoria, Ícone (emoji picker), Status inicial
- Configurações técnicas: URL do webhook, método HTTP, headers, body template
- Seção de agendamento (cron expression com helper visual)
- Preview da execução antes de salvar

#### Página: Métricas & Análise
- Gráficos comparativos entre agentes
- Heatmap de atividade por hora/dia
- Relatório de custo de tokens (se aplicável)
- Exportar dados (CSV/JSON)

---

### FUNCIONALIDADES INTERATIVAS

1. **CRUD completo de agentes** — criar, editar, duplicar, arquivar, deletar
2. **Execução manual** — botão "Executar agora" com feedback visual (loading, sucesso, erro)
3. **Filtros avançados** — por status, categoria, data, frequência de uso
4. **Busca global** — busca em tempo real por nome e descrição
5. **Drag & Drop** — reordenar cards no grid
6. **Toggle de status** — ativar/desativar agente com switch animado
7. **Notificações em tempo real** — toast notifications para execuções e alertas
8. **Modal de confirmação** — para ações destrutivas (deletar, desativar)
9. **Skeleton loading** — enquanto carrega os dados
10. **Empty states** — telas amigáveis quando não há agentes cadastrados

---

### DESIGN SYSTEM

**Paleta de cores (dark mode):**
- Background principal: #0F0F1A
- Background cards: #1A1A2E
- Background sidebar: #12121F
- Accent primário: #7C3AED (roxo)
- Accent secundário: #3B82F6 (azul)
- Verde (ativo): #10B981
- Amarelo (inativo): #F59E0B
- Azul (projeto): #6366F1
- Texto principal: #F1F5F9
- Texto secundário: #94A3B8
- Bordas: #2D2D45

**Tipografia:**
- Fonte: Inter (Google Fonts)
- Títulos: 600-700 weight
- Corpo: 400 weight
- Tamanhos: 12px, 14px, 16px, 20px, 24px, 32px

**Bordas e sombras:**
- Border radius padrão: 12px nos cards, 8px nos botões
- Sombras suaves com cor temática (box-shadow com cor roxa com baixa opacidade)
- Borda sutil nos cards: 1px solid rgba(255,255,255,0.06)

---

### ESTRUTURA DE ARQUIVOS ESPERADA

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── Layout.tsx
│   ├── agents/
│   │   ├── AgentCard.tsx
│   │   ├── AgentGrid.tsx
│   │   ├── AgentForm.tsx
│   │   └── AgentDetail.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── StatusToggle.tsx
│       └── MetricCard.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Subagentes.tsx
│   ├── AgentDetail.tsx
│   └── Metricas.tsx
├── store/
│   └── agentsStore.ts
├── types/
│   └── agent.ts
└── data/
    └── mockAgents.ts
```

---

### OBSERVAÇÕES IMPORTANTES

1. **Responsividade**: O layout deve funcionar em desktop (principal), tablet e mobile (sidebar colapsável)
2. **Dados mockados**: Inicialmente usar dados estáticos/mockados para todos os agentes e métricas
3. **Preparado para API**: Toda lógica de dados deve estar isolada em hooks/services para fácil substituição por chamadas reais
4. **Acessibilidade**: Usar aria-labels e roles semânticos adequados
5. **Performance**: Lazy loading das páginas, virtualização da lista se ultrapassar 50 agentes
6. **Fase 1 - MVP**: Foco em sidebar + topbar + página de subagentes com grid de cards totalmente funcional
7. **Fase 2**: Dashboard de métricas e página de detalhe do agente
8. **Fase 3**: Integração real com APIs dos agentes via webhooks

---

Gere o projeto completo começando pela Fase 1 (MVP), com todos os arquivos necessários para rodar com `npm install && npm run dev`.
```

---

## NOTAS DE USO

- Cole este prompt completo no Antigravity para gerar o frontend base
- Após gerar, refinamentos serão feitos com a IA Amora e o assistente Claude
- O projeto será hospedado em VPS com link privado (Nginx + domínio ou IP)
- Próximos passos após o Antigravity: conectar agentes reais via webhooks/APIs
