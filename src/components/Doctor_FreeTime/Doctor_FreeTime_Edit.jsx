import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import img from "../../assets/Female_Avatar.jpg";
import "./Doctor_FreeTime.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import HourCard from "./Hours";
import { BsCalendarDate, BsCalendar2WeekFill } from "react-icons/bs";
import { IoMdTime, IoMdClock } from "react-icons/io";
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

const Doctor_FreeTime_Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const [initialTimes, setInitial] = useState([]);
  const [intialDays, setInitialDays] = useState([]);
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
  const [initial_Times, setTimes] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [selectVal, setSelectVal] = useState(-1);
  const [selectedDay, setSelectedDay] = useState(
    ChangeDate(utils().getToday())
  );
  const [selectedHours, setSelectedHours] = useState([]);
  const [LeftTimes, setTime] = useState([]);
  const [selected, setSelect] = useState([]);
  const [selectedDayweek, setSelectedDayweek] = useState(-1);

  async function GetFreeTime () {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `https://eniacgroup.ir/backend/DoctorPanel/doctor/get-free-times/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const arr = [];
      setInitial(response.data["Free Time List"]);
      response.data["Free Time List"]
    .map((x) => (x = x.day))
    .forEach((x) => {
      const index = weekdays.indexOf(x);
      if (!arr.includes(DAYS[index])) {
        arr.push(DAYS[index]);
      }
    });
    setInitialDays(arr);
    } catch (error) {
      console.error("Error fetching Free Times:", error);
    }
  };
  useEffect(() => {
    GetFreeTime();
  }, []);

  async function update_free_time() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "https://eniacgroup.ir/backend/DoctorPanel/doctor/update-free-times/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            month: MONTHs[utils().getToday().month - 1],
            day: intialDays[selectedDayweek].label,
            time: selectedHours.join(","),
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSelectedHours([]);
        GetFreeTime();
        setSelectedDayweek(-1);
        toast.success("زمان منتخب شما با موفقیت ثبت شد", {
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

  const handleWeekDay = (index) => {
    setSelectedDayweek((prev) => (prev == index ? -1 : index));
    console.log(index);
    const arr = [];
    initialTimes
      .filter((x) => x.day == intialDays[index].label)
      .map((x) => (x = x.time))
      .forEach((x) => {
        if (!arr.includes(x)) {
          arr.push(x);
        }
      });
      setSelectedHours(arr);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div
          className={
            "row  " +
            (selectedDayweek == -1
              ? "col-12"
              : "col-md-9 col-lg-9 col-sm-9 col-xsm-12")
          }
        >
          <div className="col-12 p-3" dir="rtl">
            <p className="ft_paragraph">
              <BsCalendar2WeekFill className="ms-2" />
              روز های هفته
            </p>
            <div className="row d-flex justify-content-center align-items-center g-3">
              {intialDays.map((day, index) => (
                <div
                  className="col col-md-3 col-sm-4 col-xsm-12"
                  align="center"
                >
                  <HourCard
                    index={index}
                    time={day.label}
                    selected={selectedDayweek === index}
                    onClick={() => {
                      handleWeekDay(index);
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
              {hours.map((time, index, key) => (
                <div
                  className="col col-md-3 col-sm-5 ms-1 col-xsm-12"
                  align="center"
                >
                  <HourCard
                    time={toPersianDigits(time)}
                    index={index}
                    selected={selectedHours.indexOf(time) == -1 ? false : true}
                    onClick={(event) => {
                      const selectedIndex = selectedHours.indexOf(time);
                      if(selectedIndex==-1)
                        setSelectedHours([...selectedHours,time]);
                      else
                      setSelectedHours(selectedHours.filter(x=>x!=time));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="col col-md-3 col-lg-3 col-sm-12 col-xsm-1 justify-content-center align-items-center row px-0"
          align="center"
          style={
            selectedDayweek == -1
              ? { display: "none" }
              : { display: "flex", padding: "9%" }
          }
        >
          <h4 className="font-custom mb-5">
            قبل از ویرایش روز و زمان مورد نظر، از صحت آن اطمینان حاصل کنید!
          </h4>
          <div className="col-12 font-custom fs-4">
            <span className="col-4 ms-1">
              <BsCalendarDate />
            </span>
            <span className="col-4 ms-4 font-custom "> تاریخ:</span>
            <span className="col-4 font-custom">
              {intialDays[selectedDayweek]?.label}
            </span>
          </div>
          <div className="col-12 fs-4">
            <span className="col-4 ms-1">
              <IoMdTime />
            </span>
            <span className="col-4 ms-4 font-custom"> ساعت:</span>
            <span className="col-4 ">
              {toPersianDigits(
                selectedHours.map((time) => time.slice(0, -3)).join("\t,\t")
              )}
            </span>
          </div>
          <div className="ft_choices_box">
            <button
              className="ft_button_74"
              onClick={(e) => {
                update_free_time();
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

export default Doctor_FreeTime_Edit;
