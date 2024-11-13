import React, {useState} from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from "./Navbar.module.css";
import ProductSearch from "./ProductSearch";
import cryptoJs from "crypto-js";
import AdminDropdown from "./AdminDropdown";
import AuthModal from "./AdminModal";
import { Button } from "@mui/material";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <>

   
    <nav className={`navbar bg-primary-subtle ${styles.navbarFix}`}>
      <ProductSearch />
      <Link to={"/home"} className={`${styles.titleName}`}>
        DeP<span className={styles.brandName}>.com</span>
      </Link>
      <ul className={`${styles.listItems}`}>
        {dataDecrypted ? (
          <>
          <AdminDropdown logOut={handleLogout} userName={dataDecrypted.userName}/>
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
  <AuthModal open={open} handleClose={handleClose}/>
    </>
  );
}

export default Navbar;
