import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Products from "../Listing/Products";
import styles from "../Listing/stylesheet/Listing.module.css";

function RelatedProduct() {
  const [products, setProducts] = useState();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const type = pathname.split("&")[1];

  useEffect(() => {
    async function handleRelated() {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/product/product/${id}?type=${type}`
      );
      setProducts(response.data);
    }
    handleRelated();
  });
  return (
    <div className={`w-75 ${styles.product_area}`}>
      <Products product={products} />
    </div>
  );
}

export default RelatedProduct;
