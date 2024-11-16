import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import { JBDateInput } from "jb-date-input-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

// import 'react-datepicker/dist/react-datepicker.css';
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
import DateObject from "react-date-object";

const CompleteInfo = (doctorId) => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [genderOption, setGenderOption] = useState("");
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();

  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const ChangeGender = (event) => {
    const selectedValue = event.target.value.toString().trim();
    if (selectedValue === "male") {
      setGender("M");
    } else if (selectedValue === "female") {
      setGender("F");
    } else if (selectedValue === "other") {
      setGender("B");
    } else {
      setGender("");
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);

  async function GetUserInfo() {
    try {
      const token = localStorage.getItem("accessToken");
      // console.log(token);
      const response = await axios.get(
        "http://127.0.0.1:8000//accounts/get_user/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response.data)
        const userData = response.data.user;
        // console.log(userData.firstname, userData.lastname, userData.phone_number, userData.gender); // Log user data
        if (userData.firstname === null) {
          setFirstname("");
        } else {
          setFirstname(userData.firstname);
        }

        if (userData.lastname === null) {
          setLastname("");
        } else {
          setLastname(userData.lastname);
        }

        if (userData.phone_number === null) {
          setPhonenumber("");
        } else {
          setPhonenumber(userData.phone_number);
        }

        if (userData.gender === null) {
          setGenderOption("gender");
          setGender("");
        } else {
          if (userData.gender === "M") {
            setGender("M");
            setGenderOption("male");
          } else if (userData.gender === "F") {
            setGender("F");
            setGenderOption("female");
          } else if (userData.gender === "B") {
            setGender("B");
            setGenderOption("other");
          }
        }

        if (userData.date_of_birth === null) {
          setDateOfBirth("");
        } else {
          setDateOfBirth(response.data.user.date_of_birth);
        }
      }
    } catch (error) {
      console.log("something went wrong: ", error);
    }
  }

  const CheckInfo = () => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      phonenumber.length === 0 ||
      genderOption === "" ||
      dateOfBirth === ""
    ) {
      // console.log("has empty");
      setShow(true);

      // console.log(firstname, lastname, phonenumber, genderOption, dateOfBirth);
    } else {
      toast.warn("!شما قبلا اطلاعات خود را ثبت کرده اید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setShow(false);
      console.log("injaaaaaaaaaaaaa");
      console.log(doctorId);
      navigate("/Reserve", { state: doctorId });
      // Swal.fire({
      //   icon: "warning",
      //   title: "!شما قبلا اطلاعات خود را ثبت کرده اید",
      //   background: "#473a67",
      //   color: "#b4b3b3",
      //   width: "26rem",
      //   height: "18rem",
      //   confirmButtonText: "تایید",
      //   customClass: {
      //     container: 'custom-swal-container'
      //   }
      // });
    }
  };

  const SendUsersNewInfo = async (event) => {
    event.preventDefault();
    const errors = {};
    const errorMessages = [];

    // firstname field validations
    if (firstname.length === 0) {
      errors.FirstNameError = "!وارد کردن نام الزامی است";
      errorMessages.push(errors.FirstNameError);
    } else if (!isPersianString(firstname)) {
      errors.FirstNameError = "!نام باید فقط شامل حروف فارسی باشد";
      errorMessages.push(errors.FirstNameError);
    } else if (firstname.length > 20) {
      errors.FirstNameError = "!نام طولانی است";
      errorMessages.push(errors.FirstNameError);
    }

    // lastname field validations
    if (lastname.length === 0) {
      errors.LastNameError = "!وارد کردن نام خانوادگی الزامی است";
      errorMessages.push(errors.LastNameError);
    } else if (!isPersianString(lastname)) {
      errors.LastNameError = "!نام خانوادگی باید فقط شامل حروف فارسی باشد";
      errorMessages.push(errors.LastNameError);
    } else if (lastname.length > 30) {
      errors.LastNameError = "!نام خانوادگی طولانی است";
      errorMessages.push(errors.LastNameError);
    }

    // phonenumebr field validations
    const phoneRegex = /^(?:\+98|0)(?:\s?)9[0-9]{9}/;
    if (!phonenumber.trim()) {
      errors.PhonenumberFormatError = "!وارد کردن شماره تماس الزامی است";
      errorMessages.push(errors.PhonenumberFormatError);
    } else if (!phoneRegex.test(phonenumber) || phonenumber.length > 15) {
      errors.PhonenumberFormatError = "!قالب شماره درست نیست";
      errorMessages.push(errors.PhonenumberFormatError);
    }

    // gender field validations
    if (gender === "") {
      errors.GenderError = "!انتخاب جنسیت الزامی است";
      errorMessages.push(errors.GenderError);
    }

    // date of brith validation
    var _date = dateOfBirth.format();
    console.log(_date);
    const eng_date = convertToEnglishNumbers(_date);
    console.log(eng_date);
    var rr = new DateObject({
      date: eng_date,
      format: "YYYY-MM-DD",
      calendar: persian,
    });
    rr.convert(gregorian);
    console.log(rr.format());
    const dateOfBirthDate = new Date(rr.format());
    const today = new Date();
    if (dateOfBirth === "") {
      errors.dateOfBirthError = "!وارد کردن تاریخ تولد الزامی است";
      errorMessages.push(errors.dateOfBirthError);
    } else if (isNaN(dateOfBirthDate.getTime())) {
      errors.dateOfBirthError = "!تاریخ تولد معتبر نیست";
      errorMessages.push(errors.dateOfBirthError);
    } else if (dateOfBirthDate > today) {
      errors.dateOfBirthError = "!تاریخ تولد نمی‌تواند در آینده باشد";
      errorMessages.push(errors.dateOfBirthError);
    } else {
      const minDateOfBirth = new Date();
      minDateOfBirth.setFullYear(today.getFullYear() - 18);
      if (dateOfBirthDate > minDateOfBirth) {
        errors.dateOfBirthError = "!شما باید حداقل ۱۸ سال داشته باشید";
        errorMessages.push(errors.dateOfBirthError);
      }
    }

    // send POST requesnt and handle errors
    if (errorMessages.length === 0) {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        const response = await axios.post(
          "http://127.0.0.1:8000//accounts/complete_info/",
          {
            firstname,
            lastname,
            phone_number: phonenumber,
            date_of_birth: rr.format(),
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
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(false);
          // setFirstname("");
          // setLastname("");
          // setGender("");
          // setPhonenumber("");
          // setDateOfBirth("");
        } else {
          Swal.fire({
            icon: "error",
            title: "!خطا در ثبت اطلاعات",
            background: "#473a67",
            color: "#b4b3b3",
            width: "26rem",
            height: "18rem",
            confirmButtonText: "تایید",
            customClass: {
              container: "custom-swal-container",
            },
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "!خطا در ارسال درخواست",
          background: "#473a67",
          color: "#b4b3b3",
          width: "26rem",
          height: "18rem",
          confirmButtonText: "تایید",
          customClass: {
            container: "custom-swal-container",
          },
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "!خطا",
        html: errorMessages.join("<br>"),
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        height: "18rem",
        confirmButtonText: "تایید",
        customClass: {
          container: "custom-swal-container",
        },
      });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={CheckInfo} className="button-20 ">
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
        {/* <Modal.Body className="form_container .login"> */}
        <div className="form_container_modal">
          <div className="form_details_modal">
            <form action="#" className="form login">
              <pre></pre>
              <div className="field_modal">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="نام"
                  style={{
                    backgroundImage: `url(${person_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>
              <div className="field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="نام خانوادگی"
                  style={{
                    backgroundImage: `url(${person_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
              <div className="field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="شماره تماس"
                  value={
                    phonenumber ? convertToPersianNumbers(phonenumber) : ""
                  }
                  onChange={(event) =>
                    setPhonenumber(convertToEnglishNumbers(event.target.value))
                  }
                  style={{
                    backgroundImage: `url(${phone_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                />
              </div>

              <div className="field_modal">
                <select
                  style={{
                    backgroundColor: "white",
                    backgroundImage: `url(${gender_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    color: "rgb(188, 186, 186)",
                  }}
                  className="input"
                  defaultValue={genderOption}
                  onChange={(event) => {
                    ChangeGender(event);
                    setGenderOption(event.target.value);
                  }}
                >
                  <option className="input" value="gender" disabled hidden>
                    جنسیت
                  </option>
                  <option
                    style={{ fontFamily: "Vazir, Arial, sans-serif" }}
                    value="male"
                  >
                    مرد
                  </option>
                  <option
                    style={{ fontFamily: "Vazir, Arial, sans-serif" }}
                    value="female"
                  >
                    زن
                  </option>
                  <option
                    style={{ fontFamily: "Vazir, Arial, sans-serif" }}
                    value="other"
                  >
                    سایر
                  </option>
                </select>
              </div>
              <div
                style={{
                  backgroundImage: `url(${date_icon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right",
                  borderBottom: "2px solid #adadad",
                  marginBottom: "20px",
                  display: "flex",
                }}
                className="field_modal"
              >
                {/* <DatePicker
                  id="datePicker"
                  format="YYYY/MM/DD"
                  selected={date_of_birth}
                  value={date_of_birth}
                  placeholderText="تاریخ تولد"
                  // style={{
                  //   width: "95%",
                  //   border: "none",
                  //   height: "100%",
                  //   direction: "rtl",
                  //   outline: "none",
                  //   paddingLeft: "15px",
                  //   fontSize: "18px",
                  //   color: "gray",
                  //   caretColor: "rgb(152, 103, 175)",
                  //   fontFamily: "Vazir, Arial, sans-serif",
                  // }}
                  onChange={handleDateChange}
                /> */}
                {/* <div
                  className="field-date"
                  // style={{
                  //   border: "none",
                  //   height: "40px",
                  //   width: "92%",
                  //   direction: "rtl",
                  //   fonySize: "15px",
                  //   marginBottom: "10px",
                  // }}
                > */}
                <DatePicker
                  placeholder="تاریخ تولد"
                  value={dateOfBirth}
                  format="YYYY-MM-DD"
                  onChange={setDateOfBirth}
                  style={{
                    border: "0px",
                    width: "350px",
                    backgroundColor: "white",
                    direction: "rtl",
                  }}
                  fixRelativePosition={"start"}
                  calendar={persian}
                  locale={persian_fa}
                />
                {/* <JBDateInput
                    placeholder="تاریخ تولد"
                    usePersianNumber={true}
                    onSelect={(event) => {
                      setDateOfBirth(event.target.value);
                    }}
                    onChange={(event) => {
                      setDateOfBirth(event.target.value);
                    }}
                    format="YYYY-MM-DD"
                    id="datePicker"
                    style={{
                      border: "none !important",
                      backgroundColor: "white",
                    }}
                    value={dateOfBirth}
                    className="jb-date-input-web-component .calendar-container"
                    calendarClassName="custom-calendar"
                  ></JBDateInput> */}
                {/* </div> */}
              </div>
              <pre></pre>
              {/* <div className="field_modal btn">
                <div className="btn_layer"></div>
                <input
                  type="submit"
                  value="ارسال"
                  //onChange={(event) => SendUsersNewInfo(event)}
                  onClick={SendUsersNewInfo}
                />
              </div> */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  className="field_modal btn"
                  style={{ marginRight: "10px" }}
                >
                  <div className="btn_layer"></div>
                  <input type="submit" value="بستن" onClick={handleClose} />
                </div>
                <div className="field_modal btn" style={{ marginLeft: "10px" }}>
                  <div className="btn_layer"></div>
                  <input
                    type="submit"
                    value="ارسال"
                    onClick={SendUsersNewInfo}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {show && <div className="modal-background" />}
    </>
  );
};

export default CompleteInfo;
