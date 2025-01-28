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
import DoctorProfile from "../DoctorsList/DoctorProfile.jsx";
import "../DoctorsList/DoctorsList.css";
import axios from "axios";
import { TextField } from "@material-ui/core";
import withReactContent from "sweetalert2-react-content";

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
  const [inputValue, setInputValue] = useState(
    Array(totalQuestions).fill("")
  );

  const handleInputChange = (event) => {
    const updatedInputValues = [...inputValue];
    updatedInputValues[activeQuestion] = event.target.value;
    setInputValue(updatedInputValues);

    const fieldName = questions[activeQuestion].field;
    const setRequest = IsDoctor ?
      setRequestDoctor((prevRequest) => ({
        ...prevRequest,
        [fieldName]: event.target.value,
      }))
      :
      setRequestPatiant((prevRequest) => ({
        ...prevRequest,
        [fieldName]: event.target.value,
      }));
  };

  console.log(activeQuestion);
  console.log(inputValue);

  const goToHomePage = () => {
    navigate("/");
  };

  const [doctorProfile, setDoctorProfile] = useState([]);
  const [requestPatiant, setRequestPatiant] = useState({
    age: null,
    energy_level: null,
    current_medications: null,
    physical_issues: null,
    symptoms: null,
    past_treatments: null,
    suicidal_thoughts: null,
    stress_level: null,
    sleep_hours: null,
    social_activities: null,
    support_system: null,
    treatment_duration: null,
    religion_preference: null,
    therapist_gender_preference: null,
    presentation_preference: null,
    preferred_therapy_methods: null,
    communication_preference: null,
    expectations: null,
    additional_notes: null,
  });

  const [requestDoctor, setRequestDoctor] = useState({
    specialties: null,
    therapy_methods: null,
    age_groups: null,
    session_preference: null,
    religion: null,
    gender: null,
    experience_years: null,
    max_sessions_per_week: null,
    treatment_duration: null,
    physical_conditions_experience: null,
    crisis_management: null,
    medications_experience: null,
    prefers_religious_patients: null,
    prefers_gender: null,
    communication_preference: null,
    additional_notes: null,
  });

  console.log(requestPatiant);
  console.log(requestDoctor);

  const sendAnswersToBack = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const requestData = IsDoctor ? requestDoctor : requestPatiant;
      const response = await axios({
        method: "POST",
        url: IsDoctor ? "https://eniacgroup.ir/backend/RecomendationSystem/psychologist/form/" : "https://eniacgroup.ir/backend/RecomendationSystem/patient/form/",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: requestData,
      });

      if (response.status === 200) {
        if (IsDoctor) {
          withReactContent(Swal).fire({
            icon: "success",
            title: "!جواب های شما با موفقیت ثبت شدند",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            confirmButtonText: "باشه",
            confirmButtonColor: "#0a8ca0"
          });
          toast.success("!جواب های شما با موفقیت ثبت شدند", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        }
        else {
          try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(
              "https://eniacgroup.ir/backend/RecomendationSystem/match/patient-to-psychologists/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data.matches);
            setDoctorProfile(response.data.matches || []);
            setShowResult(true);
          } catch (error) {
            console.error("Error fetching doctor profiles:", error);
            toast.error("خطا در دریافت داده‌ها", {
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
      console.error("Error response:", error.response?.data || error.message);
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
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        (questions[questions.length - 1]?.hasOnlyTextField && inputValue[questions.length - 1]?.trim() === "") ||
          (
            questions[questions.length - 1]?.requiresTextFieldForOption &&
            selectedAnswers[questions.length - 1] === 0 &&
            inputValue[questions.length - 1]?.trim() === ""
          ) ||
          (!questions[questions.length - 1]?.hasOnlyTextField && selectedAnswers[questions.length - 1] === null)
      // const updatedAnswersForBack = {};
      // for (let i = 0; i < questions.length; i++) {
      //   if (Array.isArray(selectedAnswers[i])) {
        //     let element = selectedAnswers[i].join(",");
        //     console.log(element);

        //     if (!IsDoctor && i == 0) {
        //       element = inputValue[i];
        //     }
        //     if (!IsDoctor && i == 2 && selectedAnswers[i] == 0) {
        //       element += "," + inputValue[i];
        //     }
        //     if (!IsDoctor && i == 5 && selectedAnswers[i] == 0) {
        //       element += "," + inputValue[i];
        //     }
        //     if (!IsDoctor && i == 8) {
        //       element = inputValue[i];
        //     }
        //     if (!IsDoctor && i == 16) {
        //       element = inputValue[i];
        //     }
        //     if (!IsDoctor && i == 18) {
        //       element = inputValue[i];
        //     }

        //     if (IsDoctor && i == 6) {
        //       element = inputValue[i];
        //     }
        //     if (IsDoctor && i == 7) {
        //       element = inputValue[i];
        //     }
        //     if (IsDoctor && i == 15) {
        //       element = inputValue[i];
        //     }
        //     console.log(element);
        //     updatedAnswersForBack[i] = element;
        //   } else {
        //     updatedAnswersForBack[i] = selectedAnswers[i];
        //   }
        
        // console.log(updatedAnswersForBack);
        sendAnswersToBack(IsDoctor ? requestDoctor : requestPatiant);
        if (activeQuestion === totalQuestions - 1) {
          setShowResult(true);
        }
      }
  };

  const onAnswerSelected = (index) => {
    const updatedAnswers = [...selectedAnswers];
    const isMultipleChoice = (!IsDoctor && activeQuestion == 4) | (!IsDoctor && activeQuestion == 15) |
      (!IsDoctor && activeQuestion == 16) | (!IsDoctor && activeQuestion == 17) |
      (IsDoctor && activeQuestion == 0) | (IsDoctor && activeQuestion == 1) |
      (IsDoctor && activeQuestion == 2) | (IsDoctor && activeQuestion == 14);

    if (isMultipleChoice) {
      const currentAnswers = updatedAnswers[activeQuestion] || [];
      const answerIndex = currentAnswers.indexOf(index);
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
    console.log("select: " + selectedAnswers);
    console.log("update: " + updatedAnswers);

    const fieldName = questions[activeQuestion].field;
    const setRequest = IsDoctor ? setRequestDoctor((prevRequest) => ({
      ...prevRequest,
      [fieldName]: isMultipleChoice
        ? updatedAnswers[activeQuestion].map((id) => {
          const choice = questions[activeQuestion].choices.find(
            (choice) => choice.id === id
          );
          return choice ? choice.text : "";
        })
        : questions[activeQuestion].choices[index]?.text || null,
    }))
      :
      setRequestPatiant((prevRequest) => ({
        ...prevRequest,
        [fieldName]: isMultipleChoice
          ? fieldName === "expectations"
            ? updatedAnswers[activeQuestion]
              .map((id) => {
                const choice = questions[activeQuestion].choices.find(
                  (choice) => choice.id === id
                );
                return choice ? choice.text : "";
              })
              .join(" ،")
            : updatedAnswers[activeQuestion].map((id) => {
              const choice = questions[activeQuestion].choices.find(
                (choice) => choice.id === id
              );
              return choice ? choice.text : "";
            })
          : questions[activeQuestion].choices[index]?.text === "خیر" &&
            (fieldName === "current_medications" || fieldName === "past_treatments")
            ? null
            : questions[activeQuestion].choices[index]?.text || null,
      }));
  };

  const cancelTest = () => {
    Swal.fire({
      icon: "error",
      title: "از تکمیل فرم منصرف شده‌اید؟",
      background: "#075662",
      color: "#FFFF",
      width: "35rem",

      backdrop: `
  rgba(84, 75, 87.0.9)
  left top
  no-repeat`,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      confirmButtonColor: "#6e7881",
      cancelButtonColor: "#0a8ca0",
      showConfirmButton: true,
      showCancelButton: true,
      preConfirm: () => {
        navigate("/");
      },
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
      <div align="center" className="recomBody p-5 pt-3">
        <br />
        {!showResult && (
          <div className="recomBox col-lg-8 col-md-12 col-sm-12" dir="rtl">
            <form className="recform p-5 pt-5">
              <h3 className="question-style pb-4 font-custom">
                {questions[activeQuestion].question}
              </h3>
              <div align="center">
                <ul className="row d-flex justify-content-end align-items-stretch">
                  {questions[activeQuestion].choices.map((choice, index) => (
                    <li
                      key={index}
                      className={`col-6 mx-4 mb-3 ${(Array.isArray(selectedAnswers[activeQuestion]) ?
                        selectedAnswers[activeQuestion]?.includes(index) : selectedAnswers[activeQuestion] == index)
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

              {((!(IsDoctor) && activeQuestion == 0)
              ) ? (
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="فقط عدد را وارد کنید."
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((!IsDoctor && activeQuestion == 2 && selectedAnswers[activeQuestion] == 0)
              ) ? (
                <TextField
                  fullWidth
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="نام دارو"
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  color="red"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((!IsDoctor && activeQuestion == 5 && selectedAnswers[activeQuestion] == 0)
              ) ? (
                <TextField
                  fullWidth
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="توضیحات مرتبط با درمان"
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  color="red"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((!(IsDoctor) && activeQuestion == 8)
              ) ? (
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="فقط عدد را وارد کنید."
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  color="red"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((!IsDoctor && activeQuestion == 18)
              ) ? (
                <TextField
                  fullWidth
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="توضیح دیگر"
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  color="red"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((IsDoctor && activeQuestion == 6)
              ) ? (
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="فقط عدد را وارد کنید."
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((IsDoctor && activeQuestion == 7)
              ) ? (
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  type="number"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="فقط عدد را وارد کنید."
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              {((IsDoctor && activeQuestion == 15)
              ) ? (
                <TextField
                  multiline
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleInputChange}
                  dir="rtl"
                  InputLabelProps={{
                    dir: "rtl",
                  }}
                  placeholder="توضیح دیگر"
                  value={inputValue[activeQuestion] || ""}
                  defaultValue=""
                  className="textbox-other"
                  color="red"
                  style={{ marginBottom: "10px" }}
                />
              ) : (
                ""
              )}

              <div className="button-group row font-custom"
                   style={
                    activeQuestion === 0
                      ? { flexWrap: "nowrap" } 
                      : { flexWrap: "wrap" } 
                   }
              >
                <div className="col">
                  <button
                    type="button"
                    // disabled={activeQuestion !== totalQuestions-1 && selectedAnswers[activeQuestion] === null}
                    disabled={
                      (questions[activeQuestion]?.hasOnlyTextField && inputValue[activeQuestion]?.trim() === "") ||
                      (
                        questions[activeQuestion]?.requiresTextFieldForOption &&
                        selectedAnswers[activeQuestion] === 0 &&
                        inputValue[activeQuestion]?.trim() === ""
                      ) ||
                      (!questions[activeQuestion]?.hasOnlyTextField && selectedAnswers[activeQuestion] === null)
                    }
                    title={
                      (questions[activeQuestion]?.hasOnlyTextField && inputValue[activeQuestion]?.trim() === "") ||
                        (
                          questions[activeQuestion]?.requiresTextFieldForOption &&
                          selectedAnswers[activeQuestion] === 0 &&
                          inputValue[activeQuestion]?.trim() === ""
                        ) ||
                        (!questions[activeQuestion]?.hasOnlyTextField && selectedAnswers[activeQuestion] === null)
                        ? "برای ادامه باید گزینه‌ای انتخاب کنید یا فیلد را پر کنید"
                        : ""
                    }
                    className="button-style bottom-button-hover font-custom"
                    onClick={onClickNext}
                  >
                    {activeQuestion === totalQuestions - 1 ? "پایان" : "بعدی"}
                  </button>
                </div>
                <div className="col">
                  {activeQuestion !== 0 && (
                    <button
                      className="button-style bottom-button-hover font-custom"
                      type="button"
                      onClick={onClickPrevious}
                    >
                      قبلی
                    </button>
                  )}
                </div>
                <div className="col cancel-button-phone">
                  <button
                    className="button-cancel-style bottom-cancel-button-hover font-custom"
                    type="button"
                    onClick={cancelTest}
                  >
                    انصراف
                  </button>
                </div>
              </div>
              <div style={{ marginTop:"1rem" }}>
                <span className="active-question-number">
                  {convertToPersianNumbers(addLeadingZero(activeQuestion+1))}
                </span>
                <span className="total-question-number">
                  /
                  {convertToPersianNumbers(
                    addLeadingZero(questions.length)
                  )}
                </span>
              </div>
            </form>
          </div>
        )}

        {showResult && (
          <div className="resultBox">
            <h1
              className="font-custom text-center text-style"
              style={{ fontSize: "25px" }}
            >
              :نتایج
            </h1>
            <div className="result-doctors">
              <div className="distanceBetweenDoctor">
                {doctorProfile?.length > 0 ? (
                  doctorProfile.map((index) => (
                    <DoctorProfile
                      Id={index?.psychologist_id}
                      name={index?.psychologist_name}
                      Description=""
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychologist_id}
                    />
                  ))
                ) : (
                  <h3 className="pb-4 font-custom" style={{ color: '#55654f' }}>
                    !دکتری یافت نشد
                  </h3>
                )}
              </div>

              {/* {Array.isArray(doctorProfile) && doctorProfile.map((index) => (
                  <DoctorProfile
                    Id={index?.id}
                    name={index?.name}
                    Description={index?.description}
                    Image={index?.image}
                    ProfileType={index?.profile_type}
                    IsPrivate={index?.is_private}
                    Psychiatrist={index?.psychiatrist}
                  />
                ))} */}
              {/* {doctorProfile.map((index) => (
                  <DoctorProfile
                    Id={index?.id}
                    name={index?.name}
                    Description={index?.description}
                    Image={index?.image}
                    ProfileType={index?.profile_type}
                    IsPrivate={index?.is_private}
                    Psychiatrist={index?.psychiatrist}
                  />
                ))} */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecommendationPage;
