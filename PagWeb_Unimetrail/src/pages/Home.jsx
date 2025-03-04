import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Frame_1_Home from '../components/Frame_1_Home';
import Footer from '../components/Footer';



export default function Home() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <Frame_1_Home/>
      <Footer/>

    </div>
  );
}

