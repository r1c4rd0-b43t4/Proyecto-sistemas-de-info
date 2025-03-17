import React from 'react';
import Header_NoSession from '../../components/Header_NoSession';
import Footer from '../../components/Footer';
import VerRutasAd from '../../components/VerRutasAd';


export default function ClienteRutasAdquiridas() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <VerRutasAd/>
      <Footer/>
    </div>
  );
}