import React from 'react';
import "./DoctorPage.css"
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SessionSummaryModal from '../SessionSummaryModal/SessionSummaryModal';
import { DateObject } from "react-multi-date-picker";
import persian from 'react-date-object/calendars/persian';

const ReservationTable = ({ PatiantId, PatiantName, Day, MyDate, time, type, MeetingLink }) => {
    console.log(PatiantName);
    const navigate = useNavigate();
    const handleClickToPatiantPanel = () => {
        console.log(PatiantId);
        navigate("/Patient_Panel", { state: PatiantId });
    };

    const today = new Date().toISOString().split('T')[0];

    const formatTime = (time) => {
        return time.split(':').slice(0, 2).join(':');
    };

    function toPersianDigits(str) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return str.replace(/\d/g, (digit) => persianDigits[digit]);
    }

    const date = new DateObject({
        calendar: "persian",
        date: MyDate ? new Date(MyDate) : new Date(),
        locale: "fa",
        format: "YYYY-MM-DD"
    });
    date.convert(persian);


    return (
        <div>
            <li className="table-row">
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="خلاصه جلسه">
                    {MyDate === today ? (<SessionSummaryModal PatiantId={PatiantId} />)
                        : (<p />)}
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="پرونده پزشکی بیمار">
                    <button className="button-24" role="button" style={{ fontFamily: "Ios15Medium" }} onClick={handleClickToPatiantPanel} >پرونده</button>
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="لینک جلسه مجازی">
                    {MeetingLink && type == "مجازی" ? (
                        <button className="button-24" role="button" style={{ fontFamily: "Ios15Medium" }} onClick={() => window.open(MeetingLink, "_blank")}>
                            لینک جلسه
                        </button>
                    ) : (<p />)
                    }
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="نوع مراجعه">{type}</div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="تاریخ و ساعت">
                    {toPersianDigits(date.format())}
                    <br />{Day}
                    <br />{toPersianDigits(formatTime(time))}
                </div>
                <div className="col col-2" style={{ fontFamily: "Ios15Medium" }} data-label="نام بیمار">{PatiantName}</div>
            </li>
        </div>
    )
}

export default ReservationTable