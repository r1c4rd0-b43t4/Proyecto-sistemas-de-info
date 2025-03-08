import React from 'react';
import BotonPrimario from './BotonPrimario';
import ImagenAvila from '../assets/Imagen_Avila.svg';
import Input from "./input_1"; 
import Underline from "../assets/underline_1.svg"

export default function Frame_1_Home() {
    return (
        <div className='relative w-screen h-screen flex pt-5'>
            <div className="flex justify-center items-center h-full w-1/2">
                <div className="flex justify-center items-center flex-col space-y-8">
                    <h1 className="text-4xl font-bold">
                        <span className="text-[#00796B]">Iniciar sesión en </span><span className="text-[#D76411]">Unimetrail</span>
                    </h1>
                    <div>
                        <img src={Underline} alt="Underline" className=""/>
                    </div>
                    <div className='space-y-3 w-full'>
                    <Input titulo="Correo" placeholder="Ingresa tu correo unimet"/>
                    <Input titulo="Contraseña" placeholder="Ingresa tu contraseña"/>
                    </div>
                    <BotonPrimario text="Iniciar sesión" className="mt-4 w-full"/> 
                    <p>
                        <span className="text-[#00796B]">¿No tienes una cuenta? </span><span className="text-[#005147]">Registrarse</span>
                    </p>
                </div>
                <div>
                <img src={ImagenAvila} alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}
