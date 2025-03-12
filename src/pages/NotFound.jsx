import React from 'react'
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Error_404.svg" alt="Error_404" className='flex justify-center'/>
        <p className='text-teal-600 text-lg'>Parece que la página que estás buscando no existe...</p>
      </div>
      <Footer/>
    </div>
  );
}
