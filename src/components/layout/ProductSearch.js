import React, { useEffect, useState } from "react";
import styles from "./ProductSearch.module.css";
import axios from "axios";

function ProductSearch() {
  const [product, setProduct] = useState();

  useEffect(() => {
    async function handleProduct() {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/product/allproduct`
      );
      setProduct(response.data);
    }

    handleProduct();
  });

  return (
    <div className={`d-flex ${styles.search_container}`}>
      <input
        className={`form-control ${styles.search_product}`}
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Search here..."
      />
      <datalist id="datalistOptions">
        {product
          ? product.map((item, index) => (
              <option key={index} value={item.type}></option>
            ))
          : ""}
      </datalist>
    </div>
  );
}

export default ProductSearch;
