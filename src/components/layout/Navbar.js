import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Admin from "./Admin";

import styles from "./Navbar.module.css";
import Darwer from "./Darwer";

function Navbar() {
  const user = localStorage.getItem("auth");

  return (
    <nav className={`navbar bg-primary-subtle ${styles.navbarFix}`}>
      <div className="container">
        <div className="title d-flex justify-content-center align-items-center gap-2">
          <Darwer />
          <Link to={"/"} className={`${styles.titleName}`}>
            DeP<span className={styles.brandName}>.com</span>
          </Link>
        </div>
        <ul className={`${styles.listItems}`}>
          {user ? (
            <>
              <li className="nav-item mt-2">
                <Link
                  to={"/offers"}
                  className={`nav-link fw-bold text-dark ${styles.offers}`}
                  aria-current="page"
                >
                  Offers
                </Link>
              </li>

              <Admin />
            </>
          ) : (
            <>
              <li className="nav-item mt-2">
                <Link
                  to={"/login"}
                  className="nav-link fw-bold text-dark"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  to={"/register"}
                  className={`nav-link fw-bold text-dark ${styles.register}`}
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to={"/cart"} aria-current="page">
              <Cart />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
