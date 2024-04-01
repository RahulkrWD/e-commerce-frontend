import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

function Darwer() {
  const user = localStorage.getItem("auth");
  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }
  return (
    <>
      <span
        className={`text-bg-primary p-2 ${styles.drowerBtn}`}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <TfiMenuAlt />
      </span>
      <div
        className="offcanvas offcanvas-start "
        style={{ width: "250px" }}
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            {user ? (
              user
            ) : (
              <>
                <Link to={"/login"}>Login</Link> /
                <Link to={"/register"}> Register</Link>
              </>
            )}
          </h5>
          <Link data-bs-dismiss="offcanvas">
            <ImCross />
          </Link>
        </div>
        <div className="offcanvas-body">
          <ul>
            <Link
              to={"/Coin-zone"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-coins"></i> Coins Zone
            </Link>
            <Link
              to={"/offer-zone"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-gift"></i> Offer Zone
            </Link>
            <Link
              to={"/game-zone"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-gamepad"></i> Game Zone
            </Link>
            <Link
              to={"/seller-on-dep"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-store"></i> Seller on Dep
            </Link>
            <hr />
            <Link
              to={"/my-order"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-box-open"></i> My Order
            </Link>
            <Link
              to={"/coupons"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-ticket"></i> Coupons
            </Link>
            <Link
              to={"/my-cart"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-cart-plus"></i> My Cart
            </Link>
            <Link
              to={"/my-wishlist"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-clipboard-list"></i> My Wishlist
            </Link>
            <Link
              to={"/myprofile"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-user"></i> My Profile
            </Link>
            <hr />
            <Link
              to={"/help-centre"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-circle-question"></i> Help Centre
            </Link>
            <Link
              to={"/settings"}
              className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
            >
              <i className="fa-solid fa-gear"></i> Settings
            </Link>
            {token ? (
              <Link
                to={"/login"}
                onClick={handleLogout}
                className="p-2 text-danger-emphasis text-decoration-none fs-5 d-block"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Log Out
              </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Darwer;
