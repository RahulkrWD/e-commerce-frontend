import React from "react";
import styles from "./styles/Admin.module.css";

function AdminPic({ profile }) {
  return (
    <div className={styles.admin_container}>
      <div className={styles.profile_pic}></div>
      <div className="p-3">
        <h6>Hello,</h6>
        <h5 className="text-primary" style={{ fontStyle: "italic" }}>
          {profile.name}
        </h5>
      </div>
    </div>
  );
}

export default AdminPic;
