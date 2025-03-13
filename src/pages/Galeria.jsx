import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import Frame_Galeria from '../components/Frame_Galeria';


export default function Galeria() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <Frame_Galeria/>
      <Footer/>
    </div>
  );
}