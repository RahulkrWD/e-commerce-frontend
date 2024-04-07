import React from "react";
import styles from "./ProductSearch.module.css";

function ProductSearch() {
  return (
    <div className={styles.search_container}>
      <input
        className={styles.search_product}
        type="text"
        placeholder="Search Here.."
      />
    </div>
  );
}

export default ProductSearch;
