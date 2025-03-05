import React from 'react'
import BgTarjeta from '../assets/BgTarjeta-F2.png'
import BotonPrimario from './BotonPrimario'
import path from "../assets/Path_F2_Home.svg"

export default function Frame_2_Home() {
  return (
    <div className='w-screen bg-[#00796B] text-white'>
      <div className='p-40 flex flex-col justify-center items-center h-full w-screen gap-5'>
        <div className='bg-cover rounded-2xl bg-bottom w-full h-auto flex flex-col justify-center items-center p-5' style={{ backgroundImage: `url(${BgTarjeta})`, minHeight: '400px' }}>
          <div className='p-10'>
            <p className='mb-5 text-lg'>Descubre nuevas aventuras</p>
              <h1 className='mb-5 font-bold text-6xl tracking-tight leading-normal'>
                <span>Inolvidables rutas del Ávila que recordarás siempre</span> <span className='bg-[#D76411] rounded-2xl px-3'>Unimetano</span>
              </h1>
            <p className='mb-5 text-lg'>La plataforma se dedica a facilitar a los estudiantes de la Universidad Metropolitana una manera de aventurarse por el Ávila de forma segura con guías preparados.</p>
            <div className='w-full h-auto flex justify-end'>
              <BotonPrimario text='Descubre' />
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='flex gap-5 w-full justify-center'>
            <div className='p-6 bg-[#005147] rounded-lg flex-grow'>
              <img src={path} alt="fondo" sizes='80px' className='mb-5' />
              <p className='font-bold mb-5'>Rutas seguras y clasificadas</p>
              <p className='font-bold mb-5'>Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada</p>
            </div>
            <div className='p-6 bg-[#005147] rounded-lg flex-grow'>
              <img src={path} alt="fondo" sizes='80px' className='mb-5' />
              <p className='font-bold mb-5'>Rutas seguras y clasificadas</p>
              <p className='font-bold mb-5'>Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada</p>
            </div>
            <div className='p-6 bg-[#005147] rounded-lg flex-grow'>
              <img src={path} alt="fondo" sizes='80px' className='mb-5' />
              <p className='font-bold mb-5'>Rutas seguras y clasificadas</p>
              <p className='font-bold mb-5'>Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada</p>
            </div>
            <div className='p-6 bg-[#005147] rounded-lg flex-grow'>
              <img src={path} alt="fondo" sizes='80px' className='mb-5' />
              <p className='font-bold mb-5'>Rutas seguras y clasificadas</p>
              <p className='font-bold mb-5'>Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
