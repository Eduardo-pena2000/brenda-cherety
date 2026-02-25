import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div className="loading">Cargando...</div>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
}
