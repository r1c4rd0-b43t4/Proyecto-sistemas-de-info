import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../credentials';
import Loader from '../loader/Loader';
import Navbar from './Header_NoSession';
import Footer from './Footer';
import TarjetaBlog from './TarjetaBlog'; // Asegúrate de importar el componente TarjetaBlog
import BotonSecundario from './BotonSecundario'; // Asegúrate de importar el componente BotonSecundario

const DetalleBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(app);

    const parseDate = (dateString) => {
        const [datePart, timePart] = dateString.split(', ');
        const [day, month, year] = datePart.split('/');
        const [time, period] = timePart.split(' ');
        const [hours, minutes, seconds] = time.split(':');
        const hours24 = period === 'p. m.' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
        return new Date(year, month - 1, day, hours24, minutes, seconds);
    };

    useEffect(() => {
        const getBlog = async () => {
            try {
                const docRef = doc(db, 'Blogs', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const formattedDate = data.created
                        ? parseDate(data.created).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                        : "Fecha no disponible";
                    setBlog({ id: docSnap.id, ...data, created: formattedDate });
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
        <div className="min-h-screen bg-white mt-30 w-screen relative">
            <Navbar />
            
            <div className="w-1/2 mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                    <div className="text-sm text-gray-500 break-words">
                        {blog.created}
                    </div>

                    <h1 className="text-4xl font-bold break-words">
                        {blog.title}
                    </h1>

                    <div className="text-green-700 break-words">
                        {blog.subtitle || 'Historia de un aventurero en el Ávila'}
                    </div>

                    <div className="prose max-w-none break-words">
                        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {blog.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-8">
                    <div className="mb-5">
                        <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                        <h3 className="text-xl font-semibold mb-4 text-left mt-4 text-green-700">
                            Otros Blogs que pueden interesarte:
                        </h3>
                    </div>

                    <div className="mt-6 border-t pt-6 w-full">
                        <div className="flex flex-col items-center space-y-4">
                            <TarjetaBlog />
                            <TarjetaBlog />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full mt-0 flex justify-center items-center relative z-0">
                <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Caracas.svg" alt="Avila Background" className="w-full h-auto object-contain" />
            </div>

            <Footer />
        </div>
    );
};

export default DetalleBlog;