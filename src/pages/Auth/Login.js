import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
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
        localStorage.setItem("uniqueId", user.uniqueId);

        navigate("/home");
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
          <form onSubmit={handlelogin}>
            <div className={styles.textField}>
              <h3 className={styles.title}>Login</h3>
              <TextField
                className="w-100  mt-3"
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                className="w-100 mt-3"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-primary w-100 p-2 mt-3 fw-bold"
              >
                Login
              </button>
              <Link
                to={"/forget-password"}
                className="btn btn-dark fw-bold w-100 mt-3 p-2"
              >
                Forget Password
              </Link>

              <div className="m-3">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_Clint_id}>
                  <GoogleLogin />
                </GoogleOAuthProvider>
              </div>
              <Link
                to={"/register"}
                className="text-decoration-none text-dark m-3"
              >
                Don't have an Account <strong>Register</strong>
              </Link>
            </div>
          </form>
        </center>
      </div>
    </Layout>
  );
}

export default Login;
