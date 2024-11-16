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
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const userDataString = localStorage.getItem("userData");
  let dataDecrypted = null;
  if (userDataString) {
    try {
      const bytes = cryptoJs.AES.decrypt(
        userDataString,
        process.env.REACT_APP_SECRETKEY
      );
      dataDecrypted = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
    }
  }
  useEffect(() => {
    if (!dataDecrypted?.token) {
      navigate("/home"); 
    }
  }, [dataDecrypted, navigate]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/auth/get-photo/${dataDecrypted.id}`
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Failed to fetch profile photos:", error);
        toast.error("Error fetching photos.");
      }
    };

    if (dataDecrypted?.id) {
      fetchPhotos();
    }
  }, [dataDecrypted?.id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/auth/profile?id=${dataDecrypted.id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Error fetching profile.");
      }
    };

    if (dataDecrypted?.id) {
      fetchProfile();
    }
  }, [dataDecrypted?.id]);

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
      toast.success(response.data.success || "Photo uploaded successfully!");
      setFile(null);
      setPhotos((prev) => [...prev, response.data.photo]);
    } catch (error) {
      console.error("Failed to upload photo:", error);
      toast.error("Error uploading photo.");
    }
  };

  return (
    <Layout title={"My Profile - E-Commerce"}>
      <div>
        
        <Photo
          photos={photos}
          onFormSubmit={onFormSubmit}
          onChangeHandler={onChangeHandler}
        />
        {profile.length > 0 ? (
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
