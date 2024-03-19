import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../store/cartSlice";
export default function AddCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  function handleIncrease(items) {
    dispatch(increaseQuantity(items));
  }
  function handleDecrease(items) {
    dispatch(decreaseQuantity(items));
  }
  function hadleRemove(items) {
    dispatch(removeItem(items));
  }

  return (
    <div>
      {cartItems.map((items) => (
        <div>
          <img style={{ width: "200px" }} src={items.image} alt="" />
          <h1> type: {items.type}</h1>
          <h1> price: {items.cost}</h1>
          <p>quantity: {items.quantity}</p>
          <h5> total price: {items.totalPrice}</h5>
          <button
            className="btn text-bg-success m-2"
            onClick={() => handleIncrease(items)}
          >
            +
          </button>
          <button
            className="btn text-bg-danger m-2"
            onClick={() => handleDecrease(items)}
          >
            -
          </button>
          <button
            className="btn text-bg-info"
            onClick={() => hadleRemove(items)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
