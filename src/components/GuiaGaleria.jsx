import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';

export default function GuiaGaleria() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.storage
                .from('imagenes-galeria')
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) throw error;

            const imagesData = data.map((file) => ({
                name: file.name,
                url: `${supabase.storage.url}/object/public/imagenes-galeria/${file.name}`,
                path: file.name
            }));
            
            setImages(imagesData);
        } catch (error) {
            console.error('Error al cargar imágenes:', error);
            setError('Error al cargar las imágenes');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            setError(null);
            
            const timestamp = Date.now();
            const uniqueName = `${timestamp}-${file.name}`;
            
            const { error: uploadError } = await supabase.storage
                .from('imagenes-galeria')
                .upload(uniqueName, file);

            if (uploadError) throw uploadError;
            
            await loadImages();
        } catch (error) {
            console.error('Error al subir imagen:', error);
            setError('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imagePath) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
            try {
                setError(null);
                const { error: deleteError } = await supabase.storage
                    .from('imagenes-galeria')
                    .remove([imagePath]);

                if (deleteError) throw deleteError;
                
                await loadImages();
            } catch (error) {
                console.error('Error al eliminar imagen:', error);
                setError('Error al eliminar la imagen');
            }
        }
    };

    // Método para distribuir los items en columnas
    const createColumns = () => {
        const columnCount = 3;
        const items = [{ isButton: true }, ...images];
        const rows = Math.ceil(items.length / columnCount);
        const columns = Array.from({ length: columnCount }, () => []);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columnCount; col++) {
                const index = row * columnCount + col;
                if (index < items.length) {
                    columns[col].push(items[index]);
                }
            }
        }
        return columns;
    };

    const columns = createColumns();

    if (loading) {
        return <div className="text-center p-8">Cargando imágenes...</div>;
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-8">Error: {error}</div>
        );
    }

    return (
        <div className="w-screen h-full">
            <div className="md:px-20 px-5 flex items-center bg-[#F7F7F8] w-screen md:h-screen">
                <div className="md:w-full h-fit w-screen pt-20">
                    <img
                        src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg"
                        alt="humboldt_rutas"
                        className="object-cover w-full md:h-120"
                    />
                    <p className="relative md:bottom-14 bottom-5 left-0 md:text-3xl text-sm text-teal-600">
                        Recuerdos del Ávila
                    </p>
                    <h1 className="md:text-9xl text-4xl font-bold">
                        <span className="text-teal-600">Galería</span>{' '}
                        <span className="text-[#D76411]">Unimetrail</span>
                    </h1>
                </div>
            </div>

            {/* Versión para móviles */}
            <div className="md:hidden flex flex-col gap-4 p-10 w-full">
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={uploading}
                    />
                    <label htmlFor="image-upload">
                        <BotonPrimario
                            text={uploading ? 'Subiendo...' : 'Subir Imagen'}
                            onClick={() => document.getElementById('image-upload').click()}
                            disabled={uploading}
                        />
                    </label>
                </div>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${
                            index % 2 === 0 ? 'h-120' : 'h-60'
                        } w-full relative group`}
                    >
                        <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover rounded-lg object-center"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <BotonSecundario
                                text="Eliminar"
                                onClick={() => handleDeleteImage(image.path)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Versión para pantallas md y superiores */}
            <div className="hidden md:flex justify-center gap-4 p-10 w-full">
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-4 flex-1">
                        {column.map((item, index) => {
                            if (item.isButton) {
                                return (
                                    <div key={`add-button-${colIndex}-${index}`} className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id={`image-upload-${colIndex}`}
                                            disabled={uploading}
                                        />
                                        <label htmlFor={`image-upload-${colIndex}`}>
                                            <BotonPrimario
                                                text={uploading ? 'Subiendo...' : 'Subir Imagen'}
                                                onClick={() => document.getElementById(`image-upload-${colIndex}`).click()}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={item.url}
                                    className={`${
                                        index % 2 === 0 ? 'h-120' : 'h-60'
                                    } w-full relative group`}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg object-center"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                        <BotonSecundario
                                            text="Eliminar"
                                            onClick={() => handleDeleteImage(item.path)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
} 