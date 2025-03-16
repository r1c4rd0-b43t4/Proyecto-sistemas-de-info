import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import PaypalExitoso from '../components/PaypalExitoso';


export default function Register() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <PaypalExitoso/>
      <Footer/>
    </div>
  );
}