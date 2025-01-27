import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorPage.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import DoctorProfile from "../DoctorsList/DoctorProfile";
import { useLocation } from "react-router-dom";
import ReservationTable from "./ReservationTable.jsx";

const DoctorPage = () => {
  const location = useLocation();
  const doctorId = location.state;

  const [doctorProfile, setDoctorProfile] = useState([]);
  const [username, setName] = useState([]);
  async function GetUserInfo() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        "https://eniacgroup.ir/backend/accounts/get_user/",
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
        setName(data.firstname + " " + data.lastname);
      }
    } catch (error) { }
  }

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      GetUserInfo();
      try {
        const response1 = await axios.get(
          `https://eniacgroup.ir/backend/profile/doctors/`
        );
        if (response1.status == 200 || response1.status == 201) {
          for (let i = 0; i < response1.data.length; i++) {
            if (response1.data[i].name == username) {
              setDoctorProfile(response1.data[i]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };
    fetchDoctorProfile();
  });

  const [Reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response1 = await axios(
          "https://eniacgroup.ir/backend/DoctorPanel/NextWeekReservations/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response1);
        setReservations(response1.data.reservations_next_seven_days);
        console.log(Reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [doctorId]);

  return (
    <>
      <NavBar_SideBar />
      <br />
      <div className="all">

        <div className="">
          <div
            className="rounded team-item"
            style={{
              fontFamily: "Ios15Medium",
              width: "298.668px",
              float: "right",
            }}
          >
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <div className="team-content">
              <div className="team-img-icon">
                <div className="team-img rounded-circle">
                  <img
                    src={doctorProfile?.image}
                    className="img-fluid w-100 rounded-circle"
                    alt={`${doctorProfile?.name}'s Image`}
                  />
                </div>
                <div className="team-name text-center py-3">
                  <h4
                    className=""
                    style={{ color: "gray", fontFamily: "Ios15Medium" }}
                  >
                    {doctorProfile?.name}
                  </h4>
                  <p
                    className="m-0"
                    style={{ fontFamily: "Ios15Medium", color: "gray" }}
                  >
                    {doctorProfile?.profile_type}
                  </p>
                  <p
                    className="m-0"
                    style={{ fontFamily: "Ios15Medium", color: "gray" }}
                  >
                    {doctorProfile?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="containerTable">
          <h1 className="title-style">
            نوبت های رزرو شده
          </h1>
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                خلاصه جلسه
              </div>
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                پرونده پزشکی بیمار
              </div>
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                لینک جلسه مجازی
              </div>
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                نوع مراجعه
              </div>
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                تاریخ و ساعت
              </div>
              <div className="col col-1" style={{ fontFamily: "Ios15Medium" }}>
                نام بیمار
              </div>
            </li>

            {Reservations.map((index) => (
              <ReservationTable
                PatiantId={index?.pationt}
                PatiantName={index?.patient_full_name}
                Day={index?.day}
                MyDate={index?.date}
                time={index?.time}
                type={index?.type}
                MeetingLink={index?.MeetingLink}
                ReservationId={index?.id}
              />
            ))}
          </ul>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default DoctorPage;
