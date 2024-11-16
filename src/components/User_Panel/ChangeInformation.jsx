import React, { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import validator from "validator";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import { TbGenderBigender } from "react-icons/tb";
import { FaRegCalendarDays, FaPhoneFlip } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdAlternateEmail } from "react-icons/md";

function toPersianDigits(str) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}
function toEnglishDigits(str) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return str.replace(/[۰-۹]/g, (digit) => englishDigits[persianDigits.indexOf(digit)]);
}

function ChangeInformation({ p_pages, user_info, setinfo }) {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  const [sub4, setSub4] = useState(true);
  let p = toPersianDigits(user_info.PhoneNumber)
  const [phone_, setValue] = useState(p);
  const GetFirstName = (event) => {
    if (
      validator.isAlpha(event.target.value.replace(" ", ""), "fa-IR") |
      validator.isAlpha(event.target.value.replace(" ", ""), "en-AU")
    )
      setSub1(true);
    else setSub1(false);
  };
  const GetLastName = (event) => {
    if (
      validator.isAlpha(
        event.target.value.replace(" ", "").replace(" ", ""),
        "fa-IR"
      ) |
      validator.isAlpha(
        event.target.value.replace("  ", "").replace(" ", ""),
        "en-AU"
      )
    )
      setSub2(true);
    else setSub2(false);
  };
  const GetNumber = (event) => {
    const persianValue = event.target.value;
    const englishValue = toPersianDigits(persianValue);
    setValue(englishValue); console.log(phone_);
    const phone = toEnglishDigits(event.target.value)
    if (
      validator.isNumeric(phone) &
      (phone.length == 11)
    )
      setSub3(true);
    else setSub3(false);
  };

  async function SendUserInfo(event) {
    const n_firstname = document.getElementById("user_firstname").value;
    const n_lastname = document.getElementById("user_lastname").value;
    const n_gender = document.getElementById("user_gender").value;
    const n_birthday = document.querySelector("jb-date-input").value;
    const n_phonenumber = toEnglishDigits(document.getElementById("user_phonenumber").value);
    event.preventDefault();
    if (!(sub1 & sub2 & sub3))
      toast.warn( "!تغییر درست فیلد ها الزامی است", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else if (sub4)
      toast.warn( "!تغییری برای اعمال وجود ندارد", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios(
          "http://127.0.0.1:8000/accounts/complete_info/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            data: {
              firstname: n_firstname,
              lastname: n_lastname,
              phone_number: n_phonenumber,
              date_of_birth: n_birthday,
              gender: n_gender,
            },
          }
        );
        if (response.status == 200) {
          setSub4(true);
          toast.success( "!اطلاعات شما با موفقیت ثبت شد", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setinfo({
            FirstName: n_firstname,
            LastName: n_lastname,
            Email: user_info.Email,
            BirthDay: n_birthday,
            Gender: n_gender,
            PhoneNumber: n_phonenumber,
          });
        }
      } catch (error) {
        if (error.response.status == 500)
          toast.error( "!ثبت اطلاعات موفقیت آمیز نبود", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        if (error.response.status == 400) {
          const msg = error.response.data;
          if (msg.phone_number != null)
          toast.error( "!شماره باید در قالب ایران باشد", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  }
  return (
    <div className="panel" style={{ direction: "rtl" }} onLoad={SendUserInfo}>
    <ToastContainer />
      <div
        className="panel-body bio-graph-info"
        style={p_pages == 2 ? { display: "inline-block" } : { display: "none" }}
      >
        <h1>اصلاح اطلاعات شخصی</h1>
        <div className="row">
          <div className="bio-row">
            <p>
              <MdDriveFileRenameOutline style={{ color: "#489182" }} />
              <span>نام: </span>
              <br />
              <input
              tabIndex="1"
                type="text"
                id="user_firstname"
                defaultValue={user_info.FirstName}
                className="profile_input"
                onChange={(e) => {
                  GetFirstName(e);
                  setSub4(false);
                }}
              />
              <div
                className="profile_sub_error"
                style={sub1 ? { display: "none" } : {}}
              >
                نام وارد شده باید فقط دارای حروف باشد
              </div>
            </p>
          </div>
          <div className="bio-row">
            <p>
              <MdDriveFileRenameOutline style={{ color: "#489182" }} />
              <span>نام خانوادگی :</span>
              <br />
              <input
              tabIndex="2"
                type="text"
                id="user_lastname"
                defaultValue={user_info.LastName}
                className="profile_input"
                onChange={(e) => {
                  GetLastName(e);
                  setSub4(false);
                }}
              />
              <div
                className="profile_sub_error"
                style={sub2 ? { display: "none" } : {}}
              >
                نام وارد شده باید فقط دارای حروف باشد
              </div>
            </p>
          </div>
          <div className="bio-row">
            <p>
              <TbGenderBigender style={{ color: "#489182" }} />
              <span>جنسیت:</span>
              <br />
              <select
              tabIndex="3"
                id="user_gender"
                className="profile_input_G"
                defaultValue={user_info.Gender}
                onChange={(e) => {
                  setSub4(false);
                }}
              >
                <option value="F" className="profile_input_F">
                  مونث
                </option>
                <option value="M" className="profile_input_M">
                  مذکر
                </option>
                <option value="B" className="profile_input_B">
                  نامشخص
                </option>
              </select>
            </p>
          </div>
          <div className="bio-row" style={{ display: "flex" }}>
            <p>
              <FaRegCalendarDays style={{ color: "#489182" }} />
              <span>تاریخ تولد:</span>
              <br />
              <div class="component-wrapper">
                <jb-date-input
                tabIndex="4"
                  onClick={(e) => {
                    setSub4(false);
                  }}
                  id="user_birthday"
                  input-type="JALALI"
                  format="YYYY-MM-DD"
                  value={user_info.BirthDay}
                />
              </div>
            </p>
          </div>
          <div className="bio-row">
            <p>
              <FaPhoneFlip style={{ color: "#489182" }} />
              <span>شماره همراه :</span>
              <br />
              <input
              tabIndex="5"
                type="text"
                id="user_phonenumber"
                defaultValue={toPersianDigits(user_info.PhoneNumber)}
                value={phone_}
                className="profile_input"
                onChange={(e) => {
                  GetNumber(e);
                  setSub4(false);
                }}
              />
              <div
                className="profile_sub_error"
                style={sub3 ? { display: "none" } : {}}
              >
                شماره همراه وارد شده صحیح نیست!
              </div>
            </p>
          </div>
          <button
            className="button-8"
            role="button"
            style={{ width: "25%", marginRight: "60%" }}
            onClick={(e) => {
              SendUserInfo(e);
            }}
          >
            ثبت {"   "}اطلاعات
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeInformation;
