import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';
import ImagenAvila from '../assets/Imagen_Avila.svg';
import Input from "./Input_V1"; 
import Underline from "../assets/Underline_1.svg"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../../credentials.js";
import Caracas from "../assets/Caracas.svg";
const auth = getAuth(app);

export default function Frame_1_Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {        
            setLoading(true);
            const nombreRegistrado = await createUserWithEmailAndPassword(auth, email, password)
            console.log(nombreRegistrado.user.email)
            setEmail("");
            setPassword("");    
            setName("");
            setLastName("");
            setPhone("");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                setError("El correo ya está en uso");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative w-screen h-screen flex pt-5' >
            {loading && <div className="">Cargando...</div>}
            {error && <div className="">Error: {error}</div>}
            <div className="flex justify-center items-center h-full w-full lg:w-1/2 ">
                <div className="flex justify-center items-center flex-col space-y-3  ">
                    <form onSubmit={handleRegister} className="flex justify-center items-center flex-col space-y-5 pt-6 ">
                        <h1 className="md:text-4xl font-bold text-2xl">
                            <span className="text-[#00796B]">Registrarse en </span><span className="text-[#D76411]">Unimetrail</span>
                        </h1>
                        <div className="md:w-full w-1/2">
                            <img src={Underline} alt="Underline" className=""/>
                        </div>
                        <div className='space-y-4 md:w-full '>
                            <Input titulo="Nombre" placeholder="Ingresa tu nombre" type="text" name="nombre" value={name} onChange={(e) => setName(e.target.value)}/>
                            <Input titulo="Apellido" placeholder="Ingresa tu apellido" type="text" name="apellido" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            <Input titulo="Correo" placeholder="Ingresa tu correo unimet" type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input titulo="Contraseña" placeholder="Ingresa tu contraseña" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <Input titulo="Número celular" placeholder="0412111111" type="tel" name="telefono" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <BotonPrimario text="Registrarse" type="submit" className="mt-4 w-full" /> 
                    </form>
                    <p>
                        <span className="text-[#00796B]">¿Ya tienes una cuenta? </span><span className="text-[#005147]"><Link to="/login">Iniciar Sesión</Link></span>
                    </p>
                </div>
            </div>
            <div className="hidden md:block">
                <img src={ImagenAvila} alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
            </div>
            <div className="md:hidden absolute w-full flex justify-center items-center bottom-0 ">
                <img src={Caracas} alt="Avila Background" className="w-full h-auto object-contain" />
            </div>
        </div>
    );
}


