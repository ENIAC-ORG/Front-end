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

export default function Comments({ comments }) {
    return (
        <section className="vh-100">
            <MDBContainer className="py-2" style={{width: "100%"}}>
                <MDBRow>
                    {comments.map((comment, index) => (
                        <MDBCol md="11" lg="9" xl="7" key={index} style={{width: "100%"}}>
                            <div className="d-flex flex-start mb-4" style={{width: "100%"}}>
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
                                                    style={{ fontFamily: "Ios15Medium", marginRight: "10px" }}
                                                >
                                                    ناشناس
                                                </MDBTypography>
                                                {/* Add Stars component here */}
                                                <Stars
                                                    count={5}
                                                    rating={comment.rating}
                                                    setRating={() => { }} // No-op, since the stars are not interactive
                                                    color="hsl(47, 90%, 60%)"
                                                    iconSize={25}
                                                    isInteractive={false} // Disable interaction
                                                />

                                            </div>
                                            <p
                                                className="small"
                                                style={{ color: "gray", fontFamily: "Ios15Medium" }}
                                            >
                                                {comment.time}
                                            </p>
                                            <p style={{ fontFamily: "Ios15Medium" }}>{comment.content}</p>
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
