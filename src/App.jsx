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

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
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