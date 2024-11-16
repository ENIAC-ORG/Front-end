import React, { useState } from "react";
import styles from  "./reservation.module.css";

const HourCard = ({time, index, onClick,selected}) => {
  return (
    <>
      <div className={styles.reserve_hcard_bd} onClick={onClick}
      style={index==selected? {background:'#9c7aed',color:'#e2e2e2'}:{}}>
        {time}
      </div>
    </>
  );
};
export default HourCard;
