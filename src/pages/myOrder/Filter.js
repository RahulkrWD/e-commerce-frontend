import React from "react";
import styles from "./styles/Filter.module.css";

function Filter() {
  return (
    <div className={styles.filter_container}>
      <h4 className={styles.filter_heading}>Filter</h4>
      <input
        id="success"
        className={`m-3 ${styles.check_box}`}
        type="checkbox"
      />
      <label htmlFor="success" className="fs-5">
        success
      </label>
      <hr className="text-primary" />
      <input
        id="pending"
        className={`m-3 ${styles.check_box}`}
        type="checkbox"
      />
      <label htmlFor="pending" className="fs-5">
        Pending
      </label>
      <hr className="text-primary" />
      <input
        id="cancelled"
        className={`m-3 ${styles.check_box}`}
        type="checkbox"
      />
      <label htmlFor="cancelled" className="fs-5">
        Cancelled
      </label>
      <hr className="text-primary" />
      <input
        id="returned"
        className={`m-3 ${styles.check_box}`}
        type="checkbox"
      />
      <label htmlFor="returned" className="fs-5">
        Returned
      </label>
    </div>
  );
}

export default Filter;
