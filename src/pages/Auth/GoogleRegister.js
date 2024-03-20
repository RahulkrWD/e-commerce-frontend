import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function GoogleAuth() {
  const navigate = useNavigate();
  const uniqueId = Math.ceil(Math.random() * 999999);

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const { name, email } = decoded;

      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/google-register`,
        {
          name,
          email,
          uniqueId,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error during Google signup:", error);

      if (error.response) {
        toast.error("response data", error.response.data);
      }
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSignup}
        onError={() => {
          toast.error("Google Signup Failed");
        }}
      />
    </>
  );
}

export default GoogleAuth;
