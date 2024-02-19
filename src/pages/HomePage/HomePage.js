import React from "react";
import Layout from "../../components/layout/Layout";
import Category from "./Category";
import Carousel from "./Carousel";
import QuickSearch from "./QuickSearch";

function HomePage() {
  return (
    <Layout title={"All products e-commerce"}>
      <Category />
      <Carousel />
      <QuickSearch />
    </Layout>
  );
}

export default HomePage;
