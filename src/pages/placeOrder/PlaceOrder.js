import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";

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
    <Layout>
      <h1>placeorder</h1>
      <form onSubmit={createOrder}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {!orderPlaced && <button>PlaceOrder</button>}
      </form>

      {orderId && (
        <div>
          <button
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
        </div>
      )}
    </Layout>
  );
}

export default PlaceOrder;
