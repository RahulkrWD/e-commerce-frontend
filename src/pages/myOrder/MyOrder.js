import React from "react";
import Layout from "../../components/layout/Layout";
import OrderSearch from "./OrderSearch";
import OrderItems from "./OrderItems";

function MyOrder() {
  return (
    <Layout title={"order DeP.com"}>
      <div className="container p-3 w-100 ${styles.order_container">
        <OrderSearch />
        <OrderItems />
      </div>
    </Layout>
  );
}

export default MyOrder;
