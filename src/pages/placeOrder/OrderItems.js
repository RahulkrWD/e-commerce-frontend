import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";
import styles from "./style/OrderItems.module.css";
function OrderItems() {
  const product = useSelector(selectCartItems);
  return (
    <div className={styles.order_container}>
      {product.map((item, index) => (
        <div key={index} className={styles.items_container}>
          <div className="order image">
            <img className={styles.main_image} src={item.image} alt="" />
          </div>
          <div className={styles.order_details}>
            <h6 className={styles.product_name}>{item.productName}</h6>
            <h6 className={styles.price}> total Price: {item.totalPrice}</h6>
            <h6 className={styles.quantity}>quantity: {item.quantity}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
