import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import image from "../../assets/Landing.png";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";

const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* <header className={styles.header}>
        <h1 className={styles.BrandName}>ENIAC</h1>
        <button className={styles.StartButton} onClick={e=>navigate("/AboutUs")}>درباره ما</button>
      </header> */}
      <NavBar_SideBar/>
      <div className={styles.Landingbody}>
        <p className={styles.Desc}>
          وسیله ای برای همراهی و پیشروی در سلامت روحی افراد
          <br />
          <br />
          جلوگیری از بیماری های روانی
          <br />
          <br />
          درمان مشکلات
          <br />
          <br />
          با ثبت نام در اینیاک میتوانید با کمک افراد با‌مهارت و خبره در این
          زمینه پیشرفت کنید!!
          <button className={styles.signup} onClick={e=>navigate("/Signup")}  >ثبت نام</button>
          {/* <button className={styles.signup}>ثبت نام</button> */}
        </p>
          <img className={styles.imageimagecover} src={image} alt="" />
        <div className={styles.footer}>
          کاری از دانشجویان 1400 مهندسی کامپیوتر علم و صنعت
          <br />
        </div>
      </div>
    </>
  );
};

export default Landing;
