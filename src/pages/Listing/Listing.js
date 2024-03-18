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
  const value = search.split("=")[1];
  const type = search.split("&")[1];

  const url = `${process.env.REACT_APP_API}/product/product?category=${value}${
    type ? `&type=${type}` : ""
  }`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {}
    }
    fetchData();
  }, [value]);
  return (
    <Layout title={`${value} DeP.com`}>
      <div className={` ${styles.listing}`}>
        <div className={styles.filter_area}>
          <FilterItems filter={setProducts} />
        </div>

        <div className={`w-75 ${styles.product_area}`}>
          <Products product={products} />
        </div>
      </div>
    </Layout>
  );
}

export default Listing;
