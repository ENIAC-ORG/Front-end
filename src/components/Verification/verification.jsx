import react from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import key_icon from "../../assets/key.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./verification.css";
import DoctorInfoModal from "../DoctorInfoModal/DoctorInfoModal";

const Verification = () => {
  const navigate = useNavigate();
  console.log("VerificationPage rendered");
  const location = useLocation();
  const initialState = location.state || {};
  console.log(initialState);
  const [email, setEmail] = useState(initialState.email || "");
  const [code, setCode] = useState(initialState.code || "");
  const [url, setUrl] = useState(initialState.url || "");
  console.log(code);
  const [fp_code, setvcode] = useState(0);
  const [showmodal,setShowModal]=useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const handleWrongCode = () => {
    setWrongAttempts(wrongAttempts + 1);
  };
  const setTozero = () => {
    setWrongAttempts(0);
  };
  const changeCode = (newCode) => {
    setCode(newCode);
  };
  const [errorMessage, setErrorMessage] = useState({
    codeError: "",
  });

  async function resendCode(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "http://eniacgroup.ir:8070/accounts/activation_resend/",
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
      const data = response.data;
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        changeCode(response.data.code);
        setTozero();
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  }

  async function handleVerification(event) {
    event.preventDefault();
    const errors = [
      {
        codeError: "",
      },
    ];
    const code_verify = document.querySelector(".ver_code").value;
    if (code === code_verify) {
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NDYyMzQzLCJpYXQiOjE3MzM1OTgzNDMsImp0aSI6IjNhZWVhYWNiNGQ0YTQxOWRhZWI0YzQ2YTk2YjQzYjUxIiwidXNlcl9pZCI6N30.nreitTrXPRwxQxIvhfekPSAmtzeTslPx-iiieHOo-3M/"

        const response = await axios(url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              verification_code: code_verify,
            },
          }
        );
        const data = response.data;
        if (response.status === 200 || response.status === 201) {
          console.log("you can login now");
          withReactContent(Swal).fire({
            icon: "success",
            title: "!ثبت نام با موفقیت انجام شد",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            confirmButtonText: "تایید",
            confirmButtonColor: "#0a8ca0"
          });
          setShowModal(true);
          const data = {flag:showmodal};
          navigate("/Signup", { state: data });
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error);
        }
      }
    } else {
      errors.codeError = "کد تایید صحیح نمی باشد!";
      console.log("byyyyyyyeeeee");
      handleWrongCode();
      setErrorMessage({
        codeError: errors.codeError,
      });
      if (errors.codeError && wrongAttempts === 3) {
        return;
      }
    }
  }
  return (
    <>
      <body className="pt_bd">
        <div className="pt_hello">
          <div className="pt_wrapper">
            <div className="pt_header">
              <div className="pt_title">تایید حساب کاربری</div>
            </div>
            <div className="form_details">
              <form action="#" className="login">
                <div className="fp_field">
                  <span>لطفا کد تایید ایمیل شده را وارد نمایید.</span>
                </div>
                <div className="fp_field">
                  <input
                    className="ver_code"
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
                </div>
                {errorMessage.codeError && (
                  <div className="error_input">{errorMessage.codeError}</div>
                )}

                {wrongAttempts >= 3 && (
                  <div>
                    <div className="ver_error_input1">
                      به سقف تعداد تلاش ها رسیده اید.
                    </div>
                    <div className="ver_error_input2">
                      <div onClick={resendCode}> ارسال مجدد کد تایید</div>
                    </div>
                  </div>
                )}

                <div className="field btn">
                  <div className="btn_layer"></div>
                  <input
                    type="submit"
                    value="ثبت"
                    onClick={handleVerification}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Verification;
