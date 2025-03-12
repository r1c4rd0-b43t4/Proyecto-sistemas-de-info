import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import Frame_1_Register from '../components/Frame_1_ Register.jsx';


export default function Register() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <Frame_1_Register/>
      <Footer/>
    </div>
  );
}
