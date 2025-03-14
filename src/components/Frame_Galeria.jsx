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
        originalIndex: index
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
    const columns = Array.from({ length: columnCount }, () => []);
    

    images.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });

    if (columns[0].length > 0) {
      columns[0].unshift({ isButton: true });
    } else {
      columns[0].push({ isButton: true });
    }

    return columns;
  };

  const columns = createColumns();

  if (loading) return <div className="text-center p-8">Cargando imágenes...</div>;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;

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

      <div className="md:hidden flex flex-col gap-4 p-10 w-full">
        <AddImageButton onImageAdded={fetchImages} />
        {images.map((image, index) => (
          <div key={index} className={`${image.originalIndex % 2 === 0 ? 'h-120' : 'h-60'} w-full`}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg object-center"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="hidden md:flex justify-center gap-4 p-10 w-full">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 w-full">
            {column.map((item, index) => {
              if (item.isButton) {
                return <AddImageButton key="add-button" onImageAdded={fetchImages} />;
              }
              
              return (
                <div
                  key={item.src}
                  className={`${item.originalIndex % 2 === 0 ? 'h-120' : 'h-60'} w-full`}
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