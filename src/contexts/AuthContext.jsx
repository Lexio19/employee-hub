import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🔐 Frontend: Intentando login...');
      const response = await authService.login(email, password);
      console.log('📥 Frontend: Respuesta recibida:', response);
      
      if (response.success && response.data) {
        const userData = response.data;
        console.log('✅ Frontend: Login exitoso, guardando usuario');
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      
      console.log('❌ Frontend: Login fallido - respuesta sin success');
      return { success: false, error: 'Error al iniciar sesión' };
    } catch (error) {
      console.error('❌ Frontend: Error en login:', error);
      return { 
        success: false, 
        error: error.message || 'Credenciales incorrectas' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};