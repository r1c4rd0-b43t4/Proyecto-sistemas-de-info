import { LogoResponsive } from "./Logo_Responsive.jsx";
import React from 'react';

export default function Header_NoSession() {
  return (
    <div className="w-full h-[92px] bg-white fixed top-0 left-0 shadow-md z-50">
      <div className="flex flex-col w-full items-center justify-center px-20 py-4">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-end gap-4 flex-1">
              <div className="flex w-full items-center gap-4 pl-10 pr-0 py-0 rounded-lg">
                <LogoResponsive className="!relative !w-[201.72px] !h-[43.62px]" />
                <button className="btn btn-primary text-[#00796b]">
                  Rutas
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b]">
                  Galería
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b]">
                  Reseñas
                </button>
                <div className="w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="btn btn-primary text-[#00796b]">
                  Blogs
                </button>
              </div>
              <button className="btn btn-primary bg-primary60-base text-grey-10 text-[#00796b]">
                Iniciar sesión
              </button>
              <button className="btn btn-secondary text-primary-40 text-[#00796b]">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





