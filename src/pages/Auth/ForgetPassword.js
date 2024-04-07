import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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

function ForgetPassword() {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleSubmitEmail(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/forget-password`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        handleOpen();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  async function handleSubmitPassword(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/reset-password`,
        { email, newPassword, otp }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Layout title={"forget-password e-commerce"}>
      <div className={`${styles.forgetpassword}`}>
        <center>
          <div className={styles.textField}>
            <h3 className={styles.title}>Forget password</h3>
            <input
              className={`w-100  mt-3 ${styles.input_type}`}
              placeholder="Email Id"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubmitEmail}
              className={`m-2 ${styles.send_otp}`}
            >
              Send OTP
            </button>
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  Verify Otp
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <input
                    className={`w-100  mt-3 ${styles.input_type}`}
                    placeholder="Enter OTP"
                    type="password"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <br />
                  <input
                    className={`w-100  mt-3 ${styles.input_type}`}
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <br />

                  <button
                    className="btn fw-bold text-bg-success mt-3 w-100"
                    onClick={handleSubmitPassword}
                    type="submit"
                  >
                    Reset Password
                  </button>
                </Typography>
              </Box>
            </Modal>

            <br />
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
