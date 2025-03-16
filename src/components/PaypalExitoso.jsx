import React from 'react';
import { useNavigate } from 'react-router';
import BotonPrimario from './BotonPrimario';

const PaypalExitoso = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Transacción Exitosa!</h1>
        <p className="text-lg mb-6">Gracias por tu compra. Tu transacción ha sido completada con éxito.</p>
        <BotonPrimario text="Volver al Inicio" onClick={handleBackToHome} />
      </div>
    </div>
  );
};

export default PaypalExitoso;