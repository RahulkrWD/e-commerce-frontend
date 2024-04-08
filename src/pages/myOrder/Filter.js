import React from "react";
import styles from "./styles/Filter.module.css";
import { Link } from "react-router-dom";

function Filter() {
  return (
    <div className={styles.dropdown}>
      <Link
        className="btn btn-primary dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Order Status
      </Link>
      <ul className="dropdown-menu">
        <div className={styles.filter_container}>
          <h4 className={styles.filter_heading}>Filter</h4>
          <input
            style={{ cursor: "pointer" }}
            id="success"
            className={`m-3 ${styles.check_box}`}
            type="checkbox"
          />
          <label
            htmlFor="success"
            className="fs-5"
            style={{ cursor: "pointer" }}
          >
            success
          </label>
          <hr className="text-primary" />
          <input
            style={{ cursor: "pointer" }}
            id="pending"
            className={`m-3 ${styles.check_box}`}
            type="checkbox"
          />
          <label
            htmlFor="pending"
            className="fs-5 "
            style={{ cursor: "pointer" }}
          >
            Pending
          </label>
          <hr className="text-primary" />
          <input
            style={{ cursor: "pointer" }}
            id="cancelled"
            className={`m-3 ${styles.check_box}`}
            type="checkbox"
          />
          <label
            htmlFor="cancelled"
            className="fs-5"
            style={{ cursor: "pointer" }}
          >
            Cancelled
          </label>
          <hr className="text-primary" />
          <input
            style={{ cursor: "pointer" }}
            id="returned"
            className={`m-3 ${styles.check_box}`}
            type="checkbox"
          />
          <label
            htmlFor="returned"
            className="fs-5"
            style={{ cursor: "pointer" }}
          >
            Returned
          </label>
        </div>
      </ul>
    </div>
  );
}

export default Filter;
