import React, { useState } from "react";
import styles from "./Doctor_FreeTime.module.css";

const HourCard = ({ time, index, onClick, selected }) => {
  return (
    <>
      <div
        className={styles.reserve_hcard_bd}
        onClick={onClick}
        style={
          selected  ? { background: "#9c7aed", color: "#e2e2e2" } : {}
        }
      >
        {time}
      </div>
    </>
  );
};
export default HourCard;
