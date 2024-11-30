import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Doctor_FreeTime.css";

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Doctor_FreeTime_Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  

  return (
    <>
      
    </>
  );
};

export default Doctor_FreeTime_Edit;
