import React from 'react';

export default function Frame_Galeria() {
  const images = [
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 1' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 2' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 3' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 4' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 5' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 6' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 7' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 8' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 9' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 10' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 11' },
    { src: 'https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg', alt: 'Image 12' },
  ];

  // Dividir imágenes en 3 columnas 
  const columnCount = 3;
  const columns = Array.from({ length: columnCount }, (_, i) => 
    images.filter((_, index) => index % columnCount === i)
  );

  return (
    <div className='w-screen h-full'>
      
        <div className='md:px-20 px-5 flex align-middle items-center bg-[#F7F7F8] w-screen md:h-screen'>
          <div className='md:w-full md:pt-0 h-fit w-screen justify-left pt-20'>
            <img 
              src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg" 
              alt="humboldt_rutas" 
              className='object-cover w-full md:h-120'
            />
            <p className='relative md:bottom-14 bottom-5 left-0 md:text-3xl text-sm text-teal-600'>Recuerdos del Ávila</p>
            <h1 className='md:text-9xl text-4xl font-bold'>
              <span className='text-teal-600'>Galería</span>{' '}
              <span className='text-[#D76411]'>Unimetrail</span>
            </h1>
            </div>
        </div>

        {/* Responsive una columna */}
        <div className="md:hidden flex flex-col gap-4 p-5 w-full">
          {images.map((image, index) => (
            <div key={index} className={`${index % 2 === 0 ? 'h-120' : 'h-60'} w-full`}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Desktop tres columnas */}
        <div className="hidden md:flex justify-center gap-4 p-5 w-full">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4 w-full">
              {column.map((image, index) => (
                <div
                  key={index}
                  className={`${(colIndex + index) % 2 === 0 ? 'h-120' : 'h-60'} w-full`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

    </div>
  );
}
