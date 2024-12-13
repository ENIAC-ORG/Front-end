import React from "react";
import "./PatientsList.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./PatientProfile.jsx";
import Patient_Profile from "./PatientProfile.jsx";
import Footer from "../Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar.jsx";

const PatientsList = () => {
  const navigate = useNavigate();

  const [Patients_data, setPatientsData] = useState([]);
  const [error, setError] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    //  تابع برای دریافت اطلاعات پروفایل دکترها از بک‌اند
    const fetchPatientsProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios(
          "http://eniacgroup.ir:8070//TherapyTests/record/query/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
              name: inputName,
            },
          }
        );
        if (response.status == 200) {
          setPatientsData(response.data.records);
          setShowErrorMessage(false);
          console.log(response.data.records);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          if (
            error.response.data.hasOwnProperty("message") &&
            error.response.data.message === "not found any similar data."
          ) {
            setError(error);
            setShowErrorMessage(true);
          }
        }
      }
    };

    fetchPatientsProfile();
  }, [inputName]);

  return (
    <>
      <NavBar_SideBar />
      <div
        className="container-fluid my-5 team"
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
              <h1 style={{ fontFamily: "Ios15Medium" }}>مراجعین من</h1>
            </div>
            <div className="rtl-form">
              <form>
                <div class="form-row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="نام مراجع"
                      onChange={(e) => setInputName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
            <br />

            <div
              className="owl-carousel team-carousel wow fadeIn owl-loaded owl-drag"
              data-wow-delay=".5s"
              style={{ visibility: "visible" }}
            >
              <div>
                {showErrorMessage && (
                  <div className="patientsList_notfound">
                    مراجع با نام مشابه یافت نشد!
                  </div>
                )}
              </div>
              <div className="distanceBetween">
                {Patients_data.map((index) => (
                  <Patient_Profile
                    PatiantId={index?.patient}
                    name={index?.name}
                    nationalID={index?.nationalID}
                    gender={index?.gender}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PatientsList;
