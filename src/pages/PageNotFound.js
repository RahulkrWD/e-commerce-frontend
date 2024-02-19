import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Layout title={"page not found go back"}>
      <center className="container p-3">
        <h1 className="fw-bolder">Coders are works</h1>
        <h2 className="fw-bolder">-coming soon-</h2>
        <Link to={"/"} className="btn text-bg-warning fw-bold">
          Go Back
        </Link>
      </center>
    </Layout>
  );
}

export default PageNotFound;
