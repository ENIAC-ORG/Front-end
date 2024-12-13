import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import DateObject from "react-date-object";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  convertToPersianNumbers,
  convertToEnglishNumbers,
  isPersianString,
} from "./Coverters_Checkers.js";
import gender_icon from "../../assets/gender.png";
import date_icon from "../../assets/date.png";
import phone_icon from "../../assets/phone.png";
import person_icon from "../../assets/person.png";
import "./styles.css";

const CompleteInfo = (doctorId) => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [genderOption, setGenderOption] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000/accounts/get_user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.status === 200) {
        const { firstname, lastname, phone_number, gender, date_of_birth } =
          response.data.user;
    
        setFirstname(firstname || "");
        setLastname(lastname || "");
        setPhonenumber(phone_number || "");
        setDateOfBirth(
          date_of_birth
            ? new DateObject({
                date: date_of_birth,
                format: "YYYY-MM-DD",
                calendar: persian,
              })
            : ""
        );
  
    
        const genderMapping = {
          M: { gender: "M", option: "male" },
          F: { gender: "F", option: "female" },
          B: { gender: "B", option: "other" },
        };
    
        if (gender && genderMapping[gender]) {
          setGender(genderMapping[gender].gender);
          setGenderOption(genderMapping[gender].option);
        } else {
          setGender("");
          setGenderOption("gender");
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
  };

  const handleGenderChange = (selectedValue) => {
    const genderMapping = { male: "M", female: "F", other: "B" };
    setGenderOption(selectedValue); 
    setGender(genderMapping[selectedValue] || ""); 
  };

  const validateInfo = () => {
    if (
      !firstname ||
      !lastname ||
      !phonenumber ||
      genderOption === "gender" ||
      !dateOfBirth
    ) {
      setShow(true);
    } else {
      toast.warn("!شما قبلا اطلاعات خود را ثبت کرده اید", {
        position: "bottom-left",
        autoClose: 3000,
      });
      setShow(false);
      navigate("/Reserve", { state: doctorId });
    }
  };

  const sendUserInfo = async (event) => {
    event.preventDefault();
    const errorMessages = [];
    const errors = {
      firstname: validatePersianString(firstname, "نام", 20),
      lastname: validatePersianString(lastname, "نام خانوادگی", 30),
      phonenumber:
        !phonenumber ? "!وارد کردن شماره تلفن الزامی است" :
        phonenumber && !/^(?:\+98|0)(?:\s?)9[0-9]{9}/.test(phonenumber) ||
        phonenumber.length > 15
          ? "!قالب شماره درست نیست"
          : null,
      gender: !gender ? "!انتخاب جنسیت الزامی است" : null,
      dateOfBirth: validateDateOfBirth(dateOfBirth),
    };

    Object.values(errors).forEach((err) => {
      if (err) errorMessages.push(err);
    });

    const gregorianDate = new DateObject(dateOfBirth).convert(gregorian);
    if (errorMessages.length > 0) {
      showAlert("!خطا", errorMessages.join("<br>"));
    } else {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://127.0.0.1:8000/accounts/complete_info/",
          {
            firstname,
            lastname,
            phone_number: phonenumber,
            date_of_birth:  gregorianDate.format("YYYY-MM-DD"),
            gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("!اطلاعات شما با موفقیت ثبت شد", {
            position: "bottom-left",
            autoClose: 3000,
          });
          setShow(false);
        } else {
          toast.error("!خطایی رخ داد", {
            position: "bottom-left",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error saving user info:", error);
        toast.error("!خطا هنگام ارسال درخواست", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    }
  };

  const validatePersianString = (value, field, maxLength) => {
    if (!value) return `!وارد کردن ${field} الزامی است`;
    if (!isPersianString(value)) return `!${field} باید فقط شامل حروف فارسی باشد`;
    if (value.length > maxLength) return `!${field} طولانی است`;
    return null;
  };

  const validateDateOfBirth = (dob) => {
    if (!dob) return "!وارد کردن تاریخ تولد الزامی است";

    const engDate = convertToEnglishNumbers(dob.format());
    const gregorianDate = new DateObject({
      date: engDate,
      format: "YYYY-MM-DD",
      calendar: persian,
    }).convert(gregorian);

    const dobDate = new Date(gregorianDate.format());
    const today = new Date();

    if (isNaN(dobDate.getTime()) || dobDate > today) return "!تاریخ تولد اشتباه است";
    const minDateOfBirth = new Date();
    minDateOfBirth.setFullYear(today.getFullYear() - 18);
    if ( dobDate > minDateOfBirth) return "!شما باید حداقل ۱۸ سال داشته باشید";
  }

  const showAlert = (title, html = null) => {
    Swal.fire({
      icon: "error",
      title,
      html,
      background: "#075662",
      color: "#FFFF",
      width: "35rem",

      backdrop: `
  rgba(84, 75, 87.0.9)
  left top
  no-repeat`,
      confirmButtonText: "تایید",
      confirmButtonColor: '#0a8ca0',
      showConfirmButton: true,
    });
  };
  

  return (
    <>
      <Button variant="primary" onClick={validateInfo} className="button-20">
        رزرو نوبت
      </Button>

      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        className="bd_modal modal wrapper_modal"
        centered
      >
        <Modal.Header className="header_modal">
          <Modal.Title className="title_modal">تکمیل اطلاعات</Modal.Title>
        </Modal.Header>

        <div className="form_container_modal">
          <div className="form_details_modal">
            <form className="form login">
              <InputField
                value={firstname}
                onChange={setFirstname}
                placeholder="نام"
                icon={person_icon}
              />
              <InputField
                value={lastname}
                onChange={setLastname}
                placeholder="نام خانوادگی"
                icon={person_icon}
              />
              <PhoneNumberField
                value={phonenumber ? convertToPersianNumbers(phonenumber) : ""}
                onChange={(newValue) => setPhonenumber(convertToEnglishNumbers(newValue))}
                placeholder="شماره تماس"
                icon={phone_icon}
              />
              <GenderSelector
                value={genderOption}
                onChange={(selectedValue) => handleGenderChange(selectedValue)}
              />
              <DatePickerField value={dateOfBirth ? new DateObject({ date: dateOfBirth, calendar: persian }) : ""} onChange={(date) => setDateOfBirth(date)} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="field_modal btn-modal" style={{ marginRight: "10px" }}>
                  <div className="btn_layer_modal"></div>
                  <input
                    type="submit"
                    value="بستن"
                    onClick={handleClose}
                  />
                </div>
                <div className="field_modal btn-modal" style={{ marginLeft: "10px" }}>
                  <div className="btn_layer_modal"></div>
                  <input
                    type="submit"
                    value="ارسال"
                    onClick={sendUserInfo}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

const InputField = ({ value, onChange, placeholder, icon }) => (
  <div className="field_modal">
    <input
      className="input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        backgroundImage: `url(${icon})`,
        backgroundRepeat: "no-repeat",
        paddingRight: "40px",
        backgroundPosition: "right",
      }}
    />
  </div>
);

const PhoneNumberField = ({ value, onChange, placeholder, icon }) => (
  <div className="field_modal">
    <input
      className="input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        backgroundImage: `url(${icon})`,
        backgroundRepeat: "no-repeat",
        paddingRight: "40px",
        backgroundPosition: "right",
      }}
    />
  </div>
);

const GenderSelector = ({ value, onChange }) => (
<div className="field_modal">
  <select
    className="input"
    value={value}
    onChange={(e) => {
      const selectedValue = e.target.value;
      onChange(selectedValue);
    }}
    style={{
      backgroundImage: `url(${gender_icon})`,
      backgroundRepeat: "no-repeat",
      paddingRight: "40px",
      backgroundPosition: "right",
      backgroundColor: "white",
      fontSize: "15px",
      textShadow: "rgb(156, 154, 154) 1px 2px 3px",
      color: value === "gender" ? "rgb(188, 186, 186)" : "#555", 
    }}
  >
    <option value="gender" disabled hidden>
      جنسیت
    </option>
    <option value="male">مرد</option>
    <option value="female">زن</option>
    <option value="other">سایر</option>
  </select>
</div>

);

const DatePickerField = ({ value, onChange }) => (
  <div
    className="field_modal"
    style={{
      backgroundImage: `url(${date_icon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      borderBottom: "2px solid #adadad",
      color: "gray"
    }}
  >
    <DatePicker
      placeholder="تاریخ تولد"
      value={value}
      format="YYYY-MM-DD"
      onChange={onChange}
      style={{
        border: "0px",
        width: "350px",
        backgroundColor: "white",
        direction: "rtl",
      }}
      calendar={persian}
      locale={persian_fa}
    />
  </div>
);



export default CompleteInfo;
