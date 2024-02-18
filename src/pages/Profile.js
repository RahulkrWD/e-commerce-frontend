import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return navigate("/login");
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API}/auth/private`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };

    authCheck();
  }, [navigate, setLoading, setUserData]);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout title={"my-profile e-commerce"}>
      <p>Welcome, {userData?.username || auth}!</p>
      <Outlet />
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </Layout>
  );
}

export default Profile;
