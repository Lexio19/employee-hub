import { createContext, useContext, useState } from 'react';
import { shiftService } from '../services/api/shiftService';

const ShiftContext = createContext();

export const useShifts = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShifts debe usarse dentro de ShiftProvider');
  }
  return context;
};

export const ShiftProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);
  const [availableRequests, setAvailableRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar turnos
  const loadShifts = async () => {
    try {
      setLoading(true);
      const response = await shiftService.getShifts();
      if (response.success) {
        setShifts(response.data);
      }
    } catch (error) {
      console.error('Error loading shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar mis solicitudes
  const loadMySwapRequests = async () => {
    try {
      const response = await shiftService.getMySwapRequests();
      if (response.success) {
        setSwapRequests(response.data);
      }
    } catch (error) {
      console.error('Error loading swap requests:', error);
    }
  };

  // Cargar solicitudes disponibles
  const loadAvailableSwapRequests = async () => {
    try {
      const response = await shiftService.getAvailableSwapRequests();
      if (response.success) {
        setAvailableRequests(response.data);
      }
    } catch (error) {
      console.error('Error loading available requests:', error);
    }
  };

  // Crear solicitud de cambio
  const createSwapRequest = async (shiftId, reason) => {
    try {
      const response = await shiftService.createSwapRequest(shiftId, reason);
      if (response.success) {
        await loadMySwapRequests();
        return { success: true, request: response.data };
      }
      return { success: false, error: 'Error al crear solicitud' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al crear solicitud' 
      };
    }
  };

  // Aceptar solicitud
  const acceptSwapRequest = async (requestId) => {
    try {
      const response = await shiftService.acceptSwapRequest(requestId);
      if (response.success) {
        await loadShifts();
        await loadAvailableSwapRequests();
        return { 
          success: true, 
          message: response.message || 'Cambio de turno aceptado' 
        };
      }
      return { success: false, error: 'Error al aceptar solicitud' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al aceptar solicitud' 
      };
    }
  };

  // Rechazar solicitud
  const rejectSwapRequest = async (requestId) => {
    try {
      const response = await shiftService.rejectSwapRequest(requestId);
      if (response.success) {
        await loadAvailableSwapRequests();
        return { success: true };
      }
      return { success: false, error: 'Error al rechazar solicitud' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al rechazar solicitud' 
      };
    }
  };

  // Cancelar solicitud
  const cancelSwapRequest = async (requestId) => {
    try {
      const response = await shiftService.cancelSwapRequest(requestId);
      if (response.success) {
        await loadMySwapRequests();
        return { success: true };
      }
      return { success: false, error: 'Error al cancelar solicitud' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al cancelar solicitud' 
      };
    }
  };

  // Helpers para mantener compatibilidad
  const getEmployeeShifts = () => shifts;
  const getEmployeeSwapRequests = () => swapRequests;
  const getAvailableSwapRequests = () => availableRequests;

  const value = {
    shifts,
    swapRequests,
    availableRequests,
    loading,
    loadShifts,
    loadMySwapRequests,
    loadAvailableSwapRequests,
    createSwapRequest,
    acceptSwapRequest,
    rejectSwapRequest,
    cancelSwapRequest,
    getEmployeeShifts,
    getEmployeeSwapRequests,
    getAvailableSwapRequests
  };

  return <ShiftContext.Provider value={value}>{children}</ShiftContext.Provider>;
};