import React, { useState } from "react";
import "./Doctor_FreeTime.css";

const HourCard = ({ time, index, onClick, selected }) => {
  return (
    <>
      <div
        className="ft_hcard_bd"
        onClick={onClick}
        style={
          selected  ? { background: "#326320", color: "#e2e2e2" , border: "3px solid #326320"} : {}
        }
      >
        {time}
      </div>
    </>
  );
};
export default HourCard;
