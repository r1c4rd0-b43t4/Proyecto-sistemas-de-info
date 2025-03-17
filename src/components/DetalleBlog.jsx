import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../credentials';
import Loader from '../loader/Loader';
import Navbar from './Header_NoSession';

const DetalleBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(app);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const docRef = doc(db, 'Blogs', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Blog no encontrado');
                }
            } catch (error) {
                console.error("Error al obtener el blog:", error);
                setError('Error al cargar el blog');
            } finally {
                setLoading(false);
            }
        };

        getBlog();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <BotonSecundario text="Volver a blogs" onClick={() => navigate('/blogs')} />
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-4 text-sm text-gray-500">
                    {new Date(blog.created).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>

                <h1 className="text-4xl font-bold mb-6">
                    {blog.title}
                </h1>

                <div className="text-green-700 mb-6">
                    {blog.subtitle || 'Historia de un aventurero en el Ávila'}
                </div>

                <div className="mb-8">
                    <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {blog.description}
                    </p>
                </div>

                <div className="mt-12 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Otros Blogs que pueden interesarte:
                    </h3>
                    {/* Aquí podrías agregar una lista de blogs relacionados */}
                </div>
            </div>
        </div>
    );
};

export default DetalleBlog; 