import React from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";

function Header() {
  const user = localStorage.getItem("auth");

  // logout function
  function handleLogout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={"/"}>
          <FaShoppingBag className="text-primary mb-2" /> My App
        </Link>
        <button
          className="navbar-toggler btn text-light bg-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <CiMenuBurger />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" aria-current="page">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-dark dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hi, {user.split(" ")[0]}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/profile"} className="dropdown-item">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item">View Order</Link>
                    </li>
                    <li>
                      <Link
                        to={"/login"}
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        LogOut
                      </Link>
                    </li>
                  </ul>
                </div>

                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link" aria-current="page">
                    Cart (0)
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" aria-current="page">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"/register"}
                    className="nav-link"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
