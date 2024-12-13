import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsKeyFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./User_Panel.css";

function ChangePassword({ p_pages }) {
  const navigate = useNavigate();
  const [oldpasswordType, setoldPasswordType] = useState("password");
  const [passwordType, setPasswordType] = useState("password");
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [oldpasswordIcon, setoldPasswordIcon] = useState(eyeOff);
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(eyeOff);

  const [sub_1, set_Sub1] = useState(true);
  const [sub_2, set_Sub2] = useState(true);
  const [sub_3, set_Sub3] = useState(true);
  const [sub_4, set_Sub4] = useState(true);
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
  const handleoldPasswordToggle = () => {
    setoldPasswordType(oldpasswordType === "password" ? "text" : "password");
    setoldPasswordIcon(oldpasswordIcon === eye ? eyeOff : eye);
  };

  const CheckNotEmpty = (event, setsub) => {
    if (validator.isEmpty(event.target.value) | (event.target.value.length < 8))
      setsub(false);
    else setsub(true);
  };
  const CheckNotNumeric = (event, setsub) => {
    if (validator.isNumeric(event.target.value) & validator.isAlphanumeric(event.target.value))
      setsub(false);
    else setsub(true);
  };

  async function SendChangePassword(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const o_password = document.getElementById("o_password").value;
    const n_password = document.getElementById("n_password").value;
    const nr_password = document.getElementById("n_repeat_password").value;
    if (!(sub_1 & sub_2 & sub_3 & sub_4))
      toast.warn( "!فیلد ها را به دقت پر کنید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else if (n_password != nr_password)
      toast.error( "!رمز  جدید و تکرار مطابقت ندارند", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    else {
      try {
        const response = await axios(
          "http://eniacgroup.ir:8070/accounts/change_password/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            data: {
              old_password: o_password,
              new_password: n_password,
              new_password1: nr_password,
            },
          }
        );
        if (response.status == 200)
          toast.success( "!رمز عبور با موفقیت عوض شد", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      } catch (error) {
        const data = error.response.data;
        if (error.response.status == 400) {
          if (data.error == "Invalid current password.")
            withReactContent(Swal).fire({
              icon: "error",
              title: "!رمز عبور قدیمی به درستی وارد نشده",
              html: "در صورت فراموشی، نیاز به بازبینی رمزعبور دارید؟",
              background: "#075662",
              color: "#FFFF",
              width: "35rem",

              backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
              confirmButtonText: "بله",
              cancelButtonText: "خیر",
              confirmButtonColor: '#0a8ca0',
              cancelButtonColor: '#0a8ca0',
              showConfirmButton: true,
              showCancelButton: true,
              preConfirm: () => {
                navigate("/ForgetPassword");
              },

          });
          if (data.new_password[0] == "This password is too common.")
            toast.error(  "!رمز عبور جدید رایج هست", {
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
    }
  }
  return (
    <div className="panel" style={{ direction: "rtl", width: '770px' }}>
      <div
        className="panel-body bio-graph-info"
        style={p_pages == 3 ? { display: "inline-block" } : { display: "none" }}
      >
        <h1 style={{ marginBottom: "50px" }}>تغییر رمز عبور</h1>
        <div className="row">
          <div className="bio-row">
            <p>
              <BsKeyFill
                style={{
                  color: "#489182",
                  width: "30px",
                  height: "30px",
                }}
              />
              <span style={{ width: '160px' }}>رمز عبور قبلی :</span>
              <input
              tabIndex="1"
                type={oldpasswordType}
                id="o_password"
                className="profile_input"
                onChange={(event) => {
                  CheckNotEmpty(event, set_Sub1);
                }}
              />
              <span onClick={handleoldPasswordToggle} style={{ width: '50px' }}>
                <Icon icon={oldpasswordIcon} size={23} />
              </span>
              <div
                className="profile_sub_error"
                style={sub_1 ? { display: "none" } : { marginRight: "260px" }}
              >
                رمز عبور باید حداقل 8 کاراکتر داشته باشد!
              </div>
            </p>
          </div>
          <div className="bio-row">
            <p>
              <BsKeyFill
                style={{
                  color: "#489182",
                  width: "30px",
                  height: "30px",
                }}
              />
              <span style={{ width: '160px' }}>رمز عبور جدید :</span>
              <input
              tabIndex="2"
                type={passwordType}
                id="n_password"
                className="profile_input"
                onChange={(event) => {
                  CheckNotEmpty(event, set_Sub2);
                  CheckNotNumeric(event, set_Sub4);
                }}
              />
              <span onClick={handlePasswordToggle} style={{ width: '50px' }}>
                <Icon icon={passwordIcon} size={23} />
              </span>
              <div
                className="profile_sub_error"
                style={(sub_4 & sub_2) ? { display: "none" } : { marginRight: "260px" }}
              >
                رمز عبور باید از حداقل 8 کاراکتر و عدد ساخته شده باشد!
              </div>
            </p>
          </div>
          <div className="bio-row">
            <p>
              <BsKeyFill
                style={{
                  color: "#489182",
                  width: "30px",
                  height: "30px",
                }}
              />
              <span style={{ width: '160px' }}>تکرار رمز عبور جدید :</span>
              <input
              tabIndex="3"
                type={repeatPasswordType}
                id="n_repeat_password"
                className="profile_input"
                onChange={(event) => {
                  CheckNotEmpty(event, set_Sub3);
                }}
              />
              <span onClick={handleRepeatPasswordToggle} style={{ width: '50px' }}>
                <Icon icon={repeatPasswordIcon} size={23} />
              </span>
              <div
                className="profile_sub_error"
                style={sub_3 ? { display: "none" } : { marginRight: "260px" }}
              >
                رمز عبور باید حداقل 8 کاراکتر داشته باشد!
              </div>

            </p>
          </div>
          <button
            className="button-8"
            role="button"
            style={{
              width: "25%",
              marginRight: "38%",
              marginTop: "3%",
            }}
            onClick={SendChangePassword}
          >
            تغییر رمز
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
//ftm15963