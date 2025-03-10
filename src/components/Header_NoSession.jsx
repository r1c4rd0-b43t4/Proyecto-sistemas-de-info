import { useState, useEffect } from "react";
import { LogoResponsive } from "./Logo_Responsive.jsx";
import BotonPrimario from "./BotonPrimario.jsx";
import BotonSecundario from "./BotonSecundario.jsx";
import Menu from "../assets/Burgermenu.svg";
import CloseIcon from "../assets/Close.svg";

export default function Header_NoSession() {
  const [menuOpen, setMenuOpen] = useState(false);

  // evitar scroll cuando el menu de hamburguesa estaa abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <div className="w-full bg-white fixed top-0 left-0 shadow-md z-50">
      <div className="flex w-full items-center justify-between px-6 md:px-20 py-4">
        {/* logo responsive ig */}
        <div className="flex items-center">
          <LogoResponsive className="w-[150px] md:w-[202px]" />
          <NavLinks className="ml-4 hidden md:flex" /> {/* Menú más cerca */}
        </div>

        {/* botones incicio y registro */}
        <div className="hidden md:flex items-center gap-4">
          <BotonPrimario text="Iniciar Sesión" to="/login" />
          <BotonSecundario text="Registrarse" to="/register"/>
        </div>

        {/* icono menu hamburguesa */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <img src={Menu} alt="Menu" className="w-8 h-8" />
        </button>
      </div>

      {/* menu movil y transiciones me quedo increible im BEGGING you*/}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 flex flex-col items-center gap-6 p-8 
        transition-all duration-300 ease-in-out transform 
        ${menuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"}`}
      >
        {/* cerrar menu de hamburguesa */}
        <button className="absolute top-4 right-6" onClick={() => setMenuOpen(false)}>
          <img src={CloseIcon} alt="Cerrar" className="w-8 h-8" />
        </button>

        <NavLinks />
        <BotonPrimario text="Iniciar Sesión" to="/login"/>
        <BotonSecundario text="Registrarse" to="/register"/>
      </div>
    </div>
  );
}

// otro componente que nada mas se usa aqui entonces por que diantres lo voy a exportar
function NavLinks({ className }) {
  return (
    <div className={`flex items-center gap-2 text-[#00796b] ${className}`}>
      <button className="hover:text-teal-600 active:text-teal-800 text-lg">Rutas</button>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <button className="hover:text-teal-600 active:text-teal-800 text-lg">Galería</button>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <button className="hover:text-teal-600 active:text-teal-800 text-lg">Reseñas</button>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <button className="hover:text-teal-600 active:text-teal-800 text-lg">Blogs</button>
    </div>
  );
}
