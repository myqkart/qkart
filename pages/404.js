import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <h2>It's look like you have lost.</h2>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
