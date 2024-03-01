import React from "react";
import Layout from "../components/layout/Layout";
function About() {
  return (
    <Layout title={"about us e-commerce"}>
      <div className="container">
        <div className="image">
          <img src="/image/about.jpeg" alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </Layout>
  );
}

export default About;
