import Link from 'next/link'
import React from 'react'
import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
        <p>2022 Q-Kart All rights reserved</p>
        <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
        </p>
        <div className='buttons'>
      
        <Link className='col' href={`/help/AboutUs`}>About Us</Link> &emsp;
        <Link className='col' href={`/help/ContactUs`}>Contact Us</Link>
        </div>
    </div>
  )
}

export default Footer