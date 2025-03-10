import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import VistaDeProducto from '../components/VistaDeProducto';




export default function VistaRuta() {
  return (
    <div className='w-screen h-full bg-white text-black'>
      <Header_NoSession/>
      <VistaDeProducto/>
      <Footer/>
    </div>
  );
}