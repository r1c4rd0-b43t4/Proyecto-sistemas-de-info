import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import PaypalFallido from '../components/PaypalFallido';


export default function PagoFallido() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <PaypalFallido/>
      <Footer/>
    </div>
  );
}