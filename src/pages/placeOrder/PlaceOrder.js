import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import OrderItems from "./OrderItems";
import styles from "./style/PlaceOrder.module.css";
import TextField from "@mui/material/TextField";

function PlaceOrder() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const products = useSelector(selectCartItems);
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const uniqueId = localStorage.getItem("uniqueId");
  const totalPrice = localStorage.getItem("totalprice");
  const storedPricesJson = localStorage.getItem("price");
  const price = JSON.parse(storedPricesJson);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });
  // create order
  async function createOrder(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/product/placeOrder`,
        {
          name,
          email,
          phone,
          pincode,
          city,
          state,
          address,
          uniqueId,
          totalPrice,
          products,
          price,
        }
      );
      const { orderId } = response.data;
      setOrderId(orderId);
      setOrderPlaced(true);
    } catch (err) {
      console.log("error during placeorder");
    }
  }
  // handle payment
  async function handlePaymentSuccess(paymentId) {
    try {
      await axios.post(`${process.env.REACT_APP_API}/product/payment/success`, {
        order_id: orderId,
        payment_id: paymentId,
      });
      toast.success("successfull payment");
      navigate("/my-order");
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log("Error during payment", err);
    }
  }
  return (
    <Layout title={"order DeP.com"}>
      <div className={styles.order_container}>
        <div className={styles.input_container}>
          <h5 className={styles.title}>Fill your Details</h5>
          <form onSubmit={createOrder}>
            <TextField
              className={styles.input_field}
              id="standard-basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              label="Name"
              variant="standard"
            />
            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="Phone"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="Pincode"
              variant="standard"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="State"
              variant="standard"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="City"
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              id="standard-basic"
              label="Address"
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <br />

            {!orderPlaced && (
              <center>
                <button className="btn text-bg-primary fw-bold">
                  PlaceOrder
                </button>
              </center>
            )}
          </form>

          {orderId && (
            <div>
              <center>
                <button
                  className="btn text-bg-danger fw-bold"
                  onClick={() => {
                    const options = {
                      key: `${process.env.REACT_APP_KEY}`,
                      amount: totalPrice * 100,
                      currency: "INR",
                      name: "DeP.com",
                      order_id: orderId,
                      handler: function (response) {
                        handlePaymentSuccess(response.razorpay_payment_id);
                      },
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                  }}
                >
                  Pay Now
                </button>
              </center>
            </div>
          )}
        </div>

        <OrderItems />
      </div>
    </Layout>
  );
}

export default PlaceOrder;
