import React from 'react';
import Header_NoSession from '../components/Header_NoSession';
import Footer from '../components/Footer';
import Frame_EditUser from '../components/Frame_EditUser';

export default function EditUser() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <Frame_EditUser/>
      <Footer/>
    </div>
  );
}