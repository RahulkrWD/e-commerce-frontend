import * as React from "react";
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

export default function EditProfile({ onFormSubmit, onChangeHandler }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event) => {
    onFormSubmit(event);
    handleClose();
  };

  return (
    <div>
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
