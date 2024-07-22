import React, { useState, useEffect } from "react";
import styles from "./styles/PriceDetails.module.css";
import TextField from "@mui/material/TextField";
import CryptoJS from "crypto-js";

function PriceDetails({ price }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = price.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalPrice(total);
  }, [price]);

  useEffect(() => {
    function applyCoupon() {
      const matchedCoupon = coupons.find((c) => c.card === coupon);
      if (matchedCoupon && totalPrice >= 400) {
        setDiscount(matchedCoupon.price);
      } else {
        setDiscount(0);
      }
    }
    applyCoupon();
  });

  let delivery = totalPrice > 400 ? 0 : 35;
  let finalPrice = totalPrice + delivery - discount;
  const prices = {
    price: totalPrice,
    discount: discount,
    delivery: delivery,
    finalPrice: finalPrice,
  };

  const priceDataString = CryptoJS.AES.encrypt(
    JSON.stringify(prices),
    process.env.REACT_APP_SECRETKEY
  ).toString();
  localStorage.setItem("price", priceDataString);

  const coupons = [
    { card: "100DEP", price: 100, message: "Discount 100" },
    { card: "50DEP", price: 50, message: "Discount 50" },
    { card: "FIRSTDEP", price: 200, message: "Discount 100" },
  ];

  return (
    <div className={styles.price_details}>
      <h4 className={`text-center ${styles.price_heading}`}>Price Details</h4>
      <p className="border-bottom p-1">
        Price: <strong style={{ float: "right" }}>&#8377;{totalPrice}</strong>
      </p>
      <p className="border-bottom p-1">
        Discount: <strong style={{ float: "right" }}>&#8377;{discount}</strong>
      </p>
      <p className="border-bottom p-1">
        Delivery: <strong style={{ float: "right" }}> &#8377;{delivery}</strong>
      </p>
      <p className="p-1">
        Final Price:
        <strong style={{ float: "right" }}>&#8377;{finalPrice}</strong>
      </p>
      <TextField
        onChange={(e) => setCoupon(e.target.value)}
        id="standard-basic"
        label="Coupons"
        variant="standard"
        fullWidth
      />
    </div>
  );
}

export default PriceDetails;
