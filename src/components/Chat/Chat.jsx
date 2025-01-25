import "./Chat.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Form from "react-bootstrap/Form";
import { useAudioRecorder } from "react-use-audio-recorder/dist/index.js";

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
  const [audio_data, SetData] = new useState(null);
  const {
    recordingStatus,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    getBlob,
    saveRecording,
  } = useAudioRecorder();

  const scrollRef = useRef(null);
  const [conversationList, SetConversationsList] = new useState([]);
  const [OpenConversation, SetConversations] = new useState(null);
  const [Conv_id, SetId] = new useState(-1);
  const [new_message, setMessage] = new useState();
  const [Loading, setStaus] = new useState(true);
  const [audio_blob, setBlob] = new useState("");
  const [audio_, setaudio] = new useState(null);
  const [toggle, settoggle] = new useState(true);
  const [AudioPending, setPending] = new useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  function playAudioBlob() {
    if (toggle) audio_.play();
    if (!toggle) audio_.pause();
    settoggle((prev) => !prev);
  }

  const SendAudio = async () => {
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("voice_file", audio_blob, "recording.wav");
      const uploadResponse = await fetch(
        "https://eniacgroup.ir/backend/depression-chat/process_wav_voice/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (uploadResponse.status == 200) {
        const responseData = await uploadResponse.json();
        setPending(false);
        setMessage(responseData.processed_text);
        setBlob();
        setaudio(null);
      } else {
        console.error("Failed to send audio:", uploadResponse.statusText);
      }
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  async function CreateConversation() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        "https://eniacgroup.ir/backend/depression-chat/chat/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 || response.status == 201) {
        SetConversationsList([
          {
            name: response.data.conversation.name,
            id: response.data.conversation.id,
            createTime: "اکنون",
          },
          ...conversationList,
        ]);
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
          "https://eniacgroup.ir/backend/depression-chat/chat/all/",
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
        `https://eniacgroup.ir/backend/depression-chat/chat/${id}/`,
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
    setStaus(false);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios(
        `https://eniacgroup.ir/backend/depression-chat/chat/${Conv_id}/message/`,
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
        setStaus(true);
      }
    } catch (error) {
      setStaus(true);
      console.log(error.response.data.message);
      if (
        error.response.data.message ==
        "you did not have any Tests yet, first take the phq9 test."
      )
        toast.error(".ابتدا تست PHQ9 را باید بدهید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      if (
        error.response.data.message ==
        "you did not have any Tests more than 7 days before, first take the phq9 test."
      )
        toast.error(".از اخرین تست PHQ9 شما 7 روز می‌گذرد، دوباره آزون بدهید", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      if (error.response.data.message == "bad connection to open ai.")
        toast.error("!هوش مصنوعی در حال حاضر امکان پاسخ دهی ندارد", {
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

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer style={{ width: "450px" }} />
      <section style={{ overflowX: "hidden" }}>
        <div class="py-5" align="center">
          <div class="row">
            <div class="col-md-12">
              <div id="chat3" style={{ borderRadius: "15px", width: "100%" }}>
                <div class="card-body">
                  <div class="row justify-content-center px-sm-3 ">
                    <div class="col-md-6 col-lg-5 col-xl-3 mb-4 mb-md-0 rounded-4 customize-singlechat-side">
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
                              className=" fs-5 font-custom "
                              style={{
                                position: "absolute",
                                top: "45%",
                                width: "100%",
                                color: "#198754",
                              }}
                            >
                              !هنوز مکالمه ای شروع نکرده اید
                            </p>
                          )}
                          <ul class="list-unstyled mb-0">
                            {conversationList.map((conversation) => (
                              <li
                                class="p-2"
                                style={{ borderBottom: "1px solid black" }}
                              >
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
                                    <p
                                      class="small mb-1 font-custom"
                                      style={{ color: "" }}
                                      dir="rtl"
                                    >
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
                                    <p class="small p-2 me-3 mb-1 text-white rounded-3 singlechat-my-message font-custom">
                                      {message.message}
                                    </p>
                                  </div>
                                  <svg
                                    height="40px"
                                    version="1.1"
                                    id="_x32_"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="-56.32 -56.32 624.64 624.64"
                                    xml:space="preserve"
                                    fill="#198754"
                                    stroke="#198754"
                                    stroke-width="22.016"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke="#CCCCCC"
                                      stroke-width="2.048"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <style type="text/css"> .st0 </style>{" "}
                                      <g>
                                        {" "}
                                        <path
                                          class="st0"
                                          d="M256,265.308c73.252,0,132.644-59.391,132.644-132.654C388.644,59.412,329.252,0,256,0 c-73.262,0-132.643,59.412-132.643,132.654C123.357,205.917,182.738,265.308,256,265.308z"
                                        ></path>{" "}
                                        <path
                                          class="st0"
                                          d="M425.874,393.104c-5.922-35.474-36-84.509-57.552-107.465c-5.829-6.212-15.948-3.628-19.504-1.427 c-27.04,16.672-58.782,26.399-92.819,26.399c-34.036,0-65.778-9.727-92.818-26.399c-3.555-2.201-13.675-4.785-19.505,1.427 c-21.55,22.956-51.628,71.991-57.551,107.465C71.573,480.444,164.877,512,256,512C347.123,512,440.427,480.444,425.874,393.104z"
                                        ></path>{" "}
                                      </g>{" "}
                                    </g>
                                  </svg>{" "}
                                </div>
                                <div class="d-flex flex-row justify-content-start">
                                  <svg
                                    height="45px"
                                    viewBox="0 0 96.00 96.00"
                                    data-name="Your Icons"
                                    id="Your_Icons"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#249861"
                                    stroke="#249861"
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
                          {recordingStatus === "recording" ||
                          recordingStatus === "paused" ||
                          audio_ != null ? (
                            <div
                              className="border mt-2 p-2 d-flex justify-content-center rounded-5 "
                              style={{
                                gap: "2%",
                                backgroundColor: "rgb(25, 134, 83,0.7)",
                              }}
                            >
                              {audio_ != null ? (<>
                                {AudioPending  ? (
                                  // <div className="py-1 font-custom">!لطفا چند لحظه صبر کنید</div>
                                  <svg height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                                  ) : (<>
                                  <svg
                                    height={40}
                                    width={40}
                                    onClick={() => playAudioBlob()}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        d="M15 5V19M21 5V19M3 7.20608V16.7939C3 17.7996 3 18.3024 3.19886 18.5352C3.37141 18.7373 3.63025 18.8445 3.89512 18.8236C4.20038 18.7996 4.55593 18.4441 5.26704 17.733L10.061 12.939C10.3897 12.6103 10.554 12.446 10.6156 12.2565C10.6697 12.0898 10.6697 11.9102 10.6156 11.7435C10.554 11.554 10.3897 11.3897 10.061 11.061L5.26704 6.26704C4.55593 5.55593 4.20038 5.20038 3.89512 5.17636C3.63025 5.15551 3.37141 5.26273 3.19886 5.46476C3 5.69759 3 6.20042 3 7.20608Z"
                                        stroke={toggle ? "#fff" : "#1c4a21"}
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                  <svg
                                    onClick={SendAudio}
                                    height={40}
                                    width={40}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        opacity="0.5"
                                        d="M15.75 21.2731C14.592 21.7419 13.3261 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 13.1455 21.8074 14.246 21.4528 15.2709L19.591 13.409C18.7123 12.5303 17.2877 12.5303 16.409 13.409L13.909 15.909C13.0303 16.7877 13.0303 18.2123 13.909 19.091C14.412 19.594 15.094 19.8091 15.75 19.7362V21.2731Z"
                                        fill="#fff"
                                      ></path>{" "}
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M13.75 7C13.75 6.58579 13.4142 6.25 13 6.25C12.5858 6.25 12.25 6.58579 12.25 7V12.5499C11.875 12.3581 11.4501 12.25 11 12.25C9.48122 12.25 8.25 13.4812 8.25 15C8.25 16.5188 9.48122 17.75 11 17.75C12.5188 17.75 13.75 16.5188 13.75 15V10.0003C14.3767 10.471 15.1558 10.75 16 10.75C16.4142 10.75 16.75 10.4142 16.75 10C16.75 9.58579 16.4142 9.25 16 9.25C14.7574 9.25 13.75 8.24264 13.75 7Z"
                                        fill="#116439"
                                      ></path>{" "}
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M17.4697 14.4697C17.7626 14.1768 18.2374 14.1768 18.5303 14.4697L21.0303 16.9697C21.3232 17.2626 21.3232 17.7374 21.0303 18.0303C20.7374 18.3232 20.2626 18.3232 19.9697 18.0303L18.75 16.8107V22C18.75 22.4142 18.4142 22.75 18 22.75C17.5858 22.75 17.25 22.4142 17.25 22V16.8107L16.0303 18.0303C15.7374 18.3232 15.2626 18.3232 14.9697 18.0303C14.6768 17.7374 14.6768 17.2626 14.9697 16.9697L17.4697 14.4697Z"
                                        fill="#fff"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                  <svg
                                    height={40}
                                    width={40}
                                    onClick={() => {
                                      setBlob();
                                      setaudio(null);
                                    }}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path
                                        d="M5 7.5H19L18 21H6L5 7.5Z"
                                        stroke="#000000"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                      <path
                                        d="M15.5 9.5L15 19"
                                        stroke="#000000"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                      <path
                                        d="M12 9.5V19"
                                        stroke="#000000"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                      <path
                                        d="M8.5 9.5L9 19"
                                        stroke="#000000"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                      <path
                                        d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
                                        stroke="#000000"
                                        stroke-linejoin="round"
                                      ></path>{" "}
                                    </g>
                                  </svg>
                                </>)}
                                  </>)
                               : (
                                <>
                                  {" "}
                                  <div className="d-flex align-items-center">
                                    {toPersianDigits(`${parseInt(recordingTime / 3600)}:
                                    ${parseInt(recordingTime / 60)}:
                                    ${recordingTime % 60}`)}
                                  </div>
                                  {!(
                                    recordingStatus !== "recording" ||
                                    recordingStatus === "paused"
                                  ) ? (
                                    <svg
                                      onClick={pauseRecording}
                                      height="40px"
                                      width="40px"
                                      version="1.1"
                                      id="Layer_1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      viewBox="0 0 511.999 511.999"
                                      xml:space="preserve"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                          {" "}
                                          <path
                                            style={{ fill: "#ABB8B9" }}
                                            d="M224.197,340.845h-42.508c-5.756,0-10.469-4.711-10.469-10.469V181.626 c0-5.76,4.714-10.469,10.469-10.469h42.508c5.759,0,10.469,4.709,10.469,10.469v148.748 C234.666,336.134,229.956,340.845,224.197,340.845L224.197,340.845z M277.331,330.376V181.626c0-5.76,4.709-10.469,10.469-10.469 h42.509c5.756,0,10.465,4.709,10.465,10.469v148.748c0,5.758-4.709,10.469-10.465,10.469H287.8 C282.04,340.845,277.331,336.134,277.331,330.376L277.331,330.376z M10.665,256.001c0,135.494,109.84,245.333,245.333,245.333 c135.495,0,245.334-109.84,245.334-245.333c0-135.496-109.84-245.333-245.334-245.333 C120.505,10.669,10.665,120.505,10.665,256.001z"
                                          ></path>{" "}
                                          <g>
                                            {" "}
                                            <path
                                              style={{ fill: "#ED8C18" }}
                                              d="M181.689,340.845h42.508c5.759,0,10.469-4.711,10.469-10.469V181.626 c0-5.76-4.71-10.469-10.469-10.469h-42.508c-5.756,0-10.469,4.709-10.469,10.469v148.748 C171.22,336.134,175.934,340.845,181.689,340.845z"
                                            ></path>{" "}
                                            <path
                                              style={{ fill: "#ED8C18" }}
                                              d="M277.331,181.626v148.748c0,5.758,4.709,10.469,10.469,10.469h42.509 c5.756,0,10.465-4.711,10.465-10.469V181.626c0-5.76-4.709-10.469-10.465-10.469H287.8 C282.04,171.157,277.331,175.866,277.331,181.626z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </g>{" "}
                                        <g>
                                          {" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M255.998,0.001C114.84,0.001,0,114.841,0,256.001c0,141.156,114.84,255.997,255.998,255.997 c141.159,0,256.001-114.84,256.001-255.997C512,114.841,397.158,0.001,255.998,0.001z M255.998,490.662 c-129.393,0-234.663-105.268-234.663-234.661c0-129.395,105.27-234.665,234.663-234.665c129.395,0,234.666,105.271,234.666,234.665 C490.665,385.394,385.393,490.662,255.998,490.662z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M270.389,85.942c5.87,0.492,11.034-3.852,11.535-9.723c0.5-5.869-3.853-11.034-9.723-11.535 c-5.332-0.454-10.782-0.684-16.202-0.684C150.131,64.001,64.001,150.13,64.001,256c0,5.89,4.777,10.667,10.667,10.667 S85.335,261.89,85.335,256c0-94.105,76.559-170.665,170.663-170.665C260.815,85.335,265.657,85.54,270.389,85.942z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M437.331,245.334c-5.892,0-10.667,4.776-10.667,10.667c0,94.107-76.56,170.669-170.665,170.669 c-4.754,0-9.6-0.206-14.403-0.61c-5.867-0.494-11.031,3.863-11.526,9.734c-0.495,5.869,3.863,11.03,9.734,11.526 c5.397,0.454,10.846,0.686,16.195,0.686c105.868,0,191.999-86.133,191.999-192.004 C447.998,250.108,443.223,245.334,437.331,245.334z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M299.55,90.985l0.617,0.162c0.925,0.247,1.855,0.367,2.771,0.367c4.709,0,9.017-3.142,10.295-7.907 c1.527-5.69-1.849-11.54-7.539-13.066c-0.308-0.083-0.621-0.166-0.929-0.244c-5.712-1.442-11.511,2.025-12.951,7.736 C290.374,83.746,293.836,89.545,299.55,90.985z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M212.447,421.015l-0.604-0.16c-5.69-1.53-11.496,1.849-13.03,7.537s1.88,11.553,7.567,13.089 c0.284,0.075,0.57,0.153,0.852,0.223c0.875,0.221,1.753,0.328,2.615,0.328c4.773,0,9.117-3.225,10.336-8.064 C221.623,428.253,218.16,422.455,212.447,421.015z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M245.334,330.376V181.626c0-11.655-9.482-21.137-21.137-21.137h-42.508 c-11.655,0-21.137,9.482-21.137,21.137v148.748c0,11.655,9.482,21.137,21.137,21.137h42.508 C235.852,351.512,245.334,342.03,245.334,330.376z M223.999,330.177h-42.112V181.825h42.112V330.177z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M266.664,181.626v148.748c0,11.655,9.482,21.137,21.135,21.137h42.509 c11.652,0,21.132-9.482,21.132-21.137V181.626c0-11.655-9.48-21.137-21.132-21.137H287.8 C276.146,160.49,266.664,169.971,266.664,181.626z M287.998,181.825h42.107v148.352h-42.107L287.998,181.825L287.998,181.825z"
                                          ></path>{" "}
                                        </g>{" "}
                                      </g>
                                    </svg>
                                  ) : (
                                    <svg
                                      onClick={resumeRecording}
                                      height="40px"
                                      width="40px"
                                      version="1.1"
                                      id="Layer_1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      viewBox="0 0 512 512"
                                      xml:space="preserve"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                          {" "}
                                          <path
                                            style={{ fill: "#ABB8B9" }}
                                            d="M229.757,177.638l49.066,28.33l1.244,0.773l49.154,28.377c11.547,6.637,15.529,21.376,8.895,32.925 c-2.267,3.945-5.48,7.005-9.184,9.062l-50.129,28.942l0.021,0.043l-50.485,29.149c-11.551,6.689-26.336,2.748-33.023-8.802 c-2.211-3.82-3.262-7.991-3.258-12.11h-0.052v-58.299V197.73c0-13.376,10.844-24.223,24.221-24.223 C221.238,173.505,225.894,175.024,229.757,177.638L229.757,177.638z M501.333,256.002c0-135.495-109.84-245.334-245.334-245.334 S10.666,120.507,10.666,256.002s109.839,245.334,245.332,245.334C391.493,501.337,501.333,391.496,501.333,256.002z"
                                          ></path>{" "}
                                          <path
                                            style={
                                              recordingStatus === "recording" ||
                                              recordingStatus === "paused"
                                                ? { fill: "#D12D4E" }
                                                : { fill: "#ABB8B9" }
                                            }
                                            d="M278.823,205.967l-49.066-28.33c-3.863-2.612-8.518-4.132-13.532-4.132 c-13.377,0-24.221,10.847-24.221,24.223v58.298v58.299h0.052c-0.004,4.118,1.045,8.29,3.258,12.11 c6.689,11.55,21.473,15.49,33.023,8.802l50.485-29.149l-0.021-0.043l50.129-28.942c3.705-2.057,6.917-5.117,9.184-9.062 c6.634-11.55,2.652-26.288-8.895-32.925l-49.154-28.377L278.823,205.967z"
                                          ></path>{" "}
                                        </g>{" "}
                                        <g>
                                          {" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M256,0C114.841,0,0.001,114.842,0.001,256.002C0.001,397.16,114.841,512,256,512 c141.158,0,255.999-114.84,255.999-255.998C512.001,114.842,397.159,0,256,0z M256,490.665 c-129.395,0-234.664-105.269-234.664-234.663C21.336,126.607,126.605,21.335,256,21.335c129.394,0,234.664,105.271,234.664,234.667 C490.665,385.396,385.394,490.665,256,490.665z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M270.396,85.941c5.872,0.498,11.033-3.86,11.53-9.731c0.497-5.87-3.86-11.032-9.731-11.528 c-5.373-0.454-10.822-0.685-16.195-0.685c-105.87,0-192.001,86.133-192.001,192.005c0,5.892,4.775,10.668,10.668,10.668 c5.892,0,10.668-4.776,10.668-10.668c0-94.108,76.561-170.67,170.666-170.67C260.774,85.332,265.618,85.537,270.396,85.941z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M437.333,245.334c-5.891,0-10.668,4.776-10.668,10.668c0,94.105-76.562,170.665-170.667,170.665 c-4.822,0-9.663-0.205-14.388-0.608c-5.878-0.5-11.036,3.851-11.536,9.721c-0.501,5.87,3.851,11.036,9.721,11.537 c5.327,0.454,10.778,0.686,16.203,0.686c105.87,0,192.002-86.131,192.002-192C448.001,250.111,443.224,245.334,437.333,245.334z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M299.525,90.979l0.625,0.164c0.931,0.252,1.867,0.372,2.787,0.372c4.701,0,9.007-3.132,10.292-7.889 c1.535-5.687-1.829-11.543-7.517-13.081c-0.308-0.083-0.617-0.165-0.925-0.244c-5.707-1.453-11.516,1.997-12.969,7.706 C290.365,83.719,293.816,89.525,299.525,90.979z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M212.584,421.054l-0.886-0.234c-5.706-1.455-11.517,1.997-12.969,7.706 c-1.454,5.709,1.996,11.516,7.706,12.97l0.662,0.175c0.92,0.244,1.842,0.362,2.75,0.362c4.716,0,9.031-3.153,10.302-7.927 C221.664,428.412,218.277,422.569,212.584,421.054z"
                                          ></path>{" "}
                                          <path
                                            style={{ fill: "#000003" }}
                                            d="M233.672,344.476l50.485-29.149c0.299-0.173,0.586-0.357,0.862-0.554l49.175-28.391 c5.478-3.059,10.029-7.56,13.171-13.023c9.555-16.631,3.801-37.936-12.811-47.483l-48.899-28.228 c-0.507-0.329-1.01-0.642-1.498-0.92l-48.769-28.157c-5.69-3.752-12.307-5.734-19.163-5.734c-19.238,0-34.888,15.651-34.888,34.89 v116.598c0,0.426,0.025,0.845,0.074,1.258c0.204,5.676,1.808,11.25,4.671,16.198c6.209,10.721,17.768,17.381,30.167,17.381 C222.352,349.163,228.381,347.54,233.672,344.476z M204.546,321.092c-1.194-2.063-1.825-4.398-1.822-6.754 c0.001-0.353-0.018-0.705-0.052-1.053V197.728c0-7.475,6.08-13.555,13.553-13.555c2.718,0,5.329,0.796,7.554,2.3 c0.21,0.142,0.425,0.275,0.643,0.402l49.118,28.359c0.228,0.13,0.444,0.273,0.661,0.416c0.175,0.114,0.352,0.224,0.531,0.329 l49.171,28.386c6.43,3.695,8.656,11.935,4.961,18.364c-1.221,2.124-2.989,3.869-5.112,5.047c-0.052,0.029-0.106,0.059-0.158,0.09 l-50.13,28.942c-0.299,0.173-0.587,0.357-0.862,0.555l-49.613,28.644c-2.058,1.192-4.39,1.822-6.742,1.822 C211.436,327.828,206.953,325.247,204.546,321.092z"
                                          ></path>{" "}
                                        </g>{" "}
                                      </g>
                                    </svg>
                                  )}
                                  <svg
                                    onClick={() => {
                                      stopRecording((blob) => {
                                        setBlob(blob);
                                        const audioURL =
                                          URL.createObjectURL(blob);
                                        const audio = new Audio(audioURL);
                                        setaudio(audio);
                                      });
                                    }}
                                    height="40px"
                                    width="40px"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 511.999 511.999"
                                    xml:space="preserve"
                                    fill="#000000"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      stroke-width="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <g>
                                        {" "}
                                        <path
                                          style={{ fill: "#ABB8B9" }}
                                          d="M171.154,312.847V199.156c0-15.4,12.599-28,27.998-28h113.693c15.398,0,27.998,12.601,27.998,28 v113.691c0,15.4-12.599,28-27.998,28H199.152C183.753,340.848,171.154,328.247,171.154,312.847L171.154,312.847z M501.329,256.004 c0-135.494-109.838-245.332-245.33-245.332c-135.495,0-245.332,109.839-245.332,245.332c0,135.489,109.838,245.329,245.332,245.329 C391.491,501.333,501.329,391.493,501.329,256.004z"
                                        ></path>{" "}
                                        <path
                                          style={
                                            recordingStatus === "recording" ||
                                            recordingStatus === "paused"
                                              ? { fill: "#D12D4E" }
                                              : { fill: "#ABB8B9" }
                                          }
                                          d="M171.154,199.156v113.691c0,15.4,12.599,28,27.998,28h113.693c15.398,0,27.998-12.601,27.998-28 V199.156c0-15.4-12.599-28-27.998-28H199.152C183.753,171.156,171.154,183.757,171.154,199.156z"
                                        ></path>{" "}
                                      </g>{" "}
                                      <g>
                                        {" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M255.998,0C114.841,0,0.001,114.84,0.001,255.999s114.84,255.999,255.997,255.999 c141.159,0,255.999-114.84,255.999-255.999S397.159,0,255.998,0z M255.998,490.665c-129.394,0-234.662-105.271-234.662-234.665 S126.605,21.335,255.998,21.335c129.395,0,234.665,105.271,234.665,234.665S385.393,490.665,255.998,490.665z"
                                        ></path>{" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M270.393,85.944c5.876,0.513,11.032-3.857,11.53-9.728c0.498-5.87-3.856-11.033-9.728-11.53 C266.827,64.231,261.377,64,255.999,64c-105.869,0-192,86.132-192,192.003c0,5.892,4.776,10.667,10.667,10.667 c5.891,0,10.667-4.776,10.667-10.667c0-94.107,76.56-170.668,170.665-170.668C260.777,85.335,265.619,85.54,270.393,85.944z"
                                        ></path>{" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M437.33,245.336c-5.891,0-10.667,4.777-10.667,10.667c0,94.105-76.56,170.664-170.663,170.664 c-4.779,0-9.622-0.205-14.396-0.609c-5.88-0.495-11.032,3.857-11.53,9.728c-0.498,5.87,3.856,11.033,9.728,11.53 c5.369,0.456,10.82,0.686,16.199,0.686c105.869,0,191.998-86.13,191.998-191.999C447.997,250.113,443.222,245.336,437.33,245.336z"
                                        ></path>{" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M299.412,90.951l0.691,0.186c0.946,0.26,1.898,0.384,2.833,0.384c4.684,0,8.979-3.11,10.28-7.845 c1.561-5.68-1.779-11.552-7.461-13.112l-0.857-0.231c-5.691-1.505-11.537,1.873-13.053,7.566 C290.332,83.591,293.72,89.435,299.412,90.951z"
                                        ></path>{" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M212.584,421.054l-0.691-0.186c-5.681-1.564-11.553,1.779-13.113,7.46 c-1.561,5.68,1.779,11.552,7.461,13.112l0.857,0.232c0.92,0.243,1.842,0.362,2.75,0.362c4.717,0,9.032-3.153,10.303-7.928 C221.664,428.412,218.276,422.569,212.584,421.054z"
                                        ></path>{" "}
                                        <path
                                          style={{ fill: "#000003" }}
                                          d="M312.844,351.516c21.32,0,38.665-17.346,38.665-38.667V199.156 c0-21.321-17.345-38.667-38.665-38.667H199.152c-21.32,0-38.665,17.346-38.665,38.667v113.691 c0,21.321,17.345,38.667,38.665,38.667h113.693V351.516z M181.821,312.847V199.156c0-9.557,7.774-17.332,17.33-17.332h113.693 c9.556,0,17.33,7.775,17.33,17.332v113.691c0,9.557-7.774,17.332-17.33,17.332H199.152 C189.596,330.181,181.821,322.404,181.821,312.847z"
                                        ></path>{" "}
                                      </g>{" "}
                                    </g>
                                  </svg>{" "}
                                </>
                              )}
                            </div>
                          ) : (
                            <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={new_message}
                                onChange={(event) => {
                                  if (event.target.value.includes("\n")) {
                                    SendMessage();
                                    setMessage(event.target.value.slice(0, -1));
                                  } else setMessage(event.target.value);
                                }}
                                className="singlechat-text rounded-3"
                                dir="rtl"
                              />

                              <a class="ms-3 fs-4 text-success text-decoration-none">
                                {Loading && (
                                  <div
                                    className="d-flex "
                                    style={{ flex: "row" }}
                                  >
                                    <FaPaperPlane
                                      className="mt-1 me-1"
                                      onClick={() => {
                                        setStaus(false);
                                        SendMessage();
                                      }}
                                    />
                                    <svg
                                      fill="#198754"
                                      height="35px"
                                      width="40px"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="-30.72 -30.72 573.44 573.44"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      enable-background="new 0 0 512 512"
                                      stroke="#198754"
                                      stroke-width="6.144"
                                      transform="rotate(0)"
                                      disabled={
                                        !(
                                          !recordingStatus ||
                                          recordingStatus === "stopped"
                                        )
                                      }
                                      onClick={() => {
                                        startRecording();
                                      }}
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke="#CCCCCC"
                                        stroke-width="3.072"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                          {" "}
                                          <g>
                                            {" "}
                                            <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"></path>{" "}
                                            <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"></path>{" "}
                                          </g>{" "}
                                        </g>{" "}
                                      </g>
                                    </svg>{" "}
                                  </div>
                                )}
                                {!Loading && (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 300 150"
                                    >
                                      <path
                                        fill="none"
                                        stroke="#198754"
                                        stroke-width="15"
                                        stroke-linecap="round"
                                        stroke-dasharray="300 385"
                                        stroke-dashoffset="0"
                                        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                                      >
                                        <animate
                                          attributeName="stroke-dashoffset"
                                          calcMode="spline"
                                          dur="2.2"
                                          values="685;-685"
                                          keySplines="0 0 1 1"
                                          repeatCount="indefinite"
                                        ></animate>
                                      </path>
                                    </svg>
                                    <div
                                      className="text-white"
                                      style={{ lineHeight: "5px" }}
                                    >
                                      ghhh
                                    </div>
                                  </>
                                )}
                              </a>
                            </div>
                          )}
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
