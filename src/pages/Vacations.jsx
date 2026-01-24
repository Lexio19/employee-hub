import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { vacationRequests } from '../data/mockData';
import { Calendar, Plus, CheckCircle, Clock, XCircle } from 'lucide-react';
import { differenceInDays } from 'date-fns';

export default function Vacations() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const userVacations = vacationRequests.filter(v => v.employeeId === user?.id);

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return differenceInDays(end, start) + 1;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDays();
    
    if (days > (user?.vacationDays - user?.usedVacationDays)) {
      alert('No tienes suficientes días de vacaciones disponibles');
      return;
    }

    alert(`Solicitud enviada: ${days} días desde ${startDate} hasta ${endDate}`);
    setShowForm(false);
    setStartDate('');
    setEndDate('');
    setReason('');
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
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
                {user?.vacationDays - user?.usedVacationDays}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Formulario de solicitud */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Nueva Solicitud de Vacaciones</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Total de días solicitados:</strong> {calculateDays()} días
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Te quedarían {(user?.vacationDays - user?.usedVacationDays) - calculateDays()} días disponibles
                </p>
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
                placeholder="Describe el motivo de tu solicitud..."
              />
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
                onClick={() => setShowForm(false)}
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
          {userVacations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tienes solicitudes de vacaciones aún
            </div>
          ) : (
            userVacations.map((vacation) => (
              <div key={vacation.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {new Date(vacation.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {new Date(vacation.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h3>
                      {getStatusBadge(vacation.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>{vacation.days} días</strong> • Solicitado el {new Date(vacation.createdAt).toLocaleDateString('es-ES')}
                    </p>
                    {vacation.reason && (
                      <p className="text-sm text-gray-600 mt-2">
                        Motivo: {vacation.reason}
                      </p>
                    )}
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