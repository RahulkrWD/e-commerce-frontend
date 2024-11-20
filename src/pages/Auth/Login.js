import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../Auth/GoogleLogin";
import styles from "./Auth.module.css";
import CryptoJS from "crypto-js";
import Loading from "../../components/layout/Loading";

function Login({ pass, close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const user = res.data;
        const userData = {
          token: user.token,
          id: user.user._id,
          userName: user.user.name,
        };

        const userDataString = CryptoJS.AES.encrypt(
          JSON.stringify(userData),
          process.env.REACT_APP_SECRETKEY
        ).toString();

        localStorage.setItem("userData", userDataString);
        close(); // Close the modal
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Hide the Loading component
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div>
        <h4 className={styles.title}>Login</h4>
        <input
          className={`w-100 mt-3 ${styles.input_type}`}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className={`w-100 mt-3 ${styles.input_type}`}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100 p-2 mt-3 mb-2 fw-bold"
          disabled={loading} // Disable button during loading
        >
         Login
        </button>
        <Link onClick={() => pass("forgotPassword")} className="w-100">
          Forget Password
        </Link>
        <div className="m-3">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_Clint_id}>
            <GoogleLogin close={close} />
          </GoogleOAuthProvider>
        </div>
        <Link
          onClick={() => pass("signup")}
          className="text-decoration-none text-dark m-3"
        >
          Don't have an Account? <strong>Register</strong>
        </Link>
      </div>
    </>
  );
}

export default Login;
