import React from 'react'
import Header_NoSession from '../components/Header_NoSession'
import CrearBlog from '../components/CrearBlog'
import Footer from '../components/Footer'

export default function Blog() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <CrearBlog/>
      <Footer/>
    </div>
  )
}