import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

export default function BasicMenu({ logOut, userName }) {
  const firstName = userName.split(" ")[0];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Link
        className="nav-link mt-2"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <strong className="text-danger">Hi </strong>
        <strong>{firstName}</strong>
      </Link>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
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
          to={"/login"}
          onClick={logOut}
        >
          Logout
        </Link>
      </Menu>
    </div>
  );
}
