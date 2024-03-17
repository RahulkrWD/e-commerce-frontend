import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import category from "../../jsonData/category.json";

function Category() {
  return (
    <>
      <div className={`d-flex p-3 gap-4 ${styles.container}`}>
        {category.map((data, index) => (
          <Link
            key={index}
            to={`/category?${data.categoryName}=${data.categoryId}`}
            style={{ textDecoration: "none" }}
          >
            <img className={styles.categoryImage} src={data.image} alt="" />
            <h5 className={styles.categoryName}>{data.categoryName}</h5>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Category;
