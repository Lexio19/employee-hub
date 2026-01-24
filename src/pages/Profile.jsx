import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Briefcase, Calendar, MapPin, Phone } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
        <p className="text-gray-600 mt-1">Información personal y datos de empleo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tarjeta de perfil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600 mt-1">{user?.position}</p>
              <p className="text-sm text-gray-500 mt-1">{user?.department}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{user?.vacationDays}</p>
                    <p className="text-xs text-gray-600">Días Vacaciones</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-xs text-gray-600">Años Empresa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Información Personal</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-semibold text-gray-800">+34 600 123 456</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Ubicación</p>
                  <p className="font-semibold text-gray-800">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Información Laboral</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Puesto</p>
                  <p className="font-semibold text-gray-800">{user?.position}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Departamento</p>
                  <p className="font-semibold text-gray-800">{user?.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Fecha de Contratación</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(user?.hireDate).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Editar Perfil
              </button>
              <button className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}