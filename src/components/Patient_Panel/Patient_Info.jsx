import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { RiHealthBookLine } from "react-icons/ri";
import { FaRegCalendarDays, FaPhoneFlip } from "react-icons/fa6";
import { MdDriveFileRenameOutline, MdAlternateEmail } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

import male_avatar from "../../assets/Male_Avatar.jpg";
import female_avatar from "../../assets/Female_Avatar.jpg";
import nogender_avatar from "../../assets/NoGender.png";


import "./Patient_Panel.css";

const Patient_Info = ({ Name, Age, ChildNum, Gender , NationalId , FamilyHistory }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="patient_prof_insidebox" style={{display:'flex'}}>
        <div className="panel-body bio-graph-info">
        <div className="patient_prof_box_header" style={{marginRight:'-50px'}}>
          <IoIosInformationCircleOutline className="patient_prof_box_header_ic" />
          <h1>اطلاعات تخصصی</h1>
        </div>
          <div className="row" style={{maxWidth:'600px',minWidth:'300px'}}>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>نام و نام خانوادگی </span>:{Name}
              </p>
            </div>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>جنسیت</span>: {Gender}
              </p>
            </div>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>سن </span>:{Age}
              </p>
            </div>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>فرزند چندم</span>:{ChildNum}
              </p>
            </div>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>کد ملی </span>:{NationalId}
              </p>
            </div>
            <div className="bio-row">
              <p>
                <MdDriveFileRenameOutline style={{ color: "#754bd7" }} />
                <span style={{width:'180px'}}>سابقه خانوادگی </span>:{FamilyHistory ? "مثبت ": "منفی"}
              </p>
            </div>
          </div>
        </div>
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round" style={{borderRadius:'10px',background:'#754bd7'}}>
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Patient_Info;
