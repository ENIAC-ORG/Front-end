import React, { useState, useEffect } from "react";
import Glasser from "./questions_Glasser";
import ProgressBar from "react-bootstrap/ProgressBar";
import Swal from "sweetalert2";
import "./glasser_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";

const GlasserTest = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(Glasser.questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [glasserResult, setGlasserResult] = useState({});
  const [result, setResult] = useState({
    doneAnswers: 0,
    emptyAnswers: 0,
  });

  const { questions } = Glasser;
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
        "http://127.0.0.1:8000//TherapyTests/glasser/",
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
        setGlasserResult({
          love: response.data.result.love,
          survive: response.data.result.survive,
          freedom: response.data.result.freedom,
          power: response.data.result.power,
          fun: response.data.result.fun,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "!خطا در ارسال پاسخ‌ها",
          html: "متاسفانه مشکلی رخ داد",
          background: "#473a67",
          color: "#b4b3b3",
          width: "26rem",
          height: "18rem",
          confirmButtonText: "تایید",
          customClass: {
            container: "custom-swal-container",
          },
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
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        height: "18rem",
        confirmButtonText: "تایید",
        customClass: {
          container: "custom-swal-container",
        },
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
      background: "#473a67",
      color: "#b4b3b3",
      width: "26rem",
      height: "18rem",
      showCancelButton: true,
      confirmButtonText: "ورود",
      cancelButtonText: "صفحۀ اصلی",
      customClass: {
        container: "custom-swal-container",
      },
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
        updatedAnswersForBack[i] = {
          category: questions[i].category,
          res: selectedAnswers[i] + 1,
        };
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
      background: "#473a67",
      color: "#b4b3b3",
      width: "29rem",
      height: "15rem",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "ادامه می‌دهم",
      customClass: {
        container: "custom-swal-container",
      },
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
      background: "#473a67",
      color: "#b4b3b3",
      width: "26rem",
      height: "18rem",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "ادامه می‌دهم",
      customClass: {
        container: "custom-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/TestPage");
      } else {
        // do nothing
      }
    });
  };

  const showTheResult = () => {
    console.log(glasserResult);
    Swal.fire({
      icon: "info",
      title: "نتیجۀ گلاسر شما",
      html: `
          <p>عشق: ${convertToPersianNumbers(glasserResult["love"])} از ۵</p>
          <p>بقا: ${convertToPersianNumbers(glasserResult["survive"])} از ۵</p>
          <p>آزادی: ${convertToPersianNumbers(
            glasserResult["freedom"]
          )} از ۵</p>
          <p>قدرت: ${convertToPersianNumbers(glasserResult["power"])} از ۵</p>
          <p>سرگرمی: ${convertToPersianNumbers(glasserResult["fun"])} از ۵</p>
        `,
      background: "#473a67",
      color: "#b4b3b3",
      width: "26rem",
      height: "18rem",
      // showCancelButton: true,
      confirmButtonText: "تایید و رفتن به صفحۀ اصلی",
      // cancelButtonText: "صفحۀ اصلی",
      customClass: {
        container: "custom-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const convertToPersianNumbers = (number) => {
    return String(number).replace(/\d/g, (digit) => persianNumbers[digit]);
  };

  return (
    <>
      <NavBar_SideBar />
      <body className="glasser-body">
        <div
          className="glasser-quiz-container"
          style={
            activeQuestion === 0 || showResult
              ? { marginTop: "4%" }
              : { marginTop: "2%" }
          }
        >
          {!showResult && (
            <div>
              {activeQuestion === 0 && (
                <h2
                  style={{
                    fontSize: "30px",
                    color: "#9a94fb",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  تست شخصیت‌شناسی گلاسر
                </h2>
              )}
              <div className="glasser-header">
                {activeQuestion !== 0 && (
                  <>
                    <ProgressBar
                      animated
                      className="mbti-progress-bar custom-color"
                      now={(activeQuestion + 1) * (100 / questions.length)}
                    />
                    <span className="glasser-active-question-no">
                      {convertToPersianNumbers(addLeadingZero(activeQuestion))}
                    </span>
                    <span className="glasser-total-question">
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
                        fontSize: "21px",
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
                        ? "glasser-selected-answer"
                        : ""
                    }
                    onClick={() => onAnswerSelected(index)}
                  >
                    {choice.text}
                  </li>
                ))}
              </ul>
              <div
                className="glasser-button-group"
                style={{ fontSize: "14px" }}
              >
                {activeQuestion === 0 ? (
                  <>
                    <button
                      style={{ width: "40px", fontSize: "14px" }}
                      onClick={() => {
                        if (localStorage.getItem("accessToken") !== null) {
                          onClickNext();
                        } else {
                          loginMessage();
                        }
                      }}
                    >
                      شروع آزمون
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
                        ? "پایان آزمون"
                        : "بعدی"}
                    </button>

                    <span
                      style={{ fontSize: "16px" }}
                      onClick={showConfirmSwal}
                      className="glasser-complete-test"
                    >
                      اتمام آزمون
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
            <div className="glasser-result" style={{ marginTop: "40px" }}>
              <h3
                style={
                  showResult
                    ? {
                        fontWeight: "bolder",
                        color: "#9a94fb",
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
                دیدن نتایج
              </button>
            </div>
          )}
        </div>
      </body>
    </>
  );
};

export default GlasserTest;
