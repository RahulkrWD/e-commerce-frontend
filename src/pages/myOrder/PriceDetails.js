import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function PriceDetails({ details }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button className="btn text-bg-dark  mb-3" onClick={handleOpen}>
        Price Details
      </button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <h5
            className="text-center"
            style={{ borderBottom: "2px solid Red", padding: "4px" }}
          >
            Price Details
          </h5>
          <div className="mt-4">
            <h6>
              Items Price: <strong>{details.price}</strong>
            </h6>
            <h6>
              Delivery Charges: <strong>{details.delivery}</strong>
            </h6>
            <h6>
              Discount Price: <strong>{details.discount}</strong>
            </h6>
            <h6>
              Final Price: <strong>{details.finalPrice}</strong>
            </h6>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PriceDetails;
