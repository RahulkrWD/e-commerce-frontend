import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./HomePage.module.css";

function AutomaticImageCarousel() {
  const [index, setIndex] = useState(0);

  const images = [
    "/image/scroll(1).jpg",
    "/image/scroll(2).webp",
    "/image/Scroll(3).jpg",
    "/image/scroll(4).webp",
    "/image/scroll(6).jpg",
  ];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((imageUrl, idx) => (
        <Carousel.Item key={idx}>
          <img
            className={styles.carouselImage}
            src={imageUrl}
            alt={`Slide ${idx + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default AutomaticImageCarousel;
