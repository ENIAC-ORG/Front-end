import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./Crasoul.module.css"; // Import the CSS module

// Import the images
import img1 from "./crasoul1.png";
import img2 from "./crasoul2.jpg";
import img3 from "./crasoul3.png";
import img4 from "./crasoul4.png";

const HomeCarousel = () => {
  return (
    <div className={styles.carouselBackground}>
      <Carousel  interval={2700} controls={true} indicators={true}
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
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img2}
            alt="First Slide"
          />
          
           
        </Carousel.Item> 
       <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img4}
            alt="Second Slide"
          />
          <Carousel.Caption>
            <div className="font-custom">
            <h1>توانمندسازی ذهن‌ها</h1>
            <h4>!مراقبت و پشتیبانی حرفه‌ای برای سلامت روان شما</h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img1}
            alt="Third Slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={img3}
            alt="Third Slide"
          />
          <Carousel.Caption>
            <div className="font-custom">
            <h1 className="mb-3">تجربه‌ای از آرامش و آسودگی در لحظه‌های زندگی شما</h1>
            <h4>سفری به دنیای آرامش و بهبودی؛ جایی که ذهن و روح شما احیا می‌شوند</h4>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
