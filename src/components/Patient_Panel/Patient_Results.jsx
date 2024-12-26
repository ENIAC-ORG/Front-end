import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PiNotepadLight } from "react-icons/pi";
import { IoHeart } from "react-icons/io5";
import { GiPlantRoots , GiStrong , GiLaserSparks  } from "react-icons/gi";
import { GiFreedomDove } from "react-icons/gi";

import ISTP_M from "./Icons/ISTP_M.jpg"
import ISTP_F from "./Icons/ISTP_F.jpg"
import ISTJ_M from "./Icons/ISTJ_M.jpg"
import ISTJ_F from "./Icons/ISTJ_F.jpg"
import ISFP_M from "./Icons/ISFP_M.jpg"
import ISFP_F from "./Icons/ISFP_F.jpg"
import ISFJ_M from "./Icons/ISFJ_M.jpg"
import ISFJ_F from "./Icons/ISFJ_F.jpg"
import INTP_M from "./Icons/INTP_M.jpg"
import INTP_F from "./Icons/INTP_F.jpg"
import INTJ_M from "./Icons/INTJ_M.jpg"
import INTJ_F from "./Icons/INTJ_F.jpg"
import INFP_M from "./Icons/INFP_M.jpg"
import INFP_F from "./Icons/INFP_F.jpg"
import INFJ_M from "./Icons/INFJ_M.jpg"
import INFJ_F from "./Icons/INFJ_F.jpg"
import ESTP_M from "./Icons/ESTP_M.jpg"
import ESTP_F from "./Icons/ESTP_F.jpg"
import ESTJ_M from "./Icons/ESTJ_M.jpg"
import ESTJ_F from "./Icons/ESTJ_F.jpg"
import ESFP_M from "./Icons/ESFP_M.jpg"
import ESFP_F from "./Icons/ESFP_F.jpg"
import ESFJ_M from "./Icons/ESFJ_M.jpg"
import ESFJ_F from "./Icons/ESFJ_F.jpg"
import ENTP_M from "./Icons/ENTP_M.jpg"
import ENTP_F from "./Icons/ENTP_F.jpg"
import ENTJ_M from "./Icons/ENTJ_M.jpg"
import ENTJ_F from "./Icons/ENTJ_F.jpg"
import ENFP_M from "./Icons/ENFP_M.jpg"
import ENFP_F from "./Icons/ENFP_F.jpg"
import ENFJ_M from "./Icons/ENFJ_M.jpg"
import ENFJ_F from "./Icons/ENFJ_F.jpg"

