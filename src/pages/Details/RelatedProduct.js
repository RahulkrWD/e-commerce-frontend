import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Products from "../Listing/Products";

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
    <div>
      <Products product={products} />
    </div>
  );
}

export default RelatedProduct;
