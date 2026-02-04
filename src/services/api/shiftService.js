import api from '../../config/api';

export const shiftService = {
  // Get my shifts
  getShifts: async () => {
    try {
      const response = await api.get('/shifts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener turnos' };
    }
  },

  // Get my swap requests
  getMySwapRequests: async () => {
    try {
      const response = await api.get('/shifts/swap-requests/my');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener solicitudes' };
    }
  },

  // Get available swap requests
  getAvailableSwapRequests: async () => {
    try {
      const response = await api.get('/shifts/swap-requests/available');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener solicitudes disponibles' };
    }
  },

  // Create swap request
  createSwapRequest: async (shiftId, reason) => {
    try {
      const response = await api.post('/shifts/swap-requests', { shiftId, reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear solicitud' };
    }
  },

  // Accept swap request
  acceptSwapRequest: async (requestId) => {
    try {
      const response = await api.put(`/shifts/swap-requests/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al aceptar solicitud' };
    }
  },

  // Reject swap request
  rejectSwapRequest: async (requestId) => {
    try {
      const response = await api.put(`/shifts/swap-requests/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al rechazar solicitud' };
    }
  },

  // Cancel swap request
  cancelSwapRequest: async (requestId) => {
    try {
      const response = await api.put(`/shifts/swap-requests/${requestId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al cancelar solicitud' };
    }
  }
};