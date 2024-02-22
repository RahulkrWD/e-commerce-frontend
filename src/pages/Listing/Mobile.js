import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Mobile() {
  const [mobile, setMobile] = useState();
  const { search } = useLocation();
  const id = search.split("=")[1];

  useEffect(() => {
    async function fetchMobile() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/mobile/${id}`
        );
        setMobile(response.data);
      } catch (err) {
        toast.error("server error");
      }
    }
    fetchMobile();
  });

  return (
    <div>
      {mobile
        ? mobile.map((data, index) => <h1 key={index}>{data.Cost}</h1>)
        : ""}
    </div>
  );
}

export default Mobile;
