import React from "react";
import styles from "./styles/OrderSearch.module.css";
import Filter from "./Filter";

function OrderSearch() {
  return (
    <div className={`p-2 ${styles.order_search}`}>
      <input
        type="text"
        className={styles.input_search}
        placeholder="Search here..."
      />
      <Filter />
    </div>
  );
}

export default OrderSearch;
