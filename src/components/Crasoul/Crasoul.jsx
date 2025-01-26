import React from "react";
import { Carousel } from "react-bootstrap";
import "./Crasoul.css"; // Import the CSS module

// Import the images
import img1 from "./crasoul1.png";
import img2 from "./crasoul2.jpg";
import img3 from "./crasoul3.png";
import img4 from "./crasoul4.png";

const HomeCarousel = () => {
  return (
    <div className="carouselBackground">
      <Carousel  interval={10000000000000} controls={true} indicators={true}
        nextIcon={
          <span
            className={`carousel-control-next-icon carouselControlNextIcon`}
            aria-hidden="true"
          />
        }
        prevIcon={
          <span
            className={`carousel-control-prev-icon carouselControlPrevIcon`}
            aria-hidden="true"
          />
        }
      >
        <Carousel.Item>
          <img
            className={`d-block w-100 carouselImage`}
            src={img2}
            alt="First Slide"
          />
          
           
        </Carousel.Item> 
       <Carousel.Item>
          <img
            className={`d-block w-100 carouselImage`}
            src={img4}
            alt="Second Slide"
          />
          <Carousel.Caption>
            <div className="font-custom carouselcaption">
            <p className="mb-3 carouselcaption1" style={{fontWeight:"bolder"}}>توانمندسازی ذهن‌ها</p>
            <p className="carouselcaption2">!مراقبت و پشتیبانی حرفه‌ای برای سلامت روان شما</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 carouselImage`}
            src={img1}
            alt="Third Slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block w-100 carouselImage`}
            src={img3}
            alt="Third Slide"
          />
          <Carousel.Caption>
            <div className="font-custom carouselcaption">
            <p className="mb-3 carouselcaption1" style={{fontWeight:"bolder"}}>تجربه‌ای از آرامش و آسودگی در لحظه‌های زندگی شما</p>
            <p className="carouselcaption2">سفری به دنیای آرامش و بهبودی؛ جایی که ذهن و روح شما احیا می‌شوند</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
