import React from "react";
import "./PatientsList.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import male_avatar from "../../assets/Male_Avatar.jpg";
import female_avatar from "../../assets/Female_Avatar.jpg";
import nogender_avatar from "../../assets/NoGender.png";

const Patient_Profile = ({ PatiantId, name, nationalID, gender }) => {
  {
    const navigate = useNavigate();
    console.log("++++++++" + PatiantId);
    const handleClickToPatientPanel = () => {
      navigate("/Patient_Panel", { state: PatiantId });
    };

    return (
      <div
        className="rounded team-item"
        style={{ fontFamily: "Ios15Medium", width: "298.668px" }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <div className="team-content">
          <div className="team-img-icon">
            <div className="team-img rounded-circle">
              <img
                src={
                  gender == "M"
                    ? male_avatar
                    : gender == "F"
                    ? female_avatar
                    : nogender_avatar
                }
                className="img-fluid w-100 rounded-circle"
                alt={`${name}'s Image`}
              />
            </div>
            <div className="team-name text-center py-3">
              <h4
                className=""
                style={{ color: "gray", fontFamily: "Ios15Medium" }}
              >
                {name}
              </h4>
              <p
                className="m-0"
                style={{ fontFamily: "Ios15Medium", color: "gray" }}
              >
                {nationalID}
              </p>
            </div>

            <div className="buttonReserveAndProfile">
              <div className="team-icon d-flex justify-content-center pb-4">
                <a
                  className="btn btn-square btn-secondary text-white rounded-circle m-1"
                  onClick={handleClickToPatientPanel}
                >
                  <i className="fab material-symbols-outlined">
                    account_circle
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Patient_Profile;
