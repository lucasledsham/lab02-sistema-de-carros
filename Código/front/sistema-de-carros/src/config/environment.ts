// Configuração de ambiente
export const ENV_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090',
  
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

// Validação de configuração
if (typeof window === 'undefined' && !ENV_CONFIG.API_URL) {
  console.warn('⚠️  NEXT_PUBLIC_API_URL não definida, usando URL padrão');
}



