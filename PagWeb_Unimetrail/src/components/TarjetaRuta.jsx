import React from "react";
import { DatosRuta } from "./DatosRuta";
import StarRating from "./StarRating";
import BotonPrimario from "./BotonPrimario";

export function TarjetaRuta({ nombreRuta, precio, inicio, tiempo, distancia, dificultad }) {
    return (
        <article className="relative w-[400px] h-[493px] p-4 bg-[#F5F5F5] shadow-lg rounded-2xl">
            <div className="relative w-full h-full flex flex-col items-center">
                <div className="relative w-full flex justify-center">
                    <header className="absolute top-0 w-full flex justify-center mt-4">
                        <DatosRuta tiempo={tiempo} distancia={distancia} dificultad={dificultad} />
                    </header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                        width="300"
                        height="300"
                        className="mt-4"
                    >
                        <g>
                            <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M19.149,0.001H4.847C2.169,0.001,0,2.17,0,4.849v14.305c0,2.676,2.169,4.845,4.847,4.845h14.305
                                c2.676,0,4.847-2.169,4.847-4.847V4.849C23.997,2.17,21.828,0.001,19.149,0.001z M6.635,19.001c-0.3,0.525-0.969,0.702-1.494,0.402
                                c-0.525-0.3-0.702-0.969-0.402-1.494l0.78-1.35c0.882-0.273,1.598-0.063,2.166,0.621L6.635,19.001z M14.218,16.056H4.29
                                c-0.606,0-1.092-0.486-1.092-1.092c0-0.606,0.486-1.092,1.092-1.092h2.783l3.564-6.176L9.524,5.764
                                c-0.3-0.525-0.123-1.188,0.402-1.494c0.525-0.3,1.188-0.123,1.494,0.402l0.477,0.843l0.486-0.84c0.3-0.525,0.969-0.702,1.494-0.402
                                c0.525,0.3,0.702,0.969,0.402,1.493l-4.682,8.105h3.387C14.08,13.872,14.695,15.162,14.218,16.056z M19.567,16.062h-1.578
                                l1.065,1.847c0.3,0.525,0.123,1.188-0.402,1.494c-0.525,0.3-1.188,0.123-1.494-0.402c-1.793-3.111-3.141-5.438-4.034-6.989
                                c-0.915-1.578-0.261-3.162,0.384-3.699c0.717,1.23,1.788,3.087,3.218,5.565h2.841c0.606,0,1.092,0.486,1.092,1.092
                                C20.658,15.576,20.173,16.062,19.567,16.062z"
                            />
                        </g>
                    </svg>
                </div>
                <div className="w-full mt-4 flex flex-col items-left">
                    <h1 className="text-2xl font-bold">{nombreRuta}</h1>
                    <div className="flex items-center mt-2 text-base">
                        <div data-svg-wrapper style={{ position: 'relative', marginRight: '8px' }}>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 5.5C9.38193 5.5 8.77775 5.68328 8.26384 6.02666C7.74994 6.37004 7.3494 6.8581 7.11288 7.42911C6.87635 8.00013 6.81447 8.62847 6.93505 9.23466C7.05562 9.84085 7.35325 10.3977 7.79029 10.8347C8.22733 11.2717 8.78415 11.5694 9.39034 11.69C9.99653 11.8105 10.6249 11.7486 11.1959 11.5121C11.7669 11.2756 12.255 10.8751 12.5983 10.3612C12.9417 9.84725 13.125 9.24307 13.125 8.625C13.125 7.7962 12.7958 7.00134 12.2097 6.41529C11.6237 5.82924 10.8288 5.5 10 5.5ZM10 10.5C9.62916 10.5 9.26665 10.39 8.95831 10.184C8.64996 9.97798 8.40964 9.68514 8.26773 9.34253C8.12581 8.99992 8.08868 8.62292 8.16103 8.25921C8.23337 7.89549 8.41195 7.5614 8.67417 7.29917C8.9364 7.03695 9.27049 6.85837 9.63421 6.78603C9.99792 6.71368 10.3749 6.75081 10.7175 6.89273C11.0601 7.03464 11.353 7.27496 11.559 7.58331C11.765 7.89165 11.875 8.25416 11.875 8.625C11.875 9.12228 11.6775 9.59919 11.3258 9.95083C10.9742 10.3025 10.4973 10.5 10 10.5ZM10 1.75C8.17727 1.75207 6.42979 2.47706 5.14092 3.76592C3.85206 5.05479 3.12707 6.80227 3.125 8.625C3.125 11.0781 4.25859 13.6781 6.40625 16.1445C7.37127 17.259 8.45739 18.2626 9.64453 19.1367C9.74962 19.2103 9.87482 19.2498 10.0031 19.2498C10.1314 19.2498 10.2566 19.2103 10.3617 19.1367C11.5467 18.2623 12.6307 17.2587 13.5938 16.1445C15.7383 13.6781 16.875 11.0781 16.875 8.625C16.8729 6.80227 16.1479 5.05479 14.8591 3.76592C13.5702 2.47706 11.8227 1.75207 10 1.75ZM10 17.8438C8.70859 16.8281 4.375 13.0977 4.375 8.625C4.375 7.13316 4.96763 5.70242 6.02252 4.64752C7.07742 3.59263 8.50816 3 10 3C11.4918 3 12.9226 3.59263 13.9775 4.64752C15.0324 5.70242 15.625 7.13316 15.625 8.625C15.625 13.0961 11.2914 16.8281 10 17.8438Z" fill="#424242"/>
                            </svg>
                        </div>
                        <p>Punto de inicio: {inicio}</p>
                    </div>
                    <div className="flex items-center mt-2 text-base">
                        <strong className="text-2xl font-bold text-orange-500 mr-0">${precio}</strong>
                        <p className="ml-0">/Reserva</p>
                    </div>
                    <div className="mt-0 flex items-center"> 
                        <StarRating />
                        <p className="ml=5" style={{color: '#77878F'}}>(50)</p>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4">
                    <BotonPrimario text={"Reservar"} />
                </div>
            </div>
        </article>
    );
}