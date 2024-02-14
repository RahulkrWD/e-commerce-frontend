import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-dark text-light p-3">
      <h3 className="text-center">All Right Reserved &copy; Developer 2024.</h3>
      <p className="text-center m-3 footer">
        <Link className="m-1 text-decoration-none text-light" to={"/about"}>
          About
        </Link>
        |
        <Link className="m-1 text-decoration-none text-light" to={"/contact"}>
          Contact
        </Link>
        |
        <Link className="m-1 text-decoration-none text-light" to={"/policy"}>
          Policy
        </Link>
      </p>
    </div>
  );
}

export default Footer;
