import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

function WomensDeals() {
  const [deals, setDeals] = useState();
  useEffect(() => {
    async function fetchMensDeals() {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/product/womens/deals`
      );
      setDeals(response.data);
    }
    fetchMensDeals();
  });

  return (
    <>
      <div className={styles.WomensDeals}>
        {deals
          ? deals.map((data, index) => (
              <Link
                key={index}
                to={`${data.offerId}`}
                className={`text-decoration-none`}
              >
                <Card.Img
                  className={styles.offersImage}
                  variant="top"
                  src={data.img}
                  alt=""
                />

                <Card.Title className={`text-dark`}>
                  <p style={{ color: "purple" }}>
                    Upto: <strong>{data.offers}</strong> Off
                  </p>
                </Card.Title>
              </Link>
            ))
          : " "}
      </div>
    </>
  );
}

export default WomensDeals;
