import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import Admin from "./Admin";

import styles from "./Navbar.module.css";
import ProductSearch from "./ProductSearch";
// import Darwer from "./Darwer";

function Navbar() {
  const user = localStorage.getItem("auth");

  return (
    <nav className={`navbar bg-primary-subtle ${styles.navbarFix}`}>
      {/* <Darwer /> */}
      <ProductSearch />
      <Link to={"/home"} className={`${styles.titleName}`}>
        DeP<span className={styles.brandName}>.com</span>
      </Link>
      <ul className={`${styles.listItems}`}>
        {user ? (
          <>
            <Admin />
          </>
        ) : (
          <>
            <li className="d-flex m-2">
              <Link
                to={"/login"}
                className="nav-link fw-bold text-dark"
                aria-current="page"
              >
                Login
              </Link>
              <span className="fw-bold">/</span>
              <Link
                to={"/register"}
                className="nav-link fw-bold text-dark"
                aria-current="page"
              >
                Register
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <Link to={"/cart"} aria-current="page">
            <CartIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
