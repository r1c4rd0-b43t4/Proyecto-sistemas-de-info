import React from 'react';
import Humboldt from '../assets/humboldt.svg';
import DatosRuta from './DatosRuta';
import StarRating from './StarRating';
import BotonPrimario from './BotonPrimario'; // Asegúrate de que la ruta sea correcta

const VistaDeProducto = ({ icono }) => {
  return (
    <div className="flex relative w-11/12 h-auto p-4 bg-[#F5F5F5] shadow-lg rounded-2xl mx-auto my-4 overflow-hidden my-20">
      <div className="w-1/2 bg-gray-200 flex flex-col items-center justify-center">
        <img src={icono} alt="Producto" className="w-3/4 mb-4" />
        <div className="grid grid-cols-4 gap-1 w-3/4 justify-items-center mb-4">
          <img src={Humboldt} alt="Producto pequeño" className="w-4/4" />
          <img src={Humboldt} alt="Producto pequeño" className="w-4/4" />
          <img src={Humboldt} alt="Producto pequeño" className="w-4/4" />
          <img src={Humboldt} alt="Producto pequeño" className="w-4/4" />
        </div>
      </div>
      <div className="w-1/2 bg-white p-4 flex flex-col justify-start">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-0 break-words">Ruta naiguata</h1>
        <div className="w-3/4 mb-0 mt-0">
          <DatosRuta tiempo={1} distancia={2} dificultad={"zzz"} fondo={"#ffffff"} />
        </div>
        <div className="flex items-center mb-4 overflow-hidden">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">$40</h1>
          <p className="text-xl sm:text-2xl lg:text-3xl ml-2 break-words" style={{color: '#77878F'}}>/reserva</p>
        </div>
        <div className="flex items-center mb-4">
          <StarRating />
          <p className="text-sm sm:text-base lg:text-lg ml-2 break-words" style={{color: '#77878F'}}>4.5</p>
        </div>
        <hr className="w-full border-t-2 border-gray-300 mt-4" />
        <p className="text-center font-semibold mt-4 text-xs sm:text-sm lg:text-base">fecha: día/mes/año</p>
        <div className="mt-4 text-left">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Descripción</h3>
          <p className="text-base sm:text-lg lg:text-xl break-words">La Ruta “Naiguatá” fue diseñada para aquellos que desean tener un verdadero reto, siendo su gran distancia y tiempo digno de renombre, pero por un esfuerzo que lo va a valer. Dicha ruta incluye acampado y apoyo de los guías para distribuir el peso del equipamiento. Se recomienda unicamente a personas experimentadas.</p>
          <p className="text-base sm:text-lg lg:text-xl text-green-500 break-words"><span className="font-bold text-green-700">X</span> cupos disponibles</p>
        </div>
        <div className="mt-4 flex justify-center">
          <BotonPrimario text="reservar" />
        </div>
      </div>
    </div>
  );
};

export default VistaDeProducto;