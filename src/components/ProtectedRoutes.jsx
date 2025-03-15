import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function AdminRoute({ children }) {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (role !== 'admin') return <Navigate to="/" />;
  
  return children;
}

export function GuiaRoute({ children }) {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (role !== 'guia') return <Navigate to="/" />;
  
  return children;
}

export function ClienteRoute({ children }) {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (role !== 'cliente') return <Navigate to="/" />;
  
  return children;
} 