import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

function Delivery() {
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const handlePincode = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data;

      if (data && data[0].Status === "Success") {
        const postOfficeData = data[0].PostOffice;
        const availablePinCodes = ["823003", "823001"];

        const isValidPincode = postOfficeData.some((office) =>
          availablePinCodes.includes(office.Pincode)
        );

        setPincodeStatus(isValidPincode ? "available" : "not-available");
      } else {
        setPincodeStatus("invalid");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setPincodeStatus("error");
    }
  };

  const getStatusMessage = () => {
    switch (pincodeStatus) {
      case "available":
        return (
          <p
            style={{ color: "green", fontWeight: "bold", fontStyle: "italic" }}
          >
            Pincode {pincode} is available for delivery!
          </p>
        );
      case "invalid":
        return (
          <p
            style={{ color: "orange", fontWeight: "bold", fontStyle: "italic" }}
          >
            Invalid pincode. Please enter a valid pincode.
          </p>
        );
      case "not-available":
        return (
          <p style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}>
            Pincode {pincode} is not available for delivery.
          </p>
        );
      case "error":
        return (
          <p style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}>
            An error occurred while checking pincode. Please try again.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h6>Delivery</h6>
      <TextField
        id="standard-basic"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        label="Enter Pincode"
        variant="standard"
        required
      />
      <Button
        variant="contained"
        className="btn text-bg-warning p-2 m-1 fw-bold"
        onClick={handlePincode}
      >
        Search
      </Button>
      {pincodeStatus && getStatusMessage()}
    </div>
  );
}

export default Delivery;
