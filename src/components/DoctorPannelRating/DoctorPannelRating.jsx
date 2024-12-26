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
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import { useNavigate } from "react-router-dom";

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
        console.log(response.data);
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
      <section className="vh-100" style={{ backgroundColor: "#8A7DFA" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol xl="10">
              <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <MDBTypography
                    style={{
                      direction: "rtl",
                      fontWeight: "bold",
                      color: "#6554FD",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    tag="h3"
                  >
                    امتیازهای من
                  </MDBTypography>
                  <div
                    style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <hr
                      style={{ color: "#8A7DFA", opacity: "0.45" }}
                      className="my-4"
                    />
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
                    <div style={{ marginTop: "5%" }}>
                      <a
                        style={{ color: "#B9B1FD" }}
                        href="#"
                        onClick={(e) => navigate("/Home")}
                      >
                        {" "}
                        بازگشت به صفحۀ اصلی
                      </a>
                    </div>
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
