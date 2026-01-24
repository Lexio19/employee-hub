import { useAuth } from '../contexts/AuthContext';
import { Calendar, DollarSign, Clock, FileText, Plane, RefreshCw, TrendingUp, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="p-4 lg:p-8 animate-fade-in">
      {/* Header mejorado */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Bienvenido, {user?.name} 👋
          </h2>
          <p className="text-gray-600 mt-1">{user?.position} - {user?.department}</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover-lift">
            <Bell className="w-5 h-5" />
            <span>Ver Notificaciones</span>
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
          </button>
        </div>
      </div>

      {/* Cards de resumen con animación */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover-lift animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Días de Vacaciones</p>
              <p className="text-4xl font-bold">
                {user?.vacationDays - user?.usedVacationDays}
              </p>
              <p className="text-xs opacity-80 mt-1">
                de {user?.vacationDays} disponibles
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Última Nómina</p>
              <p className="text-4xl font-bold">2.650€</p>
              <p className="text-xs opacity-80 mt-1">Diciembre 2025</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Próximo Turno</p>
              <p className="text-4xl font-bold">20 Ene</p>
              <p className="text-xs opacity-80 mt-1">09:00 - 17:00</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Clock className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas mejoradas */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-1 h-6 bg-blue-600 rounded mr-3"></span>
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/payslips')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group hover-lift"
          >
            <FileText className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-gray-800 text-left">Ver Nóminas</p>
            <p className="text-sm text-gray-600 mt-1 text-left">Consulta tus recibos</p>
          </button>

          <button 
            onClick={() => navigate('/vacations')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition group hover-lift"
          >
            <Plane className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-gray-800 text-left">Solicitar Vacaciones</p>
            <p className="text-sm text-gray-600 mt-1 text-left">Planifica tu descanso</p>
          </button>

          <button 
            onClick={() => navigate('/shifts')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition group hover-lift"
          >
            <RefreshCw className="w-10 h-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-gray-800 text-left">Cambio de Turno</p>
            <p className="text-sm text-gray-600 mt-1 text-left">Gestiona tu horario</p>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition group hover-lift"
          >
            <TrendingUp className="w-10 h-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-gray-800 text-left">Mi Perfil</p>
            <p className="text-sm text-gray-600 mt-1 text-left">Actualiza tus datos</p>
          </button>
        </div>
      </div>

      {/* Actividad reciente mejorada */}
      <div className="bg-white rounded-xl shadow-md p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="w-1 h-6 bg-blue-600 rounded mr-3"></span>
            Actividad Reciente
          </h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todo
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-lg border-l-4 border-green-500 hover-lift">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Nómina de Diciembre procesada</p>
              <p className="text-sm text-gray-600">31 de Diciembre, 2025</p>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
              Completado
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border-l-4 border-blue-500 hover-lift">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Vacaciones aprobadas</p>
              <p className="text-sm text-gray-600">10 de Febrero - 14 de Febrero, 2026</p>
            </div>
            <span className="text-xs text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
              Aprobado
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-transparent rounded-lg border-l-4 border-yellow-500 hover-lift">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <RefreshCw className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Solicitud de cambio de turno</p>
              <p className="text-sm text-gray-600">20 de Enero, 2026</p>
            </div>
            <span className="text-xs text-yellow-600 font-medium bg-yellow-100 px-3 py-1 rounded-full">
              Pendiente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}