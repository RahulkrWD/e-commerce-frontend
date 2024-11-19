import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../components/layout/Loading"

function GoogleAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async (credentialResponse) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const { name, email } = decoded;

      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/google-register`,
        {
          name,
          email,
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
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <Loading/>}
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
