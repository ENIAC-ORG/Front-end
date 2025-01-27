import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCheckmarkSharp , IoCloseSharp  } from "react-icons/io5";

import male_avatar from "../../assets/Male_Avatar.jpg";
import female_avatar from "../../assets/Female_Avatar.jpg";
import nogender_avatar from "../../assets/NoGender.png";

import "./Patient_Panel.css";

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Patient_Info = ({
  Name,
  Age,
  ChildNum,
  Gender,
  NationalId,
  FamilyHistory,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row patient-panel-title">
          <IoIosInformationCircleOutline className="fs-2 mt-2 ms-1" />
          <h1 className="font-custom">اطلاعات تخصصی</h1>
        </div>
        <div className="row" dir="ltr">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <div className="patient-panel-profile col-md-3 ">
              <div className="panel">
                <div
                  className="user-heading round"
                >
                  <a href="">
                    <img
                      src={
                        Gender == "مرد"
                          ? male_avatar
                          : Gender == "زن"
                          ? female_avatar
                          : nogender_avatar
                      }
                      alt="Avatar"
                    />
                  </a>
                  <br />
                  <br />
                  <h1>{Name}</h1>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 row" dir="rtl">
            <div className="bio-row">
              <p className="d-flex">
                <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
                <span >نام و نام خانوادگی </span>
                <div>:{Name}</div>
              </p>
            </div>
            <div className="bio-row">
              <p className="d-flex">
                <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
                <span >جنسیت</span>
                <div>:{Gender}</div>
              </p>
            </div>
            <div className="bio-row">
              <p className="d-flex">
                <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
                <span >سن</span>
                <div>:{toPersianDigits(`${Age}`)}</div>
              </p>
            </div>
            <div className="bio-row">
              <p className="d-flex">
                <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
                <span >ترتیب تولد</span>
                <div>:{toPersianDigits(`${ChildNum}`)}</div>
              </p>
            </div>
            <div className="bio-row">
              <p className="d-flex">
              <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
              <span >کد ملی </span>
                <div>:{toPersianDigits(NationalId)}</div>
              </p>
            </div>
            <div className="bio-row">
            <p className="d-flex">
              <MdDriveFileRenameOutline style={{ color: "#1a9572" }} />
              <span >سابقه خانوادگی</span>
                <div>:{FamilyHistory ? <IoCheckmarkSharp  className="text-success" size={30}/> : <IoCloseSharp  className="text-danger" size={30}/>}</div>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Patient_Info;
// className={FamilyHistory ? "text-success":"text-error"}