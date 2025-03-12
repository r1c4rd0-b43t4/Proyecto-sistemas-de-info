import React from 'react';

const TarjetaBlog = ({ imagen, titulo, descripcion, perfilImagen, nombreUsuario, fecha }) => {
  return (
    <div className="p-5 rounded-lg flex flex-col justify-between bg-white shadow-lg h-full w-full max-w-2xl mx-auto">
      <div className="flex flex-col h-full">
        <div className="h-1/2">
          <img src={imagen} alt="Blog" className="w-full h-full object-cover rounded-t-lg" />
        </div>
        <div className="h-1/2 p-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold break-words">{titulo}</h3>
            <p className="text-base text-gray-700 break-words mt-2">{descripcion}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <img src={perfilImagen} alt="Perfil" className="w-10 h-10 rounded-full mr-2" />
              <p className="text-base text-gray-700 break-words">{nombreUsuario}</p>
            </div>
            <p className="text-base text-gray-700 break-words">{fecha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaBlog;