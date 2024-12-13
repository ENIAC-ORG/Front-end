import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import Patient_Recommendation_Question from "./Patient_Questions_Recommendation";
import Doctor_Recommendation_Question from "./Doctor_Questions_Recommendation";
import "./RecommendationPage.css";
import DoctorProfile from "../DoctorsList/DoctorProfile";
import "../DoctorsList/DoctorsList.css";
import axios from "axios";
import { TextField } from "@material-ui/core";

const RecommendationPage = () => {
  const navigate = useNavigate();
  const IsDoctor = localStorage.getItem("role") == "doctor";
  const { questions } = IsDoctor
  ? Doctor_Recommendation_Question
  : Patient_Recommendation_Question;
  const totalQuestions = questions.length;

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(totalQuestions).fill(null)
  );
  const [result, setResult] = useState({ doneAnswers: 0, emptyAnswers: 0 });
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState(["",""]);

  const handleInputChange = (event) => {
    if (!IsDoctor && activeQuestion == 3 && selectedAnswers[activeQuestion]?.includes(7)) {
      inputValue[0] = event.target.value;
    }
    if (IsDoctor && activeQuestion == 2 && selectedAnswers[activeQuestion]?.includes(7)) {
      inputValue[0] = event.target.value;
    }
    if (IsDoctor && activeQuestion == 4 && selectedAnswers[activeQuestion]?.includes(11)) {
      inputValue[1] = event.target.value;
    }
  };

  const [doctorProfile, setDoctorProfile] = useState([]);

  const goToHomePage = () => {
    navigate("/");
  };

  const sendAnswersToBack = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const dataString = JSON.stringify(data);
      const response = await axios({
        method: "POST",
        url: IsDoctor ? "http://eniacgroup.ir:8070/recomSys/doctor_recomend/":"http://eniacgroup.ir:8070/recomSys/patient_recomend/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: dataString,
      });

      if (response.status === 200) {
        if(IsDoctor)
        {toast.success("!جواب های شما با موفقیت ثبت شدند", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");}
          else{
        console.log(response.data.doctors);
        setDoctorProfile(response.data.doctors);
        setShowResult(true);}
      } else {
        toast.error("!متاسفانه خطایی در ارسال رخ داده", {
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
      toast.error("!متاسفانه خطایی در ارسال رخ داده", {
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

  const onClickPrevious = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const onClickNext = () => {
    if (selectedAnswers[activeQuestion] == null) {
      toast.warn("!هنوز گزینه ای انتخاب نکرده اید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        const updatedAnswersForBack = {};
        for (let i = 0; i < questions.length; i++) {
          if (Array.isArray(selectedAnswers[i])) {
            let element = selectedAnswers[i].join(",");
            if (i == 3 && selectedAnswers[i]?.includes(7)) {
              element += "," + inputValue[0];
            }
            if (i == 2 && selectedAnswers[i]?.includes(7)) {
              element += "," + inputValue[0];
            }
            if (i == 4 && selectedAnswers[i]?.includes(11)) {
              element += "," + inputValue[1];
            }
            updatedAnswersForBack[i] = element;
          } else {
            updatedAnswersForBack[i] = selectedAnswers[i];
          }
        }
        sendAnswersToBack(updatedAnswersForBack);
      }
    }
  };

  const onAnswerSelected = (index) => {
    const updatedAnswers = [...selectedAnswers];
    const isMultipleChoice = (!IsDoctor && activeQuestion == 3) | 
    (IsDoctor && activeQuestion == 2) | (IsDoctor && activeQuestion == 4);

    if (isMultipleChoice) {
      const currentAnswers = updatedAnswers[activeQuestion] || [];
      const answerIndex = currentAnswers.indexOf(index);
      console.log(answerIndex);
        if (answerIndex == -1) {
          updatedAnswers[activeQuestion] = [...currentAnswers, index];
        } else {
          updatedAnswers[activeQuestion] = currentAnswers.filter(
            (_, i) => i !== answerIndex
          );
        }
    } else {
      updatedAnswers[activeQuestion] = index;
    }

    setSelectedAnswers(updatedAnswers);
    console.log(selectedAnswers)
  };

  const cancelTest = () => {
    Swal.fire({
      icon: "error",
      title: "از انجام فرم منصرف شده اید؟",
      background: "#075662",
      color: "#FFFF",
      width: "35rem",

      backdrop: `
  rgba(84, 75, 87.0.9)
  left top
  no-repeat`,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      confirmButtonColor: "#0a8ca0",
      cancelButtonColor: "#0a8ca0",
      showConfirmButton: true,
      showCancelButton: true,
      preConfirm: () => {
        navigate("/");
      },
    });
  };

  return (
    <>
      <NavBar_SideBar />
      <div align="center" className="recomBody p-5 pt-3">
        <br />
        {!showResult && (
          <div className="recomBox col-lg-8 col-md-12 col-sm-12" dir="rtl">
            <form className="recform p-5 pt-2 ">
              <h3 className="question-style mb-5 pb-4 font-custom">
                {questions[activeQuestion].question}
              </h3>
              <div align="center">
                <ul className="row d-flex justify-content-center align-items-stretch  w-75">
                  {questions[activeQuestion].choices.map((choice, index) => (
                    <li
                      key={index}
                      className={`col-6 mx-4 mb-3 ${ (Array.isArray(selectedAnswers[activeQuestion]) ?
                        selectedAnswers[activeQuestion]?.includes(index) : selectedAnswers[activeQuestion] == index )
                          ? "Recommendation-selected-answer"
                          : ""
                      }`}
                      onClick={() => onAnswerSelected(index)}
                    >
                      {choice.text}
                    </li>
                  ))}
                </ul>
              </div>
              {((!IsDoctor && activeQuestion == 3 && selectedAnswers[activeQuestion]?.includes(7)) || 
              (IsDoctor && activeQuestion == 2 && selectedAnswers[activeQuestion]?.includes(7)) ||
              (IsDoctor && activeQuestion == 4 && selectedAnswers[activeQuestion]?.includes(11))) ? (
                <TextField
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleInputChange}
                  dir="rtl" 
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="موارد دیگر"
                  defaultValue={activeQuestion == 4 ? inputValue[1] : inputValue[0]}
                  className="textbox-other"
                  color="red"
                />
              ) : (
                ""
              )}

              <div className="button-group row font-custom">
                <div className="col">
                  <button
                    type="button"
                    className=" button-style bottom-button-hover font-custom"
                    onClick={onClickNext}
                  >
                    {activeQuestion === totalQuestions - 1 ? "پایان" : "بعدی"}
                  </button>
                </div>
                <div className="col">
                  {activeQuestion !== 0 && (
                    <button
                      className="button-style bottom-button-hover"
                      type="button"
                      onClick={onClickPrevious}
                    >
                      قبلی
                    </button>
                  )}
                </div>
                <div className="col">
                  <button
                    className="button-style bottom-button-hover"
                    type="button"
                    onClick={cancelTest}
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {showResult && (
          <div className="recomBox">
            <h1
              className="font-custom text-center"
              style={{ fontSize: "25px" }}
            >
              نتایج:
            </h1>

            <div
              className="owl-carousel team-carousel wow fadeIn owl-loaded owl-drag invisible"
              data-wow-delay=".5s"
            >
              <div className="distanceBetween d-flex flex-wrap g-3">
                {Array.isArray(doctorProfile) &&
                  doctorProfile.map((index) => (
                    <DoctorProfile
                      Id={index?.psychiatrist}
                      name={index?.name}
                      Description={index?.description}
                      Image={"http://eniacgroup.ir:8070/" + index?.image}
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
