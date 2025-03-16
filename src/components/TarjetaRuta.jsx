import React from "react";
import { useNavigate } from "react-router";
import DatosRuta from "./DatosRuta";
import StarRating from "./StarRating";
import BotonPrimario from "./BotonPrimario";

export function TarjetaRuta({ nombreRuta, precio, inicio, tiempo, distancia, dificultad, icono }) {
  const navigate = useNavigate();

  const handleReservarClick = () => {
    navigate(`/producto/${nombreRuta}`);
  };

  return (
    <div className='p-5 rounded-lg flex flex-col justify-between'>
      <article className="flex relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto p-4 bg-[#F5F5F5] shadow-lg rounded-2xl">
        <div className="relative w-full h-full flex flex-col items-center">
          <header className="absolute top-0 w-full flex justify-center mt-13 z-10">
            <DatosRuta tiempo={tiempo} distancia={distancia} dificultad={dificultad} fondo={"#F5F5F5"} />
          </header>
          <div className="relative w-full flex justify-center mt-16">
            <div className="w-full h-48 md:h-56 lg:h-64 xl:h-72">
              <img src={icono} className="absolute bottom-3 left-0 w-full h-full object-contain z-0" alt="Ruta Icono" />
            </div>
          </div>
          <div className="w-full mt-4 flex flex-col items-start">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{nombreRuta}</h1>
            <div className="flex items-center mt-2 text-sm md:text-base lg:text-lg">
              <div data-svg-wrapper className="relative mr-2">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 5.5C9.38193 5.5 8.77775 5.68328 8.26384 6.02666C7.74994 6.37004 7.3494 6.8581 7.11288 7.42911C6.87635 8.00013 6.81447 8.62847 6.93505 9.23466C7.05562 9.84085 7.35325 10.3977 7.79029 10.8347C8.22733 11.2717 8.78415 11.5694 9.39034 11.69C9.99653 11.8105 10.6249 11.7486 11.1959 11.5121C11.7669 11.2756 12.255 10.8751 12.5983 10.3612C12.9417 9.84725 13.125 9.24307 13.125 8.625C13.125 7.7962 12.7958 7.00134 12.2097 6.41529C11.6237 5.82924 10.8288 5.5 10 5.5ZM10 10.5C9.62916 10.5 9.26665 10.39 8.95831 10.184C8.64996 9.97798 8.40964 9.68514 8.26773 9.34253C8.12581 8.99992 8.08868 8.62292 8.16103 8.25921C8.23337 7.89549 8.41195 7.5614 8.67417 7.29917C8.9364 7.03695 9.27049 6.85837 9.63421 6.78603C9.99792 6.71368 10.3749 6.75081 10.7175 6.89273C11.0601 7.03464 11.353 7.27496 11.559 7.58331C11.765 7.89165 11.875 8.25416 11.875 8.625C11.875 9.12228 11.6775 9.59919 11.3258 9.95083C10.9742 10.3025 10.4973 10.5 10 10.5ZM10 1.75C8.17727 1.75207 6.42979 2.47706 5.14092 3.76592C3.85206 5.05479 3.12707 6.80227 3.125 8.625C3.125 11.0781 4.25859 13.6781 6.40625 16.1445C7.37127 17.259 8.45739 18.2626 9.64453 19.1367C9.74962 19.2103 9.87482 19.2498 10.0031 19.2498C10.1314 19.2498 10.2566 19.2103 10.3617 19.1367C11.5467 18.2623 12.6307 17.2587 13.5938 16.1445C15.7383 13.6781 16.875 11.0781 16.875 8.625C16.8729 6.80227 16.1479 5.05479 14.8591 3.76592C13.5702 2.47706 11.8227 1.75207 10 1.75ZM10 17.8438C8.70859 16.8281 4.375 13.0977 4.375 8.625C4.375 7.13316 4.96763 5.70242 6.02252 4.64752C7.07742 3.59263 8.50816 3 10 3C11.4918 3 12.9226 3.59263 13.9775 4.64752C15.0324 5.70242 15.625 7.13316 15.625 8.625C15.625 13.0961 11.2914 16.8281 10 17.8438Z" fill="#424242" />
                </svg>
              </div>
              <p>Punto de inicio: {inicio}</p>
            </div>
            <div className="flex items-center mt-2 text-sm md:text-base lg:text-lg">
              <strong className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 mr-0">${precio}</strong>
              <p className="ml-0">/Reserva</p>
            </div>
            <div className="mt-0 flex items-center"> 
              <StarRating />
              <p className="ml-2 md:ml-3 lg:ml-4" style={{color: '#77878F'}}>(50)</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-1">
            <BotonPrimario text={"Reservar"} onClick={handleReservarClick} />
          </div>
        </div>
      </article>
    </div>
  );
}