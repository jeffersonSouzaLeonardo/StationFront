/**
 * Service para gerenciar operações de Combustível (Fuel)
 * Responsável por fazer requisições para a API de combustíveis
 */

import fuelApi from './api/fuelApi';

const fuelService = {
  getAll: async function() {
    try {
      const data = await fuelApi.getAll();
      return { success: true, data };
    } catch (error) {
      throw error;
    }
  },

  delete: async function(id) {
    try {
      const res = await fuelApi.delete(id);
      return res;
    } catch (error) {
      console.error(`Erro no service ao excluir combustível ${id}:`, error);
      throw error;
    }
  },

  constructionRows: function(fuels = [], codigo = '') {
    if (!Array.isArray(fuels)) return [];

    return fuels.map((f, idx) => {
      return {
        id: (f && f.id) != null ? f.id : (idx != null ? idx : codigo || ''),
        name:
          (f && (f.name || f.nome || f.description || f.descricao || f.label)) || '',
        unit: (f && (f.unit || f.unidade)) || '',
        status: (f && (f.status || f.state)) || '',
        idAnp: (f && (f.idAnp || f.anp || f.id_anp)) || '',
      };
    });
  },

  fetchById: async function(id) {
    try {
      const data = await fuelApi.getById(id);
      if (data == null) {
        throw new Error(`Combustível com ID ${id} não encontrado`);
      }

      const payload = (typeof data === 'object' && 'data' in data) ? data.data : data;
      if (payload == null) {
        throw new Error(`Combustível com ID ${id} não encontrado`);
      }

      return { success: true, data: payload };
    } catch (error) {
      console.error(`Erro ao buscar combustível ${id}:`, error);
      throw error;
    }
  },

  fetchByDescription: async function(description) {
    try {
      const data = await fuelApi.getDescriptions(description);

      if (data == null) {
        throw new Error(`Combustível com descrição ${description} não encontrado`);
      }

      const payload = (typeof data === 'object' && 'data' in data) ? data.data : data;
      if (payload == null) {
        throw new Error(`Combustível com descrição ${description} não encontrado`);
      }

      return { success: true, data: payload };
    } catch (error) {
      throw error;
    }
  },
};

export default fuelService;