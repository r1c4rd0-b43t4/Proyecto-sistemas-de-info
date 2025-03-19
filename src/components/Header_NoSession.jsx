import { useState, useEffect, useContext } from "react";
import { LogoResponsive } from "./Logo_Responsive.jsx";
import BotonPrimario from "./BotonPrimario.jsx";
import BotonSecundario from "./BotonSecundario.jsx";
import { UserContext } from '../Context/UserContext';
import { getAuth } from "firebase/auth";
import { app } from "../../credentials";
import { Link, useNavigate } from 'react-router';

const auth = getAuth(app);

export default function Header_NoSession() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const contextuser = useContext(UserContext);
  const { logged, user, role } = contextuser;

  async function logout() {
    try {
      await auth.signOut();
      console.log("Sesión cerrada");
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfileClick = () => {
    navigate('/edit-user');
  };

  const handleDashboardClick = () => {
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'guia') {
      navigate('/guia/dashboard');
    } else {
      navigate('/rutas-adquiridas');
    }
  };

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
        <div className="flex items-center">
          <LogoResponsive className="w-[150px] md:w-[202px]" />
          <NavLinks className="ml-4 hidden md:flex" />
        </div>

        {!logged && (
          <div className="hidden md:flex items-center gap-4">
            <BotonPrimario text="Iniciar Sesión" to="/login" />
            <BotonSecundario text="Registrarse" to="/register" />
          </div>
        )}

        {logged && (
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Perfil" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{user.email}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-teal-700 ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Editar Perfil
                  </button>
                  <button
                    onClick={handleDashboardClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                    </svg>
                    Rutas adquiridas
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//BurgerMenu.svg" alt="Menu" className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 flex flex-col items-center gap-6 p-8 
        transition-all duration-300 ease-in-out transform 
        ${menuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"}`}
      >
        <button className="absolute top-4 right-6" onClick={() => setMenuOpen(false)}>
          <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Close.svg" alt="Cerrar" className="w-8 h-8" />
        </button>

        <NavLinks />
        {!logged ? (
          <>
            <BotonPrimario text="Iniciar Sesión" to="/login" />
            <BotonSecundario text="Registrarse" to="/register" />
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-600 hover:text-red-700"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </div>
  );
}

function NavLinks({ className }) {
  return (
    <div className={`flex items-center gap-2 text-[#00796b] ${className}`}>
      <Link to='/rutas' className="hover:text-teal-600 active:text-teal-800 text-lg">Rutas</Link>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <Link to="/galeria" className="hover:text-teal-600 active:text-teal-800 text-lg">Galería</Link>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <Link to="/resenas" className="hover:text-teal-600 active:text-teal-800 text-lg">Reseñas</Link>
      <span className="border-l border-gray-300 h-5 mx-2"></span>
      <Link to="/blogs" className="hover:text-teal-600 active:text-teal-800 text-lg">Blogs</Link>
    </div>
  );
}
