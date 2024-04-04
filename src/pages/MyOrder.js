import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyOrder() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const uniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function handleOrder() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/order?id=${uniqueId}`
        );
        if (response.data.success) {
          setOrder(response.data.order.reverse());
        }
      } catch (err) {
        console.log("server error, Please try again", err);
      }
    }
    handleOrder();
  }, [uniqueId]);

  return (
    <Layout title={"my-order DeP.com"}>
      {order.length > 0 ? (
        order.map((item, index) => (
          <div key={index}>
            <h1>{item.name}</h1>
          </div>
        ))
      ) : (
        <div>
          <h1>No orders found</h1>
        </div>
      )}
    </Layout>
  );
}

export default MyOrder;
