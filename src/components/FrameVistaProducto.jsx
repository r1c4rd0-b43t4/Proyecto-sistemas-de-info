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
      const q = query(productosCollectionRef, where("name", "==", nombreRuta));
      const querySnapshot = await getDocs(q);
      const productoData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))[0];
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
    <div>
      {loading ? (
        <p>Cargando...</p> 
      ) : producto ? ( 
        <VistaDeProducto
          icono={producto.icono}
          dificultad={producto.dificultad}
          distancia={producto.distancia}
          tiempo={producto.duracion}
          imagenes={producto.imagenes}
          nombreRuta={producto.name}
          precio={producto.precio}
          cupos={producto.cupos}
          reviews={producto.reviews}
          inicio={producto.startPoint}
          fecha={producto.fecha}
          descripcion={producto.descripcion}
        />
      ) : (
        <p>No se encontró la ruta.</p>
      )}
    </div>
  );
};

export default FrameVistaProducto;
