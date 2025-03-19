import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { supabase } from '../../supabaseClient';
import Input from './Input_V1';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router';

const CrearRuta = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [inicio, setInicio] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [distancia, setDistancia] = useState('');
    const [dificultad, setDificultad] = useState('Baja');
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [whatsappLink, setWhatsappLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fecha, setFecha] = useState('');

    const db = getFirestore();
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Solo se permiten archivos de imagen (JPEG, PNG, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen no debe superar los 5MB');
            return;
        }

        setImagen(file);
        setError('');
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagenPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let imageUrl = '';
            if (imagen) {
                const fileExt = imagen.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `rutas/${fileName}`;

                const { error: uploadError, data } = await supabase.storage
                    .from('imagenes')
                    .upload(filePath, imagen);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('imagenes')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const rutaData = {
                name: nombre,
                price: parseFloat(precio),
                start_point: inicio,
                duration: tiempo,
                distance: parseFloat(distancia),
                difficulty: dificultad,
                image: imageUrl,
                whatsappLink,
                date: new Date(fecha),
                quotas: 10,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'Rutas'), rutaData);

            setNombre('');
            setPrecio('');
            setInicio('');
            setTiempo('');
            setDistancia('');
            setDificultad('Baja');
            setImagen(null);
            setImagenPreview(null);
            setWhatsappLink('');
            setFecha('');
            
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error al crear la ruta:', error);
            setError(error.message || 'Error al crear la ruta. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='relative w-screen h-full flex py-20'>
            {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Loader/>
            </div>}
            <div className="flex justify-center items-center h-full w-full lg:w-1/2">
                <div className="flex justify-center items-center flex-col space-y-1">
                    {error && <div className="text-red-500 mb-4">Error: {error}</div>}
                    <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col space-y-5 pt-6">
                        <h1 className="md:text-4xl font-bold text-2xl">
                            <span className="text-[#00796B]">Crear nueva </span>
                            <span className="text-[#D76411]">Ruta</span>
                        </h1>
                        <div className="md:w-full w-1/2">
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Underline_1.svg" alt="Underline" />
                        </div>

                        <div className="w-full max-w-md space-y-4">
                            <Input
                                label="Nombre de la ruta"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            <Input
                                label="Precio"
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />
                            <Input
                                label="Punto de inicio"
                                type="text"
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                                required
                            />
                            <Input
                                label="Tiempo estimado"
                                type="text"
                                value={tiempo}
                                onChange={(e) => setTiempo(e.target.value)}
                                required
                            />
                            <Input
                                label="Distancia (km)"
                                type="number"
                                value={distancia}
                                onChange={(e) => setDistancia(e.target.value)}
                                required
                            />
                            <Input
                                label="Fecha y hora"
                                type="datetime-local"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                            <select
                                value={dificultad}
                                onChange={(e) => setDificultad(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                            <Input
                                label="Link de WhatsApp"
                                type="text"
                                value={whatsappLink}
                                onChange={(e) => setWhatsappLink(e.target.value)}
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700">Imagen de la ruta</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {imagenPreview && (
                                    <img
                                        src={imagenPreview}
                                        alt="Preview"
                                        className="mt-2 max-h-40 rounded-lg"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <BotonSecundario
                                text="Cancelar"
                                onClick={() => navigate('/admin/dashboard')}
                            />
                            <BotonPrimario
                                text="Crear Ruta"
                                type="submit"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearRuta; 