import Link from "next/link";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [reached, setReached] = useState(0);
  const [variants, setVariants] = useState(0);
  const [customer, setCustomer] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (reached !== 41180) setReached((prev) => prev + 71);
      if (customer !== 120480) setCustomer((prev) => prev + 251);
      if (variants !== 18258) setVariants((prev) => prev + 51);
    }, 1);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div className="container">
        <div className="logo reviews p-5">
          Q-Kart | Delivering your happiness to your door.
        </div>
      </div>
      <div>
        <div className="container">
          <div className="card">
            <div className="p-3">
              <p>
                We are delivering your dreams and hopes. Our goal is to make
                every person digitaly smart.
              </p>
            </div>
          </div>
          <div className="row p-5">
            <div className="product-detail-desc row d-flex justify-content-center">
              <h1 className="col-auto">we have reached</h1>
              <h1 className="reviews col-auto">{reached}+</h1>
              <h1 className="col-auto pt-4">customers</h1>
            </div>
          </div>
          <div className="card p-5">
            <div className="product-detail-desc row d-flex justify-content-center">
              <h1 className="col-auto">Products variants</h1>
              <h1 className="reviews col-auto">{variants}+</h1>
              <h1 className="col-auto pt-4">Branded</h1>
            </div>
          </div>
          <div className="p-5">
            <div className="product-detail-desc row d-flex justify-content-center">
              <h1 className="col-auto">Customer reached</h1>
              <h1 className="reviews col-auto">{customer}+</h1>
              <h1 className="col-auto pt-4">Globaly</h1>
            </div>
          </div>

          <div className="card">
            <div className="p-3">
              <div className="row d-flex">
                <p className="col-8 p-4">
                  Buy amazing products with amazimg offers and make yourself
                  digitaly smart. For any query or help visit
                </p>
                <p className="reviews col">
                  <Link href={`/help/ContactUs`}>Contact page</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
