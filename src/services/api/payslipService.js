import api from '../../config/api';

export const payslipService = {
  // Get all payslips
  getPayslips: async () => {
    try {
      const response = await api.get('/payslips');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener nóminas' };
    }
  },

  // Get single payslip
  getPayslip: async (id) => {
    try {
      const response = await api.get(`/payslips/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener nómina' };
    }
  }
};