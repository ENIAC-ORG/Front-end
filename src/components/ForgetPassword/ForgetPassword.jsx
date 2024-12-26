import react from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { checkmarkCircled } from "react-icons-kit/ionicons/checkmarkCircled";
import { closeCircled } from "react-icons-kit/ionicons/closeCircled";

import lock_icon from "../../assets/password.png";
import email_icon from "../../assets/email.png";
import key_icon from "../../assets/key.png";

import axios from "axios";
import validator from "validator";

import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [fp_code, setvcode] = useState(0);
  const [fp_Email, setfp_Email] = useState("");
  const [check_icon, seticon] = useState({
    checkcolor: "#7a7d7b",
    checkicon: checkmarkCircled,
  });
  const [pass_display, setdisplay] = useState("none");
  const [passwordType, setPasswordType] = useState("password");
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(eyeOff);

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
  const [fp_response, setresponse] = useState({
    token: "",
    verificationcode: -1,
  });

  const CheckVerificationCode = () => {
    seticon(
      fp_code == fp_response.verificationcode
        ? { checkcolor: "#61d769", checkicon: checkmarkCircled }
        : { checkcolor: "red", checkicon: closeCircled }
    );
    setdisplay(fp_code == fp_response.verificationcode ? "grid" : "none");
  };

  async function SendVerificationCode(event) {
    event.preventDefault();
    if (validator.isEmail(fp_Email)) {
      try {
        const response = await axios(
          "http://eniacgroup.ir:8070/accounts/forgot_password/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              email: fp_Email,
            },
          }
        );
        const data = response.data;
        if (response.status === 200 || response.status === 201) {
          const accessToken = response.data.access;
          const refreshToken = response.data.refresh;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setresponse({
            token: data.url,
            verificationcode: data.code,
          });
          console.log(data.code);
          withReactContent(Swal).fire({
            icon: "success",
            title: "!کد تایید صحت با موفقیت ارسال شد",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            confirmButtonText: "باشه",
            confirmButtonColor: "#0a8ca0"
          });
        }
      } catch (error) {
        if (error.response.status === 400) {
          withReactContent(Swal).fire({
            icon: "error",
            title: "!ایمیل وارد شده در سیستم ثبت نشده",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            confirmButtonText: "باشه",
            confirmButtonColor: "#0a8ca0"
          });
        }
      }
    } else {
      if (fp_Email.length == 0) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!وارد کردن ایمیل الزامی است",
          background: "#075662",
          color: "#FFFF",
          width: "26rem",
          height: "18rem",
          confirmButtonText: "باشه",
          confirmButtonColor: "#0a8ca0"
        });
      } else {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!قالب ایمیل وارد شده صحیح نمی باشد",
          background: "#075662",
          color: "#FFFF",
          width: "32rem",
          confirmButtonText: "باشه",
          confirmButtonColor: "#0a8ca0"
        });
      }
    }
  }
  async function SubmitNewPass(event) {
    event.preventDefault();
    const password = document.getElementById("pass").value;
    const passwordConfirm = document.getElementById("rpass").value;
    if (
      (password.length === 0) |
      (passwordConfirm.length === 0) |
      (password.length < 8) |
      (password != passwordConfirm)
    ) {
      withReactContent(Swal).fire({
        icon: "error",
        title: "!درستی و تطابق رمز عبور را چک کنید",
        background: "#075662",
        color: "#FFFF",
        width: "32rem",
        confirmButtonText: "باشه",
        confirmButtonColor: "#0a8ca0"
      });
    } else {
      const response = await axios(fp_response.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          new_password: password,
          confirm_password: passwordConfirm,
          verification_code: fp_response.verificationcode,
        },
      });
      if (response.status === 400) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!عملیات تغییر رمز عبور موفق نبود، لطفا دوباره تلاش کنید",
          background: "#075662",
          color: "#FFFF",
          width: "32rem",
          confirmButtonText: "باشه",
          confirmButtonColor: "#0a8ca0"
        });
      } else {
        navigate("/Signup");
      }
    }
  }
  return (
    <>
      <body className={styles.fp_bd}>
        <div className={styles.fp_hello}>
          <div className={styles.fp_wrapper}>
            <div className={styles.fp_header}>
              <div className={styles.fp_title}>فراموشی رمز عبور</div>
            </div>
            <div className={styles.fp_form_details}>
              <form action="#" className={styles.login}>
                <div className={styles.fp_field}>
                  <input
                    onChange={(event) => setfp_Email(event.target.value)}
                    type="text"
                    placeholder="ایمیل"
                    style={{
                      backgroundImage: `url(${email_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "40px",
                      backgroundPosition: "right",
                    }}
                  />
                </div>
                <div className={styles.fp_pass_link}>
                  <a onClick={SendVerificationCode}>دریافت کد تایید هویت</a>
                </div>
                <div className={styles.fp_field}>
                  <input
                    onChange={(event) => setvcode(event.target.value)}
                    type={"text"}
                    placeholder="کد صحت "
                    style={{
                      backgroundImage: `url(${key_icon})`,
                      backgroundRepeat: "no-repeat",
                      paddingRight: "40px",
                      backgroundPosition: "right",
                    }}
                  />
                  <span
                    className={styles.fp_checkmark}
                    onClick={CheckVerificationCode}
                    style={{ color: check_icon.checkcolor }}
                  >
                    <Icon icon={check_icon.checkicon} size={23} />
                  </span>
                </div>
                <div
                  className={styles.hidden}
                  style={{ display: pass_display }}
                >
                  <div className={styles.fp_field}>
                    <input
                      id="pass"
                      className={styles.fp_pass}
                      type={passwordType}
                      placeholder="رمز عبور جدید"
                      style={{
                        backgroundImage: `url(${lock_icon})`,
                        backgroundRepeat: "no-repeat",
                        paddingRight: "40px",
                        backgroundPosition: "right",
                      }}
                    />
                    <span
                      className={styles.fp_eye}
                      onClick={handlePasswordToggle}
                    >
                      <Icon icon={passwordIcon} size={23} />
                    </span>
                  </div>
                  <div className={styles.fp_field}>
                    <input
                      id="rpass"
                      className={styles.fp_repeatpass}
                      type={repeatPasswordType}
                      placeholder="تکرار رمز عبور جدید"
                      style={{
                        backgroundImage: `url(${lock_icon})`,
                        backgroundRepeat: "no-repeat",
                        paddingRight: "40px",
                        backgroundPosition: "right",
                      }}
                    />
                    <span
                      className={styles.fp_eye}
                      onClick={handleRepeatPasswordToggle}
                    >
                      <Icon icon={repeatPasswordIcon} size={23} />
                    </span>
                  </div>
                  <div className={styles.fp_field}>
                    <div className={styles.fp_btn}>
                      <div className={styles.fp_btn_layer}></div>
                      <input
                        type="submit"
                        value="ثبت"
                        onClick={SubmitNewPass}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default ForgetPassword;
