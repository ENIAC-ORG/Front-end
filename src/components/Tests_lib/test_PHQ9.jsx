import React, { useState, useEffect } from "react";
import PHQ9 from "./questions_PHQ9";
import ProgressBar from "react-bootstrap/ProgressBar";
import Swal from "sweetalert2";
import "./phq9_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";

const PHQ9Test = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(PHQ9.questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [phq9Result, setPhq9Result] = useState({});
  const [result, setResult] = useState({
    doneAnswers: 0,
    emptyAnswers: 0,
  });

  const { questions } = PHQ9;
  const { question, choices } = questions[activeQuestion];

  useEffect(() => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[activeQuestion] = selectedAnswers[activeQuestion];
      return updatedAnswers;
    });
    console.log(selectedAnswers);
  }, [activeQuestion]);

  const sendAnswersToBack = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const dataString = JSON.stringify(data);
      console.log(dataString);
      const response = await axios.post(
        "https://eniacgroup.ir/backend/TherapyTests/phq9/",
        {
          data: dataString,
        },
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowResult(true);
        console.log(response);
        console.log(response.data.result);
      } else {
        Swal.fire({
          icon: "error",
          title: "!خطا در ارسال پاسخ‌ها",
          html: "متاسفانه مشکلی رخ داد",
          background: "#075662",
          color: "#fff",
          width: "35rem",
          font: "14px",
          backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
          confirmButtonColor: "#0a8ca0",
          cancelButtonColor: "#0a8ca0",
          confirmButtonText: "تایید",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "!خطا در ارسال درخواست",
        html: "متاسفانه مشکلی رخ داد",
        background: "#075662",
        color: "#fff",
        font: "14px",

        width: "35rem",
        backdrop: `
            rgba(84, 75, 87.0.9)
            left top
            no-repeat`,
        confirmButtonColor: "#0a8ca0",
        cancelButtonColor: "#0a8ca0",
        confirmButtonText: "تایید",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  const loginMessage = () => {
    Swal.fire({
      icon: "warning",
      title: "!برای انجام تست، ورود به حساب خود الزامی است",
      html: "آیا می‌خواهید وارد شوید؟",
      background: "#075662",
      color: "#fff",
      width: "35rem",
      font: "14px",
      backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
      confirmButtonColor: "#0a8ca0",
      cancelButtonColor: "#0a8ca0",
      showCancelButton: true,
      confirmButtonText: "ورود",
      cancelButtonText: "صفحۀ اصلی",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/Signup");
      } else {
        navigate("/");
      }
    });
  };

  const onClickNext = () => {
    if (selectedAnswers[activeQuestion] !== null) {
      setResult((prev) => ({
        ...prev,
        doneAnswers: prev.doneAnswers + 1,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        emptyAnswers: prev.emptyAnswers + 1,
      }));
    }

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      const updatedAnswersForBack = {};
      for (let i = 1; i < questions.length; i++) {
        updatedAnswersForBack[i] = 
          selectedAnswers[i] + 1
        ;
      }
      sendAnswersToBack(updatedAnswersForBack);
      // setShowResult(true);
    }
  };

  const onClickPrevious = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const onAnswerSelected = (index) => {
    console.log(activeQuestion);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[activeQuestion] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const showConfirmSwal = () => {
    Swal.fire({
      icon: "warning",
      title: "آیا از ادامۀ آزمون منصرف شده اید؟",
      html: "در صورت اتمام آزمون پاسخ‌های شما ثبت نمی‌شوند",
      background: "#075662",
      color: "#fff",
      width: "35rem",
      // fontSize: "14px",

      backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
      confirmButtonColor: "#0a8ca0",
      cancelButtonColor: "#0a8ca0",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "ادامه می‌دهم",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/TestPage");
      } else {
        // do nothing
      }
    });
  };

  const cancelTest = () => {
    Swal.fire({
      icon: "warning",
      title: "از انجام آزمون منصرف شده اید؟",
      background: "#075662",
      color: "#fff",
      width: "35rem",
      backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
      confirmButtonColor: "#0a8ca0",
      cancelButtonColor: "#0a8ca0",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "ادامه می‌دهم",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/TestPage");
      } else {
        // do nothing
      }
    });
  };

  const showTheResult = () => {
    navigate("/Home");
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const convertToPersianNumbers = (number) => {
    return String(number).replace(/\d/g, (digit) => persianNumbers[digit]);
  };

  return (
    <>
      <NavBar_SideBar />
      <body className="phq9-body">
        <div
          className="phq9-quiz-container"
        // style={
        //   activeQuestion === 0
        //     ? { marginTop: "1%" }
        //     : { marginTop: "1%" }
        // }
        >
          {!showResult && (
            <div>
              {activeQuestion === 0 && (
                <h2
                  style={{
                    // fontSize: "30px",
                    color: "#55ad9b",
                    marginBottom: "10px",
                    textAlign: "center",
                    fontFamily: "Ios15medium"
                  }}
                >
                  تست شخصیت‌شناسی PHQ9
                </h2>
              )}
              <div className="phq9-header">
                {activeQuestion !== 0 && (
                  <>
                    <ProgressBar
                      animated
                      className="mbti-progress-bar custom-color"
                      now={(activeQuestion + 1) * (100 / questions.length)}
                    />
                    <span className="phq9-active-question-no">
                      {convertToPersianNumbers(addLeadingZero(activeQuestion))}
                    </span>
                    <span className="phq9-total-question">
                      /
                      {convertToPersianNumbers(
                        addLeadingZero(questions.length - 1)
                      )}
                    </span>
                  </>
                )}
              </div>
              <h2
                style={
                  activeQuestion === 0
                    ? {
                      lineHeight: "1.8",
                      // fontSize: "21px",
                      paddingTop: "20px",
                    }
                    : {}
                }
              >
                {question}
              </h2>
              <ul>
                {choices.map((choice, index) => (
                  <li
                    key={index}
                    className={
                      selectedAnswers[activeQuestion] === index
                        ? "phq9-selected-answer"
                        : ""
                    }
                    onClick={() => onAnswerSelected(index)}
                  >
                    {choice.text}
                  </li>
                ))}
              </ul>
              <div
                className="phq9-button-group"
              // style={{ fontSize: "14px" }}
              >
                {activeQuestion === 0 ? (
                  <>
                    <button
                      // style={{ width: "40px", fontSize: "14px" }}
                      onClick={() => {
                        if (localStorage.getItem("accessToken") !== null) {
                          onClickNext();
                        } else {
                          loginMessage();
                        }
                      }}
                    >
                      شروع
                    </button>
                    <button onClick={cancelTest}>انصراف</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onClickNext}
                      disabled={selectedAnswers[activeQuestion] === null}
                      title={
                        selectedAnswers[activeQuestion] === null &&
                          activeQuestion !== questions.length - 1
                          ? "برای ادامه باید حتما یک گزینه را انتخاب کنید"
                          : ""
                      }
                      style={
                        activeQuestion === questions.length - 1
                          ? { fontSize: "14px" }
                          : {}
                      }
                    >
                      {activeQuestion === questions.length - 1
                        ? "پایان"
                        : "بعدی"}
                    </button>

                    <span
                      // style={{ fontSize: "16px" }}
                      onClick={showConfirmSwal}
                      className="phq9-complete-test"
                    >
                      {activeQuestion === questions.length - 1
                        ? ""
                        : "اتمام آزمون"}
                    </span>
                    <button
                      onClick={onClickPrevious}
                      disabled={activeQuestion === 0}
                    >
                      قبلی
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {showResult && (
            <div className="phq9-result" style={{ marginTop: "40px" }}>
              <h3
                style={
                  showResult
                    ? {
                      fontWeight: "bolder",
                      color: "#15B392",
                      marginBottom: "33px",
                    }
                    : {}
                }
              >
                آزمون شما به پایان رسید!
              </h3>
              <p style={{ fontSize: "20px", paddingTop: "30px" }}>
                پاسخ‌های شما پردازش شد. نتیجۀ این آزمون می‌گوید نیاز شما به هر
                یک از نیازهای اساسی "عشق"، "بقا"، "آزادی"، "قدرت" و "سرگرمی و
                تفریح" چقدر است. برای دیدن نتیجۀ آزمون خود، برروی دکمۀ زیر کلیک
                کنید.
              </p>
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "120px",
                  marginRight: "34%",
                }}
                onClick={showTheResult}
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          )}
        </div>
      </body>
      <Footer />
    </>
  );
};

export default PHQ9Test;
