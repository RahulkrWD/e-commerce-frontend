import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import styles from "./Details.module.css";
import WhatsApp from "./WhatsApp";
import Loading from "../../components/layout/Loading";

function Details() {
  const [items, setItems] = useState([]);
  const { product } = useParams();
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/${product}?id=${id}`
        );
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setItems([]);
      }
    };

    fetchData();
  }, [product, id]);

  return (
    <Layout>
      <div className="container pt-4 ">
        {items ? (
          items.map((data, index) => (
            <div key={index} className={styles.details_container}>
              {!selectImage ? (
                <img className={styles.main_image} src={data.image} alt="" />
              ) : (
                <img className={styles.main_image} src={selectImage} alt="" />
              )}
              <div className="product details p-2 m-1">
                <p>{data.productName}</p>
                {data.gallery.map((image, idx) => (
                  <img
                    className={styles.gallery}
                    key={idx}
                    src={image}
                    onMouseEnter={() => setSelectImage(image)}
                    alt=""
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <center className="p-5">
            <Loading />
          </center>
        )}
        <button className="btn text-bg-danger m-2 fw-bold">Add to Cart</button>
        <button className="btn text-bg-warning fw-bold">Buy Now</button>
        <WhatsApp />
      </div>
    </Layout>
  );
}

export default Details;
