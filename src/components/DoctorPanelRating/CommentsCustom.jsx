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
import "./CommentsCustom.css"; // Import the updated CSS file

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
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="comment-container">
      {sortedComments.map((comment, index) => (
        <MDBRow
          key={index}
          className="comment-row d-flex justify-content-center"
        >
          <MDBCol md="8" style={{ padding: 0 }}>
            <MDBCard className="comment-card">
              <MDBCardBody className="comment-card-body">
                <div className="comment-header">
                  <div className="comment-header-content">
                    <MDBTypography tag="h6" className="comment-header-name">
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
                </div>

                {/* Date */}
                <p className="comment-date">
                  {convertToPersianNumbers(convertToPersianDate(comment.date))}
                </p>

                {/* Comment Content */}
                <p className="comment-content">{comment.comment}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      ))}
    </div>
  );
}
