import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";
import FilterItems from "./FilterItems";
import axios from "axios";
import Products from "./Products";
import styles from "./stylesheet/Listing.module.css";

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
    <Layout title={`${value} DeP.com`}>
      <div className={`${styles.listing}`}>
        <div style={{ paddingLeft: "7px" }}>
          <FilterItems filter={setProducts} />
        </div>

        <div className="w-75">
          <Products product={products} />
        </div>
      </div>
    </Layout>
  );
}

export default Listing;
