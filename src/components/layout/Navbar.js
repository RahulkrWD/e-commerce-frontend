import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Navbar.module.css";
import ProductSearch from "./ProductSearch";
import cryptoJs from "crypto-js";
import AuthModal from "./AdminModal";
import { Button } from "@mui/material";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userDataString = localStorage.getItem("userData");
  let dataDecrypted;
  let finalName = "";

  if (userDataString) {
    const bytes = cryptoJs.AES.decrypt(
      userDataString,
      process.env.REACT_APP_SECRETKEY
    );
    dataDecrypted = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    const fName = dataDecrypted.userName.split(" ")[0];
    finalName = fName.charAt(0).toUpperCase() + fName.slice(1);
  }

  function handleLogout() {
    localStorage.removeItem("userData");
    handleOpen();
  }
  return (
    <>
      <nav className={`navbar bg-primary-subtle ${styles.navbarFix}`}>
        <ProductSearch />
        <Link to={"/home"} className={`${styles.titleName}`}>
          DeP<span className={styles.brandName}>.com</span>
        </Link>
        <ul className={`${styles.listItems}`}>
          {dataDecrypted ? (
            <>
              <div className={styles.dropdown}>
                <strong className={`text-danger`}>Hi </strong>
                <strong>{finalName}</strong>
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
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <li className="d-flex m-2">
                <Button onClick={() => handleOpen()}>Sign In</Button>
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
      <AuthModal open={open} handleClose={handleClose} />
    </>
  );
}

export default Navbar;
