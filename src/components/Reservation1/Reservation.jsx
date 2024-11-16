import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import img from "../../assets/Female_Avatar.jpg";
import styles from "./reservation.module.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
import DateObject from "react-date-object";
// import persian from "react-date-object/calendars/persian";
import HourCard from "./HourCard";
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

import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

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
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const [res_type, setres_type] = useState("حضوری");
  const [doctor_id, setCode] = useState(initialState.doctorId || "");
  const [responseData, setResponseData] = useState([]);
  const [FreeTiems, setFreeTimes] = useState([]);
  const [selectVal, setSelectVal] = useState(-1);
  const [selectedDay, setSelectedDay] = useState(new Date()
    // ChangeDate(utils().getToday())
  );
  const [LeftTimes, setTime] = useState([]);
  // const today = ChangeDate(utils().getToday());
  const [selected, setSelect] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [hasMedicalInfo, setHasMedicalInfo] = useState(null);

  // Function to toggle the modal state
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  async function CheckMedicalInfo() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://127.0.0.1:8000/TherapyTests/record_check/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);

      if (response.status === 200) {
        setHasMedicalInfo(response.data.message);
      }
    } catch (error) {
      console.log("something went wrong: ", error);
      Swal.fire({
        icon: "error",
        title: "!خطا ",
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        height: "18rem",
        confirmButtonText: "تایید",
        customClass: {
          container: "custom-swal-container",
        },
      });
    }
  }

  // const setdatetime = () => {
  //   var d = new Date(
  //     selectedDay.year,
  //     selectedDay.month,
  //     selectedDay.day
  //   ).getDay();
  //   var temp = [];
  //   for (let i = 0; i < FreeTiems.length; i++)
  //     if (FreeTiems[i].date == DateString(selectedDay))
  //       temp.push(FreeTiems[i].time);
  //   for (let i = 0; i < responseData.length; i++) {
  //     if (responseData[i].date == DateString(selectedDay)) {
  //       var ind = temp.indexOf(responseData[i].time);
  //       if (ind > -1) {
  //         temp.splice(ind, 1);
  //       }
  //     }
  //   }
  //   return temp;
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     {
  //       setTime(setdatetime(selectedDay));
  //     }
  //   }, 100);
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     {
  //       getFreeTime();
  //     }
  //   }, 5000);
  // });

  async function getFreeTime() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `http://127.0.0.1:8000/reserve/get-free-time/${doctor_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setFreeTimes(response.data["Free Time List"]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getReservation() {
    try {
      const startDate = formatDate(new Date()); // Format today's date as "yyyy-mm-dd" string
      const endDate = formatDate(addDays(new Date(), 30)); // Format 30 days later as "yyyy-mm-dd" string
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "http://127.0.0.1:8000/reserve/between_dates/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            start_date: startDate,
            end_date: endDate,
            doctor_id: doctor_id,
          },
        }
      );
      CheckMedicalInfo();
      if (response.status === 200 || response.status === 201) {
        setResponseData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [doctorProfile, setDoctorProfile] = useState([]);
  const baseUrl = "http://127.0.0.1:8000/profile/doctors/";

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
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  async function CreateReservation() {
    try {
      // const ReservationDate = DateString(selectedDay); // Format today's date as "yyyy-mm-dd" string
      const token = localStorage.getItem("accessToken");
      console.log(LeftTimes[selected]);
      const response = await axios("http://127.0.0.1:8000/reserve/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          type: res_type,
          date: ReservationDate,
          time: LeftTimes[selected],
          doctor_id: doctor_id,
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("you reserved successfully");
        // getReservation();
        toast.success("رزرو وقت شما با موفقیت انجام شد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        CheckMedicalInfo();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.data.hasOwnProperty("message") &&
        error.response.data.message ===
          "you can not reservere 2 times under 8 days drift"
      ) {
        toast.error("!حداقل فاصله رزرو ها 8 روز می باشد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("رزرو موفقیت آمیز نبود، رفرش کنید", {
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
  }
  return (
    <>
      <NavBar_SideBar />
      <ToastContainer />
      <div className={styles.reserve_body} onLoad={getReservation}>
        <div className={styles.reserve_Box} onLoad={getFreeTime}>
          <div className={styles.reserve_docProfile}>
            <a href="#">
              <img
                src={doctorProfile.image}
                className="img-fluid w-100 rounded-circle"
                alt="image"
              />
            </a>
            <h2 className={styles.reserve_docName}>{doctorProfile.name}</h2>
          </div>
          <div className={styles.reserve_wrap}>
            <div className={styles.reserve_date_wrap}>
            <Calendar
      calendar={persian}
      locale={persian_fa}
      value={selectedDay}
      onChange={(e) => {
          setSelectedDay(e);
          setSelect(-1);
                }}
                minDate={new DateObject()}
    maxDate={new DateObject().add(1,"month")}
    />
              {/* <Calendar
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(e);
                  setSelect(-1);
                }}
                minimumDate={today}
                maximumDate={{
                  year: today.year,
                  month: today.month + 1,
                  day: today.day,
                }}
                shouldHighlightWeekends
                locale="fa"
                colorPrimary="#9c7aed"
                calendarClassName={styles.custom_calendar}
                calendarTodayClassName="custom-today-day"
                // disabledDays = [{utils().weekDaysList}]
              /> */}
            </div>

            <div className={styles.reserve_hour_wrap}>
              <h6>ساعت های قابل رزرو</h6>
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
                    selected={selected}
                    onClick={(event) =>
                      setSelect(selected == index ? -1 : index)
                    }
                  />
                ))}
              </div>
            </div>
            <div
              className={styles.reserve_result}
              style={selected == -1 ? { display: "none" } : {}}
            >
              تاریخ و زمان انتخابی:
              <br />
              <span>
                <BsCalendarDate />
              </span>
              تاریخ:
              <br />
              {selectedDay.year +
                "-" +
                selectedDay.month +
                "-" +
                selectedDay.day}
              <br />
              <span>
                <IoMdTime />
              </span>
              ساعت:
              <br />
              {LeftTimes[selected]}
              <br />
              <div className={styles.reverse_choices_box}>
                <ul className={styles.reserve_choices}>
                  <label className={styles.reserve_choices_op}>
                    <input
                      type="radio"
                      name="q1"
                      value="حضوری"
                      checked={res_type == "حضوری"}
                      onClick={(e) => setres_type("حضوری")}
                    />
                    <span>حضوری</span>
                  </label>
                  <label className={styles.reserve_choices_op}>
                    <input
                      type="radio"
                      name="q1"
                      value="مجازی"
                      checked={res_type == "مجازی"}
                      onClick={(e) => setres_type("مجازی")}
                    />
                    <span>مجازی</span>
                  </label>
                </ul>
                <button
                  className={styles.button_74}
                  onClick={(e) => {
                    console.log(hasMedicalInfo);
                    setSelectVal(selected);
                    setSelect(-1);
                    if (hasMedicalInfo) {
                      CreateReservation(e);
                    } else {
                      Swal.fire({
                        icon: "info",
                        title: "!توجه ",
                        html: "برای ادامۀ فرایند رزرو باید اطلاعات پزشکی خود را کامل کنید",
                        background: "#473a67",
                        color: "#b4b3b3",
                        width: "26rem",
                        height: "18rem",
                        showCancelButton: true,
                        cancelButtonText: "انصراف",
                        confirmButtonText: "تکمیل اطلاعات",
                        customClass: {
                          container: "custom-swal-container",
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          toggleModal();
                        } else {
                        }
                      });
                      console.log(LeftTimes[selected]);
                      console.log(showModal);
                    }
                  }}
                >
                  ثبت
                </button>
              </div>
            </div>
            <MedicalInfoModal
              getReserve={getReservation}
              selectIndex={selectVal}
              doctorId={doctor_id}
              resType={res_type}
              left_times={LeftTimes}
              daySelected={selectedDay}
              showModal={showModal}
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
