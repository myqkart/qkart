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
      <div>
      <iFrame
      sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
      style="width: 120px; height: 240px"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      frameborder="0"
      src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=7790997718-21&language=en_IN&marketplace=amazon&region=IN&placement=B01IVVK7PC&asins=B01IVVK7PC&linkId=e138345b595cbac136ea37d565da21be&show_border=true&link_opens_in_new_window=true"
      >
      </iFrame>
      </div>
      <div className="products-container">
        {products?.map((prod) => <Product key={prod._id} product ={prod}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
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
