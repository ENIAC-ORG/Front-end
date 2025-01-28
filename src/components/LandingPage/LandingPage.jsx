import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import image from "./title.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
import image4 from "./4.jpg";
import image1 from "./1.png";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar_SideBar />
      <div className="row d-flex justify-content-center align-self-center">
        <div className="col-6 starter_text" dir="rtl">
          <p className="p-5 fotn-custom ">
            <h2 className="color-h1 font-title">به اینیاک خوش آمدید!</h2>
            <hr />
            ایناک، کلینیک تخصصی در حوزه سلامت روان، با هدف ایجاد آرامش و بهبود
            کیفیت زندگی شما راه‌اندازی شده است. در اینیاک می‌توانید با انجام
            تست‌های روان‌شناسی، رزرو وقت مشاوره، و استفاده از دیگر امکانات
            موجود، به بهترین خدمات درمانی و مشاوره‌ای دسترسی پیدا کنید.
            <div className="d-flex justify-content-end m-4 mt-1">
              <button
                className="button-28"
                role="button"
                onClick={() => {
                  navigate("/Home");
                }}
              >
                شروع کنید!
              </button>
            </div>
          </p>
        </div>
        <div
          className="col-5 pb-3 pt-5 col-md-11 col-xlg-6 col-lg-6 col-sm-12 responsive-image"
          dir="ltr"
        >
          <img
            src={image}
            alt="اینیاک"
            className="d-flex justify-content-center"
          />
        </div>
      </div>
      <div className="p-5  bg-D8EFD3 rounded-5 m-5">
        <div className="card-group vgr-cards mb-5 mt-5">
          <div className="card border-0 ">
            <div className="card-img-body bg-D8EFD3">
              <img
                className="card-img rounded-5 "
                src={image3}
                alt="Card image cap"
              />
            </div>
            <div className="card-body bg-D8EFD3" dir="rtl">
              <h4 className="font-Ios fs-1 color-h1 font-title">
                پزشک مورد نیاز شما، در کمترین زمان ممکن!
              </h4>
              <p className="card-text pe-4">
                وقت خود را صرف جستجوهای پیچیده نکنید! با استفاده از سیستم هوشمند
                و پیشرفته اینیاک، شما می‌توانید در کوتاه‌ترین زمان ممکن و تنها
                با پاسخ دادن به چند سؤال ساده و هدفمند، به بهترین پزشک متخصص
                روان‌شناسی که دقیقاً با نیازهای شما همخوانی دارد، متصل شوید. این
                سیستم با تجزیه و تحلیل هوشمند داده‌های شما، به‌طور خودکار
                پزشکانی را پیشنهاد می‌دهد که در راستای اهداف درمانی شما قرار
                دارند. بدین ترتیب، شما به‌راحتی و بدون نیاز به جستجوهای وقت‌گیر،
                گامی سریع و مؤثر به سمت درمان و بهبود روانی خود برداشته و از
                مشاوره‌ای دقیق و تخصصی بهره‌مند خواهید شد.
              </p>
            </div>
          </div>
          <hr />
        </div>
        <hr />
        <div className="card-group vgr-cards mb-5">
          <div className="card border-0 ">
            <div className="card-body bg-D8EFD3 pe-4" dir="rtl">
              <h4 className="color-h1 mt-5 font-Ios fs-1 font-title">
                یک قدم تا آرامش ذهنی؛ همین حالا وقت مشاوره خود را آنلاین رزرو
                کنید!
              </h4>
              <p className="card-text pe-4">
                سیستم وقت‌دهی آنلاین به شما و پزشکان امکان برنامه‌ریزی آسان و
                مؤثر را می‌دهد. پزشکان می‌توانند به راحتی وقت‌های خالی خود را
                تعیین و برنامه‌ریزی کنند و به سوابق پزشکی بیماران خود دسترسی
                داشته باشند. همچنین بیماران می‌توانند به سادگی وقت مشاوره خود را
                با پزشک دلخواه رزرو کنند. برای اطمینان از عدم فراموشی، یادآورهای
                خودکار برای وقت‌های رزرو شده ارسال می‌شود تا تجربه‌ای بدون دغدغه
                و هماهنگ داشته باشید.
              </p>
            </div>
            <div className="card-img-body bg-D8EFD3">
              <img
                className="card-img rounded-5"
                src={image2}
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="card-group vgr-cards mb-5 mt-5">
          <div className="card border-0 ">
            <div className="card-img-body bg-D8EFD3">
              <img
                className="card-img rounded-5 "
                src={image1}
                alt="Card image cap"
              />
            </div>
            <div className="card-body bg-D8EFD3" dir="rtl">
              <h4 className="mt-5 font-Ios fs-1 color-h1 font-title">
                تست‌های روان‌شناسی اینیاک: اولین گام به سوی شناخت بهتر خود و
                آرامش ذهنی!
              </h4>
              <p className="mt-5 card-text pe-4">
                در اینیاک، با مجموعه‌ای از تست‌های معتبر روان‌شناسی همچون MBTI،
                Glasser و تست‌های دیگر، به شما کمک می‌کنیم تا شخصیت و نیازهای
                روانی خود را بهتر بشناسید. این تست‌ها توسط متخصصین تایید شده‌اند
                و می‌توانند مسیر روشن‌تری برای بهبود سلامت روان و روابط شما
                فراهم کنند.
              </p>
            </div>
          </div>
        </div>
        <hr />

        <div className="card-group vgr-cards mb-5 mt-5">
          <div className="card border-0 ">
            <div className="card-body bg-D8EFD3 pe-4" dir="rtl">
              <h4 className="color-h1 mt-5 font-Ios fs-1 font-title">
                دکترهای متخصص روان‌شناسی، همیشه در دسترس شما!
              </h4>
              <p className="card-text pe-4">
                ما مجموعه‌ای از بهترین پزشکان روان‌شناسی را برای شما گردآوری
                کرده‌ایم. با دسترسی به این بانک اطلاعاتی گسترده، شما می‌توانید
                از بین صدها دکتر متخصص، بهترین گزینه را براساس نیازهای خاص خود
                انتخاب کنید. هر پزشک با تخصص‌ها و تجربه‌های منحصر به فرد خود،
                آماده است تا شما را در مسیر بهبود روانی و سلامتی هدایت کند. شما
                می‌توانید با مشاهده پروفایل‌های کامل پزشکان، نظرات بیماران قبلی
                و تخصص‌های دقیق آن‌ها، بهترین انتخاب را برای درمان خود داشته
                باشید و به سرعت و با اعتماد به نفس به درمان خود ادامه دهید.
              </p>
            </div>
            <div className="card-img-body bg-D8EFD3">
              <img
                className="card-img rounded-5"
                src={image4}
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-custom pt-2 pb-5 text-center" dir="rtl">
        <h3 className="lh-lg">
          همین حالا ثبت‌نام کنید و اولین گام را به سوی سلامت روان و آرامش
          بردارید؛ با پیوستن به اینیاک، به مجموعه‌ای از بهترین پزشکان و خدمات
          روان‌شناسی دسترسی پیدا کنید!
        </h3>
        <div className="d-flex justify-content-center mt-4">
              <button className="button-28" role="button" onClick={()=>{navigate("/Home");}}>
                شروع کنید!
              </button>
            </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
