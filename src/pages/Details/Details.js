import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import styles from "./Details.module.css";
import WhatsApp from "./WhatsApp";
import Loading from "../../components/layout/Loading";
import Tabs from "./Tabs";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Delivery from "./Delivery";
import AddCart from "../cart/Button";
import Offers from "./Offers";
import RelatedProduct from "./RelatedProduct";

function Details() {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  const { productId } = useParams();
  const product = productId.split("&")[0];

  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/product/${categoryId}?product=${product}`
        );
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setItems([]);
      }
    };

    fetchData();
  }, [categoryId, product]);

  return (
    <Layout title={"details DeP.com"}>
      <div className="p-2">
        {items ? (
          items.map((data, index) => (
            <div key={index}>
              <div className={styles.details_container}>
                <div className={`m-2 ${styles.gallery_container}`}>
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
                <div className="p-2">
                  <span className="">{data.productName}</span>
                  <h4 className="pt-2 fw-bolder">{data.type}</h4>
                  <p className={styles.stock}>In Stock</p>
                  <Rating
                    style={{ fontSize: "14px" }}
                    name="text-feedback"
                    readOnly
                    precision={0.5}
                    value={data.rating}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <div className="pt-3">
                    <span className="fw-bold">&#8377;{data.cost}</span>

                    <del className="p-3 text-secondary">
                      &#8377;{data.cost + 200}
                    </del>
                    <span className=" p-2 text-danger fw-bold">
                      {data.offer} off
                    </span>
                  </div>
                  <div className="d-flex">
                    <AddCart item={data} />
                    <WhatsApp />
                  </div>

                  <Delivery />
                  <Offers />
                </div>
              </div>

              <div className="container p-2">
                <Tabs item={items} />
              </div>
            </div>
          ))
        ) : (
          <center className="p-5">
            <Loading />
          </center>
        )}
      </div>

      <RelatedProduct />
    </Layout>
  );
}

export default Details;
