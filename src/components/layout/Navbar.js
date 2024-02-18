import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Admin from "./Admin";

import styles from "./Navbar.module.css";
import Darwer from "./Darwer";

function Navbar() {
  const user = localStorage.getItem("auth");

  return (
    <nav className="navbar bg-primary-subtle">
      <div className="container">
        <div className="title d-flex justify-content-center align-items-center gap-2">
          <Darwer />
          <h5 className={`${styles.titleName}`}>
            DeP<span className={styles.brandName}>.com</span>
          </h5>
        </div>
        <ul className="nav">
          {user ? (
            <>
              <li className="nav-item mt-2">
                <Link
                  to={"/offers"}
                  className="nav-link text-dark fw-bold"
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
                  className="nav-link text-dark fw-bold"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  to={"/register"}
                  className="nav-link text-dark fw-bold"
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to={"/cart"} className="nav-link" aria-current="page">
              <Cart />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
