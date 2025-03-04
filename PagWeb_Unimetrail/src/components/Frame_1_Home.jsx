import React from 'react'
import BotonPrimario from './BotonPrimario'
import ImagenAvila from '../assets/Imagen_Avila.png'

export default function Frame_1_Home() {
    return (
        <div className="flex justify-center items-center min-h-screen pl-10">
            <div className="container py-30 px-30 flex flex-row items-center">
                <div className="text-left w-1/2 mr-auto">
                    <p className=''>Descubre nuevas aventuras</p>
                    <h1 className="text-7xl font-bold mb-4 w-2/3">
                        <span style={{ color: '#00796B' }}>Bienvenido a</span> <span style={{ color: '#D76411' }}>Unimetrail</span>
                    </h1>
                    <p className="text-2sm mb-5 w-3/4">Para aquellos estudiantes de la Unimet que desean descubrir nuevas formas de reconectar con el senderismo.</p>
                    <BotonPrimario text='Explora'/>
                </div>
                <div className="w-1/2">
                    <img src={ImagenAvila} className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}
