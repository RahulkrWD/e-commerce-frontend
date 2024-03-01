import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Lising.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

function Others({ product }) {
  const { search } = useLocation();
  const value = search.split("?")[1].split("=")[0].toLowerCase();

  return (
    <div
      className={`d-flex flex-wrap justify-content-evenly ${styles.container}`}
    >
      {product ? (
        <>
          {product.map((data, index) => (
            <div key={index} className={styles.card}>
              <Link
                to={`/${value}?${data.type}=${data.productId}`}
                className="image"
              >
                <img className={styles.images} src={data.image} alt="" />
              </Link>
              <div className="details p-3 ">
                <Link
                  className="text-decoration-none text-dark"
                  style={{ fontSize: "14px" }}
                  to={`/${value}?${data.type}=${data.productId}`}
                >
                  {data.productName}
                </Link>
                <div className="d-flex justify-content-between mt-1">
                  <Link
                    className="text-decoration-none text-danger fw-bolder"
                    to={`/${value}?${data.type}=${data.productId}`}
                  >
                    {data.type}
                  </Link>
                  <p>
                    <i
                      className={`fa-regular fa-heart ${styles.likeButton}`}
                    ></i>
                  </p>
                </div>

                <Link
                  to={`/${value}?${data.type}=${data.productId}`}
                  className="p-1 text-decoration-none fw-bolder"
                >
                  &#8377; {data.cost}{" "}
                  <del className="m-3" style={{ color: "gray" }}>
                    &#8377; {data.cost + 230}
                  </del>
                </Link>
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
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Others;
