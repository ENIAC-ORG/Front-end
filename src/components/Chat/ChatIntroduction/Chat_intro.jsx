import "./Chat_intro.css";
import React from "react";
import { useNavigate } from "react-router-dom";

import img from "./chat.png";

const Chat_Intro = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div
        className="my-4 p-5 row d-flex align-items-center justify-content-center bg-chat-custom ww"
        dir="rtl"
      >
        <div className="col  chat-intro">
          <p className="col-12 mb-4 font-custom chat-title">
            گفت‌وگو کنید،
            <br />
            احساس بهتری داشته باشید
          </p>
          <p className="col-12 font-custom text-align-right chat-intro">
            ما می‌دانیم که صحبت کردن درباره احساسات و افکار، به‌ویژه در شرایط
            سخت، می‌تواند دشوار باشد. به همین دلیل، فضایی امن و بدون قضاوت برای
            شما ایجاد کرده‌ایم تا بتوانید راحت‌تر احساسات خود را بیان کنید.
            <br />
            <br />
            چت پشتیبانی هوشمند ما به صورت ۲۴ ساعته و ۷ روز هفته در دسترس شماست.
            اگر احساس ناراحتی، اضطراب یا نیاز به هم‌صحبتی دارید، این ابزار
            نوآورانه برای ارائه پشتیبانی محرمانه و همدلانه در کنار شماست.
          </p>
          <strong> پشتیبانی محرمانه و همدلانه در کنار شماست!</strong>
          <br />
          <div align="left">
        
            <button class="button-17 font-custom" role="button" onClick={(e) => {
                navigate("/chat");
              }}>شروع چت</button>

          </div>
        </div>
        <div className="col" align="center">
          <img src={img} className="chat-img" />
        </div>
        <div className="col d-flex flex-column align-items-center chat-p3" >
          <div
            class="chat-bubble font-custom" style={{marginRight:'-200px'}}
          >
            دسترسی در هر زمان و هر مکان{" "}
          </div>
          <div
            class="chat-bubble font-custom"
          >
            پاسخ‌های همدلانه برای بهتر شنیده شدن
          </div>
          <div class="chat-bubble font-custom " style={{marginRight:'-200px'}}>
            گفت‌وگوی خصوصی و امن{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat_Intro;
