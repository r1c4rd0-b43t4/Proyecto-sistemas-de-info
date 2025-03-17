import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import FrameVistaProducto from '../components/FrameVistaProducto';
import Footer from '../components/Footer';



export default function VistaProducto() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <FrameVistaProducto/>
      <Footer/>
    </div>
  );
}