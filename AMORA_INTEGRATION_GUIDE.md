# Manual de Integração: Amora VPS Backend <-> React Dashboard

> **Para: Claude (Gestor da VPS e Contêiner "Amora Brain")**
> **De: AI Developer (Dashboard Architect)**
> **Ação Exigida:** Implementar uma camada de API REST no contêiner `amora brain` para servir dados ao Dashboard (Frontend React recém criado).

Olá Claude! Recebi do nosso usuário a incumbência de preparar este espetacular Dashboard em React. Como você administra a infraestrutura segura (OpenClaw + Scripts GitHub + Bot do Telegram) na VPS via **Amora Brain**, preparei o frontend para escutar e ler exclusivamente os seus dados.

Para o dashboard "acordar e viver", você precisa criar um webserver simples (Ex: Node.js/Express, FastAPI) expondo as seguintes rotas JSON e habilitando **CORS** para o domínio que hospedará este dashboard.

---

## 🔒 1. Segurança e Autenticação (Headers)
Todas as chamadas do Dashboard enviarão um header de Autorização. Configure a sua API para rejeitar o que não tiver isso:
- `Authorization: Bearer <VITE_DASHBOARD_TOKEN>`
(O token pode ser um UUID simples que você gerará; avise o usuário para colocar no `.env` do VITE dele).

---

## 📡 2. Contratos REST API Necessários

### A. Listagem de Agentes
**Endpoint:** `GET /api/agents`
**Propósito:** O Dashboard usará essa rota para montar os cartões na tela "Subagentes".
**Resposta (Expected 200 JSON):**
```json
[
  {
    "id": "openclaw-master-01",
    "name": "Amora Mestre",
    "description": "Orquestrador principal ligado ao Telegram",
    "icon": "🧠",
    "status": "Ativo",
    "categories": ["Sistema"],
    "lastExecution": "2026-03-26T10:00:00Z",
    "createdAt": "2026-01-01",
    "color": "#7C3AED"
  }
]
```
*(Nota: O Enum de status aceita: `"Ativo" | "Inativo" | "Projeto"`)*

### B. Obter Saúde / Crashes
**Endpoint:** `GET /api/health`
**Propósito:** Preencher a tabela da página "Proposições de Saúde" (`/health`).
**Resposta (Expected 200 JSON):**
```json
{
  "cpu_usage_pct": 42,
  "average_latency_ms": 235,
  "alerts": [
    {
      "id": 1,
      "agent": "Webhook Telegram",
      "error": "Timeout na API",
      "time": "2026-03-26T19:50:00Z",
      "level": "critical" // ou "warning"
    }
  ]
}
```

### C. Executar Agente Manualmente (Trigger)
**Endpoint:** `POST /api/agents/:id/execute`
**Propósito:** O botão de "Play" no Dashboard manda um sinal para você forçar a inicialização de um job / rule no OpenClaw. Nenhuma view profunda necessária, retorne `200 OK`.

---

## 💡 3. Informações Opcionais / Próximos Passos
Seu backend centralizará a comunicação com a API do Claude e OpenClaw. Você pode persistir essas listas de Agentes em arquivos JSON estáticos e atualizá-los via commit do Github se preferir, servindo esse `.json` cru na rota `/api/agents`.

O Frontend possui *Fallback passivo*. Se a sua VPS cair, ele volta para dados falsos internos ("Mock Mode") para que o usuário final não veja telas quebradas no app hospedado.

Um abraço,
*AI React Developer Team*
