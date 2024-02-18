import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../Auth/GoogleLogin";
import styles from "./Auth.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handlelogin(e) {
    e.preventDefault();
    // console.log(name, email, password, phone, uniqueId);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const user = res.data.user;
        localStorage.setItem("auth", user.name);
        const token = res.data.token;
        localStorage.setItem("token", token);

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title={"login e-commerce"}>
      <div className={`${styles.loginPage}`}>
        <center>
          <h2>Login</h2>
          <form onSubmit={handlelogin}>
            <div className="row">
              <TextField
                className="m-2"
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              <TextField
                className="m-2"
                label="Password"
                type="password"
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary m-2 p-2 fw-bold">
                Login
              </button>
              <Link
                to={"/forget-password"}
                className="btn btn-dark fw-bold m-2 p-2"
              >
                Forget Password
              </Link>
            </div>
          </form>
          <div className="m-3">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_Clint_id}>
              <GoogleLogin />
            </GoogleOAuthProvider>
          </div>
          <Link to={"/register"} className="text-decoration-none text-dark">
            Don't have an Account <strong>Register</strong>
          </Link>
        </center>
      </div>
    </Layout>
  );
}

export default Login;
