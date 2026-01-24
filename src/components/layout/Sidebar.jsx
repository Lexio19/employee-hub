import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Plane, RefreshCw, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/payslips', icon: FileText, label: 'Nóminas' },
    { path: '/vacations', icon: Plane, label: 'Vacaciones' },
    { path: '/shifts', icon: RefreshCw, label: 'Turnos' },
    { path: '/profile', icon: User, label: 'Mi Perfil' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Cerrar sidebar en móvil después de navegar
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gray-900 min-h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo y usuario */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-4">EmployeeHub</h1>
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.position}
              </p>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
}