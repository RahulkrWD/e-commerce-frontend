import React from "react";
import Layout from "../../components/layout/Layout";
import Filter from "./Filter";
import OrderSearch from "./OrderSearch";
import OrderItems from "./OrderItems";
import styles from "./styles/MyOrder.module.css";

function MyOrder() {
  return (
    <Layout title={"order DeP.com"}>
      <div className={`container ${styles.order_container}`}>
        <Filter />
        <div className="p-3 w-100">
          <OrderSearch />
          <OrderItems />
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder;
