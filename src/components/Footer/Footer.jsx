import React from "react";
import { MdEmail, MdSettings } from "react-icons/md";
import { FaPhone, FaGithubSquare, FaInfo, FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";


import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.org}>
          <div>
            <ul className={styles.social}>
              <h5>راه های ارتباطی</h5>
              <hr style={{ width: "22rem", color: "white", opacity: "1" }} />
              <li>
                <MdEmail className={styles.social_icon} />
                ایمیل: eniakgroupiust@gmail.com
              </li>
              <li>
                <a
                  href="https://github.com/ENIAC-group"
                  style={{ color: "#a0aec0", textDecoration: "none" }}
                >
                  <FaGithubSquare className={styles.social_icon} />
                  گیت هاب: https://github.com/ENIAC-group
                </a>
              </li>
              <li>
                <FaPhone className={styles.social_icon} />
                تلفن: 12345678-021
              </li>
            </ul>
          </div>
          <div>
            <ul className={styles.social}>
              <h5>دسترسی آسان</h5>
              <hr style={{ width: "22rem", color: "white", opacity: "1" }} />
              <li>
                <a
                  href="/Aboutus"
                  style={{ color: "#a0aec0", textDecoration: "none" }}
                >
                  <FaInfo className={styles.social_icon} />
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="/Home"
                  style={{ color: "#a0aec0", textDecoration: "none" }}
                >
                  <FaHome className={styles.social_icon} />
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a
                  href="/Setting"
                  style={{ color: "#a0aec0", textDecoration: "none" }}
                >
                  <IoIosLogIn className={styles.social_icon} />
                  ورود به سایت
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.credits}>
          <span>© 2024 Appy. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
          <span>ENIAC-Group</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
