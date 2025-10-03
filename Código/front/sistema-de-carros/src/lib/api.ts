import { ENV_CONFIG } from '../config/environment';

// Configuração centralizada da API
export const API_BASE_URL = ENV_CONFIG.API_URL;

export const API_ENDPOINTS = {
  ALUGAR: `${API_BASE_URL}/pedidos`,
  
} as const;

// Funções específicas para alugar
export const pedidosAPI = {
  // Buscar todos os pedidos de aluguel
  async listar(): Promise<any[]> {
    return apiRequest<any[]>(API_ENDPOINTS.ALUGAR);
  },

  // Buscar pedido de aluguel por ID
  async buscarPorId(id: number): Promise<any> {
    return apiRequest<any>(`${API_ENDPOINTS.ALUGAR}/${id}`);
  },

  // Criar novo pedido de aluguel
  async criar(pedido: any): Promise<any> {
    return apiRequest<any>(API_ENDPOINTS.ALUGAR, {
      method: 'POST',
      body: JSON.stringify(pedido),
    });
  },

  // Atualizar pedido de aluguel existente
  async atualizar(id: number, pedido: any): Promise<any> {
    return apiRequest<any>(`${API_ENDPOINTS.ALUGAR}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pedido),
    });
  },

  // Excluir pedido de aluguel
  async excluir(id: number): Promise<void> {
    return apiRequest<void>(`${API_ENDPOINTS.ALUGAR}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Função utilitária para fazer requisições
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = `Erro ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // Se não conseguir fazer parse do JSON, usar a mensagem padrão
        console.warn('Não foi possível fazer parse do erro como JSON:', jsonError);
      }
      
      // Tratamento específico para erros comuns
      if (response.status === 404) {
        errorMessage = 'Recurso não encontrado. Verifique se o backend está rodando na porta 9090.';
      } else if (response.status === 500) {
        errorMessage = 'Erro interno do servidor. Verifique os logs do backend.';
      } else if (response.status === 0) {
        errorMessage = 'Erro de conexão. Verifique se o backend está rodando.';
      }
      
      throw new Error(errorMessage);
    }

    // Para operações DELETE que retornam texto simples, não tentar fazer parse JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      // Para respostas de texto simples (como DELETE), retornar o texto
      const text = await response.text();
      return (text || null) as T;
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      // Verifica se é um problema de CORS ou conexão
      console.error('Erro de conexão:', error);
      throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando na porta 8080 e se não há problemas de CORS.');
    }
    throw error;
  }
}
