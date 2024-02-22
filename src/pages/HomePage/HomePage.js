import React from "react";
import Layout from "../../components/layout/Layout";
import Category from "./Category";
import Carousel from "./Carousel";
import QuickSearch from "./QuickSearch";
import MensDeals from "./MensDeals";
import WomensDeals from "./WomensDeals";

function HomePage() {
  return (
    <Layout title={"All products e-commerce"}>
      <div className="container bg-gradient border">
        <Category />
        <hr />
        <Carousel />
        <hr />
        <QuickSearch />
        <hr />
        <MensDeals />
        <hr />
        <WomensDeals />
      </div>
    </Layout>
  );
}

export default HomePage;
