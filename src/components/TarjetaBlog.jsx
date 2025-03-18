import React from 'react';
import { useNavigate } from 'react-router';

const TarjetaBlog = ({ id, imagen, titulo, descripcion, perfilImagen, nombreUsuario, fecha }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${id}`);
    };

    // formatear la fecha
    const formatearFecha = (fecha) => {
        if (fecha && fecha.seconds) {
            // Si es un timestamp de Firebase
            return new Date(fecha.seconds * 1000).toLocaleString('es-VE', {
                timeZone: 'America/Caracas',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return fecha;
    };

    return (
        <div 
            className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={handleClick}
        >
            <div className="aspect-[16/9] overflow-hidden">
                <img 
                    src={imagen || 'https://via.placeholder.com/300x150'} 
                    alt={titulo} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 md:p-5">
                <h2 className="text-lg md:text-xl font-bold text-[#00796B] line-clamp-1">{titulo || 'Sin título'}</h2>
                <p className="text-gray-600 text-sm md:text-base mt-2 line-clamp-3">
                    {descripcion || 'Sin descripción'}
                </p>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <img 
                        src={perfilImagen || 'https://via.placeholder.com/40'} 
                        alt={nombreUsuario} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold text-sm md:text-base">{nombreUsuario || 'Usuario'}</p>
                        <p className="text-gray-500 text-xs md:text-sm">
                            {formatearFecha(fecha)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

TarjetaBlog.defaultProps = {
  imagen: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Blogs//Humboldt.svg",
  titulo: "Ruta Humboldt",
  descripcion: "La Ruta Humboldt es una de las más conocidas y visitadas del Ávila. Con una duración de 5 horas, es ideal para aquellos que buscan una experiencia corta pero intensa.",
  perfilImagen: "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/Imagenes_Perfiles//Humboldt.svg",
  nombreUsuario: "Usuario",
  fecha: "01/01/2025"
};

export default TarjetaBlog;