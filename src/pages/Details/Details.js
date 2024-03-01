import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/Layout";

function Details() {
  const [items, setItems] = useState("");
  const { details } = useParams();
  const { search } = useLocation();
  const id = search.split("=")[1];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/${details}?id=${id}`
        );
        setItems(response.data);
      } catch (err) {
        setItems("");
      }
    }
    fetchData();
  });
  return (
    <Layout>
      {items ? (
        <>
          {items.map((data, index) => (
            <div key={index}>
              <img src={data.image} alt="" />
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </Layout>
  );
}

export default Details;
