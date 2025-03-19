import React from 'react';
import { useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';

const PaypalFallido = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-red-50 relative overflow-hidden">
      <img 
        src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Avila.svg" 
        className="absolute bottom-0 left-0 w-full h-auto opacity-20 z-0" 
        alt="Fondo Avila"
      />
      
      <div className="absolute top-0 right-0 w-64 h-64 -mr-12 -mt-12 bg-red-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 -ml-16 -mb-16 bg-red-300 rounded-full opacity-30"></div>
      
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center z-10 max-w-lg mx-4">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Transacción Fallida</h1>
        <p className="text-lg mb-2">Lo sentimos, no pudimos procesar tu pago correctamente.</p>
        <p className="text-gray-600 mb-8">Por favor, intenta nuevamente o contacta con soporte si el problema persiste.</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <BotonPrimario text="Intentar Nuevamente" onClick={handleTryAgain} />
          <BotonPrimario text="Volver al Inicio" onClick={handleBackToHome} />
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6 bg-white bg-opacity-80 p-3 rounded-lg shadow z-10">
        <p className="text-gray-600 text-sm">Estamos aquí para ayudarte si necesitas asistencia.</p>
      </div>
    </div>
  );
};

export default PaypalFallido;