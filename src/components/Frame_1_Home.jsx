import React from 'react';
import BotonPrimario from './BotonPrimario';
import './Animations.css';

export default function Frame_1_Home() {
    return (
        <div className='relative w-screen h-screen flex flex-col md:flex-row items-center justify-center md:justify-start'>
            <div className="relative z-10 md:w-1/2 p-10 text-center md:text-left">
                <p className='text-[#2A8F84] mb-2 text-base md:text-lg'>Descubre nuevas aventuras</p>
                <h1 className="text-6xl md:text-8xl font-bold mb-4">
                    <span style={{ color: '#00796B' }}>Bienvenido a</span> <span style={{ color: '#D76411' }}>Unimetrail</span>
                </h1>
                <p className="text-lg md:text-xl text-[#2A8F84] mb-5">Para aquellos estudiantes de la Unimet que desean descubrir nuevas formas de reconectar con el senderismo.</p>
                <BotonPrimario text="Descubre"/>
            </div>
            
            {/* Avila de fondo cuando son dispositivos medianos o pequenos */}
            <div className="absolute inset-0 w-full h-full md:hidden">
                <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" className="w-full h-full object-cover opacity-30" alt="Fondo Avila" />
            </div>
            <div className="hidden md:block md:absolute md:bottom-0 md:right-0 md:w-1/2 md:h-full">
                <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" className="w-full h-full object-cover" alt="Imagen Avila"/>
            </div>
            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Location_F1.svg" className="hidden md:block absolute bottom-0 right-0 p-7" alt="Ubicación"/>
            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//DesignAsset_F1.svg" className="hidden md:block absolute w-1/2 animate-fade-in-out justify-center right-0 h-1/2 bottom-60" alt="Diseño"/> 
            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Avila.svg" className="hidden md:block absolute bottom-0 left-0 w-auto h-auto" alt="Fondo Avila"/>
        </div>
    )
}
