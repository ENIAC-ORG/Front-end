import react from "react";
import React, { useState } from "react";
import "./LoginSignup.css";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { IsValidEmail } from "./IsValidEmail";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import lock_icon from "../../assets/password.png";
import email_icon from "../../assets/email.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DoctorInfoModal from "../DoctorInfoModal/DoctorInfoModal";
const LoginContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const showmodal=initialState.data;
  const [flag, setflag] = useState(false);
  const [data, setData] = useState({
    email: "",
    code: "",
    url: "",
  });
  const [loginLabelsColor, setLoginLabelsColor] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(eyeOff);
  const [showModal, setShowModal] = useState(false);
  const [hasMedicalInfo, setHasMedicalInfo] = useState(null);



  const [isChecked, setIsChecked] = useState(false);

  const handleChangeBox = async (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  }
  // Function to toggle the modal state
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePasswordToggle = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setPasswordIcon(passwordIcon === eye ? eyeOff : eye);
  };

  const handleRepeatPasswordToggle = () => {
    setRepeatPasswordType(
      repeatPasswordType === "password" ? "text" : "password"
    );
    setRepeatPasswordIcon(repeatPasswordIcon === eye ? eyeOff : eye);
  };

  const handleSliderSignupClick = () => {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".header .login");
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    setRepeatPasswordType("password");
    setRepeatPasswordIcon(eyeOff);
    setPasswordType("password");
    setPasswordIcon(eyeOff);
    resetErrors();
  };

  const handleSliderLoginClick = () => {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".header .login");
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
    setLoginLabelsColor(!loginLabelsColor);
    setRepeatPasswordType("password");
    setRepeatPasswordIcon(eyeOff);
    setPasswordType("password");
    setPasswordIcon(eyeOff);
    resetErrors();
  };

  function handleChange(event) {
    setErrorMessage("");
  }
  const [formData, setFormData] = useState({
    profileName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    profileNameError: "",
    usernameError: "",
    emailError: "",
    passError: "",
    passErrorRep: "",
    genderError: "",
    subjectError: "",
    backError: "",
  });

  async function ResendCode(email) {
    try {
      const response = await axios(
        "http://eniacgroup.ir:8070//accounts/activation_resend/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: email,
          },
        }
      );

      const data = {
        email: email,
        code: response.data.code,
        url: response.data.url,
      };
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        navigate("/Verification", { state: data });

        //console.log("you can login now");
        //navigate("/Signup");
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error);
      }
    }
  }
  async function isDoctor(event) {
    event.preventDefault();
    setflag(true);
  }
  async function isDoctor(event) {
    event.preventDefault();
    setflag(true);
  }
  async function handleLoginEnter(event) {
    event.preventDefault();
    const email = document.querySelector(".email1_input").value;
    const password = document.querySelector(".password1_input").value;
    const errors = [
      {
        emailError: "",
        passError: "",
        backError: "",
      },
    ];

    if (email.trim().length === 0) {
      errors.emailError = "وارد کردن ایمیل الزامی است!";
    }
    if (!IsValidEmail(email) && !errors.emailError) {
      errors.emailError = "قالب ایمیل قابل قبول نیست!";
    }
    if (password.trim().length === 0) {
      errors.passError = "وارد کردن رمز عبور الزامی است!";
    }
    if (password.length < 8 && password) {
      errors.passError = "رمز عبور باید حداقل شامل هشت کاراکتر باشد!";
    }
    if (/^\d+$/.test(password)) {
      errors.passError = "رمز عبور نمی‌تواند تماماً عددی باشد!";
    }

    setErrorMessage({
      profileNameError: errors.profileNameError,
      usernameError: errors.usernameError,
      emailError: errors.emailError,
      passError: errors.passError,
    });
    if (
      errors.profileName ||
      errors.usernameError ||
      errors.emailError ||
      errors.passError
    ) {
      return;
    }
    try {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      const response = await axios("http://eniacgroup.ir:8070//accounts/Login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      const data = response.data;
      console.log("you logined successfully");
      console.log(data);

      //closeLoading();
      if (response.status === 200) {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const role = response.data.user.role;

        // Set tokens in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("LogIn", true);
      } else if (response.status === 201) {
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const role = response.data.user.role;

        // Set tokens in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("LogIn", true);
      }
      withReactContent(Swal).fire({
        icon: "success",
        title: "!با موفقیت وارد شدید",
        background: "#55AD9B",
        color: "#black",
        width: "32rem",
        confirmButtonText: "باشه",
        confirmButtonColor: "#0a8ca0",
        confirmButtonColor: "#0a8ca0",
        preConfirm: () => {
          navigate("/Home");
        },
      });
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error);
        if (
          error.response.data.hasOwnProperty("email") &&
          error.response.data.email.message === "Email does not exist."
        ) {
          errors.emailError = "حساب کاربری ندارید!";

          setErrorMessage({
            ...errorMessage,
            emailError: errors.emailError,
          });
          return;
        }
        if (
          error.response.data.hasOwnProperty("email") &&
          error.response.data.email[0] === "Email does not exist."
        ) {
          errors.emailError = "حساب کاربری ندارید!";

          setErrorMessage({
            ...errorMessage,
            emailError: errors.emailError,
          });
        } else if (
          error.response.data.hasOwnProperty("message") &&
          error.response.data.message[0] === "Incorrect password."
        ) {
          errors.passError = "رمز عبور اشتباه است!";
          setErrorMessage({
            ...errorMessage,
            passError: errors.passError,
          });
        } else if (
          error.response.data.hasOwnProperty("message") &&
          error.response.data.message[0] === "User is not verified."
        ) {
          errors.emailError = "حساب کاربری شما تایید نشده است!";
          ResendCode(email);
          setErrorMessage({
            ...errorMessage,
            emailError: errors.emailError,
          });
        }
      } else {
        // Other error occurred
        console.log(error);
        setBanner(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  }

  async function handleSignupEnter(event) {
    event.preventDefault();
    const email = document.querySelector(".email2_input").value;
    const password = document.querySelector(".password2_input").value;
    const passwordConfirm = document.querySelector(".passwordConf_input").value;

    const errors = [
      {
        profileNameError: "",
        usernameError: "",
        emailError: "",
        passError: "",
        passErrorRep: "",
        backError: "",
      },
    ];

    if (email.trim().length === 0) {
      errors.emailError = "وارد کردن ایمیل الزامی است!";
    }
    if (!IsValidEmail(email) && !errors.emailError) {
      errors.emailError = "قالب ایمیل قابل قبول نیست!";
    }
    if (password.trim().length === 0) {
      errors.passError = "وارد کردن رمز عبور الزامی است!";
    }
    if (password.length < 8 && password) {
      errors.passError = "رمز عبور باید حداقل شامل هشت کاراکتر باشد!";
    }
    if (/^\d+$/.test(password)) {
      errors.passError = "رمز عبور نمی‌تواند تماماً عددی باشد!";
    }
    if (passwordConfirm.trim().length === 0) {
      errors.passErrorRep = "وارد کردن تکرار رمز عبور الزامی است!";
    }
    if (
      password !== passwordConfirm &&
      !errors.passError &&
      !errors.passErrorRep
    ) {
      errors.passErrorRep = "رمز عبور با تکرار یکسان نیست!";
    }

    setErrorMessage({
      profileNameError: errors.profileNameError,
      usernameError: errors.usernameError,
      emailError: errors.emailError,
      passError: errors.passError,
      passErrorRep: errors.passErrorRep,
    });
    if (
      errors.profileName ||
      errors.usernameError ||
      errors.emailError ||
      errors.passError ||
      errors.passErrorRep
    ) {
      return;
    }

    try {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";

   


      const response = await axios(
        "http://46.249.100.141:8070//accounts/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: email,
            password1: password,
            password2: passwordConfirm,
            is_doctor: isChecked,
          },
        }
      );

      const data = response.data.url;
      console.log(data)
      //console.log('you logined successfully');

      //closeLoading();
      if (response.status === 200) {
        //const accessToken = response.data.access;
        //const refreshToken = response.data.refresh;
        console.log("you signed in successfully");


        // Set tokens in local storage
        //localStorage.setItem("accessToken", accessToken);
        //localStorage.setItem('refreshToken', refreshToken);
      } else if (response.status === 201) {
        const accessToken = response.data.access;
        //const refreshToken = response.data.refresh;
        console.log(response);
        console.log("you signed in successfully");
        //  { state: data }
        const data = {
          email: email,
          code: response.data.code,
          url: response.data.url,
        };
        //setShowModal(!showModal);
        //setShowModal(!showModal);
        navigate("/verification", { state: data });


        // Set tokens in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessToken", accessToken);
        //localStorage.setItem('refreshToken', refreshToken);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error);
        if (
          error.response.data.hasOwnProperty("email") &&
          error.response.data.email.message === "Email does not exist."
        ) {
          errors.emailError = "حساب کاربری ندارید!";

          setErrorMessage({
            ...errorMessage,
            emailError: errors.emailError,
          });
        } else if (
          error.response.data.hasOwnProperty("email") &&
          error.response.data.email[0] ===
            "user with this email already exists."
        ) {
          errors.emailError = "قبلا ثبت نام کرده اید!";

          setErrorMessage({
            ...errorMessage,
            emailError: errors.emailError,
          });
        } else if (
          error.response.data.hasOwnProperty("message") &&
          error.response.data.message[0] === "Incorrect password."
        ) {
          errors.passError = "رمز عبور اشتباه است!";
          setErrorMessage({
            ...errorMessage,
            passError: errors.passError,
          });
        } else if (
          error.response.data.hasOwnProperty("password1") &&
          error.response.data.password1[0] === "This password is too common."
        ) {
          errors.passError = "پسورد وارد شده رایج است!";
          setErrorMessage({
            ...errorMessage,
            passError: errors.passError,
          });
        } else {
          console.log(error);
        }
      } else {
        // Other error occurred
        console.log(error);
        setBanner(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  }

  const resetErrors = () => {
    setErrorMessage({
      profileNameError: "",
      usernameError: "",
      emailError: "",
      passError: "",
      passErrorRep: "",
      genderError: "",
      subjectError: "",
      backError: "",
    });
  };

  return (
    <>
      <div className="hello">
        <body className="bd">
          <div className="hello">
            <div className="wrapper">
              <div className="header">
                <div className="title login">ورود</div>
                <div className="title signup">ثبت نام</div>
              </div>

              <div className="form_container">
                <div className="slider_controls">
                  <input
                    type="radio"
                    name="slide"
                    id="login"
                    defaultChecked
                    style={{ display: "none" }}
                  />
                  <input
                    type="radio"
                    name="slide"
                    id="signup"
                    style={{ display: "none" }}
                  />

                  <label
                    htmlFor="login"
                    className="slide login"
                    onClick={handleSliderLoginClick}
                  >
                    ورود
                  </label>
                  <label
                    htmlFor="signup"
                    className="slide signup"
                    onClick={handleSliderSignupClick}
                  >
                    ثبت نام
                  </label>
                  
                  <div className="slider_tab"></div>
                </div>
                <div className="form_details">
                  <form action="#" className="login">
                    <pre></pre>
                    <div className="field">
                      <input
                        className="email1_input"
                        type="text"
                        name="email"
                        placeholder="ایمیل"
                        error={errorMessage.emailError}
                        onChange={handleChange}
                        style={{
                          backgroundImage: `url(${email_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "40px",
                          backgroundPosition: "right",
                        }}
                      />
                    </div>
                    {errorMessage.emailError && (
                      <div className="error_input">
                        {errorMessage.emailError}
                      </div>
                    )}
                    <div className="field">
                      <input
                        className="password1_input"
                        type={passwordType}
                        placeholder="رمز عبور"
                        onChange={handleChange}
                        style={{
                          backgroundImage: `url(${lock_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "40px",
                          backgroundPosition: "right",
                        }}
                      />
                      <span
                        className="toggle-icon"
                        onClick={handlePasswordToggle}
                      >
                        <Icon icon={passwordIcon} size={23} />
                      </span>
                    </div>
                    {errorMessage.passError && (
                      <div className="error_input">
                        {errorMessage.passError}
                      </div>
                    )}

                    <div className="pass_link">
                      <a href="/ForgetPassword"> فراموشی رمز عبور</a>
                    </div>
                    <div className="field btn">
                      <div className="btn_layer"></div>
                      <input
                        type="submit"
                        value="ورود"
                        onClick={handleLoginEnter}
                      />
                    </div>
                    {errorMessage.backError && (
                      <div className="error_input2" onChange={handleChange}>
                        {errorMessage.backError}
                      </div>
                    )}
                    <div className="signup_link">
                      {" "}
                      <a href="#" onClick={(e) => navigate("/Home")}>
                        {" "}
                        صفحه اصلی
                      </a>
                    </div>
                  </form>
                  {/*signup form*/}
                  <form action="#" className="signup">
                    <pre></pre>
                    {/*<div className="field">
                    <input type="text" placeholder='Name'/>
                  </div>*/}
                    <div className="field">
                      <input
                        className="email2_input"
                        type="text"
                        name="email"
                        placeholder="ایمیل"
                        onChange={handleChange}
                        error={errorMessage.emailError}
                        style={{
                          backgroundImage: `url(${email_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "40px",
                          backgroundPosition: "right",
                        }}
                      />
                    </div>
                    {errorMessage.emailError && (
                      <div className="error_input">
                        {errorMessage.emailError}
                      </div>
                    )}
                    <div className="field">
                      <input
                        className="password2_input"
                        type={passwordType}
                        placeholder="رمز عبور"
                        onChange={handleChange}
                        style={{
                          backgroundImage: `url(${lock_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "40px",
                          backgroundPosition: "right",
                        }}
                      />
                      <span
                        className="toggle-icon"
                        onClick={handlePasswordToggle}
                      >
                        <Icon icon={passwordIcon} size={23} />
                      </span>
                    </div>
                    {errorMessage.passError && (
                      <div className="error_input">
                        {errorMessage.passError}
                      </div>
                    )}
                    <div className="field">
                      <input
                        className="passwordConf_input"
                        type={repeatPasswordType}
                        placeholder="تکرار رمز عبور"
                        onChange={handleChange}
                        style={{
                          backgroundImage: `url(${lock_icon})`,
                          backgroundRepeat: "no-repeat",
                          paddingRight: "40px",
                          backgroundPosition: "right",
                        }}
                      />

                      <span
                        className="toggle-icon"
                        onClick={handleRepeatPasswordToggle}
                      >
                        <Icon icon={repeatPasswordIcon} size={23} />
                      </span>
                    </div>
                    {errorMessage.passErrorRep && (
                      <div className="error_input">
                        {errorMessage.passErrorRep}
                      </div>
                    )}
                    <div className="is_doctor_ckeck">
                      <input
                        className="checkbox checkbox-circle"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={isChecked}
        onChange={handleChangeBox}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        ثبت نام کادر انیاک
                      </label>
                    </div>

                    <div className="field btn">
                      <div className="btn_layer"></div>
                      <input
                        type="submit"
                        value="ثبت نام"
                        onClick={handleSignupEnter}
                      />
                    </div>
                    <div className="signup_link">
                      {" "}
                      <a href="#" onClick={(e) => navigate("/Home")}>
                        {" "}
                        صفحه اصلی
                      </a>
                    </div>
                  </form>
                  <DoctorInfoModal showModal={showmodal} />
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default LoginContainer;
