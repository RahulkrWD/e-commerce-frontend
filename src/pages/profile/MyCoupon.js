import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/MyCoupon.module.css";

function MyCoupon() {
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.removeItem("uniqueId");
  }
  return (
    <div className={styles.coupons_container}>
      <Link className="d-block p-3 text-decoration-none text-dark fw-bold">
        My Order
      </Link>
      <Link className="d-block p-3 text-decoration-none text-dark fw-bold">
        My Coupons
      </Link>
      <Link className="d-block p-3 text-decoration-none text-dark fw-bold">
        Edit Profile
      </Link>
      <Link
        onClick={handleLogout}
        to={"/login"}
        className="d-block p-3 text-decoration-none text-dark fw-bold"
      >
        Log Out
      </Link>
    </div>
  );
}

export default MyCoupon;
