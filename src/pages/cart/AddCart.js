import React from "react";
import Layout from "../../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../store/cartSlice";
import { Link } from "react-router-dom";
import styles from "./AddCart.module.css";

export default function AddCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  function handleIncrease(items) {
    dispatch(increaseQuantity(items));
  }

  function handleDecrease(items) {
    dispatch(decreaseQuantity(items));
  }

  function handleRemove(items) {
    dispatch(removeItem(items));
  }

  return (
    <Layout>
      {cartItems.length > 0 ? (
        cartItems.map((items) => (
          <div key={items.id} className={styles.cart_container}>
            <div className="cart image">
              <img className={styles.cart_image} src={items.image} alt="" />
            </div>
            <div className="cart details">
              <p>{items.productName}</p>

              <h6>price: &#8377;{items.totalPrice}</h6>
              <button
                className="btn text-bg-success m-2"
                onClick={() => handleIncrease(items)}
              >
                +
              </button>
              <span>{items.quantity}</span>
              <button
                className="btn text-bg-danger m-2"
                onClick={() => handleDecrease(items)}
              >
                -
              </button>

              <button
                className="btn text-bg-info"
                onClick={() => handleRemove(items)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-info container mt-4 p-4">
          <center>
            <img src="/image/no-cart.png" alt="" />
            <br />
            <Link to="/home" className="btn text-bg-dark fw-bold">
              Shop Now
            </Link>
          </center>
        </div>
      )}
    </Layout>
  );
}
