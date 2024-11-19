import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
