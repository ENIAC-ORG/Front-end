import React from "react";
import "./doctor.css";
import { HashLink } from 'react-router-hash-link';

import myImage1 from "./img/teenagers2.jpg";
import myImage2 from "./img/kids.jpg";
import myImage3 from "./img/couples.jpg";
import myImage4 from "./img/clinical.jpg";
import myImage5 from "./img/psychiatry.jpg";
import myImage6 from "./img/couching.jpg";

const Doctor_Home = () => {
  return (
    <div className="bg-dark-custom2 m-5 rounded rounded-5">
    <div className="container-fluid project py-2 mb-5" >
      <div className="p-5">
        <div
          className="text-center mx-auto pb-1 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="doctor_h1 ">معرفی روان درمانگرها</h1>
        </div>
        <hr/>
        <div className="row m-0 g-5">
          <div className=" col col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage1}
                  className="img-fluid w-100 rounded z-4 relativ"
                  alt="img1"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#edu" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" , color: "white"}}>
                    حوزه تحصیلی
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage2}
                  className=" img-responsive w-100 rounded z-4 relativ"
                  alt="img2"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#Baby" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" , color: "rgb(174, 200, 223)"}}>
                    حوزه کودک
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage3}
                  className="img-fluid w-100 rounded z-4 relativ"
                  alt="img3"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#Family" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" }}>
                    حوزه خانواده
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage4}
                  className="img-fluid w-100 rounded z-4 relativ"
                  alt="img4"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#Individual" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" }}>
                    حوزه بالینی
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage5}
                  className="img-fluid w-100 rounded z-4 relativ"
                  alt="img5"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#psychiatry" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" }}>
                    حوزه روانپزشکی
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
            <div className="project1-item">
              <div className="project1-img">
                <img
                  src={myImage6}
                  className="img-fluid w-100 rounded z-4 relativ"
                  alt="img6"
                />
                <div className="project1-content">
                  <HashLink to="/Doctors#migration" className="text-center text-secondary" style={{ fontFamily: "Ios15Medium" }}>
                    حوزه کوچینگ
                    <p
                      className="m-0 text-white"
                      style={{ fontFamily: "Ios15Medium" }}
                    >
                      معرفی روانشناسان
                    </p>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Doctor_Home;
