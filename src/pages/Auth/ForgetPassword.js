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
            <h2>Forget password</h2>
            <form onSubmit={handleSubmitEmail}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Send OTP</button>
            </form>
            <form>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </form>
            <form onSubmit={handleSubmitPassword}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button type="submit">Reset Password</button>
            </form>
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
