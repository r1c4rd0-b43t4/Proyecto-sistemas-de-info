import React from 'react';
import BotonPrimario from './BotonPrimario';
import ImagenAvila from '../assets/Imagen_Avila.svg';
import Input from "./input_1"; 
import Underline from "../assets/underline_1.svg"

export default function Frame_1_Home() {
    return (
        <div className='relative w-screen h-screen flex pt-5'>
            <div className="flex justify-center items-center h-full w-1/2">
                <div className="flex justify-center items-center flex-col space-y-3">
                    <h1 className="text-4xl font-bold">
                        <span className="text-[#00796B]">Registrarse en </span><span className="text-[#D76411]">Unimetrail</span>
                    </h1>
                    <div>
                        <img src={Underline} alt="Underline" className=""/>
                    </div>
                    <div className='space-y-3 w-full'>
                    <Input titulo="Nombre" placeholder="Ingresa tu nombre"/>
                    <Input titulo="Apellido" placeholder="Ingresa tu apellido"/>
                    <Input titulo="Correo" placeholder="Ingresa tu correo unimet"/>
                    <Input titulo="Contraseña" placeholder="Ingresa tu contraseña"/>
                    <Input titulo="Repetir contraseña" placeholder="Ingresa tu contraseña nuevamente"/>
                    <Input titulo="Número celular" placeholder="0412111111"/>
                    </div>
                    <BotonPrimario text="Registrarse" className="mt-4 w-full"/> 
                    <p>
                        <span className="text-[#00796B]">¿Ya tienes una cuenta? </span><span className="text-[#005147]">Iniciar sesión</span>
                    </p>
                </div>
                <div>
                <img src={ImagenAvila} alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}
