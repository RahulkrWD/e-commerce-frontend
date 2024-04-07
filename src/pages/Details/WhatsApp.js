import React from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

const WhatsApp = () => {
  const phoneNumber = "7320810579";
  const whatsappLink = `whatsapp://send?phone=${phoneNumber}`;

  return (
    <Link
      to={whatsappLink}
      target="_blank"
      className={`m-2 text-decoration-none ${styles.contactButton}`}
    >
      Contact
      <div className={styles.iconButton}>
        <i className="fs-5 fa-brands fa-whatsapp"></i>
      </div>
    </Link>
  );
};

export default WhatsApp;
