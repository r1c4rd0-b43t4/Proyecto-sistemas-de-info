import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';
import Input from "./Input_V1"; 
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../credentials.js";
import Loader from "../loader/Loader.jsx"
import { getFirestore } from 'firebase/firestore';
import BotonGoogle from './BotonGoogle';
import { doc, getDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Frame_1_Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {        
            setLoading(true);
            const user = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, 'usuarios', user.user.uid);
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.role === "guia") {
                    navigate("/guia/dashboard");
                } else if (userData.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            if (error.code === "Firebase: Error (auth/invalid-credential).") {
                setError("Credenciales inválidas");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const registerWithGoogle = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'usuarios', result.user.uid);
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.role === "guia") {
                    navigate("/guia/dashboard");
                } else if (userData.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        } catch (error) {
            setError("Error al iniciar sesión con Google");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex flex-col lg:flex-row relative pt-16 lg:pt-0'>
            {loading && <Loader/>}

            <div className="flex-1 flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
                <div className="w-full max-w-md space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                            Error: {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                                <span className="text-[#00796B]">Iniciar sesión en </span>
                                <span className="text-[#D76411]">Unimetrail</span>
                            </h1>
                            <div className='w-full max-w-xs mx-auto mt-2'>
                                <img 
                                    src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Underline_1.svg" 
                                    alt="Underline" 
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <Input 
                                titulo="Correo" 
                                placeholder="Ingresa tu correo unimet" 
                                type="email" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input 
                                titulo="Contraseña" 
                                placeholder="Ingresa tu contraseña" 
                                type="password" 
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4">
                            <BotonPrimario text="Iniciar sesión" type="submit" className="w-full" />
                            <BotonGoogle
                                text="Iniciar sesión con Google"
                                onClick={registerWithGoogle}
                                className="w-full"
                            />
                        </div>

                        <p className="text-center">
                            <span className="text-[#00796B]">¿No tienes una cuenta? </span>
                            <Link to="/register" className="text-[#005147] hover:underline">
                                Registrarse
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className='hidden lg:block lg:w-1/2 relative'>
                <img 
                    src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" 
                    alt="Fondo montaña" 
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="sm:hidden fixed bottom-0 left-0 right-0">
                <img 
                    src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Caracas.svg" 
                    alt="Avila Background" 
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}

