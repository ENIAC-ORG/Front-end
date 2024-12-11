import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rating_style.css";
import Stars from "./Stars";
import axios from "axios";
import Comments from "./Comments";
import { TextField } from "@mui/material";
import CompleteInfoModal from "../CompleteInfoModal/Complete_Info.jsx"

import person_img from "../../assets/unknown.jpg";


const RatingInfoModal = (doctorId) => {
  const [show, setShow] = useState(false);
  const [_comment, setValue] = useState("");
  const [_rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("info"); // Default to "اطلاعات دکتر"
  const [img, setImg] = useState("");
  const [field, setField] = useState("");
  const [clinicAddr, setClinicAddr] = useState("");
  const [telephoneNum, setTelephoneNum] = useState("");
  const [doctorCode, setDoctorCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false); // Loading state


  // Mock comments list
  const [comments, setComments] = useState([]);

  const getDoctorInfo = async (doctorId) => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(`http://46.249.100.141:8070//DoctorPanel/getdoctorinfo/${doctorId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      if (response.data) {
        setImg(response.data.image);
        setField(response.data.field);
        setClinicAddr(response.data.clinic_address);
        setTelephoneNum(response.data.clinic_telephone_number);
        setDoctorCode(response.data.doctorate_code);
        setFullname(response.data.fullname);
        setDescription(response.data.description);

      }
    } catch (error) {
      console.log(error.response)
      toast.error("خطا", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        fontFamily: "Ios15Medium"
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  async function getRatings(doctorId) {
    try {
    const token = localStorage.getItem("accessToken");
    const response = await axios(`http://46.249.100.141:8070//Rating/get/${doctorId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        psychiatrist: doctorId.doctorId,
        rating: _rating,
        comments: _comment,
      },
    });

    console.log(response.data.comments);
    if (response.status === 200 || response.status === 201) {
      const commentsArray = response.data.comments|| [];
      if (Array.isArray(commentsArray) && commentsArray.length > 0) {
        setComments((prevComments) => {
          const updatedComments = commentsArray.map((comment) => {
              return {
              fullname: comment.patient_name,
              date: comment.date,
              rating: comment.rating,
              comment: comment.comments
            };
          });

          return updatedComments;
        });
      }
      console.log(comments);
    }
  } catch (error) {
    console.log(error.response.data)
  }
};


  async function sendRating() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios("http://46.249.100.141:8070//Rating/Rate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          psychiatrist: doctorId.doctorId,
          rating: _rating,
          comments: _comment,
        },
      });

      if (response.status === 200 || response.status === 201) {
        getRatings(doctorId.doctorId)
        setValue("");
        setShow(false);
        toast.success("!نظر شما با موفقیت ثبت شد", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error.response.data)
      console.log(error.response.data.error);
      if (_rating == 0) {
        toast.error("حداقل امتیاز قابل قبول ۱ می‌باشد", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          fontFamily: "Ios15Medium"
        });
        return
      }
      if (error.response.data.error == "You can only rate a psychiatrist if you have had a reservation with them.") {
        toast.error("برای امتیازدهی رزرو زمان مشاوره الزامی است", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          fontFamily: "Ios15Medium"
        });
      } else if (error.response.data.error == "You have already rated this psychiatrist.") {
        toast.error("حداکثر تعداد دفعات ثبت نظر یک بار است", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          fontFamily: "Ios15Medium"
        });
      } else {
        toast.error("!مشکلی در ارسال نظر وجود دارد", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          fontFamily: "Ios15Medium"
        });
      }
    }
  }

  useEffect(() => {
    if (show) {
      getDoctorInfo(doctorId.doctorId);
      getRatings(doctorId.doctorId);
    }
  }, [show, doctorId.doctorId]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const convertToPersianNumbers = (value) => {
    const persianNumbersMap = {
      '0': '۰',
      '1': '۱',
      '2': '۲',
      '3': '۳',
      '4': '۴',
      '5': '۵',
      '6': '۶',
      '7': '۷',
      '8': '۸',
      '9': '۹',
    };

    return value.replace(/[0-9]/g, (char) => persianNumbersMap[char] || char);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        className="rating-button-20"
      >
        امتیازدهی
      </Button>
      <Modal
        backdrop="static"
        show={show}
        onHide={() => {
          setShow(false);
          setValue(""); // Clear the TextField
          setRating(0); // Reset the rating
        }}
        className="rating-bd_modal modal rating-wrapper_modal"
        centered
        dialogClassName="scrollable-modal"
      >
        <ToastContainer />
        <div onClick={() => {
          setShow(false);
          setValue(""); // Clear the TextField
          setRating(0); // Reset the rating
          setActiveTab("info");
        }} className="rating_close_button">
          <IoIosClose className="rating_close_button_icon" />
        </div>
        <Modal.Header className="rating-header_modal">
          <Modal.Title className="rating-title_modal">اطلاعات و نظرات</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "490px", overflowY: "auto" }}>
          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "1px solid gray",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setActiveTab("comments")}
              style={{
                backgroundColor:
                  activeTab === "comments" ? "rgb(232 246 236)" : "transparent",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                fontFamily: "Ios15Medium",
                color: "#40513B",
                fontSize: "20px",
                
              }}
            >
              نظرات
            </button>
            <button
              onClick={() => setActiveTab("info")}
              style={{
                backgroundColor: activeTab === "info" ? "rgb(232 246 236)" : "transparent",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                fontFamily: "Ios15Medium",
                color: "#40513B",
                fontSize: "20px",
              }}
            >
              مشخصات دکتر
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "info" && (
            <div>
              <h4
                style={{
                  fontFamily: "Ios15Medium",
                  color: "#4e695c",
                  fontSize: "23px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "20px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                }}
              >
                مشخصات دکتر
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  // padding: "20px",
                }}
              >
                {/* Doctor's Image */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1%"
                  }}
                >
                  <img
                    src={person_img} // Provide a default image URL if no image is available
                    alt="Doctor"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div style={{
                direction: "rtl",
                // paddingTop: "20px",
                paddingRight: "30px",
                // marginBottom: "27%",
              }}>
                {/* Doctor's Information */}
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", marginBottom: "10px", color: "#535453" }}>
                  نام دکتر: <span className="value-color">{fullname}</span>
                </h5>
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", marginBottom: "10px", color: "#535453" }}>
                  حوزۀ فعالیت: <span className="value-color">{field}</span>
                </h5>
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", marginBottom: "10px", color: "#535453" }}>
                  آدرس کلینیک: <span className="value-color">{convertToPersianNumbers(clinicAddr)}</span>
                </h5>
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", marginBottom: "10px", color: "#535453" }}>
                  شماره تماس کلینیک:{" "}
                  <span className="value-color">{convertToPersianNumbers(telephoneNum)}</span>
                </h5>
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", color: "#535453" }}>
                  شماره نظام:{" "}
                  <span className="value-color">{convertToPersianNumbers(doctorCode)}</span>
                </h5>
                <h5 style={{ fontFamily: "Ios15Medium", fontSize: "18px", color: "#535453" }}>
                  توضیحات:{" "}
                  <span className="value-color">{convertToPersianNumbers(description)}</span>
                </h5>
              </div>

              <CompleteInfoModal doctorId={doctorId.doctorId} />
            </div>
          )}
          {activeTab === "comments" && (
            <div>
              <div className="rating-form_container_modal">
              <h4
                style={{
                  fontFamily: "Ios15Medium",
                  color: "#4e695c",
                  fontSize: "19px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "5%",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                }}
              >
                ثبت نظر و امتیاز
              </h4>
                <h4
                  style={{
                    fontFamily: "Ios15Medium",
                    color: "gray",
                    fontSize: "18px",
                    direction: "rtl",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "-2%",
                  }}
                >
                  به این درمانگر از ۱ تا ۵ چه امتیازی می‌دهید؟
                </h4>
                <Stars setRating={setRating} rating={_rating} iconSize={45} />
                <div style={{ height: "110px" }}>
                  <h4
                    style={{
                      fontFamily: "Ios15Medium",
                      color: "gray",
                      fontSize: "18px",
                      direction: "rtl",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "5%",
                    }}
                  >
                    نظر خود را در مورد این درمانگر بنویسید.
                  </h4>
                  <TextField
                    fullWidth
                    multiline
                    rows={1}
                    maxRows={5}
                    autoComplete="off"
                    variant="outlined"
                    value={_comment}
                    onChange={handleChange}
                    dir="rtl"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray", // Outline color
                        },
                        "&:hover fieldset": {
                          borderColor: "darkgray", // Outline color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "gray", // Outline color when focused
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "gray", // Text color
                      },
                    }}
                    InputLabelProps={{
                      dir: "rtl",
                    }}
                  />

                </div>
                <div
                  onClick={sendRating}
                  className="rating-field_modal rating-btn"
                  style={{ width: "96%", marginLeft: "2%" }}
                >
                  <div className="rating-btn_layer">
                    <input
                      style={{ fontFamily: "Ios15Medium" }}
                      type="submit"
                      value="ارسال نظر و امتیاز"
                    />
                  </div>
                </div>

              </div>
              <h4
                style={{
                  fontFamily: "Ios15Medium",
                  color: "#4e695c",
                  fontSize: "19px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "20px",
                  textAlign: "center",
                  paddingTop: "6%",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                }}
              >
                نظرات مراجعین ({convertToPersianNumbers(comments.length.toString())} نظر)
              </h4>
              <Comments comments={comments} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RatingInfoModal;
