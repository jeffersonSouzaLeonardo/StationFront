const API_BASE_URL = (
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL)) ||
  (typeof window !== 'undefined' && window.__API_BASE_URL) ||
  'http://localhost:8080'
);

/**
 * Faz fetch com timeout usando AbortController
 * @param {string} url
 * @param {object} options
 * @param {number} timeoutMs
 */
const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    if (err.name === 'AbortError') {
      throw new Error('Tempo de requisição esgotado (timeout)');
    }
    throw err;
  }
};

/**
 * Headers padrão para todas as requisições
 * @returns {Object} Headers com Content-Type e tenant-id
 */
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'x-tenant-id': 'manager',
});

const fuelApi = {
  /**
   * Executa requisição GET para buscar lista de combustíveis
   * @returns {Promise<Object>} Promise com dados dos combustíveis
   */
  async getAll() {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/fuel`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      }, 8000);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar lista de combustíveis:", error);
      throw error;
    }
  },

};

export default fuelApi;
