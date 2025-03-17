import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { app } from '../../credentials';
import Input from './Input_V1';
import BotonPrimario from './BotonPrimario';
import Loader from '../loader/Loader';

const CrearBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const auth = getAuth(app);
    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title || !description || !image) {
            setError('Por favor, completa todos los campos');
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;

            if (!user) {
                setError('Debes estar autenticado para crear un blog');
                return;
            }

            const blogData = {
                title: title,
                description: description,
                image: image,
                created: new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' }),
                user: user.email,
                user_pp: user.photoURL || '',
            };

            await addDoc(collection(db, 'Blogs'), blogData);
            navigate('/blogs');
        } catch (error) {
            setError('Error al crear el blog: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='relative w-screen h-screen flex pt-5'>
            {loading && <Loader />}
            <div className="flex justify-center items-center h-full w-full lg:w-1/2">
                <div className="flex justify-center items-center flex-col space-y-3">
                    {error && <div className="text-red-500">Error: {error}</div>}
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
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input 
                                titulo="URL de la imagen" 
                                placeholder="Ingresa la URL de la imagen" 
                                type="text" 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Descripción
                                </label>
                                <textarea 
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-[#00796B]"
                                    placeholder="Escribe el contenido del blog"
                                    rows="6"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <BotonPrimario text="Crear Blog" type="submit" className="mt-4 w-full" to={false}/>
                    </form>
                </div>
            </div>
            <div className="hidden md:block">
                <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_Avila.svg" alt="Fondo montaña" className="absolute bottom-0 right-0 w-1/2 h-full object-cover"/>
            </div>
        </div>
    );
};

export default CrearBlog; 