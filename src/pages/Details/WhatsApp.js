import React from "react";
import { Link } from "react-router-dom";

const WhatsApp = () => {
  const phoneNumber = "7320810579";
  const whatsappLink = `whatsapp://send?phone=${phoneNumber}`;

  return (
    <Link
      to={whatsappLink}
      className="text-decoration-none btn m-2 text-bg-success fw-bold"
      target="_blank"
    >
      Contact Me on WhatsApp
    </Link>
  );
};

export default WhatsApp;
