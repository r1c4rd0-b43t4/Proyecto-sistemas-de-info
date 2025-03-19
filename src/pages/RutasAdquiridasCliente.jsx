import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import ClienteRutasAdquiridas from '../components/ClienteRutasAdquiridas';
import Footer from '../components/Footer';



export default function RutasAdquiridasCliente() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <ClienteRutasAdquiridas/>
      <Footer/>
    </div>
  );
}