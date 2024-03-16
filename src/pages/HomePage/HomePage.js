import React from "react";
import Layout from "../../components/layout/Layout";
import Category from "./Category";
import Carousel from "./Carousel";
import Deal99 from "./Deal99";

function HomePage() {
  return (
    <Layout title={"All products DeP.com"}>
      <div className="container  bg-gradient border">
        <Category />
        <hr />
        <Carousel />
        <hr />
        <Deal99 />
      </div>
    </Layout>
  );
}

export default HomePage;
