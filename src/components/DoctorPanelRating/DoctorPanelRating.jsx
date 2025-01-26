import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import CustomComments from "./CommentsCustom.jsx";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer.jsx";
import "./DoctorRating.css";

export default function DoctorRating() {
  const navigate = useNavigate();
  const [rate, setRating] = useState(null);
  const [rateCount, setRateCount] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    GetRating();
  }, []);

  const GetRating = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios(
        "http://eniacgroup.ir:8070/DoctorPanel/get_rating/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setRating(response.data.average_score);
        setRateCount(response.data.total_ratings_count);
        const commentsArray = response.data.comments || [];
        if (Array.isArray(commentsArray) && commentsArray.length > 0) {
          setComments(
            commentsArray.map((comment) => ({
              fullname: comment.patient_name,
              date: comment.date,
              rating: comment.rating,
              comment: comment.comments,
            }))
          );
        }
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
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  function convertToPersianNumbers(number) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
  }

  return (
    <>
      <NavBar_SideBar />
      <section className="vh-70 doctor-rating-section">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol xl="10">
              <MDBCard className="doctor-rating-card">
                <MDBCardBody className="doctor-rating-card-body">
                  {/* Header */}
                  <div>
                    <MDBTypography className="doctor-rating-title" tag="h3">
                      امتیازهای من
                    </MDBTypography>
                  </div>

                  <hr className="doctor-rating-divider" />

                  {/* Content */}
                  {isLoading ? (
                    <div className="text-center my-5">
                      {/* Spinner for loading */}
                      <MDBSpinner role="status" className="custom-spinner">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>

                    </div>
                  ) : (
                    <div className="doctor-rating-content">
                      {/* Comments Section */}
                      <div className="doctor-rating-comments">
                        <CustomComments comments={comments} />
                      </div>

                      {/* Rating Summary */}
                      <div className="doctor-rating-summary">
                        <Rating
                          size="large"
                          name="read-only"
                          precision={0.5}
                          value={rate}
                          readOnly
                        />
                        <MDBCardText className="doctor-rating-text">
                          .تا کنون {rateCount ? convertToPersianNumbers(rateCount) : <></>} نفر به شما امتیاز داده اند
                        </MDBCardText>
                      </div>
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
}
