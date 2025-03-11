import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';
import Input from "./Input_V1"; 
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../credentials.js";
import Loader from "../loader/Loader.jsx"
import { getFirestore } from 'firebase/firestore';
const auth = getAuth(app);

export default function Frame_1_Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {        
            setLoading(true);
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user.user.uid)
            console.log(user.user.email)
            navigate("/")

        } catch (error) {
            console.log(error)
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
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user)
            navigate("/")
            
        } catch (error) {
            
        }
    }

    return (
        <div className='relative w-screen h-screen flex pt-5'>
            {loading && <Loader/>}

            <div className="flex justify-center items-center h-full w-full lg:w-1/2">
                <div className="flex justify-center items-center flex-col space-y-8">
                    {error && <div className="text-black">Error: {error}</div>}
                    <form onSubmit={handleLogin} className="flex justify-center items-center flex-col space-y-8">
                        <h1 className="md:text-4xl font-bold text-2xl">
                            <span className="text-[#00796B]">Iniciar sesión en </span><span className="text-[#D76411]">Unimetrail</span>
                        </h1>
                        <div className='md:w-full w-1/2'>
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Underline_1.svg" alt="Underline" className=""/>
                        </div>
                        <div className='space-y-4 md:w-full'>
                            <Input titulo="Correo" placeholder="Ingresa tu correo unimet" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input titulo="Contraseña" placeholder="Ingresa tu contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <BotonPrimario text="Iniciar sesión" type="submit" className="mt-4 w-full"/> 
                        
                    </form>

                    <button onClick={registerWithGoogle} >Iniciar Sesión con google</button>
                    <p>
                        <span className="text-[#00796B]">¿No tienes una cuenta? </span><span className="text-[#005147]"><Link to="/register">Registrarse </Link></span>
                    </p>
                </div>
                <div className='hidden md:block'>
                    <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
                </div>
                <div className="md:hidden absolute w-full flex justify-center items-center bottom-0 ">
                    <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Caracas.svg" alt="Avila Background" className="w-full h-auto object-contain" />
                </div>
            </div>
        </div>
    )
}

