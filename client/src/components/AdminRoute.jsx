import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="loading">Cargando...</div>;
  if (!user || !isAdmin) return <Navigate to="/" />;
  return <Outlet />;
}
