import "./groupchat_styles.css";
import { ToastContainer, toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client
import { message } from "antd";

// Helper function to format the time (hour and minute) from created_at to Tehran time
// Helper function to format the time (hour and minute) from created_at to Tehran time
function formatTime(date) {
  const d = new Date(date);
  const tehranOffset = 7 * 60; // Tehran is UTC+3:30 (in minutes)
  const localOffset = d.getTimezoneOffset(); // Local timezone offset in minutes (in browser's timezone)
  d.setMinutes(d.getMinutes() + localOffset + tehranOffset);
  const hours = d.getHours().toString().padStart(2, '0');  // Ensure two digits for hours
  const minutes = d.getMinutes().toString().padStart(2, '0');  // Ensure two digits for minutes
  return `${hours}:${minutes}`;
}

function toPersianDigits(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[digit]);
}

// Helper function to format the date (month, day, year)
function formatDate(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('fa-IR', options); // Adjust for Persian date format
}

const GroupChat = () => {
  const scrollRef = useRef(null);
  const socket = useRef(null); // To hold the socket connection
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState(""); // State to handle the group name input
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(1);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null });
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescriptions, setNewGroupDescriptions] = useState("");
  const [showArchived, setShowArchived] = useState(false); // State for toggling archived groups
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState({});
  const [openGroupInfoModal, setOpenGroupInfoModal] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("accessToken"); 

  useEffect(() => {
    getAllGroups();
    getUserEmail();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      // console.log(email);
      console.log(token);
      const groupId = encodeURIComponent(selectedGroup.id);
      // Open WebSocket connection
      socket.current = new WebSocket(`ws://46.249.100.141:8070/ws/chat/${groupId}/?email=${encodeURIComponent(email)}`);
  
      socket.current.onopen = () => {
        console.log("WebSocket is connected.");
      };
  
      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
      
        if (data.error) {
          console.error("Error:", data.error);
        } else {
          setMessages((prevMessages) => {
            const messageDate = formatDate(data.message.createdAt);
            const newMessages = { ...prevMessages };
            if (!newMessages[messageDate]) {
              newMessages[messageDate] = [];
            }
            newMessages[messageDate].push({
              id: data.message.id,
              user: data.message.user,
              content: data.message.content,
              isSelf: data.message.isSelf,
              firstname: data.message.firstname,
              lastname: data.message.lastname,
              createdAt: data.message.createdAt,
              group: data.message.group,
            });
            return newMessages;
          });
        }
      };
  
      socket.current.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        if (event.code !== 1000) {
          console.error(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
        }
      };
  
      socket.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      return () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    }
  }, [selectedGroup]);
    
    
  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.title);
      getMessages(selectedGroup.id); 
    }
  }, [selectedGroup]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getUserEmail = async () => {
    try {
      const response = await axios.get("http://46.249.100.141:8070/chat/get-user-email/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        setEmail(response.data.email);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("خطا در بارگذاری گروه‌ها", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch all groups
  const getAllGroups = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://46.249.100.141:8070/chat/rooms/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        const groupsArray = response.data || [];
        if (Array.isArray(groupsArray) && groupsArray.length > 0) {
          setGroupList(groupsArray.map((group) => ({
            id: group.id,
            descriptions: group.description,
            createdBy: group.created_by,
            title: group.title,
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("خطا در بارگذاری گروه‌ها", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Get the messages of the group which the user has clicked on
  const getMessages = async (roomId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://46.249.100.141:8070/chat/rooms/${roomId}/messages/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const groupedMessages = response.data.reduce((acc, message) => {
          const messageDate = formatDate(message.created_at);
          if (!acc[messageDate]) {
            acc[messageDate] = [];
          }
          acc[messageDate].push({
            id: message.id,
            user: message.user,
            content: message.content,
            isSelf: message.is_self,
            firstname: message.firstname,
            lastname: message.lastname,
            createdAt: message.created_at,
            group: message.room,
          });
          return acc;
        }, {});

        setMessages(groupedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("خطا در بارگذاری پیام‌ها", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Send message to the group
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://46.249.100.141:8070/chat/rooms/${selectedGroup.id}/messages/`,
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      // Emit the new message event to the WebSocket server to notify all other clients
      // socket.current.send(
      //   JSON.stringify({
      //     email: email,
      //     message: {
      //       id: response.data.id,
      //       user: response.data.user,
      //       content: response.data.content,
      //       isSelf: response.data.is_self,
      //       firstname: response.data.firstname,
      //       lastname: response.data.lastname,
      //       createdAt: response.data.created_at,
      //       group: response.data.room,
      //     }             
      //   })
      // );
      
      setNewMessage("");

    } catch (error) {
      if (error.response.data.error == "User not a member of this room.") {
        console.error("Error sending message:", error);
        toast.error("!شما عضو این گروه نیستید", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        console.error("Error sending message:", error);
        toast.error("خطا در ارسال پیام", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Delete a message which was written by the user
  const deleteMessage = async (messageId) => {
    try {
      console.log(messageId);
      const response = await axios.delete(`http://46.249.100.141:8070/chat/messages/${messageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200 || response.status == 201 || response.status == 204 ) {
        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages };
          Object.keys(newMessages).forEach((date) => {
            newMessages[date] = newMessages[date].filter((message) => message.id !== messageId);
          });
          return newMessages;
        });
        toast.success("پیام حذف شد", {
          position: "bottom-right",
          autoClose: 3000,
        });
        getMessages(selectedGroup.id);

      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("خطا در حذف پیام", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // Create group by admin
  const createGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("نام گروه نمی‌تواند خالی باشد");
      return;
    }
    const newGroup = {
      id: groupList.length + 1,
      name: newGroupName,
      archived: false,
      messages: [],
    };
    setGroupList([...groupList, newGroup]);
    setNewGroupName("");
    setNewGroupDescriptions("");
    setOpenModal(false); 
    toast.success("گروه جدید ایجاد شد");
  };


  // Handle input change
  const handleInputChange = (e) => {
    setNewGroupName(e.target.value);
  };

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer style={{ width: "450px" }} />
      <section style={{ direction: "rtl" }}>
        <div className="py-5" align="center" style={{ backgroundColor: "#f0f9f1" }}>
          <div className="row">
            <div className="col-md-12">
              <div id="chat3" style={{ borderRadius: "15px", width: "100%" }}>
                <div className="card-body">
                  <div className="row justify-content-center px-sm-3">
                    <div className="col-md-6 col-lg-5 col-xl-3 mb-4 mb-md-0 rounded-4 customize-chat-side">
                      <div className="py-4">
                        <div className="input-group rounded p-3" dir="rtl">
                          <span title={"ایجاد گروه جدید"} onClick={() => setOpenModal(true)} className="cursor-pointer" style={{cursor: "pointer"}}>
                            <GrNewWindow className="fs-5" />
                          </span>
                          <p style={{fontFamily: "Ios15Medium", textAlign: "center", marginRight: "28%", fontWeight: "bold", fontSize: "18px", color: "#485c2f" }}>لیست گروه‌ها</p>
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
                          {groupList.length == 0 && (
                            <p
                              className=" fs-5 font-custom"
                              style={{
                                position: "absolute",
                                top: "45%",
                                width: "100%",
                                color: "#198754",
                              }}
                            >
                            گروهی جهت نمایش وجود ندارد!
                            </p>
                          )}
                          <ul className="list-unstyled mb-0">
                            {groupList.map((group) => (
                              <li
                                className="p-2"
                                style={{ borderBottom: "1px solid black" }}
                                key={group.id}
                              >
                                <div
                                  onClick={() => setSelectedGroup(group)}
                                  className="d-flex justify-content-between"
                                  style={{ cursor: 'pointer' }} 
                                >
                                  <div className="d-flex flex-row">
                                    <div className="pt-1" style={{ textAlign: "right" }}>
                                      <p
                                        className="fw-bold mb-0 font-custom"
                                        style={{ color: "rgba(47, 47, 47, 0.77)" }}
                                      >
                                        {group.title || "گروه جدید"}
                                      
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-5 col-lg-6 col-xl-8" style={{ direction: "ltr" }}>
                      {selectedGroup !== null && (
                        <div
                          style={{
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "2px solid green", 
                            borderRadius: "10px", 
                            backgroundColor: "rgba(227, 248, 229, 0.9)",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                            cursor: "pointer"
                          }}
                          onClick={() => setOpenGroupInfoModal(true)} 
                        >
                          <p
                            className="customizedp"
                            style={{
                              fontFamily: "Ios15Medium",
                              fontSize: "22px",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
                              color: "#464c49"
                            }}
                          >
                            {selectedGroup.title}
                          </p>
                        </div>
                      )}

                      {openGroupInfoModal && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: "1000"
                          }}
                        >
                          <div
                            style={{
                              width: "400px",
                              backgroundColor: "rgb(232, 250, 234)",
                              padding: "20px",
                              borderRadius: "8px",
                              boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                              textAlign: "center",
                              direction: "rtl",
                            }}
                          >
                            <h3
                              style={{
                                fontFamily: "Ios15Medium",
                                color: "rgb(17, 92, 36)",
                                textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                                marginBottom: "30px"
                              }}
                            >
                               {selectedGroup.title}
                            </h3>
                            <p style={{fontFamily: "Ios15Medium", textAlign: "right", marginRight: "9%"}}>{selectedGroup.descriptions}</p>
                            <div style={{ marginTop: "10%",fontFamily: "Ios15Medium" }}>
                              <button
                                onClick={() => setOpenGroupInfoModal(false)}
                                className="groupchat-modal-button confirm"
                              >
                                بستن
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedGroup !== null && Object.keys(messages).length === 0 && (
                        <div
                          className="pt-3 pe-3"
                          id="scrollable-section"
                          ref={scrollRef}
                          style={{
                            position: "relative",
                            height: "400px",
                            overflowY: "auto",
                          }}
                        >
                          <p
                            className=" fs-5 font-custom"
                            style={{
                              position: "absolute",
                              top: "45%",
                              width: "100%",
                              color: "#198754",
                            }}
                          >
                            !پیامی جهت نمایش وجود ندارد
                          </p>
                        </div>
                      )}

                      {selectedGroup === null && groupList.length != 0 && (
                        <div
                          className="pt-3 pe-3"
                          id="scrollable-section"
                          ref={scrollRef}
                          style={{
                            position: "relative",
                            height: "400px",
                            overflowY: "auto",
                          }}
                        >
                          <p
                            className=" fs-5 font-custom"
                            style={{
                              position: "absolute",
                              top: "45%",
                              width: "100%",
                              color: "#198754",
                            }}
                          >
                            ...برای شروع پیام‌رسانی یک گروه را انتخاب کنید
                          </p>
                        </div>
                      )}

                      {selectedGroup !== null && Object.keys(messages).length > 0 && (
                        <>
                          <div
                            className="pt-3 pe-3"
                            id="scrollable-section"
                            ref={scrollRef}
                            style={{
                              position: "relative",
                              height: "400px",
                              overflowY: "auto",
                            }}
                          >
                            {Object.keys(messages).map((date) => (
                              <div key={date}>
                                {/* Display Date */}
                                <div
                                  style={{
                                    fontSize: "11px",
                                    fontFamily: "Ios15Medium",
                                    textAlign: "center",
                                    color: "rgb(98, 99, 98)",
                                    fontWeight: "bold",
                                    margin: "20px 0",
                                    direction: "rtl",
                                    backgroundColor: "rgba(211, 211, 213, 0.39)", 
                                    width: "10%", 
                                    borderRadius: "15px", 
                                    padding: "5px 10px", 
                                  }}
                                >
                                  {toPersianDigits(date)}
                                </div>

                                {/* Render Messages for the Date */}
                                {messages[date].map((message) => (
                                  <div
                                    key={message.id}
                                    className="message-container"
                                    style={{ fontFamily: "Ios15Medium" }}
                                  >
                                    <div
                                      className={`d-flex flex-row justify-content-${message.isSelf ? "end" : "start"}`}
                                    >
                                      <div
                                        className={`p-2 mb-1 rounded-4 font-custom ${message.isSelf
                                          ? "groupchat-bg-success text-white"
                                          : "groupchat-bg-light"
                                          }`}
                                        style={{
                                          backgroundColor: "rgb(185, 219, 197)",
                                          position: "relative", // Position the message box to allow the delete icon to float beside it
                                          fontFamily: "Ios15Medium",
                                          maxWidth: "80%"
                                        }}
                                      >
                                        {!message.isSelf && (
                                          <p
                                            className="small mb-1 groupchat-text-muted"
                                            style={{
                                              textAlign: "left",
                                              fontWeight: "bold",
                                              color: "#7c7e7c !important",
                                              fontFamily: "Ios15Medium",
                                              fontSize: "16px"
                                            }}
                                          >
                                            {message.firstname} {message.lastname}
                                          </p>
                                        )}
                                        <p
                                          className="small mb-1"
                                          style={{
                                            direction: "rtl",
                                            textAlign: "right",
                                            marginLeft: message.isSelf ? "25px" : "0",
                                            marginRight: message.isSelf ? "0px" : "25px",
                                            fontFamily: "Ios15Medium",
                                            fontSize: "16px"
                                          }}
                                        >
                                          {toPersianDigits(message.content)}
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "12px",
                                            color: message.isSelf ? "#ffffffa8" : "gray",
                                            textAlign: message.isSelf ? "left" : "right",
                                            marginBottom: "0",
                                            fontFamily: "Ios15Medium"
                                          }}
                                        >
                                          {toPersianDigits(formatTime(message.createdAt))}
                                        </p>

                                        {/* Delete Icon */}
                                        <RiDeleteBin6Line
                                          className="delete-icon"
                                          onClick={() => deleteMessage(message.id)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>

                          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                            <TextField
                              multiline
                              placeholder="پیام"
                              autoComplete="off"
                              variant="outlined"
                              onChange={(event) => {
                                if (event.target.value.includes("\n")) {
                                  sendMessage();
                                  setNewMessage(event.target.value.slice(0, -1));
                                } else setNewMessage(event.target.value);
                              }}
                              dir="rtl"
                              InputLabelProps={{
                                dir: "rtl",
                              }}
                              value={newMessage}
                              className="custom-form-input"
                              InputProps={{
                                style: {
                                  color: "red",
                                  width: "100%",
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "gray", // Outline color
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "darkgreen", // Outline color on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "rgb(75, 147, 113)", // Outline color when focused
                                  },
                                },
                                "& .MuiInputBase-input": {
                                  color: "gray", // Text color
                                },
                              }}
                            />

                            <a className="ms-3 fs-4 text-success text-decoration-none">
                              {loading && (
                                <FaPaperPlane
                                  onClick={() => {
                                    setLoading(false);
                                    sendMessage();
                                  }}
                                />
                              )}
                              {!loading && (
                                <div onClick={() => sendMessage()} title="ارسال پیام">
                                  <RiSendPlaneFill />
                                </div>
                              )}
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

        {/* Modal for creating a new group */}
        {openModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "400px",
                backgroundColor: "rgb(232, 250, 234)",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                textAlign: "center",
                direction: "rtl",
                fontFamily: "Ios15Medium"
              }}
            >
              <h3 style={{ fontFamily: "Ios15Medium", color: "rgb(17, 92, 36)", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                ایجاد گروه جدید
              </h3>
              <textarea
                value={newGroupName}
                onChange={handleInputChange}
                placeholder="نام گروه را وارد کنید."
                style={{
                  width: "90%",
                  height: "50px",
                  padding: "8px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                value={newGroupDescriptions}
                onChange={(e) => setNewGroupDescriptions(e.target.value)}
                placeholder="توضیحات گروه را وارد کنید."
                style={{
                  width: "90%",
                  height: "100px",
                  padding: "8px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ marginTop: "20px", fontFamily: "Ios15Medium" }}>
                <button onClick={createGroup} className="groupchat-modal-button confirm">
                  ثبت
                </button>
                <button onClick={() => setOpenModal(false)} className="groupchat-modal-button cancel">
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default GroupChat;
