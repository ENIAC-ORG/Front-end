import React, { useState } from "react";
import "./reservation.css";

const HourCard = ({time, index, onClick,selected}) => {
  return (
    <>
      <div className="reserve_hcard_bd" onClick={onClick}
      style={selected == index ? {background:'#22b46d',color:'#0a3a23'}:{}}>
        {time}
      </div>
    </>
  );
};
export default HourCard;
