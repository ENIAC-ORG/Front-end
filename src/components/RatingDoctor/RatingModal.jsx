import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rating_style.css";
import Stars from "./Stars";
import axios from "axios";
import Comments from "./Comments";
import { TextField } from "@mui/material";

const RatingModal = (doctorId) => {
  const [show, setShow] = useState(false);
  const [_comment, setValue] = useState("");
  const [_rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("info"); // Default to "اطلاعات دکتر"

  // Mock comments list
  const [comments, setComments] = useState([
    {
      author: "ناشناس",
      time: "3 ساعت پیش",
      content: "درمانگر بسیار عالی ای هستند.",
      rating: 5,
    },
    {
      author: "Mindy Campbell",
      time: "10 ساعت پیش",
      content: "زیاد راضی نبودم",
      rating: 2.5,
    },
    {
      author: "Ali Reza",
      time: "1 روز پیش",
      content: "بسیار حرفه‌ای و دلسوز بودند.",
      rating: 5,
    },
  ]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  async function sendRating() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios("http://127.0.0.1:8000//Rating/Rate/", {
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
        setComments((prevComments) => [
          {
            author: "ناشناس",
            time: "لحظاتی پیش",
            content: _comment,
            rating: _rating,
          },
          ...prevComments,
        ]);
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
      console.log(error);
      toast.error("!مشکلی در ارسال نظر وجود دارد", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <ToastContainer />
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
        onHide={() => setShow(false)}
        className="rating-bd_modal modal rating-wrapper_modal"
        centered
        dialogClassName="scrollable-modal"
      >
        <div onClick={() => setShow(false)} className="rating_close_button">
          <IoIosClose className="rating_close_button_icon" />
        </div>
        <Modal.Header className="rating-header_modal">
          <Modal.Title className="rating-title_modal">اطلاعات و نظرات</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                fontFamily: "Ios15Medium",
                color: "#40513B",
                fontSize: "20px",
              }}
            >
              اطلاعات دکتر
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "info" && (
            <div>
              <h4
                style={{
                  fontFamily: "Ios15Medium",
                  color: "gray",
                  fontSize: "23px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "20px",
                  textAlign: "center"

                }}
              >
                اطلاعات دکتر
              </h4>
              <div
                style={{
                  direction: "rtl",
                  paddingTop: "20px",
                  paddingRight: "30px",
                  marginBottom: "27%",
                }}
              >
                <h5 style={{ fontFamily: "Ios15Medium" }}>آدرس: خیابان نمونه</h5>
                <h5 style={{ fontFamily: "Ios15Medium" }}>شماره تماس: 123456789</h5>
                <h5 style={{ fontFamily: "Ios15Medium" }}>شماره نظام: 12345</h5>
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
                    value="رزرو وقت مشاوره"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "comments" && (
            <div>
              <h4
                style={{
                  fontFamily: "Ios15Medium",
                  color: "gray",
                  fontSize: "23px",
                  fontWeight: "bold",
                  direction: "rtl",
                  marginBottom: "20px",
                  textAlign: "center"

                }}
              >
                نظرات کاربران
              </h4>
              <div className="rating-form_container_modal">
                <h4
                  style={{
                    fontFamily: "Ios15Medium",
                    color: "gray",
                    fontSize: "20px",
                    direction: "rtl",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "-2%",
                  }}
                >
                  به این درمانگر از ۱ تا ۵ چه امتیازی می‌دهید؟
                </h4>
                <Stars setRating={setRating} rating={_rating} iconSize={45} />
                <div style={{height:"110px"}}>
                  <h4
                    style={{
                      fontFamily: "Ios15Medium",
                      color: "gray",
                      fontSize: "20px",
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
                    rowsMax={5}
                    autoComplete="off"
                    variant="outlined"
                    value={_comment}
                    onChange={handleChange}
                    dir="rtl"
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
              <Comments comments={comments} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RatingModal;
