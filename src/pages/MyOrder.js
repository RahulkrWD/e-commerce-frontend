import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  });
  return (
    <Layout title={"my-order e-commerce"}>
      <h1>my order</h1>
    </Layout>
  );
}

export default MyOrder;
