import React from 'react';
import StarRating from './StarRating';
import BotonPrimario from './BotonPrimario';

const FrameVistaProducto = ({ icono, datosRuta }) => {
    return (
        <div className="max-w-2xl mx-auto flex bg-white rounded-lg shadow-md overflow-hidden">
            {/* Sección izquierda: Imágenes */}
            <div className="w-1/3">
                <div className="h-full grid grid-cols-1 gap-2">
                    <img
                        src={icono}
                        alt="Producto"
                        className="w-full h-24 object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* Sección derecha: Contenido principal */}
            <div className="w-2/3 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Ruta “Naiguatá”</h2>
                    <div className="text-right">
                        {datosRuta}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-2xl font-bold">
                        $40 <span className="text-sm text-gray-600">/reserva</span>
                    </p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500">★★★★☆</span>
                        <p className="ml-2 text-gray-600">(500+ Review)</p>
                    </div>
                    <p className="mt-2 text-gray-600">Fecha: 20/04/2025</p>
                </div>

                <div className="mt-4">
                    <p className="text-gray-700 text-sm">
                        La Ruta “Naiguatá” fue diseñada para aquellos que desean tener un
                        verdadero reto, siendo su gran distancia y tiempo digno de renombre,
                        pero por un esfuerzo que lo va a valer. Dicha ruta incluye acampado
                        y apoyo de los guías para distribuir el peso del equipamiento. Se
                        recomienda únicamente a personas experimentadas...
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-green-600">8 cupos disponibles</p>
                    <BotonPrimario text="Reservar" />
                </div>
            </div>
        </div>
    );
};

export default FrameVistaProducto;
