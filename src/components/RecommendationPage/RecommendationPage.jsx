import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import Recommendation_Question from "./questions_Recommendation";
import "./RecommendationPageCopy.css";
import DoctorProfile from "../DoctorsList/DoctorProfile";
import "../DoctorsList/DoctorsList.css";
import axios from "axios";
import { TextField } from "@material-ui/core";

const RecommendationPage = () => {
  const navigate = useNavigate();
  const { questions } = Recommendation_Question;
  const totalQuestions = questions.length;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(totalQuestions).fill(null)
  );
  const [result, setResult] = useState({ doneAnswers: 0, emptyAnswers: 0 });
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [doctorProfile, setDoctorProfile] = useState([]);

  const goToHomePage = () => {
    navigate("/");
  };

  const sendAnswersToBack = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const dataString = JSON.stringify(data);
      console.log(dataString);
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000//recomSys/patient_recomend/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: dataString,
      });

      if (response.status === 200) {
        console.log(response.data.doctors);
        setDoctorProfile(response.data.doctors);
        setShowResult(true);
        console.log(response);
      } else {
        console.log(response.status);
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
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "!خطا در ارسال درخواست",
        html: "متاسفانه مشکلی رخ داد",
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        // height: "18rem",
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

  const onClickPrevious = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const onClickNext = () => {
    if (
      selectedAnswers[activeQuestion] === null ||
      (Array.isArray(selectedAnswers[activeQuestion]) &&
        selectedAnswers[activeQuestion].length === 0)
    ) {
      notSelected();
      return;
    }

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      const updatedAnswersForBack = {};
      for (let i = 0; i < questions.length; i++) {
        if (Array.isArray(selectedAnswers[i])) {
          let element = selectedAnswers[i].join(",");
          if (i === 3 && selectedAnswers[i].includes(7)) {
            element += "," + inputValue;
          }
          updatedAnswersForBack[i] = element;
        } else {
          updatedAnswersForBack[i] = selectedAnswers[i];
        }
      }
      sendAnswersToBack(updatedAnswersForBack);
    }
  };

  const onAnswerSelected = (index) => {
    const updatedAnswers = [...selectedAnswers];
    const isMultipleChoice = activeQuestion === 3;

    if (isMultipleChoice) {
      const currentAnswers = updatedAnswers[activeQuestion] || [];
      const answerIndex = currentAnswers.indexOf(index);

      if (currentAnswers.includes(7)) {
        if (answerIndex === -1) {
          updatedAnswers[activeQuestion] = [...currentAnswers, index];
        } else {
          updatedAnswers[activeQuestion] = currentAnswers.filter(
            (_, i) => i !== answerIndex
          );
        }
      } else {
        if (answerIndex === -1) {
          updatedAnswers[activeQuestion] = [...currentAnswers, index];
        } else {
          updatedAnswers[activeQuestion] = currentAnswers.filter(
            (_, i) => i !== answerIndex
          );
        }
      }
    } else {
      updatedAnswers[activeQuestion] = index;
    }

    setSelectedAnswers(updatedAnswers);
  };

  const cancelTest = () => {
    Swal.fire({
      icon: "warning",
      title: "از انجام فرم منصرف شده اید؟",
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
        navigate("/");
      }
    });
  };

  const notSelected = () => {
    Swal.fire({
      icon: "warning",
      title: "هنوز گزینه ای را انتخاب نکرده اید!",
      background: "#473a67",
      color: "#b4b3b3",
      width: "26rem",
      height: "18rem",
      showCancelButton: false,
      confirmButtonText: "باشه",
      customClass: {
        container: "custom-swal-container",
      },
    });
  };

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  return (
    <>
      <NavBar_SideBar />
      <div align="center" className="recomBody">
        <br />
        <h1
          align="center"
          style={{
            fontFamily: "Ios15medium",
            fontSize: "27px",
            marginBottom: "20px",
            marginTop: "0px",
          }}
        >
          پیشنهاد روان درمانگر
        </h1>
        {!showResult && (
          <div className="recomBox" dir="rtl">
            <form className="recform">
              <label
                className="question-style"
                style={{ fontFamily: "Ios15medium" }}
              >
                {questions[activeQuestion].question}
              </label>
              <br />
              <ul style={{}}>
                {questions[activeQuestion].choices.map((choice, index) => (
                  <li
                    style={{}}
                    key={index}
                    className={
                      activeQuestion === 3
                        ? selectedAnswers[activeQuestion]?.includes(index)
                          ? "Recommendation-selected-answer"
                          : ""
                        : selectedAnswers[activeQuestion] === index
                        ? "Recommendation-selected-answer"
                        : ""
                    }
                    onClick={() => onAnswerSelected(index)}
                  >
                    {choice.text}
                  </li>
                ))}
              </ul>
              {activeQuestion === 3 &&
              selectedAnswers[activeQuestion]?.includes(7) ? (
                <TextField
                  multiline
                  rows={1}
                  rowsMax={4}
                  autoComplete="off"
                  variant="outlined"
                  // value={_comment}
                  onChange={handleInputChange}
                  dir="rtl" // Set the direction to RTL
                  InputLabelProps={{
                    dir: "rtl", // Set the direction of the label to RTL
                  }}
                  placeholder="موارد دیگر"
                  className="textbox-other"
                />
              ) : (
                ""
              )}

              <div
                className="button-group"
                style={{ fontFamily: "Ios15medium" }}
              >
                <button
                  type="button"
                  className="button-style bottom-button-hover"
                  onClick={onClickNext}
                  disabled={
                    activeQuestion === 3
                      ? selectedAnswers[activeQuestion]?.length === 0
                      : selectedAnswers[activeQuestion] === null
                  }
                >
                  {activeQuestion === totalQuestions - 1 ? "پایان" : "بعدی"}
                </button>
                {activeQuestion !== 0 && (
                  <button
                    className="button-style bottom-button-hover"
                    type="button"
                    onClick={onClickPrevious}
                  >
                    قبلی
                  </button>
                )}
                <button
                  className="button-style bottom-button-hover"
                  type="button"
                  onClick={cancelTest}
                  style={{ width: "200px" }}
                >
                  انصراف و بازگشت به صفحه اصلی
                </button>
              </div>
            </form>
          </div>
        )}

        {showResult && (
          <div className="recomBox">
            <h1
              align="center"
              style={{ fontFamily: "Ios15medium", fontSize: "25px" }}
            >
              نتایج:
            </h1>

            <div
              className="owl-carousel team-carousel wow fadeIn owl-loaded owl-drag"
              data-wow-delay=".5s"
              style={{ visibility: "visible" }}
            >
              <div
                className="distanceBetween"
                style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
              >
                {Array.isArray(doctorProfile) &&
                  doctorProfile.map((index) => (
                    <DoctorProfile
                      Id={index?.psychiatrist}
                      name={index?.name}
                      Description={index?.description}
                      Image={"http://127.0.0.1:8000/" + index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecommendationPage;
