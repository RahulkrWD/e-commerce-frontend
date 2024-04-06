import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";
import AdminPic from "./AdminPic";
import AdminDetails from "./AdminDetails";
import MyCoupon from "./MyCoupon";

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
      <div>
        {profile ? (
          profile.map((item, index) => (
            <div key={index} className="d-flex justify-content-around">
              <div>
                <AdminPic profile={item} />
                <MyCoupon />
              </div>
              <AdminDetails profile={item} />
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
      </div>
    </Layout>
  );
}

export default Profile;
