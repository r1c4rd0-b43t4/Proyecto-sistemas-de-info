import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import AddImageButton from './AddImageButton';

export default function GuiaGaleria() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('imagenes-galeria')
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) throw error;

            const publicUrls = data.map((file, index) => ({
                src: `${supabase.storage.url}/object/public/imagenes-galeria/${file.name}`,
                alt: file.name,
                originalIndex: index,
            }));

            setImages(publicUrls);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const createColumns = () => {
        const columnCount = 3;
        const items = [
            { type: 'button', key: 'add-button' },
            ...images.map(img => ({ type: 'image', ...img }))
        ];
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

    if (loading)
        return <div className="text-center p-8">Cargando imágenes...</div>;
    if (error)
        return (
            <div className="text-red-500 text-center p-8">Error: {error}</div>
        );

    return (
        <div className="w-full min-h-screen bg-white">

            <div className="relative w-full bg-[#F7F7F8] overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    <div className="relative">
                        <img
                            src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Galeria_Bg.svg"
                            alt="humboldt_rutas"
                            className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg shadow-lg"
                        />
                        <div className="mt-6 sm:mt-8">

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mt-2">
                                <span className="text-teal-600">Galería</span>{' '}
                                <span className="text-[#D76411]">Unimetrail</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Versión para móviles */}
                <div className="md:hidden space-y-4">
                    <div className="mb-6">
                        <AddImageButton onImageAdded={fetchImages} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="grid grid-cols-3 gap-6">
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="space-y-6">
                                {column.map((item) => {
                                    if (item.type === 'button') {
                                        return (
                                            <div key={item.key} className="aspect-square">
                                                <AddImageButton onImageAdded={fetchImages} />
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            key={item.src}
                                            className={`${
                                                item.originalIndex % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]'
                                            } rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300`}
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.alt}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 