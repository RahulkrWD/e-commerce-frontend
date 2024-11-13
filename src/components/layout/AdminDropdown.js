import React from 'react'
import styles from "./AdminDropdown.module.css";
import { Link } from "react-router-dom";

function AdminDropdown({ logOut, userName }) {
    const firstName = userName.split(" ")[0];
  return (
   

      <div className={styles.dropdown}>
         <strong className={`text-danger`}>Hi </strong>
         <strong>{firstName}</strong>
        <div className={styles.dropdownContent}>
        <Link
          to={"/my-order"}
          className="nav-link text-center text-dark fw-bold"
        >
          My Order
        </Link>
        <Link
          to={"/profile"}
          className="nav-link p-3 text-center text-dark fw-bold"
        >
          Profile
        </Link>
        <Link
          className="nav-link text-center text-dark fw-bold"
          to={"/home"}
          onClick={logOut}
        >
          Logout
        </Link>
        </div>
    </div>
  )
}

export default AdminDropdown
