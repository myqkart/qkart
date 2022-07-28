import React, { useEffect, useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const calculateTimeLeft = () => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  let difference = +new Date("07/29/2022") - new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const HeroBanner = ({ heroBanner }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    console.log("timeLeft : ", timeLeft);
    // console.log('timer : ', timer);
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
          <Link href="/">
            <button type="button">
              {timeLeft.days +
                "D : " +
                timeLeft.hours +
                "H : " +
                timeLeft.minutes +
                "M : " +
                timeLeft.seconds +
                "S"}
            </button>
          </Link>
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
