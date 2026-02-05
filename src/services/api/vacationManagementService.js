import api from '../../config/api';

export const vacationManagementService = {
  // Get all pending vacation requests (for managers)
  getAllPendingVacations: async () => {
    try {
      const response = await api.get('/vacations/management/pending');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener solicitudes' };
    }
  },

  // Update vacation status
  updateVacationStatus: async (id, status, rejectionReason = null) => {
    try {
      const response = await api.put(`/vacations/${id}/status`, {
        status,
        rejectionReason
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar estado' };
    }
  }
};