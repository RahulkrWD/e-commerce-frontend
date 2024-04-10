import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import FilterItems from "./FilterItems";
import axios from "axios";
import Products from "./Products";
import styles from "./stylesheet/Listing.module.css";

function Listing() {
  const [products, setProducts] = useState();
  const { id } = useParams();
  const type = id.split("&")[1];
  const value = id.split("&")[0];

  let url;
  if (type === undefined) {
    url = `${process.env.REACT_APP_API}/product/product/${id}`;
  } else {
    url = `${process.env.REACT_APP_API}/product/product/${value}?type=${type}`;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    }
    fetchData();
  }, [url]);
  return (
    <Layout title={"listing DeP.com"}>
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
