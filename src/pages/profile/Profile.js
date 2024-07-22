import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";
// import AdminPic from "./AdminPic";
import AdminDetails from "./AdminDetails";
import styles from "./styles/Profile.module.css";
import cryptoJs from "crypto-js";

function Profile() {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  let dataDecrypted;
  if (userDataString) {
    const bytes = cryptoJs.AES.decrypt(
      userDataString,
      process.env.REACT_APP_SECRETKEY
    );
    dataDecrypted = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
  }

  console.log(dataDecrypted);
  useEffect(() => {
    if (!dataDecrypted.token) {
      return navigate("/login");
    }
  });
  useEffect(() => {
    async function handleProfile() {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/auth/profile?id=${dataDecrypted.id}`
      );
      setProfile(response.data);
    }

    handleProfile();
  }, [dataDecrypted._id]);
  return (
    <Layout title={"my-profile e-commerce"}>
      <div>
        {profile ? (
          profile.map((item, index) => (
            <div
              key={index}
              className={`d-flex justify-content-evenly ${styles.profile_container}`}
            >
              {/* <AdminPic /> */}

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
