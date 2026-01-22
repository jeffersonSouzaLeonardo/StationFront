/**
 * Service para gerenciar operações de Combustível (Fuel)
 * Responsável por fazer requisições para a API de combustíveis
 */

import fuelApi from './api/fuel-get-all';

const fuelService = {

  async getAll() {
    try {
      const data = await fuelApi.getAll();
      return { success: true, data };
    } catch (error) {
      console.error("Erro ao buscar lista de combustíveis:", error);
      throw error;
    }
  },

  async fetchById(id) {
    try {
      const response = await fuelApi.get(id);
      const fuel = await response.json();

      if (!fuel) {
        throw new Error(`Combustível com ID ${id} não encontrado`);
      }

      return { success: true, data: fuel };
    } catch (error) {
      console.error(`Erro ao buscar combustível ${id}:`, error);
      throw error;
    }
  },
};

export default fuelService;