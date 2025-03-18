import React, { useEffect, useState } from 'react';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';
import TarjetaBlog from './TarjetaBlog';
import BotonSecundario from './BotonSecundario';

const FrameBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const db = getFirestore(app);

  async function getBlogs() {
    const blogsCollectionRef = collection(db, 'Blogs');
    const querySnapshot = await getDocs(blogsCollectionRef);
    const blogsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setBlogs(blogsList);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="text-teal-600">Historias únicas</span>{' '}
            <span className="text-orange-500">Unimetrail</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {blogs.map(blog => (
            <TarjetaBlog
              key={blog.id}
              id={blog.id}
              imagen={blog.image}
              titulo={blog.title}
              descripcion={blog.description}
              perfilImagen={blog.user_pp}
              nombreUsuario={blog.user}
              fecha={blog.created}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <BotonSecundario text="Agregar blog personal" to="/agregar-blog" />
        </div>
      </div>

      <img 
        src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Avila.svg" 
        className="hidden md:block fixed bottom-0 left-0 w-auto h-auto -z-10 opacity-50" 
        alt="Fondo Avila"
      />
    </div>
  );
};

export default FrameBlogs;