import React from "react";
import { Link } from "react-router-dom";
import styles from "./stylesheet/Products.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Loading from "../../components/layout/Loading";

function Others({ product }) {
  return (
    <div className={`${styles.container}`}>
      {product ? (
        product.map((data, index) => (
          <Link
            to={`/details/${data.categoryId}/${data.productId}`}
            key={index}
            className={`text-decoration-none text-dark ${styles.card}`}
          >
            <div className="image">
              <img className={styles.images} src={data.image} alt="" />
            </div>
            <div className="details p-2 ">
              <p
                className={styles.product_name}
                style={{ fontSize: "14px", color: "#192f60" }}
              >
                {data.productName}
              </p>
              <h6 className="fw-bold text-success">{data.type}</h6>
              &#8377; {data.cost}{" "}
              <del className="m-2" style={{ color: "gray" }}>
                &#8377; {data.cost + 230}
              </del>
              <Rating
                style={{ fontSize: "14px", float: "right" }}
                name="text-feedback"
                readOnly
                precision={0.5}
                value={data.rating}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
          </Link>
        ))
      ) : (
        <center className="p-5">
          <Loading />
        </center>
      )}
    </div>
  );
}

export default Others;
