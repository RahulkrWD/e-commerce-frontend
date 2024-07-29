import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/layout/Loading";
import AdminDetails from "./AdminDetails";
import styles from "./styles/Profile.module.css";
import cryptoJs from "crypto-js";
import Photo from "./Photo";
import { toast } from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState("");
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
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
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/auth/get-photo/${dataDecrypted.id}`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Failed to fetch profile photos:", error);
    }
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/auth/upload/photo/${dataDecrypted.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.success);
      fetchData();
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

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
  }, [dataDecrypted.id]);
  return (
    <Layout title={"my-profile e-commerce"}>
      <div>
        <Photo
          photos={photos}
          onFormSubmit={onFormSubmit}
          onChangeHandler={onChangeHandler}
        />
        {profile ? (
          profile.map((item, index) => (
            <div
              key={index}
              className={`d-flex justify-content-evenly ${styles.profile_container}`}
            >
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
