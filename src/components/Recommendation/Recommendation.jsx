import React from "react";
import "./Recommendation.css";
import first_image from "./img/psychology3.jpg";
import second_image from "./img/psychology2.jpg";
import { FcBusinessContact } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid custom-container py-5 my-5">
      <div className=" custom-container pt-5">
        <div className="row g-5">
          <div
            className="col-lg-5 col-md-6 col-sm-12 wow fadeIn"
            data-wow-delay=".3s"
            style={{
              visibility: "visible",
              animationDelay: "0.3s",
              animationName: "fadeIn",
            }}
          >
            <div className="h-100 position-relative">
              <img
                src={first_image}
                className="img-fluid w-75 rounded"
                alt=""
                style={{ marginBottom: "30%" }}
              />
              <div
                className="position-absolute w-75"
                style={{ top: "35%", left: "30%" }}
              >
                <img
                  src={second_image}
                  className="img-fluid w-100 rounded"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div
            className="col-lg-7 col-md-6 col-sm-12 wow fadeIn"
            data-wow-delay=".5s"
            style={{
              visibility: "visible",
              animationDelay: "0.5s",
              animationName: "fadeIn",
            }}
          >
            <h4 className="text-primary doctor_h2">راهنمای رزرو نوبت</h4>
            <h1 className="mb-4 doctor_h3">پیشنهاد روان درمانگر</h1>
            <p className="recom_text">
              با قابلیت جدید اینیاک به کمک هوش مصنوعی دکتر مناسب خود را انتخاب
              کنید
            </p>
            <h5 className="text-primary doctor_h2">
              {" "}
              پیشنهاد بهترین درمانگر برای شما بر اساس
            </h5>
            <p className=" recom_text">
              <FcBusinessContact />
              ملاحظات شخصی
            </p>
            <p className=" recom_text">
              <FcBusinessContact />
              سابقه درمانی
            </p>
            <p className=" recom_text">
              <FcBusinessContact />
              تناسب تخصص پزشک و شرح حال شما
            </p>
            <a
              href="#"
              className="btn btn-secondary rounded-pill  px-5 py-3 text-white"
              onClick={(e)=>{navigate("/RecommendationPage");}}
            >
              شروع
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
