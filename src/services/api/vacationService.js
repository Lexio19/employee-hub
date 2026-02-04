import api from '../../config/api';

export const vacationService = {
  // Get all vacations
  getVacations: async () => {
    try {
      const response = await api.get('/vacations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener vacaciones' };
    }
  },

  // Create vacation request
  createVacation: async (vacationData) => {
    try {
      const response = await api.post('/vacations', vacationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear solicitud' };
    }
  },

  // Delete vacation request
  deleteVacation: async (id) => {
    try {
      const response = await api.delete(`/vacations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al cancelar solicitud' };
    }
  }
};