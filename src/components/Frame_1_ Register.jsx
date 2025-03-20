import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';
import Input from "./Input_V1"; 
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../credentials.js";
import Loader from "../loader/Loader.jsx"
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import BotonGoogle from './BotonGoogle';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Frame_1_Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const isValidUnimetEmail = (email) => {
        return email.endsWith('@correo.unimet.edu.ve');
    };

    const checkEmailExists = async (email) => {
        const usersRef = collection(db, 'usuarios');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!email.includes('@')) {
            setError("Por favor ingresa un correo electrónico válido");
            return;
        }
        
        if (!isValidUnimetEmail(email)) {
            setError("Solo se permiten correos institucionales (@correo.unimet.edu.ve)");
            return;
        }

        try {        
            setLoading(true);
            
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                setError("¡Ups! Parece que ya tienes una cuenta registrada con este correo. ¿Por qué no intentas iniciar sesión? 😊");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
                email: email,
                role: 'cliente',
                createdAt: new Date().toISOString(),
                rutasCompradas: [],
                reseñas: []
            });
  
            setEmail("");
            setPassword("");    
            setName("");
            setLastName("");
            setPhone("");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                setError("¡Ups! Parece que ya tienes una cuenta registrada con este correo. ¿Por qué no intentas iniciar sesión? 😊");
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
            
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            
            if (!isValidUnimetEmail(result.user.email)) {
                await auth.signOut();
                await result.user.delete();
                setError("Solo se permiten correos institucionales (@correo.unimet.edu.ve). Por favor, utiliza tu correo UNIMET.");
                return;
            }

            const emailExists = await checkEmailExists(result.user.email);
            if (emailExists) {
                await auth.signOut();
                await result.user.delete();
                setError("¡Ups! Parece que ya tienes una cuenta registrada con este correo. ¿Por qué no intentas iniciar sesión? 😊");
                return;
            }

            await setDoc(doc(db, 'usuarios', result.user.uid), {
                email: result.user.email,
                role: 'cliente',
                createdAt: new Date().toISOString(),
                rutasCompradas: [],
                reseñas: []
            });
            
            navigate("/");
        } catch (error) {
            console.error("Error en registro con Google:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                setError("El registro fue cancelado");
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                setError("¡Ups! Parece que ya tienes una cuenta registrada con este correo. ¿Por qué no intentas iniciar sesión? 😊");
            } else {
                setError("Error al registrarse con Google. Por favor, intenta de nuevo.");
            }
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
                    
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                                <span className="text-[#00796B]">Registrarse en </span>
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
                                titulo="Nombre" 
                                placeholder="Ingresa tu nombre" 
                                type="text" 
                                name="nombre" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input 
                                titulo="Apellido" 
                                placeholder="Ingresa tu apellido" 
                                type="text" 
                                name="apellido" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Input 
                                titulo="Correo" 
                                placeholder="Ingresa tu correo unimet" 
                                type="email" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="relative">
                                <Input 
                                    titulo="Contraseña" 
                                    placeholder="Ingresa tu contraseña" 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <Input 
                                titulo="Número celular" 
                                placeholder="0412111111" 
                                type="tel" 
                                name="telefono" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4">
                            <BotonPrimario text="Registrarse" type="submit" className="w-full" to={false}/> 
                            <BotonGoogle
                                text="Registrarse con Google"
                                onClick={registerWithGoogle}
                                className="w-full"
                            />
                        </div>

                        <p className="text-center">
                            <span className="text-[#00796B]">¿Ya tienes una cuenta? </span>
                            <Link to="/login" className="text-[#005147] hover:underline">
                                Iniciar Sesión
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


