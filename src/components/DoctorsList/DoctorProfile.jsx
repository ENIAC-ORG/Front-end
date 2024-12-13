import React from "react";
import "./DoctorsList.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CompleteInfoModal from "../CompleteInfoModal/Complete_Info.jsx";
import { ToastContainer } from "react-toastify";
import DoctorPage from "../SeeingDoctorReservation/DoctorPage.jsx";
import RatingInfoModal from "../RatingDoctor/Rating&InfoModal.jsx";

const DoctorProfile = ({
  Id,
  name,
  Description,
  Image,
  ProfileType,
  IsPrivate,
  Psychiatrist,
}) => {
  {
    console.log(name);
    console.log(Image);
    console.log(Id);

    const navigate = useNavigate();
    const load = () => {
      console.log("++");
      console.log(name);
      console.log(Image);
      console.log(Id);
    };

    async function GetUserInfo(event) {
      const [info, setinfo] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        BirthDay: "",
        Gender: "",
        PhoneNumber: ""
      });

      event.preventDefault();
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios(
          "http://eniacgroup.ir:8070//accounts/get_user/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Bearer <access token >
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 200) {
          const data = response.data.user;
          setinfo({
            FirstName: data.firstname == null ? "--" : data.firstname,
            LastName: data.lastname == null ? "--" : data.lastname,
            Email: data.email,
            BirthDay:
              data.date_of_birth == null ? "00-00-00" : data.date_of_birth,
            Gender: data.gender == null ? "--" : data.gender,
            PhoneNumber: data.phone_number == null ? "--" : data.phone_number,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 403) {
          withReactContent(Swal).fire({
            icon: "warning",
            html: "<div dir='rtl'>برای مشاهدۀ اطلاعات شخصی ورود به اکانت خود الزامی است!</div>",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            backdrop: `
        rgba(84, 75, 87.0.9)
        left top
        no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: '#0a8ca0',
            showConfirmButton: true,
            preConfirm: () => {
              navigate("/signup");
            },
        });
        }
      }
    }

    async function GetUserInfo2(event) {
      event.preventDefault();
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken == null)
        withReactContent(Swal)
          .fire({
            icon: "warning",

            html: "<div dir='rtl'>!برای رزرو وقت ورود به اکانت خود الزامی است!</div>",
            background: "#075662",
            color: "#FFFF",
            width: "35rem",
            backdrop: `
          rgba(84, 75, 87.0.9)
          left top
          no-repeat`,
            showDenyButton: true,
            confirmButtonText: "ورود به سایت",
            denyButtonText: "صفحه اصلی",
            denyButtonColor: "#075662",
            confirmButtonColor: "#0a8ca0"
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/Signup");
            } else if (result.isDenied) {
              navigate("/Home");
            }
          });
      else {
        try {
          const response = await axios(
            "http://eniacgroup.ir:8070//accounts/get_user/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`, // Bearer <access token >
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 200) {
            console.log(response);
            const data = response.data.user;
            const check =
              data.firstname == null
                ? false
                : data.lastname == null
                  ? false
                  : data.date_of_birth == null
                    ? false
                    : data.gender == null
                      ? false
                      : data.phone_number == null
                        ? false
                        : true;
            if (check) {
            }
            else {
              Swal.fire({
                icon: "warning",
                html: "<div dir='rtl'>اطلاعات حساب شما ناقص است!</div>",
                background: "#473a67",
                color: "#b4b3b3",
                confirmButtonText: "ویرایش اطلاعات",
              });
            }
          }
        } catch (error) {
          if (error.response.status == 403) {
            withReactContent(Swal)
              .fire({
                icon: "warning",
                html: "<div dir='rtl'>!برای رزرو وقت ورود به  اکانت خود الزامی است!</div>",
                background: "#075662",
                color: "#FFFF",
                width: "35rem",
                backdrop: `
                rgba(84, 75, 87.0.9)
                left top
                no-repeat`,
                showDenyButton: true,
                confirmButtonText: "ورود به سایت",
                denyButtonText: "صفحه اصلی",
                denyButtonColor: "#0a8ca0",
                confirmButtonColor: "#0a8ca0"
              })
              .then((result) => {
                if (result.isConfirmed) {
                  navigate("/Signup");
                } else if (result.isDenied) {
                  navigate("/Home");
                }
              });
          }
        }
      }
    }

    const CheckInfo = () => {
      if (
        firstname.length === 0 ||
        lastname.length === 0 ||
        phonenumber.length === 0 ||
        genderOption === "" ||
        dateOfBirth === ""
      ) {
        // console.log("has empty");
        setShow(true);
        // console.log(firstname, lastname, phonenumber, genderOption, dateOfBirth);
      } else {
        toast.warn("!شما قبلا اطلاعات خود را ثبت کرده اید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShow(true);
        // Swal.fire({
        //   icon: "warning",
        //   title: "!شما قبلا اطلاعات خود را ثبت کرده اید",
        //   background: "#473a67",
        //   color: "#b4b3b3",
        //   width: "26rem",
        //   height: "18rem",
        //   confirmButtonText: "تایید",
        //   customClass: {
        //     container: 'custom-swal-container'
        //   }
        // });
      }
    };

    if (name == null && ProfileType == null) {
      // withReactContent(Swal)
      //     .fire({
      //         icon: "warning",
      //         title: "!مشاوری یافت نشد",
      //         background: "#473a67",
      //         color: "#b4b3b3",
      //         width: "35rem",
      //         backdrop: `
      //             rgba(84, 75, 87.0.9)
      //             left top
      //             no-repeat`})
    } else {
      return (
        <>
        <div
          onLoad={GetUserInfo}
          onClick={GetUserInfo2}
        >
        <RatingInfoModal 
        doctorId={Id}
        name={name}
        Description={Description}
        Image={Image}
        ProfileType={ProfileType}
        IsPrivate={IsPrivate}
        Psychiatrist={Psychiatrist}
        />

        {/* <div
          className="rounded team-item-new"
          style={{ fontFamily: "Ios15Medium", cursor:"pointer" }}
          onLoad={load}
          // onClick={() => setShow(true)}
          // onClick={handleModalClick}
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
          <div className="team-content">
            <div className="team-img-icon">
              <div className="team-img rounded-circle">
                <img
                  src={Image}
                  className="img-fluid w-100 rounded-circle"
                  alt={`${name}'s Image`}
                />
              </div>
              <div className="team-name text-center py-3">
                <h4
                  className="m-0"
                  style={{ color: "gray", fontFamily: "Ios15Medium" }}
                >
                  {name}
                </h4>
                <p
                  className="m-0"
                  style={{ fontFamily: "Ios15Medium", color: "gray" }}
                >
                  {ProfileType}
                </p>
                <p
                  className="m-0"
                  style={{ fontFamily: "Ios15Medium", color: "gray" }}
                >
                  {Description}
                </p>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        </>
      );
    }
  }
};

export default DoctorProfile;