import "./Patient_Panel.css";

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Patient_Result = ({ results, G }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row patient-panel-title">
          <PiNotepadLight className="fs-2 mt-2 ms-1" />
          <h1 className="font-custom">نتایج تست ها</h1>
        </div>
        <div className="patient-panel-res">
          <div className="col col-md-5 col-s-12 patient-panel-res_card">
            <h3 className="font-custom mt-3">Glasser</h3>
            <hr className="mx-3"/>
            {results?.glasserTest == null ? (
              <h5 className="my-5">نتیجه ای برای مشاهده وجود ندارد</h5>
            ) : (
              <ul style={{ listStyleType: "none",lineHeight:'49px' }}>
                <li>
                  <IoHeart style={{color:'red',marginRight:'0px'}}/>
                  <span>عشق</span>:{toPersianDigits(`${results.glasserTest.love}`)}
                </li>
                <li>
                  <GiPlantRoots style={{color:'green'}}/>
                  <span>بقا</span>:{toPersianDigits(`${results.glasserTest.survive}`)}
                </li>
                <li>
                  <GiFreedomDove style={{color:'blue'}}/>
                  <span>آزادی</span>:{toPersianDigits(`${results.glasserTest.freedom}`)}
                </li>
                <li>
                  <GiStrong style={{color:'brown'}}/>
                  <span>قدرت</span>:{toPersianDigits(`${results.glasserTest.power}`)}
                </li>
                <li>
                  <GiLaserSparks style={{color:'#B341EB'}}/>
                  <span>سرگرمی</span>:{toPersianDigits(`${results.glasserTest.fun}`)}
                </li>
              </ul>
            )}
          </div>
          <div className="col col-md-5 col-s-12 patient-panel-res_card">
            <h3 className="font-custom mt-3">MBTI</h3>
            <hr className="mx-3"/>
            {results?.MBTItest== null ? (
              <h5 className="my-5">نتیجه ای برای مشاهده وجود ندارد</h5>
            ) : (
              <>
              <img style={{width:'200px',height:'200px'}}
                src={ 
                  results.MBTItest== "INTJ"
                    ? G == "زن"
                      ? INTJ_F
                      : INTJ_M
                    : results.MBTItest== "INTP"
                    ? G == "زن"
                      ? INTP_F
                      : INTP_M
                    : results.MBTItest== "INFJ"
                    ? G == "زن"
                      ? INFJ_F
                      : INFJ_M
                    : results.MBTItest== "INFP"
                    ? G == "زن"
                      ? INFP_F
                      : INFP_M
                    : results.MBTItest== "ISTJ"
                    ? G == "زن"
                      ? ISTJ_F
                      : ISTJ_M
                    : results.MBTItest== "ISTP"
                    ? G == "زن"
                      ? ISTP_F
                      : ISTP_M
                    : results.MBTItest== "ISFJ"
                    ? G == "زن"
                      ? ISFJ_F
                      : ISFJ_M
                    : results.MBTItest== "ISFP"
                    ? G == "زن"
                      ? ISFP_F
                      : ISFP_M
                    : results.MBTItest== "ENTJ"
                    ? G == "زن"
                      ? ENTJ_F
                      : ENTJ_M
                    : results.MBTItest== "ENTP"
                    ? G == "زن"
                      ? ENTP_F
                      : ENTP_M
                    : results.MBTItest== "ENFJ"
                    ? G == "زن"
                      ? ENFJ_F
                      : ENFJ_M
                    : results.MBTItest== "ENFP"
                    ? G == "زن"
                      ? ENFP_F
                      : ENFP_M
                    : results.MBTItest== "ESTJ"
                    ? G == "زن"
                      ? ESTJ_F
                      : ESTJ_M
                    : results.MBTItest== "ESTP"
                    ? G == "زن"
                      ? ESTP_F
                      : ESTP_M
                    : results.MBTItest== "ESFJ"
                    ? G == "زن"
                      ? ESFJ_F
                      : ESFJ_M
                    : results.MBTItest== "ESFP"
                    ? G == "زن"
                      ? ESFP_F
                      : ESFP_M
                    : ""
                } />
              {results.MBTItest== "INTJ"
                    ? <h5 style={{color:'#A349A4'}}>معمار</h5>
                    : results.MBTItest== "INTP"
                    ? <h5 style={{color:'#A349A4'}}>منطق دان</h5>
                    : results.MBTItest== "INFJ"
                    ? <h5 style={{color:'#408E6D'}}>حامی</h5>
                    : results.MBTItest== "INFP"
                    ? <h5 style={{color:'#408E6D'}}>واسطه</h5>
                    : results.MBTItest== "ISTJ"
                    ? <h5 style={{color:"#33AAC7"}}>تدارکات</h5>
                    : results.MBTItest== "ISTP"
                    ? <h5 style={{color:"#C79D0B"}}>هنرشناس</h5>
                    : results.MBTItest== "ISFJ"
                    ? <h5 style={{color:"#33AAC7"}}>مدافع</h5>
                    : results.MBTItest== "ISFP"
                    ? <h5 style={{color:"#C79D0B"}}>جست و جو گر</h5>
                    : results.MBTItest== "ENTJ"
                    ? <h5 style={{color:'#A349A4'}}>فرماندار</h5>
                    : results.MBTItest== "ENTP"
                    ? <h5 style={{color:'#A349A4'}}>مناظره کننده</h5>
                    : results.MBTItest== "ENFJ"
                    ? <h5 style={{color:'#408E6D'}}>سردمدار</h5>
                    : results.MBTItest== "ENFP"
                    ? <h5 style={{color:'#408E6D'}}>سرباز کهنه کار</h5>
                    : results.MBTItest== "ESTJ"
                    ? <h5 style={{color:"#33AAC7"}}>مجری</h5>
                    : results.MBTItest== "ESTP"
                    ? <h5 style={{color:"#C79D0B"}}>پیش قدم</h5>
                    : results.MBTItest== "ESFJ"
                    ? <h5 style={{color:"#33AAC7"}}>کنسول</h5>
                    : results.MBTItest== "ESFP"
                    ? <h5 style={{color:"#C79D0B"}}>بازیگر</h5>
                    : ""}
              <p>{results.MBTItest}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Patient_Result;
