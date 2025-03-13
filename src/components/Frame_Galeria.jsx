import React from 'react'

export default function Frame_Galeira() {
  return (
    <div className='md:px-20  pt-0 px-5 flex align-middle items-center bg-[#F7F7F8] w-screen md:h-screen'>
        <div className='md:w-full md:pt-0 h-fit w-screen justify-left pt-20'>
          <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg" alt="humboldt_rutas" className='object-fill w-full  md:h-120'/>
          <p className='relative md:bottom-14 bottom-5 left-0 md:text-3xl text-sm text-teal-600'>Recuerdos del Ávila</p>
          <h1 className='md:text-9xl text-5xl font-bold'> <span className='text-teal-600'>Galería</span> <span className='text-[#D76411]'>Unimetrail</span></h1>
        </div>
    </div>
  )
}
