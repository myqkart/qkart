import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description, name }) => (
  <Helmet>
    <title>{name}</title>
    <meta property="og:title" content={title} />
    <meta property="description" content={description} />
    <meta property="og:description" content={description} />
  </Helmet>
);

export default MetaDecorator;
