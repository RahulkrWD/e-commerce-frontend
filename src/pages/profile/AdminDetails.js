import React, { useState } from "react";
import styles from "./styles/AdminDetails.module.css";

function AdminDetails({ profile }) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  return (
    <div className={styles.Admin_details_container}>
      <h5
        className="p-2 "
        style={{ width: "fit-content", borderBottom: "2px solid red" }}
      >
        Personal Information
      </h5>

      <label htmlFor="name">Name: </label>
      <input
        id="name"
        className={`p-2 m-3 ${styles.input_fields}`}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br className={styles.break} />
      <label htmlFor="phone">Phone: </label>
      <input
        id="phone"
        className={`p-2 m-3 ${styles.input_fields}`}
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        className={`p-2 m-3 ${styles.input_field}`}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <center>
        <button className="btn text-bg-primary">Update Profile</button>
      </center>
    </div>
  );
}

export default AdminDetails;
