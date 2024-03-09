import React from "react";
import { Link } from "react-router-dom";

const WhatsApp = () => {
  const phoneNumber = "7320810579";
  const whatsappLink = `whatsapp://send?phone=${phoneNumber}`;

  return (
    <Link to={whatsappLink} target="_blank">
      Contact Me on WhatsApp
    </Link>
  );
};

export default WhatsApp;
