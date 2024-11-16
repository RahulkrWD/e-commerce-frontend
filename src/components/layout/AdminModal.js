import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import ForgetPassword from "../../pages/Auth/ForgetPassword"
const AuthModal = ({ open, handleClose }) => {
  const [view, setView] = useState("login");
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>
        {view === "login" && (
         <Login close={handleClose}  pass={setView}/>
        )}
        {view === "signup" && (
          <Register pass={setView}/>
        )}
        {view === "forgotPassword" && (
          <ForgetPassword pass={setView}/>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
