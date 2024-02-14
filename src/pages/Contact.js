import React from "react";
import Layout from "../components/layout/Layout";

function Contact() {
  return (
    <Layout title={"contact us e-commerce"}>
      <div className="container">
        <div className="image">
          <img src="/image/contact.jpeg" alt="" />
        </div>
        <div>
          <h1>Contact Us</h1>
          <p>
            Any Query and info about product feel free to call anytime we{" "}
            <strong>24X7</strong> available
          </p>
          <p> www.help@myapp.com</p>
          <p> 012-987654</p>
          <p> 1800-0000-0000 (Tall free)</p>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
