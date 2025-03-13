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
    <div className="w-screen h-full p-5">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">
          <span className="text-green-800">Historias únicas</span> <span className="text-orange-500">Unimetrail</span>
        </h1>
      </div>
      <div className='flex justify-center w-full'>
        <div className='grid gap-5 w-full' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {blogs.map(blog => (
            <div key={blog.id} className='p-5 rounded-lg flex flex-col justify-between'>
              <TarjetaBlog
                imagen={blog.imagen}
                titulo={blog.titulo}
                descripcion={blog.descripcion}
                perfilImagen={blog.perfilImagen}
                nombreUsuario={blog.nombreUsuario}
                fecha={blog.fecha}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <BotonSecundario text="Agregar blog personal" to="/agregar-blog" />
      </div>
    </div>
  );
};

export default FrameBlogs;