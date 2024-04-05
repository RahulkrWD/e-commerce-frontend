import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";

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
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ minHeight: "50vh" }}
        >
          <Loading />
        </div>
      )}
    </Layout>
  );
}

export default MyOrder;
