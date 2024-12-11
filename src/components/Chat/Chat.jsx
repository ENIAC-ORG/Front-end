import "./Chat.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import { TextField, Box } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";

function GetTimeDiff(date) {
  let date1 = new Date(date);
  let date2 = new Date();
  let Difference_In_ms = date2.getTime() - date1.getTime();
  let days = Math.round(Difference_In_ms / (1000 * 3600 * 24));
  let hour = Math.round(Difference_In_ms / (1000 * 3600));
  let min = Math.round(Difference_In_ms / (1000 * 60));
  return min == 0
    ? "اکنون"
    : min < 60
    ? `${min} دقیقه`
    : hour < 24
    ? `${hour} ساعت`
    : `${days} روز`;
}
function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

const Chat = () => {
  const scrollRef = useRef(null);
  const [conversationList, SetConversationsList] = new useState([]);
  const [OpenConversation, SetConversations] = new useState(null);
  const [Conv_id, SetId] = new useState(-1);
  const [new_message, setMessage] = new useState();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  async function CreateConversation() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "http://46.249.100.141:8070/depression-chat/chat/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        SetConversationsList(
          [
            {
              name: response.data.conversation.name,
              id: response.data.conversation.id,
              createTime: "اکنون",
            },...conversationList
          ],
          
        );
        SetConversations([]);
        SetId(response.data.conversation.id);
      }
    } catch (error) {
      toast.error("!دوباره تلاش کنید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  useEffect(() => {
    const GetAllConversation = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios(
          "http://46.249.100.141:8070/depression-chat/chat/all/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200 || response.status == 201) {
          const convs = response.data.conversations;
          const list = [];
          for (let con in convs)
            list.push({
              name: convs[con].name,
              id: convs[con].id,
              createTime: GetTimeDiff(convs[con].created_at),
            });
          SetConversationsList(list);
        }
      } catch (error) {}
    };

    GetAllConversation();
  }, []);

  async function GetConversation(id) {
    SetId(id);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `http://46.249.100.141:8070/depression-chat/chat/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        SetConversations(response.data.conversations);
      }
    } catch (error) {
      if (error.response.status == 400) {
        if (
          error.response.data.message ==
          "There is not chats in this Conversation. make a new one"
        )
          SetConversations([]);
      }
    }
  }

  async function SendMessage() {
    console.log(new_message)
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `http://46.249.100.141:8070/depression-chat/chat/${Conv_id}/message/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            message: new_message,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("");
        SetConversations([...OpenConversation, response.data]);
      }
    } catch (error) {}
  }

  return (
    <>
      <NavBar_SideBar />
      <section>
        <div class="py-5" align="center">
          <div class="row">
            <div class="col-md-12">
              <div
                // class="card"
                id="chat3"
                style={{ borderRadius: "15px", width: "100%" }}
              >
                <div class="card-body">
                  <div class="row justify-content-center px-sm-3 ">
                    <div class="col-md-6 col-lg-5 col-xl-3 mb-4 mb-md-0 rounded-4 customize-chat-side">
                      <div class="py-4">
                        <div class="input-group rounded p-3" dir="rtl">
                          <span
                            onClick={CreateConversation}
                            className="cursor-pointer"
                          >
                            <GrNewWindow className="fs-5" />
                          </span>
                        </div>
                        <hr className="mt-0" />

                        <div
                          style={{
                            position: "relative",
                            height: "350px",
                            width: "90%",
                            overflowY: "auto",
                          }}
                        >
                          {conversationList.length == 0 && (
                            <p
                              className=" fs-5 font-custom"
                              style={{
                                position: "absolute",
                                top: "45%",
                                width: "100%",
                                color:"#198754"
                              }}
                            >
                              !هنوز مکالمه ای شروع نکرده اید
                            </p>
                          )}
                          <ul class="list-unstyled mb-0">
                            {conversationList.map((conversation) => (
                              <li class="p-2" style={{borderBottom:"1px solid black"}}>
                                <div
                                  onClick={() =>
                                    GetConversation(conversation.id)
                                  }
                                  class="d-flex justify-content-between"
                                >
                                  <div class="d-flex flex-row">
                                    <div class="pt-1">
                                      <p
                                        class="fw-bold mb-0 font-custom"
                                        style={{ color: "#198754" }}
                                      >
                                        {conversation.name == ""
                                          ? "گفت‌و‌گو جدید"
                                          : conversation.name}
                                      </p>
                                    </div>
                                  </div>
                                  <div class="pt-4">
                                    <p class="small mb-1 font-custom" style={{color:""}} dir="rtl">
                                      {toPersianDigits(conversation.createTime)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5 col-lg-6 col-xl-8 ">
                      {OpenConversation != null && (
                        <>
                          <div
                            class="pt-3 pe-3"
                            id="scrollable-section"
                            ref={scrollRef}
                            style={{
                              position: "relative",
                              height: "400px",
                              overflowY: "auto",
                            }}
                          >
                            {OpenConversation.map((message) => (
                              <>
                                <div class="d-flex flex-row justify-content-end">
                                  <div>
                                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-success font-custom">
                                      {message.message}
                                    </p>
                                  </div>

                                  <svg height="40px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-56.32 -56.32 624.64 624.64" xml:space="preserve" fill="#198754" stroke="#198754" stroke-width="22.016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0 </style> <g> <path class="st0" d="M256,265.308c73.252,0,132.644-59.391,132.644-132.654C388.644,59.412,329.252,0,256,0 c-73.262,0-132.643,59.412-132.643,132.654C123.357,205.917,182.738,265.308,256,265.308z"></path> <path class="st0" d="M425.874,393.104c-5.922-35.474-36-84.509-57.552-107.465c-5.829-6.212-15.948-3.628-19.504-1.427 c-27.04,16.672-58.782,26.399-92.819,26.399c-34.036,0-65.778-9.727-92.818-26.399c-3.555-2.201-13.675-4.785-19.505,1.427 c-21.55,22.956-51.628,71.991-57.551,107.465C71.573,480.444,164.877,512,256,512C347.123,512,440.427,480.444,425.874,393.104z"></path> </g> </g></svg>                                                                  </div>
                                <div class="d-flex flex-row justify-content-start">
                                  <svg
                                    height="45px"
                                    viewBox="0 0 96.00 96.00"
                                    data-name="Your Icons"
                                    id="Your_Icons"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#198754"
                                    stroke="#198754"
                                    stroke-width="0.768"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                      transform="translate(4.32,4.32), scale(0.91)"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke="#CCCCCC"
                                      stroke-width="0.384"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <defs>
                                        <style>.cls-1</style>
                                      </defs>
                                      <title></title>
                                      <path
                                        class="cls-1"
                                        d="M59.74,50.33h-.29A3.89,3.89,0,0,0,56,48.25H51.8V46.87a12.78,12.78,0,0,0,8.46-8.45,12.54,12.54,0,0,0,.58-3.82V33h1a2.94,2.94,0,1,0,0-5.87h-1l0-1.65a14.31,14.31,0,0,1,.52-4.1c1-3.48.76-6.24-.67-8.22-1.87-2.59-5.3-3.11-7.18-3.19A10.32,10.32,0,0,1,51,9.47c-3.39-1.05-6-1.08-7.89-.09a4.15,4.15,0,0,0-1.74,1.68,6.32,6.32,0,0,0-5.69,2c-2.88,3.46-1.87,10.36-1.08,14h-.42a2.94,2.94,0,1,0,0,5.87h1V34.6a12.86,12.86,0,0,0,9,12.27v1.38H40.35a3.87,3.87,0,0,0-3.45,2.08h-.64A10.44,10.44,0,0,0,25.83,60.75V80.83a.5.5,0,0,0,.5.5H69.67a.5.5,0,0,0,.5-.5V60.75A10.44,10.44,0,0,0,59.74,50.33Zm1.1-22.24h1a1.94,1.94,0,1,1,0,3.87h-1ZM56,49.25a2.93,2.93,0,0,1,2.26,1.08H51.8V49.25Zm-2.48,2.08-1.72,2v-2ZM35.17,32h-1a1.94,1.94,0,1,1,0-3.87h.66c.14.58.26,1,.32,1.22Zm.38-5.32c-.75-3.52-1.62-9.85.91-12.89,1.13-1.36,2.87-1.92,5.17-1.66a.5.5,0,0,0,.54-.35,2.92,2.92,0,0,1,1.42-1.48c1.1-.59,3.24-1,7.12.16a11,11,0,0,0,2.73.51c1.7.07,4.79.53,6.41,2.78,1.24,1.71,1.41,4.19.51,7.36a15.52,15.52,0,0,0-.55,4.38l0,1.9a1.49,1.49,0,0,1-1.17.38c-.35-.11-.64-.64-.8-1.49-.08-.39-.14-.83-.2-1.29-.43-3.22-1.09-8-8.6-8H48.6a8,8,0,0,1-3.35-.65c-.26-.11-.55-.22-.84-.32a4.66,4.66,0,0,0-5.79,2.47A45.69,45.69,0,0,0,35.55,26.64Zm1.16,11.47a11.54,11.54,0,0,1-.54-3.51V29.41a.5.5,0,0,0,0-.12c0-2.87,2.09-7.78,3.33-10.45a3.69,3.69,0,0,1,4.56-1.95l.79.3a9.12,9.12,0,0,0,3.76.73c7.09-.18,7.61,3.89,8,7.16.06.48.13.94.2,1.35.24,1.25.74,2,1.48,2.25a2,2,0,0,0,1.48-.16V34.6a11.83,11.83,0,0,1-23.13,3.51Zm14.09,9v7.34L48,57.69,45.2,54.45V47.13a13.08,13.08,0,0,0,2.81.31A12.24,12.24,0,0,0,50.8,47.13ZM40.35,49.25H44.2v1.08H38.09A2.91,2.91,0,0,1,40.35,49.25Zm3.85,2.08v2l-1.7-2ZM36.92,61.44a2.23,2.23,0,1,1-2.23,2.23A2.23,2.23,0,0,1,36.92,61.44ZM69.17,80.33H26.83V60.75a9.44,9.44,0,0,1,9.43-9.42h.26a3.47,3.47,0,0,0-.1.85v8.31a3.22,3.22,0,1,0,1,0V52.18a2.74,2.74,0,0,1,.13-.85h3.63l3,3.49h0l3.42,4A.5.5,0,0,0,48,59a.52.52,0,0,0,.38-.17l6.45-7.45h4a2.74,2.74,0,0,1,.13.85v6.51a7.63,7.63,0,0,0-4.34,3.64,19.92,19.92,0,0,0-1.93,4.82,4.56,4.56,0,0,0-.16,2.78,4,4,0,0,0,2.74,2.25.88.88,0,0,0,.86.65.9.9,0,1,0,0-1.8.85.85,0,0,0-.56.2,3.1,3.1,0,0,1-2.1-1.63,3.8,3.8,0,0,1,.18-2.18,19.19,19.19,0,0,1,1.82-4.57,7,7,0,0,1,3.68-3.18h.62a7,7,0,0,1,3.68,3.18,19.19,19.19,0,0,1,1.82,4.57,3.8,3.8,0,0,1,.18,2.18,3.1,3.1,0,0,1-2.1,1.63.85.85,0,0,0-.56-.2.9.9,0,0,0,0,1.8.88.88,0,0,0,.86-.66,4,4,0,0,0,2.74-2.24,4.56,4.56,0,0,0-.16-2.78,19.92,19.92,0,0,0-1.93-4.82,7.63,7.63,0,0,0-4.34-3.64V52.18a3.47,3.47,0,0,0-.1-.85,9.44,9.44,0,0,1,9.34,9.42Z"
                                      ></path>
                                      <path
                                        class="cls-1"
                                        d="M42.47,30a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5c0-1.11-1.15-2-2.61-2s-2.61.87-2.61,2a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5c0-.52.75-1,1.61-1S42.47,29.51,42.47,30Z"
                                      ></path>
                                      <path
                                        class="cls-1"
                                        d="M53,30.53a.5.5,0,0,0,.5-.5c0-.52.76-1,1.62-1s1.6.46,1.6,1a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5c0-1.11-1.14-2-2.6-2s-2.62.87-2.62,2A.5.5,0,0,0,53,30.53Z"
                                      ></path>
                                      <path
                                        class="cls-1"
                                        d="M54,37.83a.51.51,0,0,0-.5-.5.5.5,0,0,0-.5.5c0,2.38-1.68,3.59-5,3.59s-5-1.21-5-3.59a.5.5,0,0,0-.5-.5.51.51,0,0,0-.5.5c0,3,2.13,4.59,6,4.59S54,40.79,54,37.83Z"
                                      ></path>
                                      <path
                                        class="cls-1"
                                        d="M48,36.6a2.16,2.16,0,0,0,2.16-2.16v-2a2.16,2.16,0,0,0-4.32,0v2A2.16,2.16,0,0,0,48,36.6Zm-1.16-4.19a1.16,1.16,0,0,1,2.32,0v2a1.16,1.16,0,0,1-2.32,0Z"
                                      ></path>
                                      <path
                                        class="cls-1"
                                        d="M36.92,65.38a1.71,1.71,0,1,0-1.71-1.71A1.71,1.71,0,0,0,36.92,65.38Zm0-2.42a.71.71,0,0,1,0,1.42.71.71,0,1,1,0-1.42Z"
                                      ></path>
                                    </g>
                                  </svg>{" "}
                                  <div className=" w-50">
                                    <p
                                      class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary font-custom"
                                      align="right"
                                    >
                                      {message.response}
                                    </p>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>

                          <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                            <TextField
                              multiline
                              autoComplete="off"
                              variant="outlined"
                              onChange={(event) =>
                                setMessage(event.target.value)
                              }
                              dir="rtl"
                              InputLabelProps={{
                                dir: "rtl",
                              }}
                              value={new_message}
                              class="custom-form-input"
                              InputProps={{
                                style: {
                                  color: "red",
                                  width: "100%",
                                },
                              }}
                            />

                            <a class="ms-3 fs-4 text-success" href="#!" onClick={SendMessage}>
                              <FaPaperPlane />
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Chat;
