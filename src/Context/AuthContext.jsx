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
        
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        const userData = userDoc.data();
        
        setUser(user);
        setRole(userData?.role || 'cliente');
        
        
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          if (userData?.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (userData?.role === 'guia') {
            navigate('/guia/dashboard');
          } else {
            navigate('/');
          }
        } else if (window.location.pathname === '/' && userData?.role === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate, db]);

  const value = {
    user,
    role,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}; 