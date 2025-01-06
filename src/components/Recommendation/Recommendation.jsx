import React from "react";
import "./Recommendation.css";
import first_image from "./img/psychology3.jpg";
import second_image from "./img/psychology2.jpg";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const IsDoctor = localStorage.getItem("role") == "doctor";

  return (
    <div className="container-fluid custom-container py-5 mb-4 mt-1">
      <div className=" custom-container">
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
          {IsDoctor ?
            <div
              className="col-lg-7 col-md-6 col-sm-12 wow fadeIn"
              data-wow-delay=".5s"
              style={{
                visibility: "visible",
                animationDelay: "0.5s",
                animationName: "fadeIn",
              }}
            >
              <h4 className="recom_text_color doctor_h2">همکاری برای ارائه درمان بهتر</h4>
              <h1 className="mb-4 doctor_h3">پیشنهاد بیماران مناسب برای شما</h1>
              <p className="recom_text">
                با پاسخ به چند سوال کوتاه، اینیاک با کمک هوش مصنوعی بیماران متناسب با تخصص و ترجیحات شما را معرفی می‌کند. به ساده‌ترین شکل به بهترین نتایج درمانی برسید!
              </p>
              <h5 className="recom_text_color doctor_h2">
                {" "}
                چرا باید شرکت کنید؟
              </h5>
              <p className=" recom_text">
                <FcApproval />
                بهبود فرآیند تطبیق
              </p>
              <p className=" recom_text">
                <FcApproval />
                تمرکز بر علایق درمانی شما
              </p>
              <p className=" recom_text">
                <FcApproval />
                افزایش رضایت بیمار و درمانگر
              </p>
              <a
                href="#"
                className="btn btn-secondary rounded-pill  px-5 py-3 text-white"
                onClick={(e) => {
                  navigate("/RecommendationPage");
                }}
              >
                شروع
              </a>
            </div>
            :
            <div
              className="col-lg-7 col-md-6 col-sm-12 wow fadeIn"
              data-wow-delay=".5s"
              style={{
                visibility: "visible",
                animationDelay: "0.5s",
                animationName: "fadeIn",
              }}
            >
              <h4 className="recom_text_color doctor_h2">راهنمای رزرو نوبت</h4>
              <h1 className="mb-4 doctor_h3">پیشنهاد روان درمانگر</h1>
              <p className="recom_text">
                با قابلیت جدید اینیاک به کمک هوش مصنوعی دکتر مناسب خود را انتخاب
                کنید
              </p>
              <h5 className="recom_text_color doctor_h2">
                {" "}
                پیشنهاد بهترین درمانگر برای شما بر اساس
              </h5>
              <p className=" recom_text">
                <FcApproval />
                ملاحظات شخصی
              </p>
              <p className=" recom_text">
                <FcApproval />
                سابقه درمانی
              </p>
              <p className=" recom_text">
                <FcApproval />
                تناسب تخصص پزشک و شرح حال شما
              </p>
              <a
                href="#"
                className="btn btn-secondary rounded-pill  px-5 py-3 text-white"
                onClick={(e) => {
                  navigate("/RecommendationPage");
                }}
              >
                شروع
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AboutSection;