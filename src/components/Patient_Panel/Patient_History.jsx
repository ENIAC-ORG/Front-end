import React, { useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

import { TbGenderBigender } from "react-icons/tb";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { MdDriveFileRenameOutline, MdAlternateEmail } from "react-icons/md";

import "./Patient_Panel.css";

const Patient_History = ({ TreatmentNum1, TreatmentNum2, TreatmentNum3 }) => {
  var Date1 = new DateObject(TreatmentNum1 != null ? TreatmentNum1.end_date : "00-00-00");
  Date1.convert(persian);
  var Date2 = new DateObject(TreatmentNum2 != null ? TreatmentNum2.end_date : "00-00-00");
  Date2.convert(persian);
  var Date3 = new DateObject(TreatmentNum3 != null ? TreatmentNum3.end_date : "00-00-00");
  Date3.convert(persian);
  return (
    <>
      <div className="patient_prof_insidebox" style={{ display: "grid" }}>
        <div className="patient_prof_box_header">
          <MdOutlineHistoryToggleOff className="patient_prof_box_header_ic" />
          <h1>تاریخچه درمان های گذشته</h1>
        </div>
        {(TreatmentNum1==null && TreatmentNum2==null && TreatmentNum3==null) ? <h5>"نتیجه ای برای نشان دادن وجود ندارد"</h5> : 
        <div className="patient_prof_res">
          {TreatmentNum1 != null ? (
            <div className="patient_prof_history_card">
              <h3>سری اول درمان</h3>
              <hr />
              <ul style={{ listStyleType: "none", lineHeight: "49px" }}>
                <li>
                  <span>اتمام درمان</span>:
                  {TreatmentNum1.is_finished ? "متوقف" : "در حال "}
                </li>
                <li>
                  <span>مدت زمان درمان</span>:{TreatmentNum1.length}
                </li>
                <li>
                  <span>تاریخ اتمام</span>:{Date1.format()}
                </li>
                <li>
                  <span>دلیل ترک</span>:{TreatmentNum1.reason_to_leave}
                </li>
                <li>
                  <span>روند درمان</span>:{TreatmentNum1.approach}
                </li>
                <li>
                  <span>دارو های تجویز شده</span>:{TreatmentNum1.special_drugs}
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
          {TreatmentNum2 != null ? (
            <div className="patient_prof_history_card">
              <h3>سری دوم درمان</h3>
              <hr />
              <ul style={{ listStyleType: "none", lineHeight: "49px" }}>
                <li>
                  <span>اتمام درمان</span>:
                  {TreatmentNum2.is_finished ? "متوقف" : "در حال "}
                </li>
                <li>
                  <span>مدت زمان درمان</span>:{TreatmentNum2.length}
                </li>
                <li>
                  <span>تاریخ اتمام</span>:{Date2.format()}
                </li>
                <li>
                  <span>دلیل ترک</span>:{TreatmentNum2.reason_to_leave}
                </li>
                <li>
                  <span>روند درمان</span>:{TreatmentNum2.approach}
                </li>
                <li>
                  <span>دارو های تجویز شده</span>:{TreatmentNum2.special_drugs}
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
          {TreatmentNum3 != null ? (
            <div className="patient_prof_history_card">
              <h3>سری سوم درمان</h3>
              <hr />
              <ul style={{ listStyleType: "none", lineHeight: "49px" }}>
                <li>
                  <span>اتمام درمان</span>:
                  {TreatmentNum3.is_finished ? "متوقف" : "در حال "}
                </li>
                <li>
                  <span>مدت زمان درمان</span>:{TreatmentNum3.length}
                </li>
                <li>
                  <span>تاریخ اتمام</span>:{Date3.format()}
                </li>
                <li>
                  <span>دلیل ترک</span>:{TreatmentNum3.reason_to_leave}
                </li>
                <li>
                  <span>روند درمان</span>:{TreatmentNum3.approach}
                </li>
                <li>
                  <span>دارو های تجویز شده</span>:{TreatmentNum3.special_drugs}
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>}
      </div>
    </>
  );
};
export default Patient_History;
