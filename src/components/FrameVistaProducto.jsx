import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getDocs, getFirestore, collection, query, where } from "firebase/firestore";
import { app } from '../../credentials';
import VistaDeProducto from './VistaDeProducto';

const FrameVistaProducto = () => {
  const { nombreRuta } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true); 
  const db = getFirestore(app);

  async function getProducto() {
    try {
      setLoading(true);
      const productosCollectionRef = collection(db, 'Rutas');
      const q = query(productosCollectionRef, where("name", "==", decodeURIComponent(nombreRuta)));
      const querySnapshot = await getDocs(q);
      const productoData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date?.seconds ? new Date(data.date.seconds * 1000).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) : "Fecha no disponible"
        };
      })[0];

      setProducto(productoData);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducto();
  }, [nombreRuta]);

  return (
    <div className='flex justify-center w-screen'>
      {loading ? (
        <p>Cargando...</p> 
      ) : producto ? ( 
        <VistaDeProducto
          icono={producto.image}
          dificultad={producto.difficulty}
          distancia={producto.distance}
          tiempo={producto.duration}
          imagenes={producto.images}
          nombreRuta={producto.name}
          precio={producto.price}
          cupos={producto.quotas}
          reviews={producto.reviews}
          inicio={producto.startPoint}
          fecha={producto.date} 
          descripcion={producto.description}
        />
      ) : (
        <p>No se encontró la ruta.</p>
      )}
    </div>
  );
};

export default FrameVistaProducto;
