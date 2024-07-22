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
import cryptoJs from "crypto-js";

function PlaceOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const products = useSelector(selectCartItems);
  const navigate = useNavigate();

  const decryptData = (encryptedData, key) =>
    JSON.parse(
      cryptoJs.AES.decrypt(encryptedData, key).toString(cryptoJs.enc.Utf8)
    );
  const userDataString = localStorage.getItem("userData");
  const priceDetails = localStorage.getItem("price");
  let userDataDecrypted, priceDecrypted;
  if (userDataString) {
    userDataDecrypted = decryptData(
      userDataString,
      process.env.REACT_APP_SECRETKEY
    );
  }

  if (priceDetails) {
    priceDecrypted = decryptData(priceDetails, process.env.REACT_APP_SECRETKEY);
  }
  const userID = userDataDecrypted.id;
  useEffect(() => {
    if (!userDataDecrypted.token) {
      navigate("/login");
    }
  }, [navigate, userDataDecrypted.token]);

  async function createOrder() {
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
          userID,
          totalPrice: priceDecrypted.finalPrice,
          products,
          price: priceDecrypted,
        }
      );
      const { orderId } = response.data;
      setOrderId(orderId);
      setOrderPlaced(true);
    } catch (err) {
      console.log("Error during place order", err);
    }
  }

  async function handlePaymentSuccess(paymentId) {
    try {
      await axios.post(`${process.env.REACT_APP_API}/product/payment/success`, {
        order_id: orderId,
        payment_id: paymentId,
      });
      toast.success("Payment successful");
      createOrder();
      navigate("/my-order");
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log("Error during payment", err);
    }
  }

  function handlePayment() {
    const options = {
      key: process.env.REACT_APP_KEY,
      amount: priceDecrypted.finalPrice * 100,
      currency: "INR",
      name: "DeP.com",
      order_id: orderId,
      handler: (response) => {
        handlePaymentSuccess(response.razorpay_payment_id);
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  function handleSubmit(e) {
    e.preventDefault();
    handlePayment();
  }

  return (
    <Layout title="Place Order">
      <div className={styles.order_container}>
        <div className={styles.input_container}>
          <h5 className={styles.title}>Fill your Details</h5>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ margin: "15px" }}
              className={styles.input_field}
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              style={{ margin: "15px" }}
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              style={{ margin: "15px" }}
              label="Phone"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              style={{ margin: "15px" }}
              label="Pincode"
              variant="standard"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <TextField
              className={styles.input_field}
              style={{ margin: "15px" }}
              label="State"
              variant="standard"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <TextField
              style={{ margin: "15px" }}
              className={styles.input_field}
              label="City"
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <TextField
              style={{ margin: "15px" }}
              className={styles.input_field}
              label="Address"
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <center>
              <button className="btn text-bg-danger fw-bold" type="submit">
                Pay Now
              </button>
            </center>
          </form>
        </div>
        <OrderItems />
      </div>
    </Layout>
  );
}
export default PlaceOrder;
