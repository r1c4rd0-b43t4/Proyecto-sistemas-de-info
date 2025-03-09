import React from 'react';

const TarjetaGuia = ({ imagen, nombre, rol }) => {
  return (
    <div
      className="w-full sm:w-[280px] h-[320px] rounded-[25px] overflow-hidden shadow-lg bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${imagen})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-lg px-6 py-4 w-full max-w-[300px] mx-auto">
          <h2 className="text-2xl font-bold text-center">{nombre}</h2>
          <p className="text-lg text-gray-200 text-center mt-2">{rol}</p>
        </div>
      </div>
    </div>
  );
};

export default TarjetaGuia;