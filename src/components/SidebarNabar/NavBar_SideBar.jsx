import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHref } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { PiNotepadLight } from "react-icons/pi";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { MdOutlineMoreTime } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosAlarm, IoIosAlbums, IoIosStar } from "react-icons/io";
import styles from "./NavBar.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  FaCog,
  FaHome,
  FaServicestack,
  FaRegStickyNote,
  FaRegFileAlt,
} from "react-icons/fa";
import styles1 from "./Sidebar.module.css";
const NavBar_SideBar = () => {
  var role = localStorage.getItem("role");
  var log = localStorage.getItem("IN");
  const navigate = useNavigate();
  const [inside, setIN] = useState(false);
  const [sideBarToggle, setsideBarToggle] = useState(false);
  const [MenueToggle, setMenueToggle] = useState(false);
  const handsidebarToggle = () => {
    setsideBarToggle(!sideBarToggle);
  };

  useEffect(() => {
    setTimeout(() => {
      {
        role = localStorage.getItem("role");
        log = localStorage.getItem("LogIn");
        if (log == "true") setIN(true);
        else setIN(false);
      }
    }, 90);
  });

  const getlog = () => {
    log = localStorage.getItem("IN");
    if (log == "true") setIN(true);
    else setIN(false);
  };

  async function LogOut(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios("http://127.0.0.1:8000/accounts/Logout/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("LogIn", false);
        localStorage.setItem("role", "-");
        setIN(false);
        localStorage.removeItem("accessToken");
        console.log(response);
        const data = response.data;
        console.log(data);
        withReactContent(Swal).fire({
          icon: "success",
          title: "!خروج از حساب با موفقیت رخ داد",
          background: "#473a67",
          color: "#b4b3b3",
          width: "35rem",
          backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
          confirmButtonText: "تایید",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!",
          background: "#473a67",
          color: "#b4b3b3",
          width: "35rem",
          backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
          confirmButtonText: "تایید",
        });
      }
    }
  }
  return (
    <>
      <div
        className={styles.navbar}
        style={sideBarToggle ? { marginRight: "16rem" } : {}}
        onLoad={(e) => getlog()}
      >
        <div className={styles.navcontainer}>
          <div style={{ position: "relative" }}>
            <div className={styles.profile_btn}>
              <FaUserCircle
                style={{ width: "18px", height: "18px" }}
                onClick={(e) => setMenueToggle(~MenueToggle)}
              />
              <div
                className={styles.profile_menu}
                style={MenueToggle ? {} : { display: "none" }}
              >
                <ul className={styles.prof_list}>
                  <li>
                    <label onClick={(e) => navigate("/User_Panel")}>
                      پروفایل
                    </label>
                  </li>
                  {inside == true ? (
                    <li>
                      <label
                        onClick={(e) => {
                          LogOut(e);
                          navigate("/Signup");
                        }}
                      >
                        خروج از حساب کاربری
                      </label>
                    </li>
                  ) : (
                    <li>
                      <label onClick={(e) => navigate("/signup")}>
                        ورود به حساب کاربری
                      </label>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <a className={styles.con} onClick={(e) => navigate("/Doctors")}>
            <FaUserDoctor className={styles.FB} />
          </a>
          {role == "doctor" ? (
            <a className={styles.con} onClick={(e) => navigate("/DoctorPage")}>
              <ImProfile className={styles.FB} />
            </a>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.p1} onClick={(e) => navigate("/Home")}>
          <label className={styles.sitetitle}>ENIAC</label>
        </div>
        <div className={styles.p1}>
          <div style={{ width: "90px" }}></div>
          <FaBars className={styles.fBar} onClick={handsidebarToggle} />
        </div>
      </div>
      {/* ----------------------------------------------------------------- */}
      <div style={sideBarToggle ? { display: "block" } : { display: "none" }}>
        <div className={styles1.side_body}>
          <div className={styles1.side_p1}>
            <h1 className={styles1.side_title}>داشبورد</h1>
          </div>
          <hr style={{ borderBlockColor: "white" }}></hr>
          <ul className={styles1.side_list}>
            <li
              className={styles1.side_list_element}
              onClick={(e) => {
                handsidebarToggle();
                navigate("/Home");
              }}
            >
              <label href="" className={styles1.side_list_element_text}>
                <FaHome className={styles1.side_icons} /> خانه
              </label>
            </li>
            {inside ? (
              <li
                className={styles1.side_list_element}
                onClick={(e) => {
                  handsidebarToggle();
                  navigate("/User_panel");
                }}
              >
                <label href="" className={styles1.side_list_element_text}>
                  <FaUserCircle className={styles1.side_icons} /> پروفایل
                </label>
              </li>
            ) : (
              <></>
            )}
            <li
              className={styles1.side_list_element}
              onClick={(e) => {
                handsidebarToggle();
                navigate("/TestPage");
              }}
            >
              <label href="" className={styles1.side_list_element_text}>
                <FaRegFileAlt className={styles1.side_icons} /> تست‌ها
              </label>
            </li>
            {/* <li
              className={styles1.side_list_element}
              onClick={(e) => {
                handsidebarToggle();
                navigate("/Landing");
              }}
            >
              <label href="" className={styles1.side_list_element_text}>
                <FaServicestack className={styles1.side_icons} /> خدمات
              </label>
            </li> */}
            <li
              className={styles1.side_list_element}
              onClick={(e) => {
                handsidebarToggle();
                navigate("/Aboutus");
              }}
            >
              <label href="" className={styles1.side_list_element_text}>
                <FaRegStickyNote className={styles1.side_icons} /> معرفی
              </label>
            </li>
            {role == "doctor" ? (
              <>
                <li
                  className={styles1.side_list_element}
                  onClick={(e) => {
                    handsidebarToggle();
                    navigate("/PatientsList");
                  }}
                >
                  <label href="" className={styles1.side_list_element_text}>
                    <IoIosAlbums className={styles1.side_icons} />
                    پرونده مراجعین{" "}
                  </label>
                </li>
                <li
                  className={styles1.side_list_element}
                  onClick={(e) => {
                    handsidebarToggle();
                    navigate("/DoctorPage");
                  }}
                >
                  <label href="" className={styles1.side_list_element_text}>
                    <IoIosAlarm className={styles1.side_icons} /> رزرو های من{" "}
                  </label>
                </li>
                <li
                  className={styles1.side_list_element}
                  onClick={(e) => {
                    handsidebarToggle();
                    navigate("/DoctorFreeTime");
                  }}
                >
                  <label href="" className={styles1.side_list_element_text}>
                    <MdOutlineMoreTime className={styles1.side_icons} />
                    انتخاب ساعات کاری{" "}
                  </label>
                </li>
                <li
                  className={styles1.side_list_element}
                  onClick={(e) => {
                    handsidebarToggle();
                    navigate("/DoctorRatings");
                  }}
                >
                  <label href="" className={styles1.side_list_element_text}>
                    <FaStar className={styles1.side_icons} />
                    مشاهده نظرات{" "}
                  </label>
                </li>
              </>
            ) : role == "user" ? (
              <>
                <li
                  className={styles1.side_list_element}
                  onClick={(e) => {
                    handsidebarToggle();
                    navigate("/TestResult");
                  }}
                >
                  <label href="" className={styles1.side_list_element_text}>
                    <PiNotepadLight className={styles1.side_icons} />
                    نتایج تست ها{" "}
                  </label>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar_SideBar;
