import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import AddImageButton from './AddImageButton';

export default function Frame_Galeria() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('imagenes-galeria')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;

      const publicUrls = data.map((file, index) => ({
        src: `${supabase.storage.url}/object/public/imagenes-galeria/${file.name}`,
        alt: file.name,
        originalIndex: index,
      }));

      setImages(publicUrls);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const createColumns = () => {
    const columnCount = 3;
    const items = [
      { type: 'button', key: 'add-button' },
      ...images.map(img => ({ type: 'image', ...img }))
    ];
    const rows = Math.ceil(items.length / columnCount);
    const columns = Array.from({ length: columnCount }, () => []);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columnCount; col++) {
        const index = row * columnCount + col;
        if (index < items.length) {
          columns[col].push(items[index]);
        }
      }
    }
    return columns;
  };

  const columns = createColumns();

  if (loading)
    return <div className="text-center p-8">Cargando imágenes...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center p-8">Error: {error}</div>
    );

  return (

      <div className='w-screen h-full'>
        <div className='md:px-20 px-5 flex align-middle items-center bg-[#F7F7F8] w-screen md:h-screen'>
          <div className='md:w-full w-screen relative'>
            <div className='relative w-full h-full'>
              <img 
                src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg" 
                alt="foto_galeria" 
                className='w-full h-full object-cover'
              />
  
            </div>
            <h1 className='md:text-9xl text-5xl font-bold'> 
                  <span className='text-teal-600'>Galería </span> 
                  <span className='text-[#D76411]'>Unimetrail</span>
                </h1>
          </div>
        </div>

      {/* Versión para móviles */}
      <div className="md:hidden flex flex-col gap-4 p-10 w-full">
        <AddImageButton onImageAdded={fetchImages} />
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              image.originalIndex % 2 === 0 ? 'h-120' : 'h-60'
            } w-full`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg object-center"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Versión para pantallas md y superiores */}
      <div className="hidden md:flex justify-center gap-4 p-10 w-full">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 flex-1">
            {column.map((item) => {
              if (item.type === 'button') {
                return (
                  <AddImageButton
                    key={item.key}
                    onImageAdded={fetchImages}
                  />
                );
              }
              return (
                <div
                  key={item.src}
                  className={`${
                    item.originalIndex % 2 === 0 ? 'h-120' : 'h-60'
                  } w-full`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover rounded-lg object-center"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
