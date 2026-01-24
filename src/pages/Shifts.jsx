import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useShifts } from '../contexts/ShiftContext';
import { employees } from '../data/mockData';
import { Calendar, Clock, RefreshCw, Users, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function Shifts() {
  const { user } = useAuth();
  const { 
    getEmployeeShifts, 
    getEmployeeSwapRequests, 
    getAvailableSwapRequests,
    createSwapRequest,
    acceptSwapRequest,
    rejectSwapRequest,
    cancelSwapRequest
  } = useShifts();

  const [showSwapForm, setShowSwapForm] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [swapReason, setSwapReason] = useState('');
  const [notification, setNotification] = useState(null);

  const userShifts = getEmployeeShifts(user?.id);
  const userSwapRequests = getEmployeeSwapRequests(user?.id);
  const availableRequests = getAvailableSwapRequests(user?.id);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRequestSwap = (shift) => {
    setSelectedShift(shift);
    setShowSwapForm(true);
  };

  const handleSubmitSwap = (e) => {
    e.preventDefault();
    
    const result = createSwapRequest(selectedShift.id, user.id, swapReason);
    
    if (result.success) {
      showNotification('Solicitud de cambio enviada a todos los compañeros disponibles', 'success');
      setShowSwapForm(false);
      setSelectedShift(null);
      setSwapReason('');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleAcceptRequest = (requestId) => {
    const result = acceptSwapRequest(requestId, user.id);
    
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const handleRejectRequest = (requestId) => {
    rejectSwapRequest(requestId, user.id);
    showNotification('Has rechazado la solicitud', 'info');
  };

  const handleCancelRequest = (requestId) => {
    const result = cancelSwapRequest(requestId, user.id);
    
    if (result.success) {
      showNotification('Solicitud cancelada correctamente', 'success');
    } else {
      showNotification(result.error, 'error');
    }
  };

  const getShiftTypeColor = (type) => {
    const colors = {
      'Mañana': 'bg-yellow-100 text-yellow-800',
      'Tarde': 'bg-orange-100 text-orange-800',
      'Noche': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      pending: 'Pendiente',
      accepted: 'Aceptada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-4 lg:p-8 animate-fade-in">
      {/* Notificación */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 max-w-md ${
          notification.type === 'success' ? 'bg-green-50 border-green-200' :
          notification.type === 'error' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        } border rounded-lg shadow-lg p-4 animate-slide-up`}>
          <div className="flex items-center space-x-3">
            {notification.type === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
            {notification.type === 'error' && <XCircle className="w-6 h-6 text-red-600" />}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Turnos</h1>
        <p className="text-gray-600 mt-1">Consulta y gestiona tus turnos de trabajo</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Próximo Turno</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {userShifts[0] ? new Date(userShifts[0].date).toLocaleDateString('es-ES') : 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {userShifts[0]?.startTime} - {userShifts[0]?.endTime}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Turnos este Mes</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {userShifts.length}
              </p>
            </div>
            <Clock className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Solicitudes Activas</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {userSwapRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <RefreshCw className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Formulario de solicitud */}
      {showSwapForm && selectedShift && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-scale-in">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Solicitar Cambio de Turno
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Turno a cambiar:</strong> {new Date(selectedShift.date).toLocaleDateString('es-ES')} 
              {' '}de {selectedShift.startTime} a {selectedShift.endTime}
            </p>
          </div>

          <form onSubmit={handleSubmitSwap} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo del Cambio
              </label>
              <textarea
                value={swapReason}
                onChange={(e) => setSwapReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Explica por qué necesitas cambiar este turno..."
                required
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">¿Cómo funciona?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Tu solicitud estará visible para todos los compañeros</li>
                <li>Cualquier compañero puede aceptar el intercambio</li>
                <li>El primero en aceptar confirmará el cambio automáticamente</li>
                <li>Recibirás una notificación de confirmación</li>
              </ol>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Enviar Solicitud
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSwapForm(false);
                  setSelectedShift(null);
                  setSwapReason('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mis turnos */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Mis Próximos Turnos</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {userShifts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tienes turnos asignados
            </div>
          ) : (
            userShifts.map((shift) => (
              <div key={shift.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {new Date(shift.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </h3>
                      <p className="text-gray-600">
                        {shift.startTime} - {shift.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getShiftTypeColor(shift.type)}`}>
                      {shift.type}
                    </span>
                    <button
                      onClick={() => handleRequestSwap(shift)}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Solicitar Cambio</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mis solicitudes */}
      {userSwapRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Mis Solicitudes de Cambio</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {userSwapRequests.map((request) => (
              <div key={request.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Turno del {new Date(request.shiftDate).toLocaleDateString('es-ES')}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Horario: {request.shiftTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Motivo: {request.reason}
                    </p>
                    {request.targetEmployeeName && (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        ✓ Aceptado por: {request.targetEmployeeName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Solicitado el {new Date(request.createdAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>

                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solicitudes disponibles */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Solicitudes de Cambio Disponibles
          </h2>
          <Users className="w-5 h-5 text-gray-500" />
        </div>

        <div className="divide-y divide-gray-200">
          {availableRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay solicitudes de cambio disponibles en este momento
            </div>
          ) : (
            availableRequests.map((request) => {
              const employee = employees.find(e => e.id === request.requesterId);
              return (
                <div key={request.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={employee?.avatar} 
                        alt={employee?.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {request.requesterName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(request.shiftDate).toLocaleDateString('es-ES')} • {request.shiftTime}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>Motivo:</strong> {request.reason}
                        </p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getShiftTypeColor(request.shiftType)}`}>
                          {request.shiftType}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Aceptar</span>
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rechazar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}