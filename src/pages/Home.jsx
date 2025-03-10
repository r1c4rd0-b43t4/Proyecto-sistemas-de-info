import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Frame_1_Home from '../components/Frame_1_Home';
import Footer from '../components/Footer';
import Frame_2_Home from '../components/Frame_2_Home';
import Frame_3_Home from '../components/Frame_3_Home';
import Frame_4_Home from '../components/Frame_4_Home';
import Frame_5_Home from '../components/Frame_5_Home';



export default function Home() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <Frame_1_Home/>
      <Frame_2_Home/> 
      <Frame_3_Home/>
      <Frame_4_Home/> 
      <Frame_5_Home/>
      <Footer/>
    </div>
  );
}

