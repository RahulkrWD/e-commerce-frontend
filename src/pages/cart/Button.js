// AddCart.js
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";

function AddCart({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(item));
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn text-bg-danger m-2 fw-bold"
    >
      Add to Cart
    </button>
  );
}

export default AddCart;
