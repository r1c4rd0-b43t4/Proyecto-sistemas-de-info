import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';

export default function Blog() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <div className="min-h-screen py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
        {/* Aquí irá el contenido del blog */}
      </div>
      <Footer/>
    </div>
  );
}
