import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({products, bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner ={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Branded and refurbished both available</p>
      </div>
      <div className="products-container">
        {products?.map((prod) => <Product key={prod._id} product ={prod}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"] | order(_createdAt desc)';
  const products = await client.fetch(query);

  const query2 = '*[_type == "banner"]';
  const bannerData = await client.fetch(query2);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

export default Home;
