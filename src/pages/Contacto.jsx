import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import FormContacto from '../components/FormContacto';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header_NoSession />
      <div className="flex-1 flex items-center justify-center">
        <FormContacto />
      </div>
      <Footer />
    </div>
  );
}
