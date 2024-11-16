import React from 'react';
import "./DoctorPage.css"
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const ReservationTable = ({ PatiantId, PatiantName, Day, Date, time, type, MeetingLink }) => {
    console.log(PatiantName);
    const navigate = useNavigate();
    const handleClickToPatiantPanel = () => {
        console.log(PatiantId);
        navigate("/Patient_Panel", { state: PatiantId });
    };
    return (
        <div>
            <li className="table-row">
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="پرونده پزشکی بیمار">
                    <button className="button-24" role="button" style={{ fontFamily: "Ios15Medium" }} onClick={handleClickToPatiantPanel} >پرونده</button>
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="لینک جلسه مجازی">
                    {MeetingLink && type == "مجازی" ? (
                        <button className="button-24" role="button" style={{ fontFamily: "Ios15Medium" }} onClick={() => window.open(MeetingLink, "_blank")}>
                            لینک جلسه
                        </button>
                    ) : (<p></p>)
                    }
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="نوع مراجعه">{type}</div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="ساعت">{time}</div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="تاریخ">{Date},{Day}</div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="نام بیمار">{PatiantName}</div>
            </li>
        </div>
    )
}

export default ReservationTable