import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [load, SetLoad] = useState(true);
  const [pages, setPageNum] = useState(1);
  const [userRecord, setRecord] = useState({
    Patient_age: 0,
    Patient_child_num: 0,
    Patient_family_history: false,
    Patient_gender: "",
    Patient_name: "",
    Patient_nationalID: "",
    Patient_TestResult: { glasserTest: null, MBTItest: null },
    Patient_Treatment: [],
  });

  async function GetHealthInfo() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        `https://eniacgroup.ir/backend/TherapyTests/record/${PatientId}/`,
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
        setRecord({
          Patient_age: user.age,
          Patient_child_num: user.child_num,
          Patient_family_history: user.family_history,
          Patient_gender: user.gender,
          Patient_name: user.name,
          Patient_nationalID: user.nationalID,
          Patient_TestResult: user.therapyTests,
          Patient_Treatment: user.treatment_histories,
        });
      }
    } catch (error) {
        if (error.response.status == 404) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "!متاسفانه مشکلی پیش آمده، دوباره تلاش کنید",
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
            navigate(-1);
          },
        }).then(()=>{navigate("/Home");});
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
              navigate(-1);
            },
          }).then(()=>{navigate("/Home");});
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
              navigate(-1);
            },
          }).then(()=>{navigate("/Home");});
      }
    }
  }
  return (
    <>
      <NavBar_SideBar />
      <div className="container py-5" onLoad={GetHealthInfo}>
        <div className="d-flex align-items-center flex-column text-center">
          <div className="patient-panel-pages px-3 py-1 mb-2" dir="rtl">
            <div
              className="col font-custom patient-panel-page"
              onClick={(e) => setPageNum(1)}
              style={pages == 1 ? { color: "#2e9d7d" } : {}}
            >
              اطلاعات تخصصی
            </div>
            <div
              className="col font-custom cursor-pointer"
              onClick={(e) => setPageNum(2)}
              style={pages == 2 ? { color: "#2e9d7d" } : {}}
            >
              نتایج تست‌ها
            </div>
            <div
              className="col font-customcursor-pointer"
              onClick={(e) => setPageNum(3)}
              style={pages == 3 ? { color: "#2e9d7d" } : {}}
            >
              تاریخچه
            </div>
          </div>
        </div>
        <div
          className="row rounded-4 p-5 mx-1 patient-panel-bg  justify-content-center"
          style={{ minWidth: "300px" }}
          dir="rtl"
        >
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
              History={userRecord.Patient_Treatment}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Patient_Panel;
