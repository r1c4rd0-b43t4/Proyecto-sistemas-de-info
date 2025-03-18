import React from 'react';
import DatosRuta from './DatosRuta';
import StarRating from './StarRating';
import BotonPaypal from './BotonPaypal';

const VistaDeProducto = ({ icono, dificultad, distancia, tiempo, imagenes = [], nombreRuta, precio, cupos, reviews, inicio, fecha, descripcion }) => {
  return (
    <div className="flex relative w-11/12 p-4 bg-[#F5F5F5] shadow-lg rounded-2xl overflow-hidden h-screen my-30">
      <div className="grid gap-5 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="bg-gray-200 flex flex-col items-center justify-center">
          <img src={icono} alt="Producto" className="w-3/4 mb-4" />
          <div className="grid grid-cols-4 gap-1 w-3/4 justify-items-center mb-4">
            {imagenes.map((imagen, index) => (
              <img key={index} src={imagen} alt={`Producto pequeño ${index}`} className="w-4/4" />
            ))}
          </div>
        </div>
        <div className="bg-white p-4 flex flex-col justify-start">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-0 break-words">{nombreRuta}</h1>
          <div className="w-3/4 mb-0 mt-0">
            <DatosRuta tiempo={tiempo} distancia={distancia} dificultad={dificultad} fondo={"#ffffff"} />
          </div>
          <div className="flex items-center mb-4 overflow-hidden">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">${precio}</h1>
            <p className="text-xl sm:text-2xl lg:text-3xl ml-2 break-words" style={{ color: '#77878F' }}>/reserva</p>
          </div>
          <hr className="w-full border-t-2 border-gray-300 mt-4" />
          <p className="text-center font-semibold mt-4 text-xs sm:text-sm lg:text-base">fecha:{fecha}</p>
          <div className="mt-4 text-left">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Descripción</h3>
            <p className="text-base sm:text-lg lg:text-xl break-words">{descripcion}</p>
            <p className="text-base sm:text-lg lg:text-xl text-green-500 break-words"><span className="font-bold text-green-700">{cupos}</span> cupos disponibles</p>
          </div>
          <div className="mt-4 flex justify-end">
            <BotonPaypal precio={precio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaDeProducto;

VistaDeProducto.defaultProps = {
  icono: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Rutas//Humboldt.svg", 
  dificultad: "Ez",
  distancia: 5,
  duracion: 1,
  imagenes: [
    "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Rutas//Humboldt.svg", 
    "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Rutas//Humboldt.svg", 
    "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Rutas//Humboldt.svg", 
    "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Rutas//Humboldt.svg"
  ],
  nombre: "Ruta Humboldt",
  precio: 100,
  cupos: 10,
  reviews: 50,
  startPoint: "Punto A",
  fecha: "01/01/2022",
  descripcion: "La Ruta “Humboldt” fue diseñada para aquellos que desean tener un verdadero reto, siendo su gran distancia y tiempo digno de renombre, pero por un esfuerzo que lo va a valer. Dicha ruta incluye acampado y apoyo de los guías para distribuir el peso del equipamiento. Se recomienda unicamente a personas experimentadas."
};