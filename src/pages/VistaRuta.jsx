import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import VistaDeProducto from '../components/VistaDeProducto';
import Humboldt from '../assets/humboldt.svg';




export default function Home() {
  return (
    <div className='w-screen h-full bg-white text-black'>
      <Header_NoSession/>
      <VistaDeProducto icono={Humboldt}/>
      <Footer/>
    </div>
  );
}