/**
 * Service para gerenciar operações de Combustível (Fuel)
 * Responsável por fazer requisições para a API de combustíveis
 */

import { Construction } from '@mui/icons-material';
import fuelApi from './api/fuel-get-all';

const fuelService = {

  async getAll() {
    try {
      const data = await fuelApi.getAll();
      return { success: true, data };
    } catch (error) {
      throw error;
    }
  },

  constructionRows(fuels = [], codigo = '') {
    const rows = Array.isArray(fuels)
      ? fuels.map((f, idx) => ({
          id: f.id ?? idx ?? codigo ?? '',
          name: f.name ?? f.nome ?? f.description ?? f.descricao ?? f.label ?? '',
          unit: f.unit ?? f.unidade ?? '',
          status: f.status ?? f.state ?? '',
          idAnp: f.idAnp ?? f.anp ?? f.id_anp ?? '',
        }))
      : [];

    return rows;

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