import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBRow,
} from "mdb-react-ui-kit";
import Stars from "./Stars"; // Import the Stars component
import moment from "moment-jalaali"; // Import moment-jalaali for Persian date conversion

export default function Comments({ comments }) {
  const convertToPersianNumbers = (value) => {
    const persianNumbersMap = {
      "0": "۰",
      "1": "۱",
      "2": "۲",
      "3": "۳",
      "4": "۴",
      "5": "۵",
      "6": "۶",
      "7": "۷",
      "8": "۸",
      "9": "۹",
    };

    return value.replace(/[0-9]/g, (char) => persianNumbersMap[char] || char);
  };

  const convertToPersianDate = (gregorianDate) => {
    return moment(gregorianDate, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
  };

  // Sort comments by date (latest first)
  const sortedComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="vh-100">
      <MDBContainer className="py-2" style={{ width: "100%" }}>
        <MDBRow>
          {sortedComments.map((comment, index) => (
            <MDBCol md="11" lg="9" xl="7" key={index} style={{ width: "100%" }}>
              <div className="d-flex flex-start mb-4" style={{ width: "100%" }}>
                <MDBCard className="w-100">
                  <MDBCardBody
                    className="p-4"
                    style={{
                      direction: "rtl",
                      backgroundColor: "#e7f9ed",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <MDBTypography
                          tag="h5"
                          style={{ fontFamily: "Ios15Medium", marginRight: "10px", color: "#222222e0" }}
                        >
                        ناشناس
                        </MDBTypography>
                        <Stars
                          count={5}
                          rating={comment.rating}
                          setRating={() => { }} 
                          color="hsl(47, 90%, 60%)"
                          iconSize={25}
                          isInteractive={false} // Disable interaction
                        />
                      </div>
                      <p
                        className="small"
                        style={{ color: "gray", fontFamily: "Ios15Medium" }}
                      >
                        {convertToPersianNumbers(convertToPersianDate(comment.date))}
                      </p>
                      <p style={{ fontFamily: "Ios15Medium", color: "#4a4b4a" }}>{comment.comment}</p>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
