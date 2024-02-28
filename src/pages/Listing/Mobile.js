import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Lising.module.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa6";
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
    <div className={`container ${styles.displayProduct}`}>
      {mobile
        ? mobile.map((data, index) => (
            <Card style={{ margin: "7px" }}>
              <Link
                to={`/${data.brand}`}
                className={styles.displayMobile}
                style={{ color: "black", textDecoration: "none" }}
              >
                <img
                  className={styles.mobileImage}
                  key={index}
                  src={data.image}
                  alt=""
                />

                <h6>
                  {data.brand}{" "}
                  <strong
                    className={`m-3 text-bg-success p-1 ${styles.rating}`}
                  >
                    {data.rating}
                    <span className={` m-1 ${styles.ratingStar}`}>
                      <FaStar />
                    </span>
                  </strong>
                </h6>
                <p>
                  <strong>&#8377; {data.Cost} </strong>
                  <del className="m-3 text-secondary">
                    {" "}
                    &#8377; {data.Cost + 1300}
                  </del>
                </p>
              </Link>
            </Card>
          ))
        : ""}
    </div>
  );
}

export default Mobile;
