import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function Category() {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/category`
        );
        setCategory(response.data);
        setLoading(false);
      } catch (err) {
        setCategory("");
        setLoading(false);
      }
    }
    fetchCategory();
  });

  return (
    <>
      <div className={`d-flex p-3 gap-4 ${styles.container}`}>
        {loading ? (
          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : category ? (
          category.map((data, index) => (
            <Link
              key={index}
              to={`/category?${data.categoryName}=${data.categoryId}`}
              style={{ textDecoration: "none" }}
            >
              <img className={styles.categoryImage} src={data.image} alt="" />
              <h5 className={styles.categoryName}>{data.categoryName}</h5>
            </Link>
          ))
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Category;
