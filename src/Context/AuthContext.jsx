import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';


export const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('esclavo de la qk pero no de quien la porta', user);
        // Obtener datos adicionales del usuario de Firestore
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        const userData = userDoc.data();
        
        setUser(user);
        setRole(userData?.role || 'cliente');
        
        // Redirección basada en rol solo en la ruta /login

        if (window.location.pathname === '/login') {
          if (userData?.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (userData?.role === 'guia') {
            navigate('/guia/dashboard');
          } else {
            // Si es cliente, simplemente navega al home
            navigate('/');
          }
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    loading
  };

  return (
    <AuthContext value={value}>
      {!loading && children}
    </AuthContext>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}; 