import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-multi-date-picker/styles/colors/teal.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import img from "../../assets/Female_Avatar.jpg";
import "./reservation.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DateObject from "react-date-object";
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
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function DateString(input) {
  var changed = shamsi.jalaliToGregorian(input.year, input.month, input.day);
  var y = `${changed[0]}`;
  var m = changed[1] < 10 ? `0${changed[1]}` : `${changed[1]}`;
  var d = changed[2] < 10 ? `0${changed[2]}` : `${changed[2]}`;
  return [y, m, d].join("-");
}

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
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
  const [doctor_id, setCode] = useState(initialState);
  const [responseData, setResponseData] = useState([]);
  const [FreeTiems, setFreeTimes] = useState([]);
  const [selectVal, setSelectVal] = useState(-1);
  const [selectedDay, setSelectedDay] = useState(
    ChangeDate(utils().getToday())
  );
  const [LeftTimes, setTime] = useState([
    "9:00:00",
    "10:00:00",
    "11:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
  ]);
  const today = ChangeDate(utils().getToday());
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
        "http://eniacgroup.ir:8070/TherapyTests/record_check/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setHasMedicalInfo(response.data.message);
      }
    } catch (error) {
      console.log("something went wrong: ", error);
      toast.error("!متاسفانه مشلکلی پیش آمده، رفرش نمایید", {
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

  const Setdatetime = (date_) => {
    var temp = [];
    for (let i = 0; i < FreeTiems.length; i++)
      if (FreeTiems[i].date == DateString(date_))
        temp.push(FreeTiems[i].time);
    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].date == DateString(date_)) {
        var ind = temp.indexOf(responseData[i].time);
        if (ind > -1) {
          temp.splice(ind, 1);
        }
      }
    }
    setTime(temp);
  };
  

  const handleCalender = (e) =>{
    setSelectedDay(e);
    setSelect(-1);
    Setdatetime(e);    
  }

  async function getFreeTime() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `http://eniacgroup.ir:8070/reserve/get-free-time/${doctor_id}/`,
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
      toast.error("!متاسفانه مشلکلی پیش آمده، رفرش نمایید", {
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

  async function getReservation() {
    try {
      const startDate = formatDate(new Date()); 
      const endDate = formatDate(addDays(new Date(), 30));
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "http://eniacgroup.ir:8070/reserve/between_dates/",
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
      toast.error("!متاسفانه مشلکلی پیش آمده، رفرش نمایید", {
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

  const [doctorProfile, setDoctorProfile] = useState([]);
  useEffect(() => {
    //  تابع برای دریافت اطلاعات پروفایل دکتراز بک‌اند
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://eniacgroup.ir:8070/profile/doctors/${doctor_id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctorProfile(response.data);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("!متاسفانه مشلکلی پیش آمده، رفرش نمایید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchDoctorProfile();
  }, []);

  async function CreateReservation() {
    try {
      const ReservationDate = DateString(selectedDay); // Format today's date as "yyyy-mm-dd" string
      const token = localStorage.getItem("accessToken");
      const response = await axios("http://eniacgroup.ir:8070/reserve/create/", {
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
        toast.success("رزرو وقت شما با موفقیت انجام شد", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        Setdatetime(selectedDay);
        CheckMedicalInfo();
      }
    } catch (error) {
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

  useEffect(() => {
    getFreeTime();
    getReservation();
    Setdatetime(selectedDay);    
  }, []);

  const [position, setPosition] = useState("right");
  useEffect(() => {
    const handleResize = () => {
      setPosition(window.innerWidth < 606 ? "bottom" : "right");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  function MyPlugin() {
    return (
      <div
        className="row reserve_plugin"
      >
        <h6 className="reserve_hour_title">ساعت های قابل رزرو</h6>
        <div className="reserve_hour_items row g-3  ">
          {LeftTimes.length == 0 && (
            <div className="Reservation_error_input">
              زمانی جهت مشاوره یافت نشد!
            </div>
          )}
          {LeftTimes.map((time, index, key) => (
            <div
              className="col-lg-5 col-xlg-5 col-md-5 col-sm-12"
              align="center"
            >
              <HourCard
                time={time}
                index={index}
                selected={selected}
                onClick={() => {
                  setSelect((prev) => (prev == index ? -1 : index));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer />
      <div className="d-grid py-5 all-page" onLoad={getReservation}>
        <div className="container reserve_Box" onLoad={getFreeTime}>
          <div className="Myrow g-3 w-100" dir="rtl" style={{ justifyContent:'center' }}>
          <div className="col col-md-12 col-lg-5 col-xsm-12 reserve_docProfile " >
            <button
            dir="ltr"
              className="col w-100 button_back"
              onClick={(e) => {
                navigate("/Home");
              }}
            >
              <p>صفحه اصلی</p>
              <svg
                xmlns="/Doctors"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 23 22"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
            <a href="#">
              <img
                src={doctorProfile.image}
                className="img-fluid w-100 rounded-circle"
                alt="image"
              />
            </a>
            <h2 className="font-custom">{doctorProfile.name}</h2>
            <div
              className="row fs-5"
              dir="rtl"
              align="center"
              style={selected == -1 ? { display: "none" } : { display: "flex" }}
            >
              <div className="col-12">
                <span className="col-4 ms-1">
                  <BsCalendarDate />
                </span>
                <span className="col-4 ms-4 font-custom"> تاریخ:</span>
                <span className="col-4 ">
                  {[
                    toPersianDigits(`${selectedDay.year}`),
                    toPersianDigits(`${selectedDay.month}`),
                    toPersianDigits(`${selectedDay.day}`),
                  ].join("/")}
                </span>
              </div>
              <div className="col-12">
                <span className="col-4 ms-1">
                  <IoMdTime />
                </span>
                <span className="col-4 ms-4"> ساعت:</span>
                <span className="col-4 ">
                  {toPersianDigits(`${LeftTimes[selected]}`)}
                </span>
              </div>
              <div className="reverse_choices_box">
                <ul className="reserve_choices">
                  <label className="reserve_choices_op">
                    <input
                      type="radio"
                      name="q1"
                      value="حضوری"
                      checked={res_type == "حضوری"}
                      onClick={(e) => setres_type("حضوری")}
                    />
                    <span>حضوری</span>
                  </label>
                  <label className="reserve_choices_op">
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
                  className="button_74"
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
                        background: "#075662",
                        color: "#FFFF",
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
                    }
                  }}
                  style={{ marginBottom: '10px' }}
                >
                  ثبت
                </button>
              </div>
            </div>
          </div>
          <div className="col-8 col-md-12 col-lg-5 col-sm-12" align="center">
            <Calendar
              calendar={persian}
              locale={persian_fa}
              value={selectedDay}
              onChange={(e) => {
                handleCalender(e);
                
              }}
              minDate={new DateObject()}
              maxDate={new DateObject().add(1, "month")}
              style={{
                fontSize: "60px",
                hieght: "500px",
                borderTopRightRadius: "50px",
              }}
              className="custom_calendar teal"
              plugins={[<MyPlugin position={position} />]}
            /> 
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
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;
