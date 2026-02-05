import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { vacationManagementService } from '../services/api/vacationManagementService';
import { Calendar, CheckCircle, XCircle, Clock, User, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function VacationManagement() {
  const { user } = useAuth();
  const [pendingVacations, setPendingVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadPendingVacations();
  }, []);

  const loadPendingVacations = async () => {
    try {
      setLoading(true);
      const response = await vacationManagementService.getAllPendingVacations();
      if (response.success) {
        setPendingVacations(response.data);
      }
    } catch (error) {
      showNotification('Error al cargar solicitudes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = async (vacationId) => {
    if (!window.confirm('¿Estás seguro de que quieres aprobar esta solicitud?')) {
      return;
    }

    try {
      const response = await vacationManagementService.updateVacationStatus(
        vacationId,
        'approved'
      );

      if (response.success) {
        showNotification('Solicitud aprobada correctamente', 'success');
        loadPendingVacations();
      }
    } catch (error) {
      showNotification(error.message || 'Error al aprobar solicitud', 'error');
    }
  };

  const handleReject = (vacation) => {
    setSelectedVacation(vacation);
    setShowRejectModal(true);
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      showNotification('Debes especificar un motivo de rechazo', 'error');
      return;
    }

    try {
      const response = await vacationManagementService.updateVacationStatus(
        selectedVacation._id,
        'rejected',
        rejectionReason
      );

      if (response.success) {
        showNotification('Solicitud rechazada', 'success');
        setShowRejectModal(false);
        setSelectedVacation(null);
        setRejectionReason('');
        loadPendingVacations();
      }
    } catch (error) {
      showNotification(error.message || 'Error al rechazar solicitud', 'error');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando solicitudes...</div>
      </div>
    );
  }

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

      {/* Modal de Rechazo */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rechazar Solicitud</h3>
            
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Empleado:</strong> {selectedVacation?.employee?.name}
              </p>
              <p className="text-sm text-red-800">
                <strong>Fechas:</strong> {format(new Date(selectedVacation?.startDate), 'd MMM', { locale: es })} - {format(new Date(selectedVacation?.endDate), 'd MMM yyyy', { locale: es })}
              </p>
              <p className="text-sm text-red-800">
                <strong>Días:</strong> {selectedVacation?.days}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo del Rechazo *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows="4"
                placeholder="Explica por qué se rechaza esta solicitud..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={submitRejection}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Rechazar
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedVacation(null);
                  setRejectionReason('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Vacaciones</h1>
        <p className="text-gray-600 mt-1">Aprobar o rechazar solicitudes de empleados</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Solicitudes Pendientes</p>
              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {pendingVacations.length}
              </p>
            </div>
            <Clock className="w-12 h-12 text-yellow-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Días Totales Solicitados</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {pendingVacations.reduce((sum, v) => sum + v.days, 0)}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Empleados Afectados</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">
                {new Set(pendingVacations.map(v => v.employee._id)).size}
              </p>
            </div>
            <User className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Lista de Solicitudes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Solicitudes Pendientes de Aprobación</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {pendingVacations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">¡Todo al día!</p>
              <p className="text-gray-600">No hay solicitudes pendientes de aprobación</p>
            </div>
          ) : (
            pendingVacations.map((vacation) => (
              <div key={vacation._id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4 flex-1">
                    <img 
                      src={vacation.employee.avatar} 
                      alt={vacation.employee.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {vacation.employee.name}
                        </h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {vacation.employee.position}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            <strong>Fechas:</strong> {format(new Date(vacation.startDate), 'd MMM', { locale: es })} - {format(new Date(vacation.endDate), 'd MMM yyyy', { locale: es })}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            <strong>Duración:</strong> {vacation.days} {vacation.days === 1 ? 'día' : 'días'}
                          </span>
                        </div>

                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            <strong>Días disponibles del empleado:</strong> {vacation.employee.vacationDays - vacation.employee.usedVacationDays} / {vacation.employee.vacationDays}
                          </span>
                        </div>

                        {vacation.reason && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-blue-800">
                              <strong>Motivo:</strong> {vacation.reason}
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                          Solicitado el {format(new Date(vacation.createdAt), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 lg:ml-4">
                    <button
                      onClick={() => handleApprove(vacation._id)}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Aprobar</span>
                    </button>
                    <button
                      onClick={() => handleReject(vacation)}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Rechazar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}