import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomePage.module.css";

function ImageCarousel() {
  const [index, setIndex] = useState(0);

  const images = [
    "/image/scroll(1).jpg",
    "/image/scroll(2).webp",
    "/image/Scroll(3).jpg",
    "/image/scroll(4).webp",
    "/image/scroll(6).jpg",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <Carousel activeIndex={index} controls={false}>
      {images.map((imageUrl, index) => (
        <Carousel.Item key={index}>
          <img
            className={`${styles.carouselImage} d-block w-100`}
            src={imageUrl}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
