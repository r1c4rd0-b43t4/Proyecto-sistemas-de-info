import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../credentials";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Loader from "../loader/Loader";
const UserContext = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({});
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("UserContext: Iniciando observador de autenticación");
        const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
            console.log("UserContext: Estado de autenticación cambió", userConnected?.email);
            
            if (userConnected) {
                try {
                    console.log("UserContext: Obteniendo datos del usuario", userConnected.uid);
                    const userDoc = await getDoc(doc(db, 'usuarios', userConnected.uid));
                    const userData = userDoc.data();
                    console.log("UserContext: Datos del usuario obtenidos", userData);
                    
                    setUser(userConnected);
                    setProfile(userData || {});
                    setLogged(true);
                } catch (error) {
                    console.error("UserContext: Error al obtener datos del usuario", error);
                    setUser(null);
                    setProfile({});
                    setLogged(false);
                }
            } else {
                console.log("UserContext: Usuario no conectado");
                setUser(null);
                setProfile({});
                setLogged(false);
            }
            setLoading(false);
        });

        return () => {
            console.log("UserContext: Limpiando observador");
            unsubscribe();
        };
    }, []);

    const value = {
        user,
        setUser,
        profile,
        setProfile,
        logged,
        setLogged,
        loading
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };


