import React from "react";
import "./DoctorsList.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DoctorProfile.jsx";
import DoctorProfile from "./DoctorProfile.jsx";
import Footer from "../Footer/Footer.jsx";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorsList = () => {
  const navigate = useNavigate();
  async function GetUserInfo(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        "http://127.0.0.1:8000//accounts/get_user/",
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
      if (error.response.status == 403) {
        withReactContent(Swal).fire({
          icon: "error",

          html: "<div dir='rtl'>برای مشاهده اطلاعات شخصی ورود به اکانت خود الزامی است!</div>",

          background: "#473a67",
          color: "#b4b3b3",
          width: "35rem",
          backdrop: `
              rgba(84, 75, 87.0.9)
              left top
              no-repeat`,
          confirmButtonText: "تایید",
          preConfirm: () => {
            navigate("/Signup");
          },
        });
      }
    }
  }

  const [doctorProfile, setDoctorProfile] = useState([]);
  useEffect(() => {
    //  تابع برای دریافت اطلاعات پروفایل دکترها از بک‌اند
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000//profile/doctors/"
        );
        setDoctorProfile(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  const [doctorProfileFardi, setDoctorProfileFardi] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileFardi = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000//profile/doctors/typed/",
          {
            params: {
              profile_type: "فردی",
            },
          }
        );
        setDoctorProfileFardi(response1.data);
        // console.log(response1);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileFardi();
  }, []);

  const [doctorProfileBaby, setDoctorProfileBaby] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileBaby = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000//profile/doctors/typed/",
          {
            params: {
              profile_type: "کودک",
            },
          }
        );
        setDoctorProfileBaby(response1.data);
        // console.log(response1);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileBaby();
  }, []);

  const [doctorProfileFamily, setDoctorProfileFamily] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileFamily = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000//profile/doctors/typed/",
          {
            params: {
              profile_type: "زوج",
            },
          }
        );
        setDoctorProfileFamily(response1.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileFamily();
  }, []);

  const [doctorProfileEdu, setDoctorProfileEdu] = useState([]);
  useEffect(() => {
    const fetchDoctorProfileEdu = async () => {
      try {
        const response1 = await axios.get(
          "http://127.0.0.1:8000//profile/doctors/typed/",
          {
            params: {
              profile_type: "نوجوان",
            },
          }
        );
        setDoctorProfileEdu(response1.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfileEdu();
  }, []);

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <>
      <NavBar_SideBar />
      <div
        id="root"
        className="purple-block-up"
        style={{ background: "#e0f5ff" }}
      >
        <div
          className="container-fluid my-1 team"
          style={{ paddingTop: "0rem", paddingBottom: "3rem" }}
        >
          <html>
            <head>
              <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
                rel="stylesheet"
              />
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
                rel="stylesheet"
              />
              <link href="lib/animate/animate.min.css" rel="stylesheet" />
              <link href="./owl.carousel.min.css" rel="stylesheet" />
            </head>
          </html>

          <div className="container-fluid py-0 my-0 team">
            <div className="container py-0">
              <div
                className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
                data-wow-delay=".3s"
                style={{ maxWidth: "600px" }}
              >
                <h1 style={{ fontFamily: "Ios15Medium" }}>لیست مشاورها</h1>
              </div>
              {/* { <br /> } */}
              <div
                className="owl-carousel team-carousel wow fadeIn owl-loaded owl-drag"
                data-wow-delay=".5s"
                style={{ visibility: "visible" }}
              >
                <Slider {...settings}>
                  {doctorProfile.map((index) => (
                    <DoctorProfile
                      Id={index?.psychiatrist}
                      name={index?.name}
                      Description={index?.description}
                      Image={index?.image}
                      ProfileType={index?.profile_type}
                      IsPrivate={index?.is_private}
                      Psychiatrist={index?.psychiatrist}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scallop-up-new"></div>
      <div id="Individual" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه فردی
        </h1>
        <div className="distanceBetween2">
          {doctorProfileFardi.map((index) => (
            <DoctorProfile
              Id={index?.id}
              name={index?.name}
              Description={index?.description}
              Image={index?.image}
              ProfileType={index?.profile_type}
              IsPrivate={index?.is_private}
              Psychiatrist={index?.psychiatrist}
            />
          ))}
        </div>
      </div>
      <div className="scallop-down-new"></div>

      <div id="Baby" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه کودک
        </h1>
        <div className="distanceBetween2">
          {doctorProfileBaby.map((index) => (
            <DoctorProfile
              Id={index?.id}
              name={index?.name}
              Description={index?.description}
              Image={index?.image}
              ProfileType={index?.profile_type}
              IsPrivate={index?.is_private}
              Psychiatrist={index?.psychiatrist}
            />
          ))}
        </div>
      </div>

      <div className="scallop-up-new"></div>
      <div id="edu" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه تحصیلی
        </h1>
        <div className="distanceBetween2">
          {doctorProfileEdu.map((index) => (
            <DoctorProfile
              Id={index?.id}
              name={index?.name}
              Description={index?.description}
              Image={index?.image}
              ProfileType={index?.profile_type}
              IsPrivate={index?.is_private}
              Psychiatrist={index?.psychiatrist}
            />
          ))}
        </div>
      </div>
      <div className="scallop-down-new"></div>

      <div id="Family" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه خانواده
        </h1>
        <div className="distanceBetween2">
          {doctorProfileFamily.map((index) => (
            <DoctorProfile
              Id={index?.id}
              name={index?.name}
              Description={index?.description}
              Image={index?.image}
              ProfileType={index?.profile_type}
              IsPrivate={index?.is_private}
              Psychiatrist={index?.psychiatrist}
            />
          ))}
        </div>
      </div>

      <div className="scallop-up-new"></div>
      <div id="migration" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه کوچینگ
        </h1>
        <div className="distanceBetween2">
          {/* {doctorProfileFardi.map((index) => (
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
      <div className="scallop-down-new"></div>

      <div id="psychiatry" className="color-block">
        <h1
          className="text-center mx-auto pb-2 wow fadeIn Doctor_List_title"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px", fontFamily: "Ios15Medium" }}
        >
          حوزه روان پزشکی
        </h1>
        <div className="distanceBetween2">
          {/* {doctorProfileFardi.map((index) => (
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

      <Footer />
    </>
  );
};

export default DoctorsList;
