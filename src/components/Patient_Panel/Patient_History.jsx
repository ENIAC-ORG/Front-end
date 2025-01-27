import React, { useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

import { MdOutlineHistoryToggleOff } from "react-icons/md";

import "./Patient_Panel.css";

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Patient_History = ({ History }) => {
  const Dates = [];
  for (let h = 0; h < History.length; h++) {
    const dateObj = new DateObject(History[h].end_date);
    dateObj.convert(persian);
    Dates.push(toPersianDigits(dateObj.format()));
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row patient-panel-title">
          <MdOutlineHistoryToggleOff className="fs-2 mt-2 ms-1" />
          <h1 className="font-custom"> درمان های گذشته</h1>
        </div>
        {History.length == 0 ? (
          <h5
            className="font-custom text-center my-5"
          >
            نتیجه ای برای نشان دادن وجود ندارد
          </h5>
        ) : (
          <div className="row g-5">
            {History.map((treatment, index) => (
              <div className="col-6 mx-3 patient-panel-history_card">
                <h3>سری {toPersianDigits(`${index + 1}`)}</h3>
                <hr />
                <ul style={{ listStyleType: "none", lineHeight: "49px" }}>
                  <li>
                    <p className="row">
                      <span className="col-3">وضعیت درمان</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :{treatment.is_finished ? "متوقف" : "در استمرار "}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p className="row">
                      <span className="col-3">مدت زمان درمان</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :{toPersianDigits(`${treatment.length}`)}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p className="row">
                      <span className="col-3">تاریخ اتمام</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :{Dates[index]}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p className="row">
                      <span className="col-3">دلیل ترک</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :
                        {treatment.reason_to_leave == ""
                          ? "   ------------------ "
                          : treatment.reason_to_leave}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p className="row">
                      <span className="col-3">روند درمان</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :
                        {treatment.approach == ""
                          ? "   ------------------ "
                          : treatment.approach}
                      </div>
                    </p>
                  </li>
                  <li>
                    <p className="row">
                      <span className="col-3">دارو های مصرفی</span>
                      <div
                        className="col"
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        :{treatment.special_drugs}
                      </div>
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Patient_History;
