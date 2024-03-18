import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import styles from "./Details.module.css";
import WhatsApp from "./WhatsApp";
import Loading from "../../components/layout/Loading";
import Tabs from "./Tabs";

function Details() {
  const [items, setItems] = useState([]);
  const { product } = useParams();
  const { search } = useLocation();
  const categoryId = product.split("=")[1];
  const id = search.split("=")[1];
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/product?category=${categoryId}&id=${id}`
        );
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setItems([]);
      }
    };

    fetchData();
  });

  return (
    <Layout>
      <div className=" p-4 ">
        {items ? (
          items.map((data, index) => (
            <div key={index} className={styles.details_container}>
              <div className="product details m-2">
                {data.gallery.map((image, idx) => (
                  <div key={idx}>
                    <img
                      className={styles.gallery}
                      src={image}
                      onMouseEnter={() => setSelectImage(image)}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              {!selectImage ? (
                <img
                  className={` m-2 ${styles.main_image}`}
                  src={data.image}
                  alt=""
                />
              ) : (
                <img
                  className={` m-2 ${styles.main_image}`}
                  src={selectImage}
                  alt=""
                />
              )}
              <div className="p-4">
                <span className=" ">{data.productName}</span>
                <h1 className="">{data.type}</h1>
              </div>
            </div>
          ))
        ) : (
          <center className="p-5">
            <Loading />
          </center>
        )}
        <div className="container">
          <button className="btn text-bg-danger m-2 fw-bold">
            Add to Cart
          </button>
          <button className="btn text-bg-warning fw-bold">Buy Now</button>
          <WhatsApp />
        </div>

        <div className="container p-2">
          <Tabs item={items} />
        </div>
      </div>
    </Layout>
  );
}

export default Details;
