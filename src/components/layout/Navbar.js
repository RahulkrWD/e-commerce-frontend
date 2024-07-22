import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import Admin from "./Admin";
import styles from "./Navbar.module.css";
import ProductSearch from "./ProductSearch";
// import Darwer from "./Darwer";
import cryptoJs from "crypto-js";

function Navbar() {
  const userDataString = localStorage.getItem("userData");
  let dataDecrypted;
  if (userDataString) {
    const bytes = cryptoJs.AES.decrypt(
      userDataString,
      process.env.REACT_APP_SECRETKEY
    );
    dataDecrypted = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
  }
  function handleLogout() {
    localStorage.removeItem("userData");
  }
  return (
    <nav className={`navbar bg-primary-subtle ${styles.navbarFix}`}>
      {/* <Darwer /> */}
      <ProductSearch />
      <Link to={"/home"} className={`${styles.titleName}`}>
        DeP<span className={styles.brandName}>.com</span>
      </Link>
      <ul className={`${styles.listItems}`}>
        {dataDecrypted ? (
          <>
            <Admin logOut={handleLogout} userName={dataDecrypted.userName} />
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
