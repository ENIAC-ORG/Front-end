import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

import { TbGenderBigender } from "react-icons/tb";
import { FaRegCalendarDays, FaPhoneFlip } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdAlternateEmail } from "react-icons/md";

import male_avatar from "../../assets/Male_Avatar.jpg";
import female_avatar from "../../assets/Female_Avatar.jpg";
import nogender_avatar from "../../assets/NoGender.png";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./User_Panel.css";
import ChangePassword from "./ChangePassword";
import ChangeInformation from "./ChangeInformation";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";

const User_Panel = () => {

function toPersianDigits(str) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

  const navigate = useNavigate();
  const [pages, setdisplay] = useState(1);
  const [user_info, setinfo] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    BirthDay: null,
    Gender: "",
    PhoneNumber: "",
  });
  const date = new DateObject({ calendar: "persian", date: user_info.BirthDay ? new Date(user_info.BirthDay) : new Date(), locale: "fa", format: "DD-MM-YYYY", digit: "fa" });
  date.convert(persian);
  async function GetUserInfo(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null)
      withReactContent(Swal)
        .fire({
          icon: "warning",
          title: "!برای مشاهده اطلاعات شخصی ورود به  اکانت خود الزامی است",
          background: "#473a67",
          color: "#b4b3b3",
          width: "35rem",
          backdrop: `
      rgba(84, 75, 87.0.9)
      left top
      no-repeat`,
          showDenyButton: true,
          confirmButtonText: "ورود به سایت",
          confirmButtonColor: '#55AD9B',
          denyButtonText: "صفحه اصلی",
          denyButtonColor: "#89817e",
          customClass: {
            actions: "my-actions",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/Signup");
          } else if (result.isDenied) {
            navigate("/Home");
          }
        });
    else {
      try {
        const response = await axios(
          "http://127.0.0.1:8000/accounts/get_user/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {
          const data = response.data.user;
          setinfo({
            FirstName: data.firstname == null ? "" : data.firstname,
            LastName: data.lastname == null ? "" : data.lastname,
            Email: data.email,
            BirthDay:
              data.date_of_birth == null ? "11-11-2024" : data.date_of_birth,
            Gender: data.gender == null ? "" : data.gender,
            PhoneNumber: data.phone_number == null ? "" : data.phone_number,
          });
        }
      } catch (error) {
        if (error.response.status == 403) {
          withReactContent(Swal).fire({
            icon: "error",
            title: "!برای مشاهده اطلاعات شخصی ورود به  اکانت خود الزامی است",
            background: "#473a67",
            color: "#b4b3b3",
            width: "35rem",
            backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: '#55AD9B',
            preConfirm: () => {
              navigate("/Signup");
            },
          });
        }
      }
    }
  }


  return (
    <>
    <body style={{ display:'grid' }}>
      <NavBar_SideBar />
      <div
        className="prof_body"
        style={pages == 2 ? { paddingTop: "1.5%" } : {}}
        onLoad={GetUserInfo}
      >
        <div className="prof_Box">
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div className="container bootstrap snippets bootdey">
            <div className="row">
              <div className="profile-nav col-md-3">
                <div className="panel">
                  <div className="user-heading round">
                    <a href="#">
                      <img
                        src={
                          user_info.Gender == "M" ? male_avatar :
                            user_info.Gender == "F" ? female_avatar :
                              nogender_avatar
                        }
                        alt="Avatar"
                      />
                    </a>
                    <br />
                    <br />
                    <h1>
                      {user_info.FirstName} {user_info.LastName}
                    </h1>
                    <p>{user_info.Email}</p>
                  </div>

                  <ul className="nav nav-pills nav-stacked">
                    <li
                      className="active"
                      onClick={(e) => {
                        setdisplay(1);
                      }}
                    >
                      <label
                        href=""
                        style={
                          pages == 1
                            ? {
                              background: "#f8f7f5",
                              borderLeft: "5px solid #55AD9B",
                              color: " #89817f",
                              width: "100%",
                            }
                            : {}
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-user"
                          style={
                            pages == 1
                              ? { color: "#55AD9B" }
                              : { color: "#89817f" }
                          }
                        />
                        اطلاعات شخصی
                      </label>
                    </li>
                    <li
                      onClick={(e) => {
                        setdisplay(2);
                      }}
                    >
                      <label
                        href=""
                        style={
                          pages == 2
                            ? {
                              background: "#f8f7f5",
                              borderLeft: "5px solid #55AD9B",
                              color: " #89817f",
                              width: "100%",
                            }
                            : {}
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-edit"
                          style={
                            pages == 2
                              ? { color: "#55AD9B" }
                              : { color: "#89817f" }
                          }
                        />{" "}
                        اعمال تغییرات
                      </label>
                    </li>
                    <li onClick={(e) => setdisplay(3)}>
                      <label
                        href=""
                        style={
                          pages == 3
                            ? {
                              background: "#f8f7f5",
                              borderLeft: "5px solid #55AD9B",
                              color: " #89817f",
                              width: "100%",
                            }
                            : {}
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-key"
                          style={
                            pages == 3
                              ? { color: "#55AD9B" }
                              : { color: "#89817f" }
                          }
                        />{" "}
                        تغییر رمز عبور
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9" style={{ marginTop: "20px" }}>
                <div className="panel" style={{ direction: "rtl" }}>
                  <div
                    className="panel-body bio-graph-info"
                    style={
                      pages == 1
                        ? { display: "inline-block" }
                        : { display: "none" }
                    }
                  >
                    <h1>اطلاعات شخصی</h1>
                    <div className="row">
                      <div className="bio-row">
                        <p>
                          <MdDriveFileRenameOutline
                            style={{ color: "#489182" }}
                          />
                          <span>نام </span>: {user_info.FirstName}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <MdDriveFileRenameOutline
                            style={{ color: "#489182" }}
                          />
                          <span>نام خانوادگی </span>: {user_info.LastName}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <TbGenderBigender style={{ color: "#489182" }} />
                          <span>جنسیت</span>:{" "}
                          {user_info.Gender === "F"
                            ? "مونث"
                            : user_info.Gender === "M"
                              ? "مذکر"
                              : "نامشخص"}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <FaRegCalendarDays style={{ color: "#489182" }} />
                          <span>تاریخ تولد</span>:{" "}
                          {toPersianDigits(date.format("YYYY/MM/DD"))}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <FaPhoneFlip style={{ color: "#489182" }} />
                          <span>شماره همراه </span>: {toPersianDigits(user_info.PhoneNumber)}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <MdAlternateEmail style={{ color: "#489182" }} />
                          <span>ایمیل </span>: {user_info.Email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ChangeInformation
                  p_pages={pages}
                  user_info={user_info}
                  setinfo={setinfo}
                />
                <ChangePassword p_pages={pages} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </body>
    </>
  );
};
export default User_Panel;
