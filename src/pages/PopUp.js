import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PopUp.module.css";

function PopUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      navigate("/home");
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      className=" text-bg-dark w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className={styles.R}>R</h1>
      <h1 className={`p-1 ${styles.A}`}>a</h1>
      <h1 className={styles.H}>h</h1>
      <h1 className={`p-1 ${styles.U}`}>u</h1>
      <h1 className={styles.L}>l</h1>
      <i className={` p-2 fs-3 fa-solid fa-camera ${styles.icons}`}></i>
    </div>
  );
}

export default PopUp;
