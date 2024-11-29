import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { JBDateInput } from "jb-date-input-react";
import "../MedicalInfoModal/medical-info-modal-styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as shamsi from "shamsi-date-converter";

import kid_icon from "../../assets/kid.png";
import ssid_icon from "../../assets/id.png";
import one_icon from "../../assets/one.png";
import two_icon from "../../assets/two.png";
import three_icon from "../../assets/three.png";
import four_icon from "../../assets/four.png";
import five_icon from "../../assets/five.png";
import circle_icon from "../../assets/circle.png";
import age_icon from "../../assets/age.png";

function DoctorInfoModal({
  showModal,
  toggleModal,
  daySelected,
  doctorId,
  resType,
  left_times,
  selectIndex,
  getReserve,
}) {
  const [age, setAge] = useState(null);
  const [childrenNum, setChildrenNum] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [ssid, setSsid] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({
    endDate: "",
    length: "",
    isFinished: null,
    reasonToLeave: "",
    method: "",
    drugs: "",
  });

  const openRecordModal = () => setShowRecordModal(true);
  const closeRecordModal = () => setShowRecordModal(false);

  const resetCurrentRecord = () =>
    setCurrentRecord({
      endDate: "",
      length: "",
      isFinished: null,
      reasonToLeave: "",
      method: "",
      drugs: "",
    });

  const handleClose = (event) => {
    event.preventDefault();
    toggleModal();
  };

  useEffect(() => {
    console.log("Current record updated:", currentRecord);
  }, [currentRecord]);

  useEffect(() => {
    console.log("Updated medical records:", medicalRecords);
  }, [medicalRecords]);

  const convertToPersianNumbers = (value) =>
    value.replace(
      /[0-9]/g,
      (char) =>
        ({
          0: "۰",
          1: "۱",
          2: "۲",
          3: "۳",
          4: "۴",
          5: "۵",
          6: "۶",
          7: "۷",
          8: "۸",
          9: "۹",
        }[char] || char)
    );

  const convertToEnglishNumbers = (value) =>
    value.replace(
      /[۰-۹]/g,
      (char) =>
        ({
          "۰": "0",
          "۱": "1",
          "۲": "2",
          "۳": "3",
          "۴": "4",
          "۵": "5",
          "۶": "6",
          "۷": "7",
          "۸": "8",
          "۹": "9",
        }[char] || char)
    );

  function DateString(input) {
    var changed = shamsi.jalaliToGregorian(input.year, input.month, input.day);
    var y = `${changed[0]}`;
    var m = changed[1] < 10 ? `0${changed[1]}` : `${changed[1]}`;
    var d = changed[2] < 10 ? `0${changed[2]}` : `${changed[2]}`;
    return [y, m, d].join("-");
  }
  const handleAddRecord = (event) => {
    event.preventDefault();

    const errors = [];

    if (!currentRecord.endDate.trim()) {
      errors.push("لطفاً تاریخ پایان را وارد کنید");
    } else {
      const endDateFormat = new Date(currentRecord.endDate);
      const today = new Date();
      if (isNaN(endDateFormat.getTime())) {
        errors.push("تاریخ پایان معتبر نیست");
      } else if (endDateFormat > today) {
        errors.push("تاریخ پایان نمی‌تواند در آینده باشد");
      }
    }

    if (!currentRecord.length.trim()) {
      errors.push("لطفاً طول درمان را وارد کنید");
    }

    if (isNaN(currentRecord.length)) {
      errors.push("طول درمان را به عدد وارد کنید");
    }

    if (currentRecord.isFinished === null) {
      errors.push("اتمام یا عدم اتمام درمان را مشخص کنید");
    }

    if (
      currentRecord.isFinished === false &&
      !currentRecord.reasonToLeave.trim()
    ) {
      errors.push("برای سوابق درمانی ناتمام، دلیل ترک درمان باید پر شود");
    }
    if (errors.length > 0) {
      errors.forEach((error) =>
        toast.error(error, {
          position: "bottom-left",
          autoClose: 3000,
        })
      );
      return;
    }

    setMedicalRecords([...medicalRecords, currentRecord]);
    resetCurrentRecord();
    closeRecordModal();
    toast.success("!سابقۀ پزشکی شما با موفقیت ثبت شد", {
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  const validateFields = () => {
    const errorMessages = [];

    if (!age || !childrenNum || !ssid || medicalHistory === null) {
      errorMessages.push("لطفاً تمام فیلدهای ضروری را پر کنید");
    }
    if (parseInt(age, 10) < 18) {
      errorMessages.push("سن باید بیشتر از ۱۸ سال باشد");
    }
    if (ssid.length !== 10) {
      errorMessages.push("قالب کد ملّی درست نیست");
    }
    for (let record of medicalRecords) {
      if (!record.endDate || !record.length) {
        errorMessages.push(
          "تمام سوابق پزشکی باید تاریخ پایان و طول درمان داشته باشند"
        );
      }

      if (record.isFinished === false && !record.reasonToLeave.trim()) {
        errorMessages.push(
          "برای سوابق درمانی ناتمام، دلیل ترک درمان باید پر شود"
        );
      }
    }

    if (errorMessages.length > 0) {
      errorMessages.forEach((message) =>
        toast.error(message, {
          position: "bottom-left",
          autoClose: 3000,
        })
      );
      return false;
    }
    return true;
  };

  const handleSendMedicalInfo = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    const payload = {
      age: parseInt(age),
      child_num: parseInt(childrenNum),
      family_history: medicalHistory,
      nationalID: ssid,
      treatment_histories: medicalRecords.map((record) => ({
        end_date: record.endDate,
        length: parseInt(record.length),
        is_finished: record.isFinished,
        reason_to_leave: record.reasonToLeave || "Completed treatment",
        approach: record.method || "",
        special_drugs: record.drugs || "",
      })),
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/TherapyTests/record/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("اطلاعات پزشکی شما با موفقیت ثبت شد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose(event);
        CreateReservation(event);
        setAge(null);
        setChildrenNum(null);
        setMedicalHistory(null);
        setSsid("");
        setMedicalRecords([]);
        toggleModal();
      }
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات پزشکی، لطفا دوباره تلاش کنید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getReserved = async (event) => {
    event.preventDefault();
    getReserve();
  };

  async function CreateReservation(event) {
    try {
      event.preventDefault();
      const ReservationDate = DateString(daySelected);
      const token = localStorage.getItem("accessToken");
      console.log(doctorId);
      const response = await axios("http://127.0.0.1:8000//reserve/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          type: resType,
          date: ReservationDate,
          time: left_times[selectIndex],
          doctor_id: doctorId,
        },
      });
      console.log("2");

      if (response.status === 200 || response.status === 201) {
        console.log("you reserved successfully");
        getReserved(event);
        toast.success("رزرو وقت شما با موفقیت انجام شد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("!رزرو موفقیت آمیز نبود، رفرش کنید", {
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

  return (
    <>
      <Modal
        show={showModal}
        onHide={toggleModal}
        backdrop="static"
        className="medical-bd_modal modal medical-wrapper_modal"
        centered
      >
        <Modal.Header className="medical-header_modal" closeButton>
          <Modal.Title className="medical-title_modal">
            تکمیل اطلاعات
          </Modal.Title>
        </Modal.Header>
        <div className="medical-form_container_modal">
          <div className="medical-form_details_modal">
            <form action="#" className="form login">
              <pre></pre>
              <div>
                <h4
                  style={{
                    color: "rgb(119, 120, 121)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${one_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  نام خود را وارد کنید:
                </h4>
              </div>
              <div className="medical-field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="نام"
                  value={age ? convertToPersianNumbers(age) : ""}
                  onChange={(event) => {
                    setAge(convertToEnglishNumbers(event.target.value));
                    console.log("age: ", age);
                  }}
                  style={{
                    backgroundImage: `url(${age_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                />
              </div>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(119, 120, 121)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${two_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  نام خانوادگی خود را وارد کنید:
                </h4>
              </div>
              <div className="medical-field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="نام خانوادگی"
                  value={
                    childrenNum ? convertToPersianNumbers(childrenNum) : ""
                  }
                  onChange={(event) => {
                    setChildrenNum(convertToEnglishNumbers(event.target.value));
                    console.log("children: ", childrenNum);
                  }}
                  style={{
                    backgroundImage: `url(${kid_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                />
              </div>
              <pre></pre>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(119, 120, 121)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${three_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  آیا در خانواده شما سابقۀ مشکلات و ناراحتی‌های روحی و روانی
                  وجود دارد؟
                </h4>
              </div>
              <div
                style={{ justifyContent: "center", alignItems: "center" }}
                className="medical-field_modal"
              >
                <label
                  style={{
                    direction: "rtl",
                    marginRight: "30%",
                    color: "gray",
                    fontSize: "18px",
                  }}
                >
                  <input
                    type="radio"
                    value="no"
                    checked={medicalHistory === false}
                    onChange={() => {
                      setMedicalHistory(false);
                      console.log("medical history: ", medicalHistory);
                    }}
                  />{" "}
                  خیر
                </label>
                <label
                  style={{ direction: "rtl", color: "gray", fontSize: "18px" }}
                >
                  <input
                    type="radio"
                    value="yes"
                    checked={medicalHistory === true}
                    onChange={() => {
                      setMedicalHistory(true);
                      console.log("medical history: ", medicalHistory);
                    }}
                  />{" "}
                  بله
                </label>
              </div>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(119, 120, 121)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${four_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  کد نظام روانشناسی یا نظام پزشکی خود را وارد کنید:
                </h4>
              </div>
              <div className="medical-field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="کد ملّی"
                  value={ssid ? convertToPersianNumbers(ssid) : ""}
                  onChange={(event) => {
                    setSsid(convertToEnglishNumbers(event.target.value));
                    console.log("ssid: ", ssid);
                  }}
                  style={{
                    backgroundImage: `url(${ssid_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                />
              </div>
              {/* Medical Records List */}
              <div style={{ marginTop: "10%" }}></div>
              <h4
                style={{
                  color: "rgb(119, 120, 121)",
                  fontSize: "20px",
                  direction: "rtl",
                  backgroundImage: `url(${five_icon})`,
                  backgroundRepeat: "no-repeat",
                  paddingRight: "40px",
                  backgroundPosition: "right",
                  textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                سوابق پزشکی: با استفاده از دکمۀ زیر سوابق پزشکی خود را ثبت
                نمایید.
              </h4>
              <div
                className="medical-field_modal medical-btn"
                style={{ marginRight: "10px" }}
              >
                <div className="medical-btn_layer">
                  <input
                    type="button"
                    value="افزودن سابقۀ پزشکی"
                    onClick={(e) => openRecordModal(e)}
                  />
                </div>
              </div>
              <div
                className="medical-field_modal medical-btn"
                style={{ marginRight: "10px" }}
              >
                <div className="medical-btn_layer">
                  <input
                    type="submit"
                    value="ارسال اطلاعات"
                    onClick={(e) => handleSendMedicalInfo(e)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>


    </>
  );
}

export default DoctorInfoModal;
