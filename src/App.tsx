import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Subagentes } from './pages/Subagentes';
import { AgentDetail } from './pages/AgentDetail';
import { Dashboard } from './pages/Dashboard';
import { Health } from './pages/Health';
import { Automation } from './pages/Automation';
import { Status } from './pages/Status';
import { Metrics } from './pages/Metrics';
import { Reports } from './pages/Reports';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="subagentes" element={<Subagentes />} />
        <Route path="subagentes/:id" element={<AgentDetail />} />
        
        <Route path="health" element={<Health />} />
        <Route path="automation" element={<Automation />} />
        <Route path="status" element={<Status />} />
        <Route path="metrics" element={<Metrics />} />
        <Route path="reports" element={<Reports />} />
        
        <Route path="*" element={
          <div className="p-8 text-center mt-20">
            <h1 className="text-2xl font-bold mb-2 text-white">404 - Em Construção</h1>
            <p className="text-muted">Acesse a aba Agentes de IA para testar o MVP funcional.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
