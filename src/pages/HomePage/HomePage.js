import React from "react";
import Layout from "../../components/layout/Layout";
import Category from "./Category";
import Carousel from "./Carousel";

function HomePage() {
  return (
    <Layout title={"All products DeP.com"}>
      <div className="container  bg-gradient border">
        <Category />
        <hr />
        <Carousel />
        <hr />
      </div>
    </Layout>
  );
}

export default HomePage;
