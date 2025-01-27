import React, { useState } from "react";
import "./reservation.css";

const HourCard = ({ time, index, onClick, selected }) => {

  const formatTime = (time) => {
    return time.split(':').slice(0, 2).join(':');
  };

  function toPersianDigits(str) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/\d/g, (digit) => persianDigits[digit]);
  }

  return (
    <>
      <div className="reserve_hcard_bd" onClick={onClick}
        style={selected == index ? { background: '#2cc33a', color: '#0a3a23' } : {}}>
        {toPersianDigits(formatTime(time))}
      </div>
    </>
  );
};
export default HourCard;
