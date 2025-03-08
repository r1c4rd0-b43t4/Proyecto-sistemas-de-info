import React from "react";
import TarjetaGuia from "./TarjetaGuia";
import Avila from '../assets/Avila_vector.svg';

export default function Frame_5_Home() {
    return (
        <div className="min-h-screen w-screen flex flex-col justify-start items-center bg-[#f3f3f3] overflow-hidden pb-15">
            {/* Título y descripción */}
            <div className="w-full flex flex-col justify-start items-center gap-8 md:gap-16 py-12 md:py-24">
                <div className="w-full flex justify-center items-start">
                    <div className="w-full max-w-[800px] flex flex-col justify-start items-start gap-2 px-4 md:px-20">
                        <h1 className="text-center text-4xl md:text-[65px] font-normal">
                            <span className="text-[#00796b]">Conoce a nuestros </span>
                            <span className="text-[#d76411]">Guías principales</span>
                        </h1>
                        <p className="text-center text-[#b8babc] text-lg md:text-xl font-normal leading-7 md:leading-[30px]">
                            Aquellos que se preparan para hacer de tu experiencia una inolvidable.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tarjetas de guías */}
            <div className="w-full flex-grow flex flex-col justify-center items-center px-4 md:px-[101px]">
                <div className="w-full max-w-[1440px] flex justify-center items-center gap-4 md:gap-[100px] flex-wrap">
                    {/* La idea es hacer que estas tarjetas se vinculen despues con los guias que esten disponibles */}
                    {/* Tarjeta 1 */}
                    <TarjetaGuia
                        imagen="https://dam.mediacorp.sg/image/upload/s--sJpwj0oG--/c_crop,h_779,w_1038,x_65,y_1/c_fill,g_auto,h_622,w_830/f_auto,q_auto/v1/mediacorp/cna/image/2024/02/08/img_9789.jpg?itok=_uSv99Y9"
                        nombre="Aura Loss"
                        rol="Guía turístico"
                    />

                    {/* Tarjeta 2 */}
                    <TarjetaGuia
                        imagen="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosplay_of_Filthy_Frank%2C_Anime_Central%2C_2017_%2833992932604%29.jpg/1200px-Cosplay_of_Filthy_Frank%2C_Anime_Central%2C_2017_%2833992932604%29.jpg"
                        nombre="Armando Paredes"
                        rol="Amante de la naturaleza"
                    />

                    {/* Tarjeta 3 */}
                    <TarjetaGuia
                        imagen="ruta/a/imagen3.png"
                        nombre="Miguel Moreno"
                        rol="Experto en supervivencia"
                    />

                    {/* Tarjeta 4 */}
                    <TarjetaGuia
                        imagen="ruta/a/imagen4.png"
                        nombre="Javier Tovar"
                        rol="Montañista excepcional"
                    />
                </div>
            </div>
        </div>
    );
}