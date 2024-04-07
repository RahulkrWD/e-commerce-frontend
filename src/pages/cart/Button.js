import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Button.module.css";

function AddCart({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addItem(item));
    navigate("/cart");
  };

  return (
    <button onClick={handleAddToCart} type="button" className={styles.button}>
      <span className={styles.button__text}>Add Item</span>
      <span className={styles.button__icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="currentColor"
          height={24}
          fill="none"
          className="svg"
        >
          <line y2={19} y1={5} x2={12} x1={12} />
          <line y2={12} y1={12} x2={19} x1={5} />
        </svg>
      </span>
    </button>
  );
}

export default AddCart;
