import { Navigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export function PublicRoute({ children }) {
  const { logged, loading, profile } = useContext(UserContext);
  
  console.log("PublicRoute: Estado actual", { logged, loading, userRole: profile?.role });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (logged) {
    // Si está autenticado, redirigir según el rol
    if (profile?.role === 'guia') {
      return <Navigate to="/guia/dashboard" />;
    } else if (profile?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }   
  }
  
  return children;
}

export function AdminRoute({ children }) {
  const { logged, loading, profile } = useContext(UserContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!logged) {
    return <Navigate to="/login" />;
  }
  
  if (profile?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return children;
}

export function GuiaRoute({ children }) {
  const { logged, loading, profile } = useContext(UserContext);
  
  console.log("GuiaRoute: Estado actual", { logged, loading, userRole: profile?.role });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!logged) {
    return <Navigate to="/login" />;
  }
  
  if (profile?.role !== 'guia') {
    return <Navigate to="/" />;
  }
  
  return children;
}

export function ClienteRoute({ children }) {
  const { logged, loading, profile } = useContext(UserContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!logged) {
    return <Navigate to="/login" />;
  }
  
  if (profile?.role !== 'cliente') {
    return <Navigate to="/" />;
  }
  
  return children;
} 