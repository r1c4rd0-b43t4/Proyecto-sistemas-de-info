import { LogoResponsive } from "./Logo_Responsive.jsx";
import React from 'react';
import BotonPrimario from "./BotonPrimario.jsx";
import BotonSecundario from "./BotonSecundario.jsx";

export default function Header_NoSession() {
  return (
    <div className="w-full bg-white fixed top-0 left-0 shadow-md z-50">
      <div className="flex flex-col w-full items-center justify-center px-20 py-2">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-end gap-4 flex-1">
              <div className="flex w-full items-center gap-4 pl-10 pr-0 py-0 rounded-lg">
                <LogoResponsive className="!relative !w-[201.72px] !h-[43.62px]" />
                <button className="btn btn-primary text-[#00796b] hover:text-teal-600 active:text-teal-800">
                  Rutas
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b] hover:text-teal-600 active:text-teal-800">
                  Galería
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b] hover:text-teal-600 active:text-teal-800">
                  Reseñas
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b] hover:text-teal-600 active:text-teal-800">
                  Blogs
                </button>
              </div>
              <BotonPrimario text='Iniciar Sesión'/>
              <BotonSecundario text='Registrarse'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





