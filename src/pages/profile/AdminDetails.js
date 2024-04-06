import React, { useState } from "react";
import styles from "./styles/AdminDetails.module.css";

function AdminDetails({ profile }) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  return (
    <div>
      <h5
        className="p-2 "
        style={{ width: "fit-content", borderBottom: "2px solid red" }}
      >
        Personal Information
      </h5>
      <label>Name: </label>
      <input
        className={`p-1 ${styles.input_fields}`}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="p-2 text-primary fw-bold">Edit</span>
      <br />
      <label>Phone: </label>
      <input
        className={`p-1 ${styles.input_fields}`}
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <span className="p-2 text-primary fw-bold">Edit</span>
      <br />
      <label>Email: </label>
      <input
        className={`p-1 ${styles.input_fields}`}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
    </div>
  );
}

export default AdminDetails;
