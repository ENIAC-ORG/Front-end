import "./Chat.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
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
  return min === 0
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

const GroupChat = () => {
  const scrollRef = useRef(null);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchMessages(selectedGroup.id);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://your-api/rooms/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupList(response.data);
    } catch (error) {
      toast.error("خطا در دریافت گروه‌ها");
    }
  };

  const fetchMessages = async (groupId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://your-api/rooms/${groupId}/messages/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      toast.error("خطا در دریافت پیام‌ها");
    }
  };

  const createGroup = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("http://your-api/rooms/", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupList([...groupList, response.data]);
      toast.success("گروه جدید ایجاد شد");
    } catch (error) {
      toast.error("خطا در ایجاد گروه");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://your-api/rooms/${selectedGroup.id}/messages/`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      toast.error("خطا در ارسال پیام");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://your-api/messages/${messageId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((msg) => msg.id !== messageId));
      toast.success("پیام حذف شد");
    } catch (error) {
      toast.error("خطا در حذف پیام");
    }
  };

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer style={{ width: "450px" }} />
      <section>
        <div className="py-5" align="center">
          <div className="row">
            <div className="col-md-12">
              <div id="chat3" style={{ borderRadius: "15px", width: "100%" }}>
                <div className="card-body">
                  <div className="row justify-content-center px-sm-3">
                    <div className="col-md-6 col-lg-5 col-xl-3 mb-4 mb-md-0 rounded-4 customize-chat-side">
                      <div className="py-4">
                        <div className="input-group rounded p-3" dir="rtl">
                          <span onClick={createGroup} className="cursor-pointer">
                            <GrNewWindow className="fs-5" />
                          </span>
                        </div>
                        <hr className="mt-0" />
                        <div
                          style={{
                            position: "relative",
                            height: "350px",
                            overflowY: "auto",
                          }}
                        >
                          {groupList.length === 0 && (
                            <p
                              className="fs-5 font-custom"
                              style={{
                                position: "absolute",
                                top: "45%",
                                width: "100%",
                                color: "#198754",
                              }}
                            >
                              !هنوز گروهی ایجاد نکرده‌اید
                            </p>
                          )}
                          <ul className="list-unstyled mb-0">
                            {groupList.map((group) => (
                              <li
                                key={group.id}
                                className="p-2"
                                style={{ borderBottom: "1px solid black" }}
                              >
                                <div
                                  onClick={() => setSelectedGroup(group)}
                                  className="d-flex justify-content-between"
                                >
                                  <p
                                    className="fw-bold mb-0 font-custom"
                                    style={{ color: "#198754" }}
                                  >
                                    {group.name || "گروه جدید"}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-8">
                      {selectedGroup && (
                        <>
                          <div
                            ref={scrollRef}
                            style={{
                              position: "relative",
                              height: "400px",
                              overflowY: "auto",
                            }}
                          >
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className="d-flex justify-content-between"
                              >
                                <p>{msg.content}</p>
                                <button onClick={() => deleteMessage(msg.id)}>
                                  حذف
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                            <TextField
                              multiline
                              autoComplete="off"
                              variant="outlined"
                              onChange={(e) => setNewMessage(e.target.value)}
                              value={newMessage}
                              dir="rtl"
                              className="custom-form-input"
                            />
                            <FaPaperPlane
                              onClick={sendMessage}
                              disabled={loading}
                            />
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

export default GroupChat;
