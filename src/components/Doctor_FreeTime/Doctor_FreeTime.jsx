import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import "./Doctor_FreeTime.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Doctor_FreeTime_Add from "./Doctor_FreeTime_Add";
import Doctor_FreeTime_Edit from "./Doctor_FreeTime_Edit";

const Doctor_FreeTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Page, SetPage] = useState(1);

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer />
      <div className="ft_body row d-grid " dir="rtl">
        <div className="ft_Box container ">
          <div className="col-12 ">
            <h2 className="font-custom text-center">مدیریت ساعت کاری </h2>
            <ul class="nav nav-tabs">
              <li
                class="nav-item "
                onClick={() => {
                  Page ? {} : SetPage(1);
                }}
              >
                <a
                  class={"nav-link " + (Page ? "active" : "")}
                  aria-current="page"
                >
                  ایجاد
                </a>
              </li>
              <li
                class="nav-item "
                onClick={() => {
                  !Page ? {} : SetPage(0);
                }}
              >
                <a class={"nav-link " + (!Page ? "active" : "")} href="#">
                  ویرایش
                </a>
              </li>
            </ul>
          </div>
          {Page ? <Doctor_FreeTime_Add /> : <Doctor_FreeTime_Edit/>}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Doctor_FreeTime;
