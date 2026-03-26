export const API_BASE_URL = import.meta.env.VITE_AMORA_API_URL || 'http://localhost:3000/api';
export const API_TOKEN = import.meta.env.VITE_DASHBOARD_TOKEN || '';

/**
 * Cliente Wrapper nativo para conectar o Dashboard ao contêiner "Amora Brain"
 * Utiliza as variáveis configuradas localmente para injetar o Token no Header em todos os requests de forma invisível.
 */
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Mescla os headers default de Auth com os que porventura vierem no argumento.
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
    ...options?.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new Error(`[Amora Error] ${response.status} - ${response.statusText}`);
    }
    
    // Sucesso, retorna os objetos castados <T>
    return response.json();
  } catch (error) {
    console.warn(`[Amora Sync] Sem Comunicação na Rota ${endpoint}. A VPS está rodando e a URL base é '${API_BASE_URL}'?`);
    throw error; // Repassa pro Catch do UI
  }
}
