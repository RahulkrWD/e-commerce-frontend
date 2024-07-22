import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminPic from "./AdminPic";
import styles from "./Profile.module.css";

function Photo() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const id = localStorage.getItem("uniqueId");

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/profile/get-photo/${id}`
      );
      setPhotos(data);
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
        `${process.env.REACT_APP_API}/profile/upload/photo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.success);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div>
      {photos.length > 0 && (
        <>
          {photos.map((photo, index) => (
            <div key={index}>
              <img
                className={styles.profile_image}
                src={`data:${photo.type};base64,${photo.data}`}
                alt="Profile"
              />
            </div>
          ))}
        </>
      )}
      <AdminPic onFormSubmit={onFormSubmit} onChangeHandler={onChangeHandler} />
    </div>
  );
}

export default Photo;
