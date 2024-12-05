import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PiNotepadLight } from "react-icons/pi";
import { IoHeart } from "react-icons/io5";
import { GiPlantRoots, GiStrong, GiLaserSparks } from "react-icons/gi";
import { GiFreedomDove } from "react-icons/gi";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";

import ISTP_M from "./Icons/ISTP_M.jpg";
import ISTP_F from "./Icons/ISTP_F.jpg";
import ISTJ_M from "./Icons/ISTJ_M.jpg";
import ISTJ_F from "./Icons/ISTJ_F.jpg";
import ISFP_M from "./Icons/ISFP_M.jpg";
import ISFP_F from "./Icons/ISFP_F.jpg";
import ISFJ_M from "./Icons/ISFJ_M.jpg";
import ISFJ_F from "./Icons/ISFJ_F.jpg";
import INTP_M from "./Icons/INTP_M.jpg";
import INTP_F from "./Icons/INTP_F.jpg";
import INTJ_M from "./Icons/INTJ_M.jpg";
import INTJ_F from "./Icons/INTJ_F.jpg";
import INFP_M from "./Icons/INFP_M.jpg";
import INFP_F from "./Icons/INFP_F.jpg";
import INFJ_M from "./Icons/INFJ_M.jpg";
import INFJ_F from "./Icons/INFJ_F.jpg";
import ESTP_M from "./Icons/ESTP_M.jpg";
import ESTP_F from "./Icons/ESTP_F.jpg";
import ESTJ_M from "./Icons/ESTJ_M.jpg";
import ESTJ_F from "./Icons/ESTJ_F.jpg";
import ESFP_M from "./Icons/ESFP_M.jpg";
import ESFP_F from "./Icons/ESFP_F.jpg";
import ESFJ_M from "./Icons/ESFJ_M.jpg";
import ESFJ_F from "./Icons/ESFJ_F.jpg";
import ENTP_M from "./Icons/ENTP_M.jpg";
import ENTP_F from "./Icons/ENTP_F.jpg";
import ENTJ_M from "./Icons/ENTJ_M.jpg";
import ENTJ_F from "./Icons/ENTJ_F.jpg";
import ENFP_M from "./Icons/ENFP_M.jpg";
import ENFP_F from "./Icons/ENFP_F.jpg";
import ENFJ_M from "./Icons/ENFJ_M.jpg";
import ENFJ_F from "./Icons/ENFJ_F.jpg";

