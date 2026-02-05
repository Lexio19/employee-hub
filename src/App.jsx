import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ShiftProvider } from './contexts/ShiftContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Payslips from './pages/Payslips';
import Vacations from './pages/Vacations';
import Shifts from './pages/Shifts';
import Profile from './pages/Profile';
import VacationManagement from './pages/VacationManagement';

function PrivateRoute({ children, requireManager = false }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireManager && user?.role !== 'manager' && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <AuthProvider>
      <ShiftProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/payslips"
              element={
                <PrivateRoute>
                  <Payslips />
                </PrivateRoute>
              }
            />
            <Route
              path="/vacations"
              element={
                <PrivateRoute>
                  <Vacations />
                </PrivateRoute>
              }
            />
            <Route
              path="/vacation-management"
              element={
                <PrivateRoute requireManager={true}>
                  <VacationManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/shifts"
              element={
                <PrivateRoute>
                  <Shifts />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </ShiftProvider>
    </AuthProvider>
  );
}

export default App;