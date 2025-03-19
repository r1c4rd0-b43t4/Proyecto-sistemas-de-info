import React from 'react'
import Header_NoSession from '../components/Header_NoSession'
import FrameBlogs from '../components/FrameBlogs'
import Footer from '../components/Footer'

export default function Blog() {
  return (
    <div className='container'>
      <Header_NoSession/>
      <div className='w-screen p-40'>
      <FrameBlogs/>
      </div>
      <Footer/>
    </div>
  )
}
