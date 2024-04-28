'use client';
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Animation = ({ children }: any) => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div data-aos="zoom-in">
      {children}
    </div>
  )
}

export default Animation