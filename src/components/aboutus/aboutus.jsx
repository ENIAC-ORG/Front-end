import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./AboutUs.module.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import img1 from "./img1_aboutus.jpg";
import img2 from "./img2_aboutus.jpg";
import { MdOutlineDiversity1 } from "react-icons/md";


const AboutUsPage = () => {
  const navigate = useNavigate();
  const images = [img1, img2];
  const [img_index, setIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setIndex(img_index == 1 ? 0 : img_index + 1);
    }, 8000);
  });
  return (
    <body className={styles.aboutusbody}>
      <NavBar_SideBar />
      <div className={styles.backgroundaboutus}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <br />
        <h1 className={styles.headeraboutus}>
          مرکز روانشناسی و مشاوره خانواده
          <span style={{ display: "inline-block", width: "10px" }}></span>
          <MdOutlineDiversity1/>
        </h1>
        <div style={{display:'flex',direction:'rtl',flexWrap:'wrap',justifyContent:'space-between'}}>
        <p className={styles.paragsize}>
          <br />
          این مرکز فعالیت خود را با هدف ارائه خدمات روانشناسی و روانپزشکی توسط
          متخصصان و روانپزشکان مجرب و حاذق آغاز کرده است. این مرکز با داشتن
          فضایی مناسب، خدماتی تخصصی نظیر روان درمانی فردی، درمان مشکلات زوج و
          خانواده، مشاوره انلاین، روانپزشکی سالمندان، کودکان و نوجوانان را ارائه
          می دهد.
          <br />
          بخش‌های مختلف این مرکز، عبارت هستند از :
        </p>
        <div align="center">
          <a target="_blank">
            <img
              src={images[img_index]}
              className={styles.image1space}
              alt="Cinque Terre"
            />

            {/* <img src={img2} className={styles.imageclinic} alt="Cinque Terre" width="300" height="200" /> */}
          </a>
        </div>
        </div>
        <div align="center">
          <table className={styles.tableaboutus} align="center">
            <tr>
              <th>
                <button className={styles.button1}>
                  گروه روان پزشکان و پزشکان سلامت
                </button>
              </th>
              <th>
                <button className={styles.button1}>گروه زوج درمانگران</button>
              </th>
              <th>
                <button className={styles.button1}>
                  گروه روان درمانگران فردی
                </button>
              </th>
              <th>
                <button className={styles.button1}>گروه مشاوره کودک</button>
              </th>
            </tr>
            <tr>
              <th>
                <button className={styles.button1}>
                  واحد روان سنجی و پژوهش
                </button>
              </th>
              <th>
                <button className={styles.button1}>
                  گروه مشاورین تحصیلی و شغلی
                </button>
              </th>
              <th>
                <button className={styles.button1}>
                  گروه مشاورین پیش از ازدواج
                </button>
              </th>
              <th>
                <button className={styles.button1}>گروه مشاوره نوجوان</button>
              </th>
            </tr>
          </table>
        </div>
        <br />
        
        <div align="center" style={{ margin: "40px" ,marginTop:'10px'}}>
          <p className={styles.paragend}>🌱منتظر حضور سبزتان هستیم</p>
          <button className={styles.button_69} onClick={(e) => navigate("/")}>
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default AboutUsPage;
