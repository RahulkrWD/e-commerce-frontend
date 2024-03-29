import React from "react";
import Layout from "../../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddCart.module.css";
import PriceDetails from "./PriceDetails";

export default function AddCart() {
  const navigate = useNavigate();
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

  function placeOrder() {
    localStorage.getItem("token") ? navigate("/stepper") : navigate("/login");
  }

  return (
    <Layout title={"cart Dep.com"}>
      <div
        className="d-flex justify-content-evenly p-3"
        style={{ flexWrap: "wrap" }}
      >
        <div className={styles.add_cart_container}>
          {cartItems.length > 0 ? (
            cartItems.map((items, index) => (
              <div key={index} className={styles.cart_container}>
                <div className="cart image">
                  <img className={styles.cart_image} src={items.image} alt="" />
                </div>
                <div className="cart details">
                  <p className={styles.product_name}>{items.productName}</p>

                  <p className="fw-bold">price: &#8377;{items.totalPrice}</p>
                  <div className="d-flex justify-content-evenly">
                    <span
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleIncrease(items)}
                    >
                      +
                    </span>
                    <span className="fs-5">{items.quantity}</span>
                    <span
                      className="fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDecrease(items)}
                    >
                      -
                    </span>

                    <span
                      className=""
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemove(items)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-info container mt-4 p-4">
              <center>
                <img className="w-100" src="/image/no-cart.png" alt="" />
                <br />
                <Link to="/home" className="btn text-bg-dark fw-bold">
                  Shop Now
                </Link>
              </center>
            </div>
          )}
        </div>
        <div>
          {cartItems.length > 0 ? (
            <>
              <PriceDetails price={cartItems} />
              <center className="p-3">
                <button
                  className="btn text-bg-success fw-bold"
                  onClick={placeOrder}
                >
                  Buy Now
                </button>
              </center>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
}
