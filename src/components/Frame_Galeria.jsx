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

  // Nuevo método para distribuir los items.
  const createColumns = () => {
    const columnCount = 3;
    // Agregamos el botón como el primer elemento del conjunto.
    const items = [{ isButton: true }, ...images];
    const rows = Math.ceil(items.length / columnCount);
    // Creamos un array para cada columna.
    const columns = Array.from({ length: columnCount }, () => []);

    // Distribuimos de forma row-by-row: es decir, recorremos cada fila y
    // en cada fila, llenamos cada columna en orden.
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
    <div className="w-screen h-full">
      <div className="md:px-20 px-5 flex items-center bg-[#F7F7F8] w-screen md:h-screen">
        <div className="md:w-full h-fit w-screen pt-20">
          <img
            src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg"
            alt="humboldt_rutas"
            className="object-cover w-full md:h-120"
          />
          <p className="relative md:bottom-14 bottom-5 left-0 md:text-3xl text-sm text-teal-600">
            Recuerdos del Ávila
          </p>
          <h1 className="md:text-9xl text-4xl font-bold">
            <span className="text-teal-600">Galería</span>{' '}
            <span className="text-[#D76411]">Unimetrail</span>
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
          // Usamos flex-1 para que cada columna ocupe el mismo ancho.
          <div key={colIndex} className="flex flex-col gap-4 flex-1">
            {column.map((item, index) => {
              if (item.isButton) {
                return (
                  <AddImageButton
                    key={`add-button-${colIndex}-${index}`}
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
