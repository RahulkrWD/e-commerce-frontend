import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  // generate uniqueId
  const uniqueId = Math.floor(Math.random() * 70000 + 100000);

  const navigate = useNavigate();
  // form function
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(name, email, password, phone, uniqueId);
    try {
      const res = await axios.post(
        `https://e-commerce-604e.onrender.com/auth/register`,
        {
          name,
          email,
          password,
          phone,
          uniqueId,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"register e-commerce"}>
      <div className="register-page m-2 container  border">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className="m-2"
            label="Name"
            variant="outlined"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            className="m-2"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="m-2"
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className="m-2"
            label="Phone"
            type="text"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            className="m-2"
            label="what is your favorite game"
            type="text"
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to={"/forget-password"} className="btn btn-dark m-2">
            forget Password
          </Link>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
