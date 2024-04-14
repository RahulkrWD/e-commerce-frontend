import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./RelatedProduct.module.css";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Loading from "../../components/layout/Loading";

import { Link } from "react-router-dom";

function RelatedProduct() {
  const [products, setProducts] = useState();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const type = pathname.split("&")[1];

  let url = `${process.env.REACT_APP_API}/product/product/${id}?type=${type}`;

  useEffect(() => {
    async function handleRelated() {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        console.log("server error");
      }
    }
    handleRelated();
  }, [url]);
  return (
    <div className="container">
      <hr />
      {products ? <h5 className={styles.relattitle}>Similar Products</h5> : ""}
      {products ? (
        <div className={`${styles.product_area}`}>
          {products.map((data, index) => (
            <Link
              to={`/details/${data.categoryId}/${data.productId}&${data.type}`}
              key={index}
              target="_blank"
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
                  style={{ fontSize: "14px" }}
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
        </div>
      ) : (
        <center className="p-5">
          <Loading />
        </center>
      )}
    </div>
  );
}

export default RelatedProduct;
