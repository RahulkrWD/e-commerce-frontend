import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import styles from "./Auth.module.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/forget-password`,
        { email, answer, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title={"forget-password e-commerce"}>
      <div className={`${styles.forgetpassword}`}>
        <center>
          <div className={styles.textField}>
            <h2>Forget password</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                className="w-100 mt-3"
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <TextField
                className="w-100  mt-3"
                label="Enter your favorite game."
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <br />

              <TextField
                className="w-100  mt-3"
                label="Enter your new Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <br />

              <button
                type="submit"
                className="btn btn-primary w-100 p-2 mt-3 fw-bold"
              >
                Submit
              </button>
            </form>
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
