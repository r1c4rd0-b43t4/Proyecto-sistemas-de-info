import React, { useState } from 'react'; 
import { supabase } from '../../supabaseClient';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Input from './Input_V1';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router';

const CrearBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const auth = getAuth();
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

        setImage(file);
        setError('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadImage = async (file) => {
        try {
            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const fileName = `${timestamp}.${fileExt}`;
            

            const { data, error: uploadError } = await supabase.storage
                .from('blogs')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Error de subida:', uploadError);
                throw new Error('Error al subir la imagen: ' + uploadError.message);
            }


            const { data: { publicUrl } } = supabase.storage
                .from('blogs')
                .getPublicUrl(fileName);

            return publicUrl;
        } catch (error) {
            console.error('Error en uploadImage:', error);
            throw new Error('Error al procesar la imagen: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!auth.currentUser) {
                throw new Error('Debe iniciar sesión para crear un blog');
            }

            if (!title || !content || !image) {
                throw new Error('Por favor complete todos los campos');
            }

            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImage(image);
            }

            const blogData = {
                title,
                description: content,
                image: imageUrl,
                user: auth.currentUser.email,
                user_pp: auth.currentUser.photoURL || '',
                created: new Date().toLocaleString('es-VE', { 
                    timeZone: 'America/Caracas',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };


            await addDoc(collection(db, 'Blogs'), blogData);

            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            navigate('/blogs');
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            setError(error.message || 'Error al crear el blog. Por favor, intente nuevamente.');
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
                            <span className="text-[#00796B]">Crear nuevo </span>
                            <span className="text-[#D76411]">Blog</span>
                        </h1>
                        <div className="md:w-full w-1/2">
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Underline_1.svg" alt="Underline" />
                        </div>

                        <div className='space-y-2 md:w-full'>
                            <Input 
                                titulo="Título" 
                                placeholder="Ingresa el título del blog" 
                                type="text" 
                                name="title"
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            
                            <div className="space-y-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Imagen
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={loading}
                                    />
                                    <label htmlFor="image-upload">
                                        <div className="w-full h-48 border-2 border-dashed border-teal-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-teal-50 transition-colors">
                                            {imagePreview ? (
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <div className="text-teal-600">
                                                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm">Haz clic para seleccionar una imagen</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Contenido
                                </label>
                                <textarea 
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#00796B]"
                                    placeholder="Escribe el contenido del blog"
                                    rows="6"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <BotonPrimario 
                                text={loading ? "Creando..." : "Crear Blog"} 
                                type="submit" 
                                disabled={loading}
                            />
                            <BotonSecundario 
                                text="Cancelar" 
                                onClick={() => window.history.back()}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:block">
                <img 
                    src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" 
                    alt="Fondo montaña" 
                    className="absolute bottom-0 right-0 w-1/2 h-full object-cover -z-10"
                />
            </div>
        </div>
    );
};

export default CrearBlog; 