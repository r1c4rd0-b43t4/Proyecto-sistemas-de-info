import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import Frame_1_Login from '../components/Frame_1_ Login';

export default function Login() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header_NoSession/>
      <main className='flex-grow'>
        <Frame_1_Login/>
      </main>
      <Footer/>
    </div>
  );
}


