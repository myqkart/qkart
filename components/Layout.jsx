import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Head>
            <title>Q-Kart</title>
            <meta name='description' content='90% off with a great deal. sale in live now. limited time offer.'/>
        </Head>
        <header>
            <Navbar/>
        </header>
        <main className='main-container'>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Layout