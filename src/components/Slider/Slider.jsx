import React from "react";
import { useState, useEffect } from "react";
import styles from "./Slider.module.css";
// import img1 from "../../assets/image1.jpg";
// import img2 from "../../assets/image2.jpg";
// import img3 from "../../assets/image3.jpg";
// import img4 from "../../assets/image4.jpg";
import img1 from "./carousel-1.jpg";
import img2 from "./carousel-2.jpg";
import img3 from "./img1.jpg";
import img4 from "./img2.jpg";
import img5 from "./img3.jpg";
import img6 from "./img4.jpg";
import img7 from "./img5.jpg";



import { MdEmail } from "react-icons/md";

const Slider = () => {
  const slides = [
    { name: img3 },
    { name: img4 },
    { name: img5 },
  ];

  const [currentIndex, setCurrentUser] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(currentIndex == 2? 0 : currentIndex + 1);
    }, 8000);
  });
  return (
    <>
      <div>
        <div
          style={{
            background: `url(${slides[currentIndex].name}) no-repeat center`,
            height: "1000px",
            width: "100%",
          }}
        >
          <div
            // style={
            //   currentIndex == 0 ? { display: "grid" } : { display: "none" }
            // }
          >
            <div className={styles.img1_title}>
              کلینیک روانشناسی اینیاک
            </div>
          </div>
          {/* <div
            style={
              currentIndex == 1 ? { display: "grid" } : { display: "none" }
            }
          ></div>
          <div
            className={styles.img3_box}
            style={
              currentIndex == 2 ? { display: "grid" } : { display: "none" }
            }
          >
            <h1 className={styles.img3_title}>اثرات سلامت روان</h1>
            <p className={styles.img3_p}>
              <br />
              - پتانسیل کامل خود را درک کنند
              <br />- با استرس های زندگی کنار بیایند
              <br />- به صورت مولد کار کنند
              <br />- کمک های معناداری به جوامع خود داشته باشند
            </p>
          </div>
          <div
            className={styles.img4_box}
            style={currentIndex == 3 ? {} : { display: "none" }}
          >
            <div className={styles.img4_text1}>اضطراب</div>
            <div className={styles.img4_text3}>زندگی زناشویی</div>
            <div className={styles.img4_text2}>استرس</div>
            <div className={styles.img4_text5}>اختلال یادگیری کودکان</div>
            <div className={styles.img4_text4}>بیش فعالی</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Slider;
