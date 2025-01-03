import React, { useState } from "react";
import { GoogleLogin as ReactGoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"; // Ensure correct import syntax
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CryptoJS from "crypto-js";
import Loading from "../../components/layout/Loading"; // Import the Loading component

function GoogleLogin({ close }) {
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true); // Show the Loading component
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const { name, email } = decoded;
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/google-login`,
        {
          name,
          email,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        const user = response.data;
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
        close(); // Close modal if applicable
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error during Google login: " + error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      setLoading(false); // Hide the Loading component
    }
  };

  return (
    <>
      {loading && <Loading />} {/* Show the Loading component when loading */}
      <ReactGoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          toast.error("Google Signup Failed");
        }}
      />
    </>
  );
}

export default GoogleLogin;