const Testresult = () => {
  const navigate = useNavigate();
  const [results, setRecord] = useState({
    glasserTest: null,
    MBTItest: null,
  });
  const [G, setG] = useState("مرد");

  async function GetTestResult() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        `http://127.0.0.1:8000//TherapyTests/tests/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer <access token >
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        const user = response.data.TherapTests;
        setRecord({
          glasserTest: user.glasserTest,
          MBTItest: user.MBTItest,
        });
        try {
          const response1 = await axios(
            "http://127.0.0.1:8000//accounts/get_user/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`, // Bearer <access token >
                "Content-Type": "application/json",
              },
            }
          );
          if (response1.status == 200) {
            if (response1.data.user.gender == "F") setG("زن");
          }
        } catch (error) {}
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status == 404) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!بیمار مورد نظر پیدا نشد",
          background: "#075662",
          color: "#FFFF",
          width: "35rem",
          backdrop: `
            rgba(84, 75, 87.0.9)
            left top
            no-repeat`,
          confirmButtonText: "تایید",
          confirmButtonColor: "#0a8ca0",
          preConfirm: () => {
            navigate("/Home");
          },
        });
      }
      if (error.response.status == 400) {
        if (
          error.response.data.message ==
          "ordinary user can not access this Information."
        )
          withReactContent(Swal).fire({
            icon: "error",
            title: "! دسترسی به این صفحه مختص پزشک هست",
            background: "#075662",
            color: "#FFFF",
            width: "40rem",
            backdrop: `
              rgba(84, 75, 87.0.9)
              left top
              no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: "#0a8ca0",
            preConfirm: () => {
              navigate("/Home");
            },
          });
        if (error.response.data.message == "there is no record with this id.")
          withReactContent(Swal).fire({
            icon: "error",
            title: "! مریض مورد نظر پیدا نشد",
            background: "#075662",
            color: "#FFFF",
            width: "40rem",
            backdrop: `
                rgba(84, 75, 87.0.9)
                left top
                no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: "#0a8ca0",
            preConfirm: () => {
              navigate("/Home");
            },
          });
      }

      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      {
        GetTestResult();
      }
    }, 50000000);
  });

  return (
    <>
      <NavBar_SideBar />
      <div
        className="prof_body"
        // style={pages == 2 ? { paddingTop: "1.5%" } : {}}
        onLoad={GetTestResult}
      >
        <div className="prof_Box" style={{ minWidth: "500px" }}>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div className="container bootstrap snippets bootdey">
            <div className="row">
              <div className="col-md-0" style={{ marginTop: "20px" }}>
                <div className="panel" style={{ direction: "rtl" }}>
                  <div className="patient_prof_header">
                    <h1>نتایج تست ها</h1>
                  </div>
                  <div
                    className="patient_prof_insidebox"
                    style={{ display: "grid" }}
                  >
                    <div className="patient_prof_res">
                      <div className="patient_prof_res_card">
                        <h3>Glasser</h3>
                        <hr />
                        {results.glasserTest == null ? (
                          <h5>نتیجه ای برای مشاهده وجود ندارد</h5>
                        ) : (
                          <ul
                            style={{
                              listStyleType: "none",
                              lineHeight: "49px",
                            }}
                          >
                            <li>
                              <IoHeart
                                style={{ color: "red", marginRight: "0px" }}
                              />
                              <span>عشق</span>:{results.glasserTest.love}
                            </li>
                            <li>
                              <GiPlantRoots style={{ color: "green" }} />
                              <span>بقا</span>:{results.glasserTest.survive}
                            </li>
                            <li>
                              <GiFreedomDove style={{ color: "blue" }} />
                              <span>آزادی</span>:{results.glasserTest.freedom}
                            </li>
                            <li>
                              <GiStrong style={{ color: "#EFE4B0" }} />
                              <span>قدرت</span>:{results.glasserTest.power}
                            </li>
                            <li>
                              <GiLaserSparks style={{ color: "#B341EB" }} />
                              <span>سرگرمی</span>:{results.glasserTest.fun}
                            </li>
                          </ul>
                        )}
                      </div>
                      <div className="patient_prof_res_card">
                        <h3>MBTI</h3>
                        <hr />
                        {results.MBTItest == null ? (
                          <h5>نتیجه ای برای مشاهده وجود ندارد</h5>
                        ) : (
                          <>
                            <img
                              style={{ width: "200px", height: "200px" }}
                              src={
                                results.MBTItest == "INTJ"
                                  ? G == "زن"
                                    ? INTJ_F
                                    : INTJ_M
                                  : results.MBTItest == "INTP"
                                  ? G == "زن"
                                    ? INTP_F
                                    : INTP_M
                                  : results.MBTItest == "INFJ"
                                  ? G == "زن"
                                    ? INFJ_F
                                    : INFJ_M
                                  : results.MBTItest == "INFP"
                                  ? G == "زن"
                                    ? INFP_F
                                    : INFP_M
                                  : results.MBTItest == "ISTJ"
                                  ? G == "زن"
                                    ? ISTJ_F
                                    : ISTJ_M
                                  : results.MBTItest == "ISTP"
                                  ? G == "زن"
                                    ? ISTP_F
                                    : ISTP_M
                                  : results.MBTItest == "ISFJ"
                                  ? G == "زن"
                                    ? ISFJ_F
                                    : ISFJ_M
                                  : results.MBTItest == "ISFP"
                                  ? G == "زن"
                                    ? ISFP_F
                                    : ISFP_M
                                  : results.MBTItest == "ENTJ"
                                  ? G == "زن"
                                    ? ENTJ_F
                                    : ENTJ_M
                                  : results.MBTItest == "ENTP"
                                  ? G == "زن"
                                    ? ENTP_F
                                    : ENTP_M
                                  : results.MBTItest == "ENFJ"
                                  ? G == "زن"
                                    ? ENFJ_F
                                    : ENFJ_M
                                  : results.MBTItest == "ENFP"
                                  ? G == "زن"
                                    ? ENFP_F
                                    : ENFP_M
                                  : results.MBTItest == "ESTJ"
                                  ? G == "زن"
                                    ? ESTJ_F
                                    : ESTJ_M
                                  : results.MBTItest == "ESTP"
                                  ? G == "زن"
                                    ? ESTP_F
                                    : ESTP_M
                                  : results.MBTItest == "ESFJ"
                                  ? G == "زن"
                                    ? ESFJ_F
                                    : ESFJ_M
                                  : results.MBTItest == "ESFP"
                                  ? G == "زن"
                                    ? ESFP_F
                                    : ESFP_M
                                  : ""
                              }
                            />
                            {results.MBTItest == "INTJ" ? (
                              <h5 style={{ color: "#A349A4" }}>معمار</h5>
                            ) : results.MBTItest == "INTP" ? (
                              <h5 style={{ color: "#A349A4" }}>منطق دان</h5>
                            ) : results.MBTItest == "INFJ" ? (
                              <h5 style={{ color: "#408E6D" }}>حامی</h5>
                            ) : results.MBTItest == "INFP" ? (
                              <h5 style={{ color: "#408E6D" }}>واسطه</h5>
                            ) : results.MBTItest == "ISTJ" ? (
                              <h5 style={{ color: "#33AAC7" }}>تدارکات</h5>
                            ) : results.MBTItest == "ISTP" ? (
                              <h5 style={{ color: "#C79D0B" }}>هنرشناس</h5>
                            ) : results.MBTItest == "ISFJ" ? (
                              <h5 style={{ color: "#33AAC7" }}>مدافع</h5>
                            ) : results.MBTItest == "ISFP" ? (
                              <h5 style={{ color: "#C79D0B" }}>جست و جو گر</h5>
                            ) : results.MBTItest == "ENTJ" ? (
                              <h5 style={{ color: "#A349A4" }}>فرماندار</h5>
                            ) : results.MBTItest == "ENTP" ? (
                              <h5 style={{ color: "#A349A4" }}>مناظره کننده</h5>
                            ) : results.MBTItest == "ENFJ" ? (
                              <h5 style={{ color: "#408E6D" }}>سردمدار</h5>
                            ) : results.MBTItest == "ENFP" ? (
                              <h5 style={{ color: "#408E6D" }}>
                                سرباز کهنه کار
                              </h5>
                            ) : results.MBTItest == "ESTJ" ? (
                              <h5 style={{ color: "#33AAC7" }}>مجری</h5>
                            ) : results.MBTItest == "ESTP" ? (
                              <h5 style={{ color: "#C79D0B" }}>پیش قدم</h5>
                            ) : results.MBTItest == "ESFJ" ? (
                              <h5 style={{ color: "#33AAC7" }}>کنسول</h5>
                            ) : results.MBTItest == "ESFP" ? (
                              <h5 style={{ color: "#C79D0B" }}>بازیگر</h5>
                            ) : (
                              ""
                            )}
                            <p>{results.MBTItest}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Testresult;
