import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handlelogin(e) {
    e.preventDefault();
    // console.log(name, email, password, phone, uniqueId);
    try {
      const res = await axios.post(`http://localhost:8080/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const user = res.data.user;
        localStorage.setItem("auth", user.name);
        const token = res.data.token;
        localStorage.setItem("token", token);
        //  console.log(localStorage.getItem("token"));

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
      <center>
        <div className="login-page m-2 container border">
          <h2>Login</h2>
          <form onSubmit={handlelogin}>
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
              label="Password"
              type="password"
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary m-2 p-2 fw-bold">
              Submit
            </button>
            <Link
              to={"/forget-password"}
              className="btn btn-dark fw-bold m-2 p-2"
            >
              Forget Password
            </Link>
          </form>
        </div>
      </center>
    </Layout>
  );
}

export default Login;
