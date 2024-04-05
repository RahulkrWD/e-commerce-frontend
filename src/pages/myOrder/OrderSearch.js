import React from "react";
import styles from "./styles/OrderSearch.module.css";

function OrderSearch() {
  return (
    <div className={`p-2 ${styles.order_search}`}>
      <input
        type="text"
        className={styles.input_search}
        placeholder="Search here..."
      />
      <button className="btn text-bg-primary m-3 fs-5">Search</button>
    </div>
  );
}

export default OrderSearch;
