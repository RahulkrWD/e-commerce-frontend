import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import styles from "./Auth.module.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmitEmail(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/forget-password`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
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
            <TextField
              className=" w-100  mt-3"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              className=" w-100 mt-3"
              label="Verify OTP"
              variant="outlined"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <br />
            <TextField
              className="w-100  mt-3"
              label="Enter New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <button
              className=" mt-3 fw-bold w-100 btn text-bg-danger"
              onClick={handleSubmitEmail}
              type="submit"
            >
              Send OTP
            </button>
            <button
              className="btn fw-bold text-bg-success mt-3 w-100"
              onClick={handleSubmitPassword}
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
