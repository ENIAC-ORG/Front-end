import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stars from "../Stars/Stars";
import CustomComments from "./CommentsCustom.jsx";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import { useNavigate } from "react-router-dom";

const comments = [
  {
    id: 1,
    user: "کاربر شماره ۱",
    rating: 5,
    comment: "دکتر بسیار حرفه‌ای و خوش‌برخورد هستند. خیلی راضی بودم.",
    date: "۱۴۰۲/۱۰/۱۲",
  },
  {
    id: 2,
    user: "کاربر شماره ۲",
    rating: 4,
    comment: "مشاوره‌ای که از دکتر گرفتم بسیار مفید بود و نتیجه‌بخش.",
    date: "۱۴۰۲/۰۹/۲۵",
  },
  {
    id: 3,
    user: "کاربر شماره ۳",
    rating: 3,
    comment: "برخورد پرسنل خوب بود ولی زمان انتظار کمی طولانی بود.",
    date: "۱۴۰۲/۰۸/۱۸",
  },
  {
    id: 4,
    user: "کاربر شماره ۴",
    rating: 4,
    comment: "امکانات مطب بسیار خوب بود و بهداشت رعایت شده بود.",
    date: "۱۴۰۲/۰۷/۱۰",
  },
  {
    id: 5,
    user: "کاربر شماره ۵",
    rating: 5,
    comment: "دکتر با دقت به صحبت‌ها گوش دادند و راهنمایی‌های خوبی ارائه کردند.",
    date: "۱۴۰۲/۰۶/۱۵",
  },
];

import { FaHome } from "react-icons/fa"; // Import the home icon

export default function DoctorRating() {
  const navigate = useNavigate();
  const [rate, setRating] = useState(null);
  const [rateCount, setRateCount] = useState(null);

  useEffect(() => {
    GetRating();
  }, []);

  const GetRating = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios(
        "http://eniacgroup.ir:8070/DoctorPanel/get_rating/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer <access token >
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setRating(response.data.average_score);
        setRateCount(response.data.total_ratings_count);
      }
    } catch (error) {
      toast.error("!متاسفانه مشکلی رخ داد", {
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

  function convertToPersianNumbers(number) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
  }

  const formattedRate = rate !== null ? rate.toFixed(2) : null;

  return (
    <>
      <NavBar_SideBar />
      <section className="vh-100" style={{ backgroundColor: "#4891828f"}}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol xl="10">
              <MDBCard className="mb-5" style={{ borderRadius: "15px", backgroundColor: "rgb(249, 249, 249)" }}>
                <MDBCardBody className="p-4" style={{ maxHeight: "560px", position: "relative" }}>
                  {/* Header */}
                  <div>
                    <MDBTypography
                      style={{
                        direction: "rtl",
                        fontWeight: "bold",
                        color: "#198754",
                        fontFamily: "Ios15medium",
                        textAlign: "center",
                      }}
                      tag="h3"
                    >
                      امتیازهای من
                    </MDBTypography>
                    <div
                      style={{
                        position: "absolute",
                        top: "5%",
                        right: "3%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 10px",
                        fontFamily: "Ios15medium",
                        color: "rgb(114, 173, 161)",
                      }}
                      onClick={() => navigate("/Home")}
                    >
                      بازگشت به صفحه اصلی
                      <FaHome style={{ marginLeft: "5px", color: "rgb(114, 173, 161)" }} />

                    </div>
                  </div>

                  <hr style={{ color: "rgb(114, 173, 161)", opacity: "0.45" }} />
                  <div className="d-flex justify-content-center align-items-center">
                    <Rating
                      size="large"
                      name="read-only"
                      precision={0.5}
                      value={rate}
                      readOnly
                    />
                  </div>
                  <div
                    style={{ marginTop: "2%" }}
                    className="d-flex justify-content-center align-items-center mb-3"
                  >
                    <MDBCardText
                      style={{ fontSize: "20px" }}
                      className="text-uppercase mb-0"
                    >
                      <MDBIcon fas icon="cog me-2" />
                      .تا کنون{" "}
                      {rateCount ? (
                        convertToPersianNumbers(rateCount)
                      ) : (
                        <></>
                      )}{" "}
                      نفر به شما امتیاز داده اند
                    </MDBCardText>
                  </div>
                  <div
                    style={{
                      marginTop: "2%",
                      maxHeight: "300px", // Set a fixed height for the comments container
                      overflowY: "auto", // Enable vertical scrolling
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <CustomComments comments={comments} />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer />
      </section>
    </>
  );
}
