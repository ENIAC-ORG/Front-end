import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./Crasoul.module.css"; // Import the CSS module

// Import the images
import img1 from "./crasoul1.webp";
import img2 from "./crasoul2.webp";
import img3 from "./crasoul3.webp";
import img4 from "./crasoul4.webp";

const HomeCarousel = () => {
  return (
    <div className={styles.carouselBackground}>
      <Carousel  interval={500} controls={true} indicators={true}
        nextIcon={
          <span
            className={`carousel-control-next-icon ${styles.carouselControlNextIcon}`}
            aria-hidden="true"
          />
        }
        prevIcon={
          <span
            className={`carousel-control-prev-icon ${styles.carouselControlPrevIcon}`}
            aria-hidden="true"
          />
        }
      >
        {/* First Slide */}
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img2}
            alt="First Slide"
          />
          
           <Carousel.Caption >
            <h1 className={styles.upperLeftCaption}>Welcome to ENIAC</h1>
            {/* <p h3 className={styles.lowerRightCaption}>انیاک معتمد حال شما</p> */}
          </Carousel.Caption> 
        </Carousel.Item> 

        {/* Second Slide */}
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img4}
            alt="Second Slide"
          />
          <Carousel.Caption>
            <h3>Empowering Minds</h3>
            <p>Professional care and support for your mental well-being.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Slide */}
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img1}
            alt="Third Slide"
          />
          {/* <Carousel.Caption>
            <h3>Peace and Serenity</h3>
            <p>Discover the tranquility of healing.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img3}
            alt="Third Slide"
          />
          <Carousel.Caption>
            <h3>Peace and Serenity</h3>
            <p>Discover the tranquility of healing.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
