import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBTypography,
  MDBRow,
} from "mdb-react-ui-kit";
import Stars from "../Stars/Stars";
import moment from "moment-jalaali";

export default function CustomComments({ comments }) {
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
    <div style={{ direction: "rtl", height: "100%", overflowX: "hidden" }}>
      {sortedComments.map((comment, index) => (
        <MDBRow
          key={index}
          className="d-flex justify-content-center"
          style={{ marginBottom: "10px" }}
        >
          <MDBCol md="8" style={{ padding: 0 }}> {/* Restrict width */}
            <MDBCard style={{ overflow: "hidden", borderRadius: "10px" }}>
              <MDBCardBody
                style={{
                  backgroundColor: "rgb(208, 229, 221, 0.63)",
                  padding: "10px", // Compact padding
                  direction: "rtl", // Ensure text flows correctly
                  maxHeight: "530px"
                }}
              >
                <div>
                  {/* Header: User and Stars */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" , width: "40%"}}>
                    <MDBTypography
                      tag="h6" // Use smaller font for user name
                      style={{
                        fontFamily: "Ios15Medium",
                        color: "#222222e0",
                        marginRight: "10px",
                        textAlign: "right", // Align text to the right
                        flex: 1,
                      }}
                    >
                      ناشناس
                    </MDBTypography>
                    <Stars
                      count={5}
                      rating={comment.rating}
                      setRating={() => {}}
                      color="hsl(47, 90%, 60%)"
                      iconSize={20} 
                      isInteractive={false}
                    />
                  </div>

                  {/* Date */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "gray",
                      fontFamily: "Ios15Medium",
                      margin: "5px 0",
                      textAlign: "right", 
                      marginRight: "2%"

                    }}
                  >
                    {convertToPersianNumbers(convertToPersianDate(comment.date))}
                  </p>

                  {/* Comment Content */}
                  <p
                    style={{
                      fontFamily: "Ios15Medium",
                      color: "#4a4b4a",
                      fontSize: "15px",
                      textAlign: "right", 
                      marginRight: "2%"
                    }}
                  >
                    {comment.comment}
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ))}
    </div>
  );
}
