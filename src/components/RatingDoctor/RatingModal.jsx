import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rating_style.css";
import Stars from "./Stars";
import axios from "axios";

const RatingModal = (doctorId) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [_comment, setValue] = useState("");
  const [_rating, setRating] = useState(0);

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
          comments: "",
        },
      });

      if (response.status === 200 || response.status === 201) {
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
      if (error.response.status === 400) {
        if (
          error.response.data.error ==
          "You can only rate a psychiatrist if you have had a reservation with them."
        )
          toast.error("!رزرو وقت برای امتیاز دهی الزامی است", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        else
          toast.error("!امتیاز دهی قبلا انجام شده", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      } else {
        toast.error("!متاسفانه مشکلی به وجود آمده", {
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
      >
        <div onClick={() => setShow(false)} className="rating_close_button">
          <IoIosClose className="rating_close_button_icon" />
        </div>
        <Modal.Header className="rating-header_modal">
          <Modal.Title className="rating-title_modal">امتیاز دادن</Modal.Title>
        </Modal.Header>
        <div className="rating-form_container_modal">
          <h4
            style={{
              fontFamily: "Ios15Medium",
              color: "gray",
              fontSize: "22px",
              textAlign: "center",
              direction: "rtl",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "-2%",
            }}
          >
            به این درمانگر از ۱ تا ۵ چه امتیازی می‌دهید؟
          </h4>
          <Stars setRating={setRating} rating={_rating} />
          {/* <div>
            <h4
              style={{
                fontFamily: "Ios15Medium",
                // marginBottom: "6%",
                color: "gray",
                fontSize: "22px",
                textAlign: "center",
                direction: "rtl",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              نظر خود را در مورد این درمانگر بنویسید.
            </h4>
            <TextField
              fullWidth
              multiline
              rows={1}
              rowsMax={4}
              autoComplete="off"
              variant="outlined"
              value={_comment}
              onChange={handleChange}
              dir="rtl" // Set the direction to RTL
              InputLabelProps={{
                dir: "rtl", // Set the direction of the label to RTL
              }}
            />
            
          </div> */}
          <div
            onClick={sendRating}
            className="rating-field_modal rating-btn"
            style={{ width: "96%", marginLeft: "2%", marginTop: "15%" }}
          >
            <div className="rating-btn_layer"></div>
            <input type="submit" value="ارسال" />
          </div>
        </div>
      </Modal>
      {show && <div className="rating-modal-background" />}
    </>
  );
};

export default RatingModal;
