import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/OrderItems.module.css";
import PriceDetails from "./PriceDetails";
//import { Link } from "react-router-dom";

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
          <div key={index} className={styles.order_items}>
            <div>
              {item.products.map((data, index) => (
                <div key={index} className="d-flex">
                  <img className={styles.order_image} src={data.image} alt="" />
                  <div className={`p-2 mt-2 ${styles.order_details}`}>
                    <h6 className={styles.product_name}>{data.productName}</h6>
                    <h6>{data.type}</h6>
                    <span className="p-2">
                      quantity: <strong>{data.quantity}</strong>
                    </span>
                    <span className="p-2">
                      cost: <strong>&#8377; {data.cost}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 m-2">
              <span>
                Order Id: <strong>{item.orderId}</strong>
              </span>
              <h6>
                Name:{" "}
                <strong>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </strong>
              </h6>
              <h6>
                Email id: <strong>{item.email}</strong>
              </h6>

              <h6>
                Total Price: <strong>&#8377; {item.totalPrice}</strong>
              </h6>
              {item.price.map((data, index) => (
                <PriceDetails key={index} details={data} />
              ))}
              <span>
                Order Status:{" "}
                <strong
                  className="text-bg-success fw-bold p-1"
                  style={{ borderRadius: "5px" }}
                >
                  {item.status}
                </strong>
              </span>
            </div>
          </div>
        ))
      ) : (
        <center>
          <h4>No Data found</h4>
        </center>
      )}
    </div>
  );
}

export default OrderItems;
