import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/MyOrder.module.css";
import PriceDetails from "./PriceDetails";
import cryptoJs from "crypto-js";
import Loading from "../../components/layout/Loading";

function MyOrder() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const userDataString = localStorage.getItem("userData");
  let dataDecrypted = null;

  if (userDataString) {
    try {
      const bytes = cryptoJs.AES.decrypt(
        userDataString,
        process.env.REACT_APP_SECRETKEY
      );
      dataDecrypted = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
    }
  }

  useEffect(() => {
    if (!dataDecrypted?.token) {
      navigate("/home");
    }
  }, [dataDecrypted, navigate]);

  useEffect(() => {
    const handleOrder = async () => {
      if (dataDecrypted?.id) {
        setLoading(true); // Start loading when request starts
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}/product/order?id=${dataDecrypted.id}`
          );
          if (response.data.success) {
            setOrder(response.data.order.reverse());
          } else {
            console.warn("No orders found");
          }
        } catch (err) {
          console.error("Server error, please try again", err);
        } finally {
          setLoading(false); // Stop loading after data is fetched
        }
      }
    };

    // Trigger the order fetch only if user is authenticated and id exists
    handleOrder();
  }, [dataDecrypted?.id]); // Dependency array ensures the request is fired only once

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loading />
        </div>
      )}

      <Layout title={"Order DeP.com"}>
        <div className={`container p-3 w-100 ${styles.order_container}`}>
          <h5
            style={{
              borderBottom: "2px solid red",
              padding: "5px 0",
              width: "fit-content",
            }}
          >
            My Order
          </h5>
          <div>
            {order.length > 0 ? (
              order.map((item, index) => (
                <div key={index} className={styles.order_items}>
                  <div>
                    {item.products.map((data, index) => (
                      <div key={index} className="d-flex">
                        <img
                          className={styles.order_image}
                          src={data.image}
                          alt=""
                        />
                        <div className={`p-2 mt-2 ${styles.order_details}`}>
                          <h6 className={styles.product_name}>
                            {data.productName}
                          </h6>
                          <h6>{data.type}</h6>
                          <span className="p-2">
                            Quantity: <strong>{data.quantity}</strong>
                          </span>
                          <span className="p-2">
                            Cost: <strong>&#8377; {data.cost}</strong>
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
                <h4>No Data Found</h4>
              </center>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default MyOrder;
