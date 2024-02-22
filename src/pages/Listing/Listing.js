import React from "react";
import Mobile from "./Mobile";
import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";

function Listing() {
  const { search } = useLocation();
  const product = search.split("?")[1];
  const title = product.split("=")[0];
  return (
    <Layout title={`${title} e-commerce`}>
      <Mobile />
    </Layout>
  );
}

export default Listing;
