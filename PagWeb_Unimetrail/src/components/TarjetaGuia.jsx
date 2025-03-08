import React from 'react';

const TarjetaGuia = ({ imagen, nombre, rol }) => (
  <div
    className="w-full sm:w-[480px] h-[360px] sm:h-[400px] rounded overflow-hidden shadow-lg bg-cover bg-center relative text-white"
    style={{ backgroundImage: `url(${imagen})` }}
  >
    <div className="absolute inset-0"></div>
    <div className="flex flex-col justify-between h-full">
      <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow">
      </div>
      <div className="bg-white/30 backdrop-blur-sm backdrop-blur-md border-t border-b border-white px-4 py-2 w-[80%] sm:w-[60%] max-w-[300px] mb-4 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold">{nombre}</h2>
        <p className="text-base sm:text-lg text-gray-200">{rol}</p>
      </div>
    </div>
  </div>
);

export default TarjetaGuia;
