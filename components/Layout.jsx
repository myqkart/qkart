import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Helmet>
        <meta name="title" content="Q-Kart"></meta>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
