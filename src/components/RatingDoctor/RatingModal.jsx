import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rating_style.css";
import Stars from "./Stars";
import axios from "axios";
import Comments from "./Comments"; // Import the Comments component
import { TextField } from "@mui/material";

const RatingModal = (doctorId) => {
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
          comments: _comment,
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
        dialogClassName="scrollable-modal" // Custom class for styling
      >
        <div onClick={() => setShow(false)} className="rating_close_button">
          <IoIosClose className="rating_close_button_icon" />
        </div>
        <Modal.Header className="rating-header_modal">
          <Modal.Title className="rating-title_modal">اطلاعات و نظرات</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
          {/* Scrollable content */}
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
          </div>
           <div>
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
            
          </div>
          <div style={{width: "100%"}}>
          <Comments /> {/* Comments component */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div
            onClick={sendRating}
            className="rating-field_modal rating-btn"
            style={{ width: "96%", marginLeft: "2%" }}
          >
            <div className="rating-btn_layer"></div>
            <input type="submit" value="ارسال" />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RatingModal;
