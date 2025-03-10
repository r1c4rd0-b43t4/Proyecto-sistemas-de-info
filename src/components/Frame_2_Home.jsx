import React from 'react';
import BotonPrimario from './BotonPrimario';
import './Animations.css';

export default function Frame_2_Home() {
  return (
    <div className='w-screen bg-[#00796B] text-white'>
      <div className='px-10 md:px-20 lg:px-40 py-10 md:py-16 lg:py-20 flex flex-col justify-center items-center h-full w-screen gap-2'>
        <div 
          className='bg-cover rounded-2xl bg-bottom w-full h-auto flex flex-col justify-center items-center p-3 md:p-6 lg:p-10 md:min-h-[300px] lg:min-h-[400px]'
          style={{ backgroundImage: `url(https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//BgTarjeta-F2.png)` }}
        >
          <div className='p-5 md:p-8 lg:p-10 text-center md:text-left'>
            <p className='mb-3 text-base md:text-lg'>Descubre nuevas aventuras</p>
            <h1 className='mb-2 font-bold text-3xl md:text-4xl lg:text-[60px] tracking-tight leading-normal'>
              <span>Inolvidables rutas del Ávila que recordarás siempre </span>
              <span className='bg-[#D76411] rounded-2xl px-3'>Unimetano</span>
            </h1>
            <p className='text-sm md:text-base'>
              La plataforma se dedica a facilitar a los estudiantes de la Universidad Metropolitana una manera de aventurarse por el Ávila de forma segura con guías preparados.
            </p>
            <div className='w-full h-auto flex justify-center md:justify-end mt-5'>
              <BotonPrimario text='Descubre' />
            </div>
          </div>
        </div>

        {/* Tarjetas */}
        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full'>
            {[ 
              { img: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Path_F2_Home.svg", title: "Rutas preparadas", text: "Gran parte de nuestras rutas fueron ingeniadas por nuestros guías expertos para hacer de tu experiencia una inolvidable y además con su respectiva dificultad asignada." },
              { img: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Signpost_F2_Home.svg", title: "Tips de nuestros guías", text: "En nuestros apartados podrás encontrar información interesante sobre el senderismo y consejos importantes a la hora de adentrarte a una aventura en el Ávila." },
              { img: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Tipi_F2_Home.svg", title: "Reserva fácil", text: "Encuentra rutas que te interesen y tan solo con unos breves pasos podrás empezar tu nuevo viaje." },
              { img: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//UsersFour_F2_Home.svg", title: "Comunidad activa", text: "Podrás participar en foros y actividades de retroalimentación donde conectarás con estudiantes al igual que tú, con sed de aventuras." }
            ].map((card, index) => (
              <div key={index} className='p-5 bg-[#005147] rounded-lg flex flex-col text-center md:text-left'>
                <img src={card.img} alt={card.title} className='mb-5 w-16 h-16 md:w-20 md:h-20 mx-auto md:mx-0' />
                <div>
                  <h1 className='font-bold text-lg md:text-xl mb-2'>{card.title}</h1>
                  <p className='text-sm md:text-base'>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
