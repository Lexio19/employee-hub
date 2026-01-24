import { useAuth } from '../contexts/AuthContext';
import { Calendar, DollarSign, Clock, FileText, Plane, RefreshCw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Bienvenido, {user?.name}
        </h2>
        <p className="text-gray-600 mt-1">{user?.position} - {user?.department}</p>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Días de Vacaciones</p>
              <p className="text-3xl font-bold text-blue-600">
                {user?.vacationDays - user?.usedVacationDays}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                de {user?.vacationDays} disponibles
              </p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Última Nómina</p>
              <p className="text-3xl font-bold text-green-600">2.650€</p>
              <p className="text-xs text-gray-500 mt-1">Diciembre 2025</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Próximo Turno</p>
              <p className="text-3xl font-bold text-purple-600">20 Ene</p>
              <p className="text-xs text-gray-500 mt-1">09:00 - 17:00</p>
            </div>
            <Clock className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/payslips')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition" />
            <p className="font-semibold text-gray-800">Ver Nóminas</p>
            <p className="text-sm text-gray-600 mt-1">Consulta tus recibos</p>
          </button>

          <button 
            onClick={() => navigate('/vacations')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition group"
          >
            <Plane className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition" />
            <p className="font-semibold text-gray-800">Solicitar Vacaciones</p>
            <p className="text-sm text-gray-600 mt-1">Planifica tu descanso</p>
          </button>

          <button 
            onClick={() => navigate('/shifts')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition group"
          >
            <RefreshCw className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
            <p className="font-semibold text-gray-800">Cambio de Turno</p>
            <p className="text-sm text-gray-600 mt-1">Gestiona tu horario</p>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition group"
          >
            <TrendingUp className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition" />
            <p className="font-semibold text-gray-800">Mi Perfil</p>
            <p className="text-sm text-gray-600 mt-1">Actualiza tus datos</p>
          </button>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Nómina de Diciembre procesada</p>
              <p className="text-sm text-gray-600">31 de Diciembre, 2025</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Vacaciones aprobadas</p>
              <p className="text-sm text-gray-600">10 de Febrero - 14 de Febrero, 2026</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-lg">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Solicitud de cambio de turno pendiente</p>
              <p className="text-sm text-gray-600">20 de Enero, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}