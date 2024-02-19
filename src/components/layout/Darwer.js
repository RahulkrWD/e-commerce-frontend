import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

function Darwer() {
  const user = localStorage.getItem("auth");
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
          {/* <p>
              Try scrolling the rest of the page to see this option in action.
            </p> */}
        </div>
      </div>
    </>
  );
}

export default Darwer;
