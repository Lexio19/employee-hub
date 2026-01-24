import { createContext, useContext, useState, useEffect } from 'react';
import { shifts as initialShifts, shiftSwapRequests as initialRequests, employees } from '../data/mockData';

const ShiftContext = createContext();

export const useShifts = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShifts debe usarse dentro de ShiftProvider');
  }
  return context;
};

export const ShiftProvider = ({ children }) => {
  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem('shifts');
    return saved ? JSON.parse(saved) : initialShifts;
  });

  const [swapRequests, setSwapRequests] = useState(() => {
    const saved = localStorage.getItem('swapRequests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('shifts', JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem('swapRequests', JSON.stringify(swapRequests));
  }, [swapRequests]);

  // Crear una solicitud de cambio de turno
  const createSwapRequest = (shiftId, requesterId, reason) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return { success: false, error: 'Turno no encontrado' };

    const requester = employees.find(e => e.id === requesterId);
    if (!requester) return { success: false, error: 'Empleado no encontrado' };

    const newRequest = {
      id: Date.now(),
      requesterId: requesterId,
      requesterName: requester.name,
      shiftId: shift.id,
      shiftDate: shift.date,
      shiftTime: `${shift.startTime} - ${shift.endTime}`,
      shiftType: shift.type,
      targetEmployeeId: null,
      targetEmployeeName: null,
      status: 'pending',
      reason: reason,
      createdAt: new Date().toISOString(),
      rejectedBy: [] // Array de IDs de empleados que rechazaron
    };

    setSwapRequests(prev => [...prev, newRequest]);
    return { success: true, request: newRequest };
  };

  // Aceptar una solicitud de cambio
  const acceptSwapRequest = (requestId, acceptorId) => {
    const request = swapRequests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Solicitud no encontrada' };

    if (request.status !== 'pending') {
      return { success: false, error: 'Esta solicitud ya no está disponible' };
    }

    const acceptor = employees.find(e => e.id === acceptorId);
    if (!acceptor) return { success: false, error: 'Empleado no encontrado' };

    // Encontrar un turno del aceptador en la misma fecha o cercana
    const acceptorShift = shifts.find(s => 
      s.employeeId === acceptorId && 
      new Date(s.date) >= new Date() &&
      s.id !== request.shiftId
    );

    // Actualizar la solicitud
    setSwapRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { 
            ...r, 
            status: 'accepted',
            targetEmployeeId: acceptorId,
            targetEmployeeName: acceptor.name,
            acceptedAt: new Date().toISOString()
          }
        : r
    ));

    // Intercambiar los turnos
    if (acceptorShift) {
      setShifts(prev => prev.map(shift => {
        if (shift.id === request.shiftId) {
          return { ...shift, employeeId: acceptorId };
        }
        if (shift.id === acceptorShift.id) {
          return { ...shift, employeeId: request.requesterId };
        }
        return shift;
      }));
    }

    return { 
      success: true, 
      message: `Cambio de turno confirmado con ${acceptor.name}` 
    };
  };

  // Rechazar una solicitud
  const rejectSwapRequest = (requestId, rejecterId) => {
    const request = swapRequests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Solicitud no encontrada' };

    // Añadir el ID del empleado que rechazó al array
    setSwapRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { 
            ...r, 
            rejectedBy: [...(r.rejectedBy || []), rejecterId]
          }
        : r
    ));

    return { success: true };
  };

  // Cancelar una solicitud propia
  const cancelSwapRequest = (requestId, userId) => {
    const request = swapRequests.find(r => r.id === requestId);
    if (!request) return { success: false, error: 'Solicitud no encontrada' };

    if (request.requesterId !== userId) {
      return { success: false, error: 'No puedes cancelar esta solicitud' };
    }

    if (request.status !== 'pending') {
      return { success: false, error: 'Solo puedes cancelar solicitudes pendientes' };
    }

    setSwapRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { ...r, status: 'cancelled', cancelledAt: new Date().toISOString() }
        : r
    ));

    return { success: true };
  };

  // Obtener turnos de un empleado
  const getEmployeeShifts = (employeeId) => {
    return shifts.filter(s => s.employeeId === employeeId);
  };

  // Obtener solicitudes del empleado
  const getEmployeeSwapRequests = (employeeId) => {
    return swapRequests.filter(r => r.requesterId === employeeId);
  };

  // Obtener solicitudes disponibles para un empleado (excluyendo las suyas y las que ya rechazó)
  const getAvailableSwapRequests = (employeeId) => {
    return swapRequests.filter(r => 
      r.requesterId !== employeeId && 
      r.status === 'pending' &&
      !(r.rejectedBy || []).includes(employeeId) // No mostrar las que ya rechazó
    );
  };

  const value = {
    shifts,
    swapRequests,
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