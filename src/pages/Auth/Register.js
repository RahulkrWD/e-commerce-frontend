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
          <div className={styles.textField}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <TextField
                    className="w-100  mt-3"
                    label="Name"
                    variant="outlined"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <TextField
                    className="w-100  mt-3"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row flex-wrap">
                <div className="col">
                  <TextField
                    className="w-100  mt-3"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col">
                  <TextField
                    className="w-100  mt-3"
                    label="favorite game"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-50 m-3">
                Submit
              </button>
              <br />
              <Link to={"/forget-password"} className="btn btn-dark w-50  m-3">
                forget Password
              </Link>
            </form>
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
