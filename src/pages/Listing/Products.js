import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./stylesheet/Products.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

function Others({ product }) {
  const { search } = useLocation();
  const value = search.split("?")[1].split("=")[0].toLowerCase();

  return (
    <div className={`d-flex flex-wrap justify-content-evenly`}>
      {product ? (
        <>
          {product.map((data, index) => (
            <Link
              to={`/details/${value}?${data.type}=${data.productId}`}
              key={index}
              className={`text-decoration-none text-dark ${styles.card}`}
            >
              <div className="image">
                <img className={styles.images} src={data.image} alt="" />
              </div>
              <div className="details p-3 ">
                <div style={{ fontSize: "14px" }}>{data.productName}</div>
                <div className="d-flex justify-content-between mt-1">
                  <h5 className=" fw-bolder">{data.type}</h5>
                  <p>
                    <i
                      className={`fa-regular fa-heart ${styles.likeButton}`}
                    ></i>
                  </p>
                </div>
                &#8377; {data.cost}{" "}
                <del className="m-3" style={{ color: "gray" }}>
                  &#8377; {data.cost + 230}
                </del>
                <Rating
                  style={{ fontSize: "17px", float: "right" }}
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
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Others;
