import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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



const CompleteInfo = ({ doctorId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    dateOfBirth: "",
    gender: "",
  });
  const [genderOption, setGenderOption] = useState("gender");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000//accounts/get_user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { firstname, lastname, phone_number, date_of_birth, gender } = response.data.user;
        setFormData({
          firstname: firstname || "",
          lastname: lastname || "",
          phonenumber: phone_number || "",
          dateOfBirth: date_of_birth || "",
          gender: gender || "",
        });
        setGenderOption(
          gender === "M" ? "male" : gender === "F" ? "female" : gender === "B" ? "other" : "gender"
        );
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = [];
    const { firstname, lastname, phonenumber, dateOfBirth, gender } = formData;

    if (!firstname) errors.push("!وارد کردن نام الزامی است");
    else if (!isPersianString(firstname)) errors.push("!نام باید فقط شامل حروف فارسی باشد");
    else if (firstname.length > 20) errors.push("!نام طولانی است");

    if (!lastname) errors.push("!وارد کردن نام خانوادگی الزامی است");
    else if (!isPersianString(lastname)) errors.push("!نام خانوادگی باید فقط شامل حروف فارسی باشد");
    else if (lastname.length > 30) errors.push("!نام خانوادگی طولانی است");

    const phoneRegex = /^(?:\+98|0)(?:\s?)9[0-9]{9}/;
    if (!phonenumber.trim()) errors.push("!وارد کردن شماره تماس الزامی است");
    else if (!phoneRegex.test(phonenumber)) errors.push("!قالب شماره درست نیست");

    if (!gender) errors.push("!انتخاب جنسیت الزامی است");

    if (!dateOfBirth) errors.push("!وارد کردن تاریخ تولد الزامی است");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      Swal.fire({
        icon: "error",
        title: "!خطا",
        html: errors.join("<br>"),
        confirmButtonText: "تایید",
      });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const dateObj = new Date(formData.dateOfBirth);
      const payload = {
        ...formData,
        date_of_birth: dateObj.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      };

      const response = await axios.post("http://127.0.0.1:8000//accounts/complete_info/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("!اطلاعات شما با موفقیت ثبت شد");
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "!خطا در ارسال درخواست" });
    }
  };

  const handleGenderChange = (value) => {
    setGenderOption(value);
    setFormData((prev) => ({
      ...prev,
      gender: value === "male" ? "M" : value === "female" ? "F" : value === "other" ? "B" : "",
    }));
  };

  const checkAndProceed = () => {
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.phonenumber ||
      !formData.gender ||
      !formData.dateOfBirth
    ) {
      setShowModal(true);
    } else {
      toast.warn("!شما قبلا اطلاعات خود را ثبت کرده اید");
      navigate("/Reserve", { state: doctorId });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={checkAndProceed}>
        رزرو نوبت
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>تکمیل اطلاعات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="field_modal">
              <input
                type="text"
                placeholder="نام"
                style={{
                  backgroundImage: `url(${person_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                }}
                value={formData.firstname}
                onChange={(e) => handleInputChange("firstname", e.target.value)}
              />
            </div>
            <div className="field_modal">
              <input
                type="text"
                placeholder="نام خانوادگی"
                style={{
                  backgroundImage: `url(${person_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                }}
                value={formData.lastname}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
              />
            </div>
            <div className="field_modal">
              <input
                type="text"
                placeholder="شماره تماس"
                style={{
                  backgroundImage: `url(${phone_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                }}
                value={convertToPersianNumbers(formData.phonenumber)}
                onChange={(e) =>
                  handleInputChange("phonenumber", convertToEnglishNumbers(e.target.value))
                }
              />
            </div>
            <div className="field_modal">
              <select
                style={{
                  backgroundImage: `url(${gender_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                }}
                value={genderOption}
                onChange={(e) => handleGenderChange(e.target.value)}
              >
                <option value="gender" disabled>
                  جنسیت
                </option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
                <option value="other">سایر</option>
              </select>
            </div>
            <div className="field_modal">
              <DatePicker
                placeholder="تاریخ تولد"
                style={{
                  backgroundImage: `url(${date_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                }}
                value={formData.dateOfBirth}
                onChange={(date) => handleInputChange("dateOfBirth", date)}
                calendar={persian}
                locale={persian_fa}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                بستن
              </Button>
              <Button type="submit" variant="primary">
                ارسال
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CompleteInfo;