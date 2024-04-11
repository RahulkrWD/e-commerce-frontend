import React from "react";
import Layout from "../../components/layout/Layout";
// import OrderSearch from "./OrderSearch";
import OrderItems from "./OrderItems";

function MyOrder() {
  return (
    <Layout title={"order DeP.com"}>
      <div className="container p-3 w-100 ${styles.order_container">
        {/* <OrderSearch /> */}
        <h5
          style={{
            borderBottom: "2px solid red",
            padding: "5px 0",
            width: "fit-content",
          }}
        >
          My Order
        </h5>
        <OrderItems />
      </div>
    </Layout>
  );
}

export default MyOrder;
