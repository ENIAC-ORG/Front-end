import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../../assets/Female_Avatar.jpg";
import "./Doctor_FreeTime.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import HourCard from "./Hours";
import { BsCalendarDate  ,BsCalendar2WeekFill } from "react-icons/bs";
import { IoMdTime , IoMdClock} from "react-icons/io";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as shamsi from "shamsi-date-converter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicalInfoModal from "../MedicalInfoModal/MedicalInfoModal";
import Swal from "sweetalert2";

function DateString(input) {
  var changed = shamsi.jalaliToGregorian(input.year, input.month, input.day);
  var y = `${changed[0]}`;
  var m = changed[1] < 10 ? `0${changed[1]}` : `${changed[1]}`;
  var d = changed[2] < 10 ? `0${changed[2]}` : `${changed[2]}`;
  return [y, m, d].join("-");
}

function ChangeDate(input) {
  var date = new DateObject(input);
  date.convert(persian);
  const changed = {
    year: parseInt(date.year),
    month: parseInt(date.month),
    day: parseInt(date.day),
  };
  return changed;
}

const weekdays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];
const MONTHs = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = [
  {
    key: "saturday",
    label: "شنبه",
  },
  {
    key: "sunday",
    label: "یکشنبه",
  },
  {
    key: "monday",
    label: "دوشنبه",
  },
  {
    key: "tuesday",
    label: "سه شنبه",
  },
  {
    key: "wednesday",
    label: "چهارشنبه",
  },
  {
    key: "thursday",
    label: "پنج شنبه",
  },
  {
    key: "friday",
    label: "جمعه",
  },
];

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Doctor_FreeTime_Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const [doctor_id, setCode] = useState(initialState.doctorId || "");
  const hours = [
    "9:00:00",
    "10:00:00",
    "11:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
  ];
  const [sel_hours, setsel_hours] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [selectVal, setSelectVal] = useState(-1);
  const [selectedDay, setSelectedDay] = useState(
    ChangeDate(utils().getToday())
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [LeftTimes, setTime] = useState([]);
  const today = ChangeDate(utils().getToday());
  const [selected, setSelect] = useState([]);

  const [selectedDayweek, setSelectedDayweek] = useState(-1);

  const handleDayChange = (event, value) => {
    setSelectedDayweek(value);
    setsel_hours([]);
    setSelectedHours([]);
  };

  const setdatetime = () => {
    var d = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    ).getDay();
    var temp;
    if (d == 1) temp = [];
    else {
      temp = hours.slice();
      setTime(temp);
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].date == DateString(selectedDay)) {
          var ind = temp.indexOf(responseData[i].time);
          if (ind > -1) {
            temp.splice(ind, 1);
          }
        }
      }
    }
    return temp;
  };
  useEffect(() => {
    setTimeout(() => {
      {
        setTime(setdatetime(selectedDay));
      }
    }, 10);
  });

  async function send_free_time() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "https://eniacgroup.ir/backend/DoctorPanel/doctor/post-free-times/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            month: MONTHs[utils().getToday().month],
            day: weekdays[selectedDayweek],
            time: selectedTimes.join(","),
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSelect(-1);
        setSelectedHours([]);
        setResponseData(response.data);
        setsel_hours([]);
        toast.success("زمان منتخب شما با موفقیت ثبت شد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("ثبت موفقیت آمیز نبود، رفرش کنید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      if(error.response.data.error == "Free times already exist for this date. Use UpdateFreeTime to modify existing times.")
        toast.error("!به علت وجود وقت، باید ویرایش کنید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        else
      toast.error("ثبت موفقیت آمیز نبود، رفرش کنید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  const selectedTimes = selectedHours.map((index) => hours[index]);

  return (
    <>

          <div className="row justify-content-center">
            <div
              className={
                "row  " + (sel_hours.length == 0 ? "col-12" : "col-md-9 col-lg-9 col-sm-9 col-xsm-12")
              }
            >
              <div className="col-12 p-3" dir="rtl">
                <p className="ft_paragraph">
                  <BsCalendar2WeekFill className="ms-2" />
                  روز های هفته
                </p>
                <div className="row d-flex justify-content-center align-items-center g-3">
                  {DAYS.map((day, index, key) => (
                    <div className="col col-md-3 col-sm-4 col-xsm-12" align="center">
                      <HourCard
                        index={index}
                        time={day.label}
                        selected={selectedDayweek === index}
                        onClick={(event) => {
                          setSelectedDayweek((prev) =>
                            prev == index ? -1 : index
                          );
                          setsel_hours([]);
                          setSelectedHours([]);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="col col-12 p-3"
                dir="rtl"
                style={selectedDayweek == -1 ? { display: "none" } : {}}
              >
                <p className="ft_paragraph">
                  <IoMdClock className="ms-2" />
                  ساعات مورد نظر:
                </p>
                <div className="row d-flex justify-content-center align-items-center g-3">
                  {LeftTimes.length == 0 && (
                    <div className="ft_error_input">
                      زمانی جهت مشاوره یافت نشد
                    </div>
                  )}
                  {LeftTimes.map((time, index, key) => (
                    <div
                      className="col col-md-3 col-sm-5 ms-1 col-xsm-12"
                      align="center"
                    >
                      <HourCard
                        time={toPersianDigits(time)}
                        index={index}
                        selected={sel_hours.indexOf(index) == -1 ? false : true}
                        onClick={(event) => {
                          const selectedIndex = selectedHours.indexOf(index);
                          if (sel_hours.indexOf(index) == -1)
                            sel_hours.push(index);
                          else sel_hours.splice(sel_hours.indexOf(index), 1);
                          if (selectedIndex === -1) {
                            setSelect(selected == index ? -1 : index);
                            // Hour is not selected, add it to the array
                            setSelectedHours([...selectedHours, index]);
                          } else {
                            // Hour is already selected, remove it from the array
                            const updatedHours = [...selectedHours];
                            updatedHours.splice(selectedIndex, 1);
                            setSelectedHours(updatedHours);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="col col-md-3 col-lg-3 col-sm-3 col-xsm-1 justify-content-center align-items-center row px-0 "
              align="center"
              style={sel_hours.length == 0 ? { display: "none" } : {display:"flex",padding:"9%"}}
            >
              <h4 className="font-custom mb-5">قبل از ثبت روز و زمان مورد نظر، از صحت آن اطمینان حاصل کنید!</h4>
              <div className="col-12 font-custom fs-4">
                <span className="col-4 ms-1">
                  <BsCalendarDate />
                </span>
                <span className="col-4 ms-4 font-custom "> تاریخ:</span>
                <span className="col-4 font-custom">
                {weekdays[selectedDayweek]}
                </span>
              </div>
              <div className="col-12 fs-4">
                <span className="col-4 ms-1">
                  <IoMdTime />
                </span>
                <span className="col-4 ms-4 font-custom"> ساعت:</span>
                <span className="col-4 ">
                {toPersianDigits(selectedTimes.map((time)=> time.slice(0,-3)).join("\t,\t"))}
                </span>
              </div>
              <div className="ft_choices_box">
                <button
                  className="ft_button_74"
                  onClick={(e) => {
                    send_free_time();
                  }}
                >
                  ثبت
                </button>
              </div>
            </div>
          </div>
    </>
  );
};

export default Doctor_FreeTime_Add;
