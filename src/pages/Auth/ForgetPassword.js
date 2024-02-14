import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/forget-password`,
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
      <center>
        <div className="login-page m-2 container border">
          <h2>Forget password</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              className="m-2"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className="m-2"
              label="Enter your favorite game."
              type="text"
              value={answer}
              fullWidth
              onChange={(e) => setAnswer(e.target.value)}
            />
            <TextField
              className="m-2"
              label="Enter your new Password"
              type="password"
              value={newPassword}
              fullWidth
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary m-2 p-2 fw-bold">
              Submit
            </button>
          </form>
        </div>
      </center>
    </Layout>
  );
}

export default ForgetPassword;
