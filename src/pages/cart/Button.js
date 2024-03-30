import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { Link } from "react-router-dom";

function AddCart({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(item));
  };

  return (
    <Link
      to={"/cart"}
      onClick={handleAddToCart}
      className="btn text-bg-warning m-2 fw-bold"
    >
      Add to Cart
    </Link>
  );
}

export default AddCart;
