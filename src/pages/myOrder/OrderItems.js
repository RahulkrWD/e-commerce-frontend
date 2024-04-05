import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";

function OrderItems() {
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
    <div>
      {order.length > 0 ? (
        order.map((item, index) => (
          <div key={index}>
            {item.products.map((data, index) => (
              <div key={index}>
                <img className="w-25" src={data.image} alt="" />
                <h6>{data.details}</h6>
                <span className="p-2">quantity: {data.quantity}</span>
                <span className="p-2">total price; {data.totalPrice}</span>
              </div>
            ))}
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
    </div>
  );
}

export default OrderItems;
