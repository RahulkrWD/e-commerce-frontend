import React from "react";
import { TextField } from "@mui/material";

function Delivery() {
  return (
    <div>
      <h6>delivery</h6>
      <TextField id="standard-basic" label="Enter Pincode" variant="standard" />
      <button className="btn text-bg-warning p-2 m-1 fw-bold">Search</button>
    </div>
  );
}

export default Delivery;
