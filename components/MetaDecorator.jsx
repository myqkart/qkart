import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description }) => {
  return (
    <Helmet>
      {/* <title>Nested Title</title> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default MetaDecorator;
