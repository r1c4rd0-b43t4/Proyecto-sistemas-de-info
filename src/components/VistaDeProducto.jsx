import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, setDoc, runTransaction } from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';
import DatosRuta from './DatosRuta';
import BotonPaypal from './BotonPaypal';

const VistaDeProducto = ({ id, icono, dificultad, distancia, tiempo, imagenes = [], nombreRuta, precio, cupos: cuposIniciales, reviews, inicio, fecha, descripcion }) => {
  const [loading, setLoading] = useState(false);
  const [cuposActuales, setCuposActuales] = useState(cuposIniciales);
  const { user, logged } = React.useContext(UserContext);
  const db = getFirestore();


  useEffect(() => {
    const fetchCupos = async () => {
      try {
        if (id) {
          const rutaRef = doc(db, 'Rutas', id); 
          const rutaDoc = await getDoc(rutaRef);
          
          if (rutaDoc.exists()) {
            const cupos = rutaDoc.data().cupos;
            setCuposActuales(cupos);
          } else {
            console.error('La ruta no existe al cargar cupos. ID:', id);
          }
        }
      } catch (error) {
        console.error("Error al cargar los cupos:", error);
      }
    };

    fetchCupos();
  }, [db, id]);

  const handleCompraExitosa = async () => {
    if (!logged) {
      alert('Debes iniciar sesión para comprar una ruta');
      return;
    }
  
    try {
      setLoading(true);
      

      await runTransaction(db, async (transaction) => {
        const rutaRef = doc(db, 'Rutas', id);
        const rutaDoc = await transaction.get(rutaRef);
        
        if (!rutaDoc.exists()) {
          console.error('La ruta no existe en la colección Rutas. ID:', id);
          throw new Error('La ruta no existe');
        }
        
        const cuposActuales = rutaDoc.data().cupos;
        
        if (cuposActuales <= 0) {
          throw new Error('No hay cupos disponibles para esta ruta');
        }
        

        const userRef = doc(db, 'usuarios', user.uid);
        const userDoc = await transaction.get(userRef);
        


        transaction.update(rutaRef, {
          cupos: cuposActuales - 1
        });

        if (!userDoc.exists()) {

          transaction.set(userRef, {
            email: user.email,
            role: 'cliente',
            createdAt: new Date().toISOString(),
            rutasCompradas: [{
              rutaId: id,
              nombre: nombreRuta,
              precio: precio,
              fechaCompra: new Date().toISOString(),
              imagen: icono
            }],
            reseñas: []
          });
        } else {

          const userData = userDoc.data();
          const rutasCompradas = userData.rutasCompradas || [];
          
          transaction.update(userRef, {
            rutasCompradas: [...rutasCompradas, {
              rutaId: id,
              nombre: nombreRuta,
              precio: precio,
              fechaCompra: new Date().toISOString(),
              imagen: icono
            }]
          });
        }
      });
  

      setCuposActuales(prev => prev - 1);
      alert('¡Compra exitosa! La ruta ha sido agregada a tu cuenta.');
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert(`Error: ${error.message || 'Error al procesar la compra. Por favor, intenta nuevamente.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative w-11/12 p-4 bg-[#F5F5F5] shadow-lg rounded-2xl overflow-hidden h-screen my-30 ">
      <div className="grid gap-5 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="bg-gray-200 flex flex-col items-center justify-center">
          <img src={icono} alt="Producto" className="w-3/4 mb-4" />
          <div className="grid grid-cols-4 gap-1 w-3/4 justify-items-center mb-4">
            {imagenes.map((imagen, index) => (
              <img key={index} src={imagen} alt={`Producto pequeño ${index}`} className="w-4/4" />
            ))}
          </div>
        </div>
        <div className="bg-white p-4 flex flex-col justify-start">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-0 break-words">{nombreRuta}</h1>
          <div className="w-3/4 mb-0 mt-0">
            <DatosRuta tiempo={tiempo} distancia={distancia} dificultad={dificultad} fondo={"#ffffff"} />
          </div>
          <div className="flex items-center mb-4 overflow-hidden">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">${precio}</h1>
            <p className="text-xl sm:text-2xl lg:text-3xl ml-2 break-words" style={{ color: '#77878F' }}>/reserva</p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-sm sm:text-base lg:text-lg ml-2 break-words" style={{ color: '#77878F' }}>{reviews}</p>
          </div>
          <hr className="w-full border-t-2 border-gray-300 mt-4" />
          <p className="text-center font-semibold mt-4 text-xs sm:text-sm lg:text-base">fecha:{fecha}</p>
          <div className="mt-4 text-left">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">Descripción</h3>
            <p className="text-base sm:text-lg lg:text-xl break-words">{descripcion}</p>
            <p className="text-base sm:text-lg lg:text-xl text-green-500 break-words">
              <span className="font-bold text-green-700">{cuposActuales}</span> cupos disponibles
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            {logged ? (
              <BotonPaypal 
                precio={precio} 
                onSuccess={handleCompraExitosa} 
                disabled={loading || cuposActuales <= 0} 
              />
            ) : (
              <p className="text-gray-600">Inicia sesión para comprar esta ruta</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaDeProducto;