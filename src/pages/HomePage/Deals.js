import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styles from "./HomePage.module.css";
function QuickSearch() {
  const [quicksearch, setQuicksearch] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuickSearch() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/deals`
        );
        setQuicksearch(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchQuickSearch();
  });
  return (
    <div className={`container mt-4 ${styles.quickSearchContainer}`}>
      {loading ? (
        <h5>Loading ...</h5>
      ) : (
        <>
          {quicksearch.map((data, index) => (
            <Link
              key={index}
              to={`category?${data.CategoryName}=${data.id}`}
              className="text-decoration-none"
            >
              <Card.Img
                className={styles.cardImage}
                variant="top"
                src={data.img}
                alt=""
              />

              <Card.Title className={`text-dark ${styles.cardTitle}`}>
                <p> {data.CategoryName}</p>

                <p style={{ color: "chocolate" }}>
                  Start price: &#8377;
                  <strong>{data.cost}</strong>
                </p>
              </Card.Title>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default QuickSearch;
