import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import FrameRutas from '../components/FrameRutas';
import Footer from '../components/Footer';



export default function Rutas() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <FrameRutas/>
      <Footer/>
    </div>
  );
}