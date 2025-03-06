import React from 'react';
import BgTarjeta from '../assets/BgTarjeta-F2.png';
import BotonPrimario from './BotonPrimario';
import path from "../assets/Path_F2_Home.svg";
import Signpost from "../assets/Signpost_F2_Home.svg";
import Tipi from "../assets/Tipi_F2_Home.svg";
import FourUsers from "../assets/UsersFour_F2_Home.svg";

export default function Frame_2_Home() {
  return (
    <div className='w-screen bg-[#00796B] text-white'>
      <div className='p-40 flex flex-col justify-center items-center h-full w-screen gap-5'>
        <div className='bg-cover rounded-2xl bg-bottom w-full h-auto flex flex-col justify-center items-center p-5' style={{ backgroundImage: `url(${BgTarjeta})`, minHeight: '400px' }}>
          <div className='p-10 '>
            <p className='mb-5 text-lg'>Descubre nuevas aventuras</p>
            <h1 className='mb-5 font-bold text-6xl tracking-tight leading-normal pr-50'>
              <span>Inolvidables rutas del Ávila que recordarás siempre</span> <span className='bg-[#D76411] rounded-2xl px-3'>Unimetano</span>
            </h1>
            <p className='mb-5 text-lg'>La plataforma se dedica a facilitar a los estudiantes de la Universidad Metropolitana una manera de aventurarse por el Ávila de forma segura con guías preparados.</p>
            <div className='w-full h-auto flex justify-end'>
              <BotonPrimario text='Descubre' />
            </div>
          </div>
        </div>

        {/* Tarjetas con contenido alineado horizontalmente */}
        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-4 gap-5 w-full'>
            <div className='p-5 bg-[#005147] rounded-lg flex flex-col justify-between'>
              <img src={path} alt="fondo" className='mb-5 w-20 h-20' />
              <div>
                <h1 className='font-bold text-xl mb-2'>Rutas preparadas</h1>
                <p className='text-base'>Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada</p>
              </div>
            </div>
            <div className='p-5 bg-[#005147] rounded-lg flex flex-col'>
              <img src={Signpost} alt="fondo" className='mb-5 w-20 h-20' />
              <div>
                <h1 className='font-bold text-xl mb-2'>Tips de nuestros guías</h1>
                <p className='text-base'>En nuestros apartados podrás encontrar información interesante sobre el senderismo y consejos importante a la hora de adentrarte a una aventura en el Ávila</p>
              </div>  
            </div>
            <div className='p-5 bg-[#005147] rounded-lg flex flex-col'>
              <img src={Tipi} alt="fondo" className='mb-5 w-20 h-20' />
              <div>
                <h1 className='font-bold text-xl mb-2'>Reserva fácil</h1>
                <p className='text-base'>Encuentra rutas que te interesen y tan solo con unos breves pasos podrás empezar tu nuevo viaje</p>
              </div>
            </div>
            <div className='p-5 bg-[#005147] rounded-lg flex flex-col'>
              <img src={FourUsers} alt="fondo" className='mb-5 w-20 h-20' />
              <div>
                <h1 className='font-bold text-xl mb-2'>Comunidad activa</h1>
                <p className='text-base'>Podrás participar en foros y actividades de retroalimentación donde conectarás con estudiantes al igual que tu, con sed de aventuras</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}