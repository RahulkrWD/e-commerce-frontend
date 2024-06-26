import React from "react";
import mensDeals from "../../jsonData/mensDeals.json";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import styles from "./Deals.module.css";
import womenDeals from "../../jsonData/womenDeals.json";
//import Kitchen from "../../jsonData/kitchen.json";
import { Link } from "react-router-dom";
//import Coupons from "./Coupons";
function Deal99() {
  return (
    <div>
      <h5 className={`fw-bold p-1 ${styles.heading}`}>Today Deals</h5>
      <h6>Mens Deals</h6>
      <div className={styles.mens_deals}>
        {mensDeals.map((items, index) => (
          <Link
            key={index}
            className={styles.card}
            to={`/product/${items.categoryId}&${items.type}`}
          >
            <img src={items.image} className={` ${styles.image}`} alt="" />
            <div className="details">
              <h5 className="card-title text-center p-2">{items.type}</h5>
              <Rating
                style={{ fontSize: "14px" }}
                name="text-feedback"
                readOnly
                precision={0.5}
                value={items.rating}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
          </Link>
        ))}
      </div>
      <h6>Womens deals</h6>
      <div className={styles.womens_deals}>
        {womenDeals.map((items, index) => (
          <Link
            key={index}
            className={styles.card}
            to={`/product/${items.categoryId}&${items.type}`}
          >
            <img src={items.image} className={` ${styles.image}`} alt="" />
            <div className="details">
              <h5 className="card-title text-center p-2">{items.type}</h5>
              <Rating
                style={{ fontSize: "14px" }}
                name="text-feedback"
                readOnly
                precision={0.5}
                value={items.rating}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
          </Link>
        ))}
      </div>
      {/* <div className={styles.coupons}>
        <div className="d-flex flex-wrap">
          {Kitchen.map((items, index) => (
            <Link
              key={index}
              className={styles.card}
              to={`/category?${items.categoryName}=${items.categoryId}&${items.type}`}
            >
              <img
                src={items.image}
                className={` ${styles.kitchen_image}`}
                alt=""
              />
            </Link>
          ))}
        </div> */}
      {/* <div className="coupons w-50">
          <Coupons />
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default Deal99;
