import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { JBDateInput } from "jb-date-input-react";
import "./medical-info-modal-styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DateObject from "react-date-object";
import * as shamsi from "shamsi-date-converter";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Swal from "sweetalert2";

import kid_icon from "../../assets/kid.png";
import ssid_icon from "../../assets/id.png";
import one_icon from "../../assets/one.png";
import two_icon from "../../assets/two.png";
import three_icon from "../../assets/three.png";
import four_icon from "../../assets/four.png";
import doc_icon from "../../assets/doc.png";
import circle_icon from "../../assets/circle.png";

function MedicalInfoModal({
  showModal,
  toggleModal,
  daySelected,
  doctorId,
  resType,
  left_times,
  selectIndex,
  getReserve,
}) {
  const [childrenNum, setChildrenNum] = useState(null);
  const [childrenNumStr, setChildrenNumStr] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [ssid, setSsid] = useState("");

  const [endDate1, setEndDate1] = useState("");
  const [endDate2, setEndDate2] = useState("");
  const [endDate3, setEndDate3] = useState("");

  const [isFinished1, setIsFinished1] = useState(null);
  const [isFinished2, setIsFinished2] = useState(null);
  const [isFinished3, setIsFinished3] = useState(null);

  const [isFinished1str, setIsFinished1str] = useState("finished");
  const [isFinished2str, setIsFinished2str] = useState("finished");
  const [isFinished3str, setIsFinished3str] = useState("finished");

  const [length1, setLength1] = useState(null);
  const [length2, setLength2] = useState(null);
  const [length3, setLength3] = useState(null);

  // const [length1str, setLength1str] = useState("");
  // const [length2str, setLength2str] = useState("");
  // const [length3str, setLength3str] = useState("");

  const [reason2leave1, setReason2leave1] = useState("");
  const [reason2leave2, setReason2leave2] = useState("");
  const [reason2leave3, setReason2leave3] = useState("");

  const [method1, setMethod1] = useState("");
  const [method2, setMethod2] = useState("");
  const [method3, setMethod3] = useState("");

  const [drugs1, setDrugs1] = useState("");
  const [drugs2, setDrugs2] = useState("");
  const [drugs3, setDrugs3] = useState("");

  const [hasHistory1, setHasHistory1] = useState(false);
  const [hasHistory2, setHasHistory2] = useState(false);
  const [hasHistory3, setHasHistory3] = useState(false);

  const [record, setrecord] = useState(null);

  function DateString(input) {
    var changed = shamsi.jalaliToGregorian(input.year, input.month, input.day);
    var y = `${changed[0]}`;
    var m = changed[1] < 10 ? `0${changed[1]}` : `${changed[1]}`;
    var d = changed[2] < 10 ? `0${changed[2]}` : `${changed[2]}`;
    return [y, m, d].join("-");
  }

  const getReserved = async (event) => {
    event.preventDefault();
    getReserve();
  };

  async function SendMedicalInfo(event) {
    event.preventDefault();
    const errors = {};
    const errorMessages = [];

    // firstname field validations
    if (childrenNum === "0" || childrenNum === null) {
      errors.childNumError = "!به سوال اول به درستی پاسخ نداده اید";
      errorMessages.push(errors.childNumError);
    }

    if (medicalHistory === null) {
      errors.familyHistError = "!به سوال دوم پاسخ نداده اید";
      errorMessages.push(errors.familyHistError);
    }

    // phonenumebr field validations
    if (!ssid.trim()) {
      errors.ssidError = "!وارد کردن کد ملی الزامی است";
      errorMessages.push(errors.ssidError);
    } else if (ssid.length !== 10) {
      errors.ssidError = "!قالب کد ملی درست نیست";
      errorMessages.push(errors.ssidError);
    }

    // date of brith validation
    const endDate1Format = new Date(endDate1);
    const today = new Date();
    if (endDate1 !== "" && isNaN(endDate1Format.getTime())) {
      errors.endDate1Error = "!تاریخ پایان معتبر نیست";
      errorMessages.push(errors.endDate1Error);
    } else if (endDate1Format > today) {
      errors.endDate1Error = "!تاریخ پایان نمی‌تواند در آینده باشد";
      errorMessages.push(errors.endDate1Error);
    }

    // date of brith validation
    const endDate2Format = new Date(endDate2);
    if (endDate2 !== "" && isNaN(endDate2Format.getTime())) {
      errors.endDate2Error = "!تاریخ پایان معتبر نیست";
      errorMessages.push(errors.endDate2Error);
    } else if (endDate2Format > today) {
      errors.endDate2Error = "!تاریخ پایان نمی‌تواند در آینده باشد";
      errorMessages.push(errors.endDate2Error);
    }

    const endDate3Format = new Date(endDate3);
    if (endDate3 !== "" && isNaN(endDate3Format.getTime())) {
      errors.endDate3Error = "!تاریخ پایان معتبر نیست";
      errorMessages.push(errors.endDate3Error);
    } else if (endDate3Format > today) {
      errors.endDate3Error = "!تاریخ پایان نمی‌تواند در آینده باشد";
      errorMessages.push(errors.endDate3Error);
    }

    if (
      ((endDate1 === "" || length1 === null) &&
        (isFinished1 !== null ||
          reason2leave1 !== "" ||
          method1 !== "" ||
          drugs1 !== "")) ||
      (endDate1 !== "" && length1 === null) ||
      (endDate1 === "" && length1 !== null)
    ) {
      errors.firstHist = ".پر کردن دو فیلد اول درمان اول اجباری است";
      errorMessages.push(errors.firstHist);
    }

    if (
      ((endDate2 === "" || length2 === null) &&
        (isFinished2 !== null ||
          reason2leave2 !== "" ||
          method2 !== "" ||
          drugs2 !== "")) ||
      (endDate2 !== "" && length2 === null) ||
      (endDate2 === "" && length2 !== null)
    ) {
      errors.secondHist = ".پر کردن دو فیلد اول درمان دوم اجباری است";
      errorMessages.push(errors.secondHist);
    }

    if (
      ((endDate3 === "" || length3 === null) &&
        (isFinished3 !== null ||
          reason2leave3 !== "" ||
          method3 !== "" ||
          drugs3 !== "")) ||
      (endDate3 !== "" && length3 === null) ||
      (endDate3 === "" && length3 !== null)
    ) {
      errors.thirdHist = ".پر کردن دو فیلد اول درمان سوم اجباری است";
      errorMessages.push(errors.thirdHist);
    }

    if (isFinished1 === false && reason2leave1 === "") {
      errors.reason2leave1Error = ".دلیل ترک درمان اول را بنویسید";
      errorMessages.push(errors.reason2leave1Error);
    }
    if (isFinished2 === false && reason2leave2 === "") {
      errors.reason2leave2Error = ".دلیل ترک درمان دوم را بنویسید";
      errorMessages.push(errors.reason2leave2Error);
    }
    if (isFinished3 === false && reason2leave3 === "") {
      errors.reason2leave3Error = ".دلیل ترک درمان سوم را بنویسید";
      errorMessages.push(errors.reason2leave3Error);
    }
    console.log(errorMessages);

    console.log(hasHistory1, hasHistory2, hasHistory3);

    // send POST requesnt and handle errors
    if (errorMessages.length === 0) {
      try {
        event.preventDefault();
        const token = localStorage.getItem("accessToken");
        console.log("response: ", record);
        const recordStr = JSON.stringify(record);
        console.log(recordStr);
        console.log(recordStr.toString());
        const response = await axios.post(
          "http://127.0.0.1:8000//TherapyTests/record/",
          JSON.stringify(record),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          getReserve(event);
          handleClose(event);
          Swal.fire({
            icon: "success",
            title: "!اطلاعات پزشکی شما با موفقیت ثبت شد",
            background: "#473a67",
            color: "#b4b3b3",
            width: "26rem",
            height: "18rem",
            confirmButtonText: "تایید",
            customClass: {
              container: "custom-swal-container",
            },
          }).then((response) => {
            if (response.isConfirmed) {
              CreateReservation(event);
            } else {
              CreateReservation(event);
            }
          });
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
  }

  async function CreateReservation(event) {
    try {
      event.preventDefault();
      const ReservationDate = DateString(daySelected); // Format today's date as "yyyy-mm-dd" string
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

  const handleClose = (event) => {
    event.preventDefault(); // Prevent form submission
    toggleModal();
  };

  const updateHistoryStates = () => {
    setHasHistory1(
      !(
        endDate1 === "" &&
        length1 === null &&
        isFinished1 === null &&
        reason2leave1 === "" &&
        method1 === "" &&
        drugs1 === ""
      )
    );
    setHasHistory2(
      !(
        endDate2 === "" &&
        length2 === null &&
        isFinished2 === null &&
        reason2leave2 === "" &&
        method2 === "" &&
        drugs2 === ""
      )
    );
    setHasHistory3(
      !(
        endDate3 === "" &&
        length3 === null &&
        isFinished3 === null &&
        reason2leave3 === "" &&
        method3 === "" &&
        drugs3 === ""
      )
    );
    GenerateData();
  };

  useEffect(() => {
    console.log("changed");
    updateHistoryStates();
  }, [
    endDate1,
    length1,
    isFinished1,
    reason2leave1,
    method1,
    drugs1,
    endDate2,
    length2,
    isFinished2,
    reason2leave2,
    method2,
    drugs2,
    endDate3,
    length3,
    isFinished3,
    reason2leave3,
    method3,
    drugs3,
    medicalHistory,
    ssid,
    childrenNum,
    isFinished1str,
    isFinished2str,
    isFinished3str,
  ]);

  const GenerateData = () => {
    if (isFinished1 == true) {
      setReason2leave1("");
    }

    if (isFinished2 == true) {
      setReason2leave2("");
    }

    if (isFinished3 == true) {
      setReason2leave3("");
    }

    if (!hasHistory1 && !hasHistory2 && !hasHistory3) {
      const data = {
        child_num: parseInt(childrenNum),
        nationalID: ssid,
        family_history: medicalHistory,
      };
      setrecord(data);
    } else if (hasHistory1 && !hasHistory2 && !hasHistory3) {
      // console.log("alan tooye if1 am")
      const treatHist1 = JSON.stringify({
        end_date: endDate1,
        length: parseInt(length1),
        is_finished: isFinished1,
        reason_to_leave: reason2leave1,
        approach: method1,
        special_drugs: drugs1,
      });
      const data = {
        child_num: parseInt(childrenNum),
        nationalID: ssid,
        family_history: medicalHistory,
        treatementHistory1: treatHist1,
      };
      console.log(data);
      setrecord(data);
    } else if (hasHistory1 && hasHistory2 && !hasHistory3) {
      const treatHist1 = JSON.stringify({
        end_date: endDate1,
        length: parseInt(length1),
        is_finished: isFinished1,
        reason_to_leave: reason2leave1,
        approach: method1,
        special_drugs: drugs1,
      });

      const treatHist2 = JSON.stringify({
        end_date: endDate2,
        length: parseInt(length2),
        is_finished: isFinished2,
        reason_to_leave: reason2leave2,
        approach: method2,
        special_drugs: drugs2,
      });

      const data = {
        child_num: parseInt(childrenNum),
        nationalID: ssid,
        family_history: medicalHistory,
        treatementHistory1: treatHist1,
        treatementHistory2: treatHist2,
      };

      setrecord(data);
    } else if (hasHistory1 && hasHistory2 && hasHistory3) {
      const treatHist1 = JSON.stringify({
        end_date: endDate1,
        length: parseInt(length1),
        is_finished: isFinished1,
        reason_to_leave: reason2leave1,
        approach: method1,
        special_drugs: drugs1,
      });

      const treatHist2 = JSON.stringify({
        end_date: endDate2,
        length: parseInt(length2),
        is_finished: isFinished2,
        reason_to_leave: reason2leave2,
        approach: method2,
        special_drugs: drugs2,
      });

      const treatHist3 = JSON.stringify({
        end_date: endDate3,
        length: parseInt(length3),
        is_finished: isFinished3,
        reason_to_leave: reason2leave3,
        approach: method3,
        special_drugs: drugs3,
      });

      const data = {
        child_num: parseInt(childrenNum),
        nationalID: ssid,
        family_history: medicalHistory,
        treatementHistory1: treatHist1,
        treatementHistory2: treatHist2,
        treatementHistory3: treatHist3,
      };

      setrecord(data);
    }
  };

  const convertToPersianNumbers = (value) => {
    const persianNumbersMap = {
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
    };

    return value.replace(/[0-9]/g, (char) => persianNumbersMap[char] || char);
  };

  const convertToEnglishNumbers = (value) => {
    const englishNumbersMap = {
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
    };

    return value.replace(/[۰-۹]/g, (char) => englishNumbersMap[char] || char);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={toggleModal}
        backdrop="static"
        className="medical-bd_modal modal medical-wrapper_modal"
        centered
      >
        <Modal.Header className="medical-header_modal">
          <Modal.Title className="medical-title_modal">
            تکمیل اطلاعات پزشکی
          </Modal.Title>
        </Modal.Header>
        <div className="medical-form_container_modal">
          <div className="medical-form_details_modal">
            <form action="#" className="form login">
              <pre></pre>
              <div>
                <h4
                  style={{
                    color: "rgb(77, 76, 76)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${one_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  فرزند چندم خانواده هستید؟
                </h4>
              </div>
              <div className="medical-field_modal">
                <input
                  className="input"
                  type="number"
                  id="childrenNum"
                  placeholder="تعداد"
                  min="0"
                  max="120"
                  onChange={(e) => {
                    setChildrenNum(e.target.value);
                    console.log(childrenNum);
                  }}
                  style={{
                    backgroundImage: `url(${kid_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                  value={
                    childrenNum ? convertToPersianNumbers(childrenNum) : ""
                  }
                />
              </div>
              <pre></pre>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(77, 76, 76)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${two_icon})`,
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
                      console.log(medicalHistory);
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
                    }}
                  />{" "}
                  بله
                </label>
              </div>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(77, 76, 76)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${three_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  کد ملّی خود را وارد کنید.
                </h4>
              </div>
              <div className="medical-field_modal">
                <input
                  className="input"
                  type="text"
                  placeholder="کد ملّی"
                  value={ssid ? convertToPersianNumbers(ssid) : ""}
                  onChange={(event) =>
                    setSsid(convertToEnglishNumbers(event.target.value))
                  }
                  style={{
                    backgroundImage: `url(${ssid_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                  }}
                />
              </div>
              <div style={{ marginTop: "10%" }}>
                <h4
                  style={{
                    color: "rgb(77, 76, 76)",
                    fontSize: "20px",
                    direction: "rtl",
                    backgroundImage: `url(${four_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    textShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  در صورتی که از قبل تجربۀ درمان داشته اید، به تعداد سوابق پزشکی
                  خود بخش‌های زیر را تکمیل کنید.
                </h4>
              </div>
              <div style={{ paddingRight: "3%", marginTop: "3%" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${doc_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "7%",
                    backgroundPosition: "right",
                    fontWeight: "bold",
                    color: "rgb(127, 161, 249)",
                  }}
                >
                  سابقۀ پزشکی اول (اختیاری):
                </h5>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  تاریخ پایان دورۀ درمانی:
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div
                  style={{
                    backgroundRepeat: "no-repeat",
                    paddingRight: "0px",
                    backgroundPosition: "right",
                    borderBottom: "2px solid #adadad",
                    marginBottom: "20px",
                  }}
                  className="medical-field_modal2"
                >
                  <div
                    className="medical-field-date"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "92%",
                      direction: "rtl",
                      fonySize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <JBDateInput
                      placeholder="تاریخ را انتخاب کنید"
                      usePersianNumber={true}
                      onSelect={(event) => {
                        setEndDate1(event.target.value);
                      }}
                      onChange={(event) => {
                        setEndDate1(event.target.value);
                      }}
                      format="YYYY-MM-DD"
                      id="medicaldatePicker"
                      style={{
                        border: "none !important",
                        backgroundColor: "white",
                      }}
                      value={endDate1}
                      className="jb-date-input-web-component .medical-calendar-container"
                      calendarClassName="medical-custom-calendar"
                    ></JBDateInput>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h4
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    marginTop: "5%",
                  }}
                >
                  طول درمان شما چند ماه بوده است؟
                </h4>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="number" // Change input type to number
                    id="childrenNum"
                    placeholder="تعداد ماه‌ها"
                    min="0" // Optionally set minimum value
                    max="120" // Optionally set maximum value
                    onChange={(e) => setLength1(e.target.value)}
                    style={{
                      // backgroundImage: `url(${time_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                    value={length1 ? convertToPersianNumbers(length1) : ""}
                  />
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  آیا درمان شما به طور کامل انجام شده است؟
                </h5>
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
                    checked={isFinished1 === false}
                    onChange={() => {
                      setIsFinished1(false);
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
                    checked={isFinished1 === true}
                    onChange={() => {
                      setIsFinished1(true);
                    }}
                  />{" "}
                  بله
                </label>
              </div>

              {isFinished1 !== null && isFinished1 === false && (
                <>
                  <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                    <h5
                      style={{
                        color: "rgb(149, 147, 147)",
                        fontSize: "18px",
                        direction: "rtl",
                        backgroundImage: `url(${circle_icon})`,
                        backgroundRepeat: "no-repeat",
                        paddingRight: "40px",
                        marginTop: "5%",
                        backgroundPosition: "right",
                      }}
                    >
                      علت عدم ادامۀ آن چه بوده است؟
                    </h5>
                  </div>
                  <div style={{ marginRight: "7%" }}>
                    <div className="medical-field_modal2">
                      <input
                        className="input"
                        type="text"
                        placeholder="علت را بنویسید"
                        value={reason2leave1}
                        onChange={(event) =>
                          setReason2leave1(event.target.value)
                        }
                        style={{
                          // backgroundImage: `url(${reason_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "20px",
                          backgroundPosition: "right",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  رویکرد درمانی شما چه بوده است؟ در صورتی که نمی‌دانید، این فیلد
                  را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="رویکرد درمانی"
                    value={method1}
                    onChange={(event) => setMethod1(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  طی این دورۀ درمانی چه داروهایی مصرف کردید؟ در صورتی که دارویی
                  مصرف نکردید این فیلد را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="داروها"
                    value={drugs1}
                    onChange={(event) => setDrugs1(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>

              <div style={{ paddingRight: "3%", marginTop: "3%" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${doc_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "7%",
                    backgroundPosition: "right",
                    fontWeight: "bold",
                    color: "rgb(127, 161, 249)",
                  }}
                >
                  سابقۀ پزشکی دوم (اختیاری):
                </h5>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  تاریخ پایان دورۀ درمانی:
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div
                  style={{
                    // backgroundImage: `url(${date_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "0px",
                    backgroundPosition: "right",
                    borderBottom: "2px solid #adadad",
                    // transition: "border-color 0.3s ease"
                    marginBottom: "20px",
                  }}
                  className="medical-field_modal2"
                >
                  <div
                    className="medical-field-date"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "92%",
                      direction: "rtl",
                      fonySize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <JBDateInput
                      placeholder=".تاریخ را انتخاب کنید"
                      usePersianNumber={true}
                      onSelect={(event) => {
                        setEndDate2(event.target.value);
                      }}
                      onChange={(event) => {
                        setEndDate2(event.target.value);
                      }}
                      format="YYYY-MM-DD"
                      id="medicaldatePicker"
                      style={{
                        border: "none !important",
                        backgroundColor: "white",
                      }}
                      value={endDate2}
                      className="jb-date-input-web-component .medical-calendar-container"
                      calendarClassName="medical-custom-calendar"
                    ></JBDateInput>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h4
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    marginTop: "5%",
                  }}
                >
                  طول درمان شما چند ماه بوده است؟
                </h4>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="number" // Change input type to number
                    id="childrenNum"
                    placeholder="تعداد ماه‌ها"
                    min="0" // Optionally set minimum value
                    max="120" // Optionally set maximum value
                    onChange={(e) => setLength2(e.target.value)}
                    style={{
                      // backgroundImage: `url(${time_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                    value={length2 ? convertToPersianNumbers(length2) : ""}
                  />
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  آیا درمان شما به طور کامل انجام شده است؟
                </h5>
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
                    checked={isFinished2 === false}
                    onChange={() => {
                      setIsFinished2(false);
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
                    checked={isFinished2 === true}
                    onChange={() => {
                      setIsFinished2(true);
                    }}
                  />{" "}
                  بله
                </label>
              </div>
              {isFinished2 !== null && isFinished2 === false && (
                <>
                  <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                    <h5
                      style={{
                        color: "rgb(149, 147, 147)",
                        fontSize: "18px",
                        direction: "rtl",
                        backgroundImage: `url(${circle_icon})`,
                        backgroundRepeat: "no-repeat",
                        paddingRight: "40px",
                        marginTop: "5%",
                        backgroundPosition: "right",
                      }}
                    >
                      علت عدم ادامۀ آن چه بوده است؟
                    </h5>
                  </div>
                  <div style={{ marginRight: "7%" }}>
                    <div className="medical-field_modal2">
                      <input
                        className="input"
                        type="text"
                        placeholder="علت را بنویسید"
                        value={reason2leave2}
                        onChange={(event) =>
                          setReason2leave2(event.target.value)
                        }
                        style={{
                          // backgroundImage: `url(${reason_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "20px",
                          backgroundPosition: "right",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  رویکرد درمانی شما چه بوده است؟ در صورتی که نمی‌دانید، این فیلد
                  را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="رویکرد درمانی"
                    value={method2}
                    onChange={(event) => setMethod2(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  طی این دورۀ درمانی چه داروهایی مصرف کردید؟ در صورتی که دارویی
                  مصرف نکردید این فیلد را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="داروها"
                    value={drugs2}
                    onChange={(event) => setDrugs2(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>

              <div style={{ paddingRight: "3%", marginTop: "3%" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${doc_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "7%",
                    backgroundPosition: "right",
                    fontWeight: "bold",
                    color: "rgb(127, 161, 249)",
                  }}
                >
                  سابقۀ پزشکی سوم (اختیاری):
                </h5>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  تاریخ پایان دورۀ درمانی:
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div
                  style={{
                    // backgroundImage: `url(${date_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "0px",
                    backgroundPosition: "right",
                    borderBottom: "2px solid #adadad",
                    // transition: "border-color 0.3s ease"
                    marginBottom: "20px",
                  }}
                  className="medical-field_modal2"
                >
                  <div
                    className="medical-field-date"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "92%",
                      direction: "rtl",
                      fonySize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    <JBDateInput
                      placeholder=".تاریخ را انتخاب کنید"
                      usePersianNumber={true}
                      onSelect={(event) => {
                        setEndDate3(event.target.value);
                      }}
                      onChange={(event) => {
                        setEndDate3(event.target.value);
                      }}
                      format="YYYY-MM-DD"
                      id="medicaldatePicker"
                      style={{
                        border: "none !important",
                        backgroundColor: "white",
                      }}
                      value={endDate3}
                      className="jb-date-input-web-component .medical-calendar-container"
                      calendarClassName="medical-custom-calendar"
                    ></JBDateInput>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h4
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    backgroundPosition: "right",
                    marginTop: "5%",
                  }}
                >
                  طول درمان شما چند ماه بوده است؟
                </h4>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="number" // Change input type to number
                    id="childrenNum"
                    placeholder="تعداد ماه‌ها"
                    min="0" // Optionally set minimum value
                    max="120" // Optionally set maximum value
                    onChange={(e) => setLength3(e.target.value)}
                    style={{
                      // backgroundImage: `url(${time_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                    value={length3 ? convertToPersianNumbers(length3) : ""}
                  />
                </div>
              </div>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  آیا درمان شما به طور کامل انجام شده است؟
                </h5>
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
                    checked={isFinished3 === false}
                    onChange={() => {
                      setIsFinished3(false);
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
                    checked={isFinished3 === true}
                    onChange={() => {
                      setIsFinished3(true);
                    }}
                  />{" "}
                  بله
                </label>
              </div>
              {isFinished3 !== null && isFinished3 === false && (
                <>
                  <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                    <h5
                      style={{
                        color: "rgb(149, 147, 147)",
                        fontSize: "18px",
                        direction: "rtl",
                        backgroundImage: `url(${circle_icon})`,
                        backgroundRepeat: "no-repeat",
                        paddingRight: "40px",
                        marginTop: "5%",
                        backgroundPosition: "right",
                      }}
                    >
                      علت عدم ادامۀ آن چه بوده است؟
                    </h5>
                  </div>
                  <div style={{ marginRight: "7%" }}>
                    <div className="medical-field_modal2">
                      <input
                        className="input"
                        type="text"
                        placeholder="علت را بنویسید"
                        value={reason2leave3}
                        onChange={(event) =>
                          setReason2leave3(event.target.value)
                        }
                        style={{
                          // backgroundImage: `url(${reason_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "20px",
                          backgroundPosition: "right",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  رویکرد درمانی شما چه بوده است؟ در صورتی که نمی‌دانید، این فیلد
                  را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="رویکرد درمانی"
                    value={method3}
                    onChange={(event) => setMethod3(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>
              <pre></pre>
              <div style={{ paddingRight: "4%", marginTop: "3%" }}>
                <h5
                  style={{
                    color: "rgb(149, 147, 147)",
                    fontSize: "18px",
                    direction: "rtl",
                    backgroundImage: `url(${circle_icon})`,
                    backgroundRepeat: "no-repeat",
                    paddingRight: "40px",
                    marginTop: "5%",
                    backgroundPosition: "right",
                  }}
                >
                  طی این دورۀ درمانی چه داروهایی مصرف کردید؟ در صورتی که دارویی
                  مصرف نکردید این فیلد را خالی بگذارید.
                </h5>
              </div>
              <div style={{ marginRight: "7%", marginBottom: "5%" }}>
                <div className="medical-field_modal2">
                  <input
                    className="input"
                    type="text"
                    placeholder="داروها"
                    value={drugs3}
                    onChange={(event) => setDrugs3(event.target.value)}
                    style={{
                      // backgroundImage: `url(${reason_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "20px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  className="medical-field_modal medical-btn"
                  style={{ marginRight: "10px" }}
                >
                  <div className="medical-btn_layer"></div>
                  <input
                    type="submit"
                    value="بستن"
                    onClick={(e) => handleClose(e)}
                  />
                </div>
                <div
                  className="medical-field_modal medical-btn"
                  style={{ marginLeft: "10px" }}
                >
                  <div className="medical-btn_layer"></div>
                  <input
                    type="submit"
                    value="ارسال"
                    onClick={(e) => SendMedicalInfo(e)}
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

export default MedicalInfoModal;
