import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import img from "../../assets/Female_Avatar.jpg";
import styles from "./Doctor_FreeTime.module.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import HourCard from "./Hours";
import { BsCalendarDate } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as shamsi from "shamsi-date-converter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicalInfoModal from "../MedicalInfoModal/MedicalInfoModal";
import Swal from "sweetalert2";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

//import ToggleDays from "./ToggleDays";

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
    label: "ش",
  },
  {
    key: "sunday",
    label: "ی",
  },
  {
    key: "monday",
    label: "د",
  },
  {
    key: "tuesday",
    label: "س",
  },
  {
    key: "wednesday",
    label: "چ",
  },
  {
    key: "thursday",
    label: "پ",
  },
  {
    key: "friday",
    label: "ج",
  },
];

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    color: "#692B7C",
    "&$selected": {
      color: "white",
      background: "#692B7C",
    },
    "&:hover": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    "&:hover$selected": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
  },
  selected: {},
})(ToggleButton);

const Doctor_FreeTime = () => {
  //console.log(utils().getToday());
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const [res_type, setres_type] = useState("حضوری");
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

  const [selectedDayweek, setSelectedDayweek] = useState(0);

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

  const [doctorProfile, setDoctorProfile] = useState([]);
  const baseUrl = "http://127.0.0.1:8000//profile/doctors";

  // Alternatively, you can use string concatenation:
  const url = baseUrl + doctor_id + "/";

  useEffect(() => {
    //  تابع برای دریافت اطلاعات پروفایل دکتراز بک‌اند
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctorProfile(response.data);
        console.log(response);
        //console.log(doctorProfile[0]);
        // console.log(doctorProfile[0].image

        // );
        // console.log(doctorProfile[0].name);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  async function send_free_time() {
    try {
      //const startDate = formatDate(new Date()); // Format today's date as "yyyy-mm-dd" string
      //const endDate = formatDate(addDays(new Date(), 30)); // Format 30 days later as "yyyy-mm-dd" string
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "http://127.0.0.1:8000//DoctorPanel/doctor/post-free-time/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            month: MONTHs[utils().getToday().month - 1],
            day: weekdays[selectedDayweek],
            time: selectedTimes.join(","),
          },
        }
      );

      //console.log(doctor_id);
      if (response.status === 200 || response.status === 201) {
        console.log(response);
        setResponseData(response.data);
        setsel_hours([]);
        //console.log(response);
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
        console.log(response);
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
      console.log(error);
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
      <NavBar_SideBar />
      <ToastContainer />
      <div className={styles.reserve_body}>
        <div className={styles.reserve_Box}>
          <div className={styles.reserve_docProfile}>
            {/* <a href="#"> */}
            {/* <img src={img} alt="Avatar" /> */}
            {/* <img src={doctorProfile[0].image} className="img-fluid w-100 rounded-circle" alt={img} />  */}
            {/* </a> */}
            {/* <h2 className={styles.reserve_docName}>{doctorProfile[0].name}</h2>   */}
            <h2 className={styles.reserve_docName}>انتخاب ساعت کاری </h2>
          </div>

          <div className={styles.reserve_wrap}>
            <div className={styles.reserve_date_wrap}>
              <p className={styles.reserve_paragraph}>روز های هفته </p>
              <br />
              <StyledToggleButtonGroup
                size={"medium"}
                aria-label="Days of the week"
                value={selectedDayweek}
                exclusive
                onChange={handleDayChange}
              >
                {DAYS.map((day, index) => (
                  <StyledToggle
                    key={day.key}
                    value={index}
                    aria-label={day.key}
                    selected={selectedDayweek === index}
                  >
                    {day.label}
                  </StyledToggle>
                ))}
              </StyledToggleButtonGroup>
            </div>

            <div className={styles.reserve_hour_wrap}>
              <h6>ساعت های مشاوره</h6>
              <div className={styles.reserve_hour_items}>
                {LeftTimes.length == 0 && (
                  <div className={styles.Reservation_error_input}>
                    زمانی جهت مشاوره یافت نشد
                  </div>
                )}
                {LeftTimes.map((time, index, key) => (
                  <HourCard
                    time={time}
                    index={index}
                    selected={sel_hours.indexOf(index) == -1 ? false : true}
                    // onClick={(event) =>
                    //   setSelect(selected == index ? -1 : index)
                    // }
                    onClick={(event) => {
                      const selectedIndex = selectedHours.indexOf(index);
                      if (sel_hours.indexOf(index) == -1) sel_hours.push(index);
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
                ))}
              </div>
            </div>
            <div
              className={styles.reserve_result}
              style={sel_hours.length == 0 ? { display: "none" } : {}}
            >
              روز هفته و ساعات انتخابی:
              <br />
              <span>
                <BsCalendarDate />
              </span>
              روز:
              <br />
              {weekdays[selectedDayweek]}
              <br />
              <span>
                <IoMdTime />
              </span>
              ساعت:
              <br />
              {/* {LeftTimes[selected]} */}
              {selectedTimes.join(" ,")}
              <br />
              <div className={styles.reverse_choices_box}>
                <button
                  className={styles.button_74}
                  onClick={(e) => {
                    // Use the selected hours here (selectedHours array)
                    console.log(selectedHours);
                    console.log(MONTHs[utils().getToday().month]);
                    send_free_time();

                    setSelect(-1);
                    // Reset the selected hours
                    setSelectedHours([]);
                  }}
                >
                  ثبت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Doctor_FreeTime;
