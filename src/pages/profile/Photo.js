import React, { useState } from "react";
import styles from "./styles/Admin.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Photo({ photos, onFormSubmit, onChangeHandler }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event) => {
    onFormSubmit(event);
    handleClose();
  };

  return (
    <div>
      {photos.length > 0
        ? photos.map((photo, index) => (
            <div key={index}>
              {photo.data ? (
                <img
                  className={styles.profile_placeholder}
                  src={`data:${photo.type};base64,${photo.data}`}
                  alt="Profile"
                />
              ) : (
                <img
                  className={styles.profile_placeholder}
                  src="/image/default_profile_photo.webp"
                  alt=""
                />
              )}
            </div>
          ))
        : ""}

      <center className="p-1">
        <span style={{ cursor: "pointer" }} onClick={handleOpen}>
          Edit Profile
        </span>
      </center>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <h5 className="p-2">Edit Profile</h5>
            </div>

            <div style={{ marginTop: "15px" }}>
              <form onSubmit={handleFormSubmit}>
                <input type="file" name="file" onChange={onChangeHandler} />
                <button type="submit">Upload</button>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Photo;
