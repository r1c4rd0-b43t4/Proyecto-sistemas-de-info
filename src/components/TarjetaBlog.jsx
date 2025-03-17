import React from 'react';
import { useNavigate } from 'react-router';

const TarjetaBlog = ({ id, imagen, titulo, descripcion, perfilImagen, nombreUsuario, fecha }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${id}`);
    };

    return (
        <div 
            className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={handleClick}
        >
            <div className="h-[150px] overflow-hidden">
                <img 
                    src={imagen || 'https://via.placeholder.com/300x150'} 
                    alt={titulo} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold text-[#00796B] line-clamp-1">{titulo || 'Sin título'}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {descripcion || 'Sin descripción'}
                </p>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <img 
                        src={perfilImagen || 'https://via.placeholder.com/40'} 
                        alt={nombreUsuario} 
                        className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                        <p className="font-semibold text-sm">{nombreUsuario || 'Usuario'}</p>
                        <p className="text-xs text-gray-500">{fecha || 'Fecha no disponible'}</p>
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