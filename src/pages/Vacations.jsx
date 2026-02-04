import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { vacationService } from '../services/api/vacationService';
import { Calendar, Plus, CheckCircle, Clock, XCircle, Trash2, AlertCircle } from 'lucide-react';
import { differenceInDays, format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Vacations() {
  const { user } = useAuth();
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);

  // Fecha mínima: mañana
  const minDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    try {
      setLoading(true);
      const response = await vacationService.getVacations();
      if (response.success) {
        setVacations(response.data);
      }
    } catch (error) {
      console.error('Error loading vacations:', error);
      showNotification('Error al cargar vacaciones', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start) + 1;
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const validateDates = () => {
    const days = calculateDays();
    const availableDays = user?.vacationDays - user?.usedVacationDays;
    const errors = [];

    if (!startDate || !endDate) {
      return { valid: false, errors: ['Debes seleccionar ambas fechas'] };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      errors.push('No puedes solicitar vacaciones en fechas pasadas');
    }

    if (end < start) {
      errors.push('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    if (days > availableDays) {
      errors.push(`No tienes suficientes días disponibles (tienes ${availableDays}, solicitas ${days})`);
    }

    if (days > 30) {
      errors.push('No puedes solicitar más de 30 días consecutivos');
    }

    if (days < 1) {
      errors.push('Debes solicitar al menos 1 día');
    }

    return { valid: errors.length === 0, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateDates();
    if (!validation.valid) {
      showNotification(validation.errors[0], 'error');
      return;
    }

    const days = calculateDays();

    try {
      const response = await vacationService.createVacation({
        startDate,
        endDate,
        days,
        reason
      });

      if (response.success) {
        showNotification(`Solicitud enviada: ${days} días de vacaciones`, 'success');
        setShowForm(false);
        setStartDate('');
        setEndDate('');
        setReason('');
        loadVacations();
      }
    } catch (error) {
      showNotification(error.message || 'Error al crear la solicitud', 'error');
    }
  };

  const handleDelete = async (vacationId) => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta solicitud?')) {
      return;
    }

    try {
      await vacationService.deleteVacation(vacationId);
      showNotification('Solicitud cancelada correctamente', 'success');
      loadVacations();
    } catch (error) {
      showNotification(error.message || 'Error al cancelar la solicitud', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };

    const labels = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada'
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {icons[status]}
        <span>{labels[status]}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando vacaciones...</div>
      </div>
    );
  }

  const days = calculateDays();
  const availableDays = user?.vacationDays - user?.usedVacationDays;
  const validation = validateDates();

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

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Vacaciones</h1>
          <p className="text-gray-600 mt-1">Gestiona tus días de descanso</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Solicitud</span>
        </button>
      </div>

      {/* Resumen de vacaciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Días Totales</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {user?.vacationDays}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Días Usados</p>
              <p className="text-4xl font-bold text-orange-600 mt-2">
                {user?.usedVacationDays}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-orange-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Días Disponibles</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {availableDays}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Formulario de solicitud */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-scale-in">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Nueva Solicitud de Vacaciones</h2>
          
          {/* Alerta de información */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Normas de solicitud de vacaciones:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>No puedes solicitar fechas pasadas</li>
                  <li>Máximo 30 días consecutivos por solicitud</li>
                  <li>Las solicitudes están sujetas a aprobación</li>
                  <li>Tienes {availableDays} días disponibles este año</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || minDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Cálculo de días y validación */}
            {startDate && endDate && (
              <div className={`border rounded-lg p-4 ${
                validation.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {validation.valid ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${validation.valid ? 'text-green-800' : 'text-red-800'}`}>
                      <strong>Total de días solicitados:</strong> {days} {days === 1 ? 'día' : 'días'}
                    </p>
                    {validation.valid ? (
                      <p className="text-green-700 text-sm mt-1">
                        Te quedarían {availableDays - days} días disponibles
                      </p>
                    ) : (
                      <div className="mt-2 space-y-1">
                        {validation.errors.map((error, index) => (
                          <p key={index} className="text-red-700 text-sm">• {error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo (opcional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                maxLength="500"
                placeholder="Describe el motivo de tu solicitud... (máx. 500 caracteres)"
              />
              <p className="text-xs text-gray-500 mt-1">{reason.length}/500 caracteres</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={!validation.valid}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Solicitud
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setStartDate('');
                  setEndDate('');
                  setReason('');
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Historial de solicitudes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Historial de Solicitudes</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {vacations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tienes solicitudes de vacaciones aún
            </div>
          ) : (
            vacations.map((vacation) => (
              <div key={vacation._id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {format(new Date(vacation.startDate), 'd MMMM', { locale: es })} - {format(new Date(vacation.endDate), 'd MMMM yyyy', { locale: es })}
                      </h3>
                      {getStatusBadge(vacation.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>{vacation.days} {vacation.days === 1 ? 'día' : 'días'}</strong> • Solicitado el {format(new Date(vacation.createdAt), 'd MMMM yyyy', { locale: es })}
                    </p>
                    {vacation.reason && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Motivo:</strong> {vacation.reason}
                      </p>
                    )}
                    {vacation.status === 'rejected' && vacation.rejectionReason && (
                      <p className="text-sm text-red-600 mt-2">
                        <strong>Motivo de rechazo:</strong> {vacation.rejectionReason}
                      </p>
                    )}
                  </div>

                  {vacation.status === 'pending' && (
                    <button
                      onClick={() => handleDelete(vacation._id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}