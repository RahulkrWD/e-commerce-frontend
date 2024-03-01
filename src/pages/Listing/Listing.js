import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";
import FilterItems from "./FilterItems";
import axios from "axios";
import Others from "./Others";

function Listing() {
  const [products, setProducts] = useState();
  const { search } = useLocation();
  const value = search.split("?")[1].split("=")[0].toLowerCase();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/${value}`
        );
        setProducts(response.data);
      } catch (err) {}
    }
    fetchData();
  }, [value]);
  return (
    <Layout title={`${value} e-commerce`}>
      <div className=" pt-5 d-flex">
        <div style={{ paddingLeft: "7%" }}>
          <FilterItems filter={setProducts} />
        </div>

        <div className="w-75 container">
          <Others product={products} />
        </div>
      </div>
    </Layout>
  );
}

export default Listing;
