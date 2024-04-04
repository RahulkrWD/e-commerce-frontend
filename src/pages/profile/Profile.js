import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";

function Profile() {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const uniqueId = localStorage.getItem("uniqueId");
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });
  useEffect(() => {
    async function handleProfile() {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/auth/profile?id=${uniqueId}`
      );
      setProfile(response.data);
    }
    handleProfile();
  }, [uniqueId]);
  return (
    <Layout title={"my-profile e-commerce"}>
      {profile ? (
        profile.map((item, index) => (
          <div key={index}>
            <h5>{item.name}</h5>
          </div>
        ))
      ) : (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ minHeight: "50vh" }}
        >
          <Loading />
        </div>
      )}
    </Layout>
  );
}

export default Profile;
