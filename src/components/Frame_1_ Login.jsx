import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';
import ImagenAvila from '../assets/Imagen_Avila.svg';
import Input from "./Input_V1"; 
import Underline from "../assets/Underline_1.svg"

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../../credentials.js" 
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

    return (
        <div className='relative w-screen h-screen flex pt-5'>
            {loading && <div className="">Cargando...</div>}
            {error && <div className="">Error: {error}</div>}
            <div className="flex justify-center items-center h-full w-1/2">
                <div className="flex justify-center items-center flex-col space-y-8">
                    <form onSubmit={handleLogin} className="flex justify-center items-center flex-col space-y-8">
                        <h1 className="text-4xl font-bold">
                            <span className="text-[#00796B]">Iniciar sesión en </span><span className="text-[#D76411]">Unimetrail</span>
                        </h1>
                        <div>
                            <img src={Underline} alt="Underline" className=""/>
                        </div>
                        <div className='space-y-3 w-full'>
                            <Input titulo="Correo" placeholder="Ingresa tu correo unimet" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input titulo="Contraseña" placeholder="Ingresa tu contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <BotonPrimario text="Iniciar sesión" type="submit" className="mt-4 w-full"/> 
                    </form>
                    <p>
                        <span className="text-[#00796B]">¿No tienes una cuenta? </span><span className="text-[#005147]"><Link to="/register">Registrarse </Link></span>
                    </p>
                </div>
                <div>
                <img src={ImagenAvila} alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}
