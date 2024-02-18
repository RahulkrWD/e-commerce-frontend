import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleRegister from "./GoogleRegister";
import styles from "./Auth.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  // generate uniqueId
  const uniqueId = Math.floor(Math.random() * 70000 + 100000);

  const navigate = useNavigate();
  // form function
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          name,
          email,
          password,
          phone,
          uniqueId,
          answer,
        }
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
    <Layout title={"register e-commerce"}>
      <div className={`${styles.registerPage}`}>
        <center>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <TextField
                  className="m-2"
                  label="Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  className="m-2"
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  className="m-2"
                  label="Password"
                  type="password"
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  className="m-2"
                  label="Phone"
                  type="text"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="col w-75">
              <TextField
                className="m-2"
                label="what is your favorite game"
                type="text"
                fullWidth
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="row w-75">
              <button type="submit" className="btn btn-primary m-2">
                Submit
              </button>

              <Link to={"/forget-password"} className="btn btn-dark m-2">
                forget Password
              </Link>
            </div>
          </form>
          <div className="m-3">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_Clint_id}>
              <GoogleRegister />
            </GoogleOAuthProvider>
          </div>
          <Link to={"/login"} className="text-decoration-none text-dark">
            Already have an account <strong>Login</strong>
          </Link>
        </center>
      </div>
    </Layout>
  );
}

export default Register;
