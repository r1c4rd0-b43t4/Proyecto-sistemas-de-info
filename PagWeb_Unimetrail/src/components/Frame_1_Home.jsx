import React from 'react';
import BotonPrimario from './BotonPrimario';
import ImagenAvila from '../assets/Imagen_Avila.png';
import Avilabg from "../assets/avila_bg_f1_h.svg";

export default function Frame_1_Home() {
    return (
        <div className='relative w-screen h-250'>
            <div className="justify-start items-center h-full w-full flex">
                <div className="px-20 py-10">
                    <p className='text-[#2A8F84] mb-2'>Descubre nuevas aventuras</p>
                    <h1 className="text-6xl font-bold mb-4">
                        <span style={{ color: '#00796B' }}>Bienvenido a</span> <span style={{ color: '#D76411' }}>Unimetrail</span>
                    </h1>
                    <p className="text-sm text-[#2A8F84] mb-5">Para aquellos estudiantes de la Unimet que desean descubrir nuevas formas de reconectar con el senderismo.</p>
                    <BotonPrimario text="Descubre"/>
                </div>
            </div>
            <img src={ImagenAvila} className="absolute bottom-0 right-0 w-1/2 h-full object-cover" />
            <img src={Avilabg} className="absolute bottom-0 left-0 w-auto h-auto opacity-50" />
        </div>
    )
}
