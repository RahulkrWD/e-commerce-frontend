import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminPic from "./AdminPic";
import styles from "./styles/Admin.module.css";
import cryptoJs from "crypto-js";

function Photo() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
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

  return (
    <div>
      {photos.length > 0
        ? photos.map((photo, index) => (
            <div key={index}>
              {photo.data ? (
                <img
                  className={styles.profile_placeholder}
                  src={`data:${photo.type};base64,${photo.data}`}
                  alt="Profile"
                />
              ) : (
                <img
                  className={styles.profile_placeholder}
                  src="/image/default_profile_photo.webp"
                  alt=""
                />
              )}
            </div>
          ))
        : ""}
      <AdminPic onFormSubmit={onFormSubmit} onChangeHandler={onChangeHandler} />
    </div>
  );
}

export default Photo;
