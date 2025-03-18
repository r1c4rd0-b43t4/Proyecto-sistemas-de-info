import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';
import VistaDeProducto from '../components/VistaDeProducto';
import Loader from '../loader/Loader';
import Navbar from '../components/Header_NoSession'; // Asegúrate de importar el componente Navbar
import Footer from '../components/Footer'; // Asegúrate de importar el componente Footer

export default function VistaProducto() {
  const { nombreRuta } = useParams();
  const [ruta, setRuta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logged } = React.useContext(UserContext);
  const db = getFirestore();

  useEffect(() => {
    const cargarRuta = async () => {
      if (!nombreRuta) {
        setError('Nombre de ruta no proporcionado');
        setLoading(false);
        return;
      }

      try {
        const rutasRef = collection(db, 'Rutas');
        const q = query(rutasRef, where('name', '==', nombreRuta));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('Ruta no encontrada');
          return;
        }

        const rutaData = querySnapshot.docs[0].data();
        setRuta({
          id: querySnapshot.docs[0].id,
          ...rutaData
        });
      } catch (error) {
        console.error('Error al cargar la ruta:', error);
        setError('Error al cargar la ruta');
      } finally {
        setLoading(false);
      }
    };

    cargarRuta();
  }, [nombreRuta, db]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 py-12 w-screen relative">
      <Navbar /> 
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <VistaDeProducto
          id={ruta.id}
          icono={ruta.image}
          nombreRuta={ruta.name}
          precio={ruta.price}
          inicio={ruta.start_point}
          tiempo={ruta.duration}
          distancia={ruta.distance}
          dificultad={ruta.difficulty}
          cupos={ruta.cupos || 10}
          reviews={ruta.reviews || 0}
          fecha={ruta.fecha || new Date().toLocaleDateString()}
          descripcion={ruta.description || "Sin descripción disponible"}
          imagen={[ruta.image]} 
          imagenes={ruta.images || []}
        />
      </div>
      <Footer />
    </div>
  );
}