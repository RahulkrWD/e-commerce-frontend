import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleRegister from "./GoogleRegister";
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

function Register() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  // form function
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          email,
        }
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

  async function verifyOtp(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-user`,
        { name, password, email, otp }
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
    <Layout title={"register e-commerce"}>
      <div className={`${styles.registerPage}`}>
        <center>
          <div className={styles.textField}>
            <h3 className={styles.title}>Register</h3>
            <input
              className={`w-100  mt-3 ${styles.input_type}`}
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              className={`w-100  mt-3 ${styles.input_type}`}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmit} className={`m-2 ${styles.send_otp}`}>
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
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <button
                    className="btn w-100 text-bg-success mt-3 fw-bold"
                    onClick={verifyOtp}
                    type="submit"
                  >
                    submit
                  </button>
                </Typography>
              </Box>
            </Modal>
            <br />
            <Link to={"/forget-password"} className="w-100">
              forget Password
            </Link>
            <div className="m-3">
              <GoogleOAuthProvider clientId={process.env.REACT_APP_Clint_id}>
                <GoogleRegister />
              </GoogleOAuthProvider>
            </div>

            <Link to={"/login"} className="text-decoration-none text-dark">
              Already have an account <strong>Login</strong>
            </Link>
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default Register;
