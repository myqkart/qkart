import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description }) => {
  return (
    <Helmet>
      {/* <title>Nested Title</title> */}
      <meta name="title" content={title} />
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default MetaDecorator;
