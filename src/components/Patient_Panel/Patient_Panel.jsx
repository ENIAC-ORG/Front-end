import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

import { TbGenderBigender } from "react-icons/tb";
import { FaRegCalendarDays, FaPhoneFlip } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdAlternateEmail } from "react-icons/md";

import male_avatar from "../../assets/Male_Avatar.jpg";
import female_avatar from "../../assets/Female_Avatar.jpg";
import nogender_avatar from "../../assets/NoGender.png";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./Patient_Panel.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import Patient_History from "./Patient_History";
import Patient_Info from "./Patient_Info";
import Patient_Result from "./Patient_Results";

const Patient_Panel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const PatientId = location.state;
  console.log("*************", PatientId);
  const [pages, setPageNum] = useState(1);
  const [userRecord, setRecord] = useState({
    Patient_age: 0,
    Patient_child_num: 0,
    Patient_family_history: false,
    Patient_gender: "",
    Patient_name: "",
    Patient_nationalID: "",
    Patient_TestResult: { glasserTest: null, MBTItest: null },
    Patient_Treatment1: null,
    Patient_Treatment2: null,
    Patient_Treatment3: null,
  });

  async function GetHealthInfo() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        `http://eniacgroup.ir:8070//TherapyTests/record/${PatientId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer <access token >
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        const user = response.data;
        var d1 = { glasserTest: null, MBTItest: null };
        var d2 = null;
        var d3 = null;
        var d4 = null;

        if (Object.keys(user).includes("therapyTests")) d1 = user.therapyTests;
        if (Object.keys(user).includes("treatementHistory1"))
          d2 = user.treatementHistory1;
        if (Object.keys(user).includes("treatementHistory2"))
          d3 = user.treatementHistory2;
        if (Object.keys(user).includes("treatementHistory3"))
          d4 = user.treatementHistory3;
        setRecord({
          Patient_age: user.age,
          Patient_child_num: user.child_num,
          Patient_family_history: user.family_history,
          Patient_gender: user.gender,
          Patient_name: user.name,
          Patient_nationalID: user.nationalID,
          Patient_TestResult: d1,
          Patient_Treatment1: d2,
          Patient_Treatment2: d3,
          Patient_Treatment3: d4,
        });
        console.log(userRecord);
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status == 404) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!مراجعه‌کنندۀ مورد نظر پیدا نشد",
          background: "#075662",
          color: "#FFFF",
          width: "35rem",
          backdrop: `
            rgba(84, 75, 87.0.9)
            left top
            no-repeat`,
          confirmButtonText: "تایید",
          confirmButtonColor: "#0a8ca0",
          preConfirm: () => {
            navigate("/Home");
          },
        });
      }
      if (error.response.status == 400) {
        if (
          error.response.data.message ==
          "ordinary user can not access this Information."
        )
          withReactContent(Swal).fire({
            icon: "error",
            title: "! دسترسی به این صفحه مختص پزشک است",
            background: "#075662",
            color: "#FFFF",
            width: "40rem",
            backdrop: `
              rgba(84, 75, 87.0.9)
              left top
              no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: "#0a8ca0",
            preConfirm: () => {
              navigate("/Home");
            },
          });
        if (error.response.data.message == "there is no record with this id.")
          withReactContent(Swal).fire({
            icon: "error",
            title: "! مریض مورد نظر پیدا نشد",
            background: "#075662",
            color: "#FFFF",
            width: "40rem",
            backdrop: `
                rgba(84, 75, 87.0.9)
                left top
                no-repeat`,
            confirmButtonText: "تایید",
            confirmButtonColor: "#0a8ca0",
            preConfirm: () => {
              navigate("/Home");
            },
          });
      }

      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      {
        GetHealthInfo();
      }
    }, 50000000);
  });

  return (
    <>
      <NavBar_SideBar />
      <div
        className="patient_prof_body"
        onLoad={GetHealthInfo}
      >
        <div className="prof_Box" style={{ minWidth: "500px" }}>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div className="container bootstrap snippets bootdey">
            <div className="row">
              <div className="col-md-0" style={{ marginTop: "20px" }}>
                <div className="panel" style={{ direction: "rtl" }}>
                  <div className="patient_prof_header">
                    <h1>اطلاعات پزشکی</h1>

                    <div
                      className="patient_prof_pages"
                      style={{ marginBottom: "30px" }}
                    >
                      <div
                        onClick={(e) => setPageNum(1)}
                        style={
                          pages == 1
                            ? { color: "rgb(201, 255, 160)" }
                            : { cursor: "pointer" }
                        }
                      >
                        اطلاعات تخصصی
                      </div>
                      <div
                        onClick={(e) => setPageNum(2)}
                        style={
                          pages == 2
                            ? { color: "#B799FF", cursor: "pointer" }
                            : { cursor: "pointer" }
                        }
                      >
                        نتایج تست‌ها
                      </div>
                      <div
                        onClick={(e) => setPageNum(3)}
                        style={
                          pages == 3
                            ? { color: "#B799FF", cursor: "pointer" }
                            : { cursor: "pointer" }
                        }
                      >
                        تاریخچه
                      </div>
                    </div>
                  </div>
                  {pages == 1 ? (
                    <Patient_Info
                      Name={userRecord.Patient_name}
                      Age={userRecord.Patient_age}
                      ChildNum={userRecord.Patient_child_num}
                      Gender={userRecord.Patient_gender}
                      NationalId={userRecord.Patient_nationalID}
                      FamilyHistory={userRecord.Patient_family_history}
                    />
                  ) : pages == 2 ? (
                    <Patient_Result
                      results={userRecord.Patient_TestResult}
                      G={userRecord.Patient_gender}
                    />
                  ) : (
                    <Patient_History
                      TreatmentNum1={userRecord.Patient_Treatment1}
                      TreatmentNum2={userRecord.Patient_Treatment2}
                      TreatmentNum3={userRecord.Patient_Treatment3}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Patient_Panel;
