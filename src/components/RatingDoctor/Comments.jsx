import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Comments() {
  return (
    <section className="vh-100">
      <MDBContainer className="py-5" style={{ maxWidth: "46vw" }}>
        <MDBRow>
          <MDBCol md="11" lg="9" xl="7">
            <div className="d-flex flex-start mb-4">
              {/* <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                alt="avatar"
                width="65"
                height="65"
              /> */}

              <MDBCard className="w-100">
                <MDBCardBody className="p-4" style={{direction: "rtl", backgroundColor: "#e7f9ed"}}>
                  <div>
                    <MDBTypography tag="h5">ناشناس</MDBTypography>
                    <p className="small" style={{color: "gray"}}>3 ساعت پیش</p>
                    <p>
                      درمانگر بسیار عالی ای هستند.
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>

            <div className="d-flex flex-start mb-4" style={{direction: "rtl", backgroundColor: "#e7f9ed"}}>
              {/* <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                alt="avatar"
                width="65"
                height="65"
              /> */}

              <MDBCard className="w-100">
                <MDBCardBody className="p-4" style={{direction: "rtl"}}>
                  <div>
                    <MDBTypography tag="h5">Mindy Campbell</MDBTypography>
                    <p className="small" style={{direction: "rtl"}}>5 hours ago</p>
                    <p style={{direction: "rtl"}}>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Delectus cumque
                    </p>

                  </div>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}