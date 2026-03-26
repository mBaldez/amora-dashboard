/**
 * Amora Dashboard — Backend API
 * Node.js + Express
 * Porta: 4000
 *
 * Rotas:
 *   GET  /api/agents          → lista de agentes
 *   GET  /api/health          → CPU, latência, alertas
 *   POST /api/agents/:id/execute → dispara execução
 *   GET  /                    → serve o React build (dist/)
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 4000;
const TOKEN = process.env.DASHBOARD_TOKEN || 'amora-dashboard-2026';
const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, '..', 'dist');

app.use(express.json());
app.use(cors({ origin: '*' }));

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (token !== TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─── GET /api/agents ──────────────────────────────────────────────────────────
app.get('/api/agents', requireAuth, (req, res) => {
  try {
    const agents = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'agents.json'), 'utf8'));
    res.json(agents);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao ler agents.json' });
  }
});

// ─── GET /api/health ──────────────────────────────────────────────────────────
app.get('/api/health', requireAuth, (req, res) => {
  let cpu_usage_pct = 0;
  let average_latency_ms = 0;

  // CPU real via /proc/stat
  try {
    const stat1 = fs.readFileSync('/proc/stat', 'utf8').split('\n')[0].trim().split(/\s+/);
    const idle1 = parseInt(stat1[4]);
    const total1 = stat1.slice(1).reduce((a, b) => a + parseInt(b), 0);
    // Segunda leitura 200ms depois
    execSync('sleep 0.2');
    const stat2 = fs.readFileSync('/proc/stat', 'utf8').split('\n')[0].trim().split(/\s+/);
    const idle2 = parseInt(stat2[4]);
    const total2 = stat2.slice(1).reduce((a, b) => a + parseInt(b), 0);
    const idleDelta = idle2 - idle1;
    const totalDelta = total2 - total1;
    cpu_usage_pct = Math.round(100 * (1 - idleDelta / totalDelta));
  } catch (_) {
    cpu_usage_pct = -1; // não disponível
  }

  // Latência estimada do bridge local
  const t0 = Date.now();
  try {
    execSync('curl -s -o /dev/null http://localhost:3010/api/bridge 2>/dev/null', { timeout: 2000 });
    average_latency_ms = Date.now() - t0;
  } catch (_) {
    average_latency_ms = 0;
  }

  // Alertas lidos do arquivo (escrito por scripts de monitoramento)
  let alerts = [];
  try {
    alerts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'alerts.json'), 'utf8'));
  } catch (_) {
    alerts = [];
  }

  res.json({ cpu_usage_pct, average_latency_ms, alerts });
});

// ─── POST /api/agents/:id/execute ─────────────────────────────────────────────
app.post('/api/agents/:id/execute', requireAuth, (req, res) => {
  const { id } = req.params;
  const agents = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'agents.json'), 'utf8'));
  const agent = agents.find(a => a.id === id);

  if (!agent) {
    return res.status(404).json({ error: `Agente ${id} não encontrado` });
  }

  console.log(`[Execute] Agente disparado: ${agent.name} (${id}) em ${new Date().toISOString()}`);

  // Registra no log de alertas como execução manual
  try {
    let alerts = [];
    try { alerts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'alerts.json'), 'utf8')); } catch (_) {}
    alerts.unshift({
      id: Date.now(),
      agent: agent.name,
      error: `Execução manual disparada via Dashboard`,
      time: new Date().toISOString(),
      level: 'warning'
    });
    // Mantém apenas os últimos 20 alertas
    fs.writeFileSync(path.join(DATA_DIR, 'alerts.json'), JSON.stringify(alerts.slice(0, 20), null, 2));
  } catch (_) {}

  res.json({ ok: true, agent: agent.name, triggeredAt: new Date().toISOString() });
});

// ─── Serve React build (SPA) ──────────────────────────────────────────────────
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.json({ status: 'API only — dist/ não encontrado' }));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Amora Dashboard API rodando em http://0.0.0.0:${PORT}`);
  console.log(`Token: ${TOKEN}`);
});
