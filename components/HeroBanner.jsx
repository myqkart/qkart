import React, { useEffect, useState } from "react";
import { urlFor } from "../lib/client";

const utcToGmt = 19800000;

const tomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.toISOString();
  const newDate = JSON.stringify(new Date(tomorrow)).slice(1, 11);
  return newDate;
};

const HeroBanner = ({ heroBanner }) => {
  const initDifference = +new Date(tomorrowDate()) - +new Date() - utcToGmt;
  const [timeLeft, setTimeLeft] = useState({});
  const [difference, setDifference] = useState(initDifference);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
      setDifference(initDifference);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="hero-banner-container">
      <div>
        <p className="bats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <div>
            {Object.keys(timeLeft).length !== 0 ? (
              <p className="btn">
                {timeLeft?.days +
                  "D : " +
                  timeLeft?.hours +
                  "H : " +
                  timeLeft?.minutes +
                  "M : " +
                  timeLeft?.seconds +
                  "S"}
              </p>
            ) : (
              <p className="btn">Shop Now</p>
            )}
            {/* <p>aiwejfoasnfv</p> */}
          </div>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
