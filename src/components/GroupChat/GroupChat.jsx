import "./groupchat_styles.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client
import GroupList from "./GroupList";
import MessageList from "./MessageList";
import InputField from "./InputField";
import { GrNewWindow } from "react-icons/gr";



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
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescriptions, setNewGroupDescriptions] = useState("");
  const [showArchived, setShowArchived] = useState(false); // State for toggling archived groups
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState({});
  const [openGroupInfoModal, setOpenGroupInfoModal] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState("");
  const [loadingGroups, setLoadingGroups] = useState(false); // For group loading
  const [loadingMessages, setLoadingMessages] = useState(false); // For message loading

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
      // setGroupName(selectedGroup.title);
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
      setLoadingGroups(true); // Start loading
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
    } finally {
      setLoadingGroups(false); // Stop loading
    }
  };

  // Get the messages of the group which the user has clicked on
  const getMessages = async (roomId) => {
    try {
      setLoadingMessages(true); // Start loading
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
    } finally {
      setLoadingMessages(false); // Stop loading
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

      if (response.status == 200 || response.status == 201 || response.status == 204) {
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
                        {/* <span title={"ایجاد گروه جدید"} onClick={() => setOpenModal(true)} className="cursor-pointer" style={{cursor: "pointer"}}>
                            <GrNewWindow className="fs-5" />
                          </span> */}
                          <p
                            style={{
                              fontFamily: "Ios15Medium",
                              textAlign: "center",
                              marginRight: "35%",
                              fontWeight: "bold",
                              fontSize: "18px",
                              color: "#485c2f",
                            }}
                          >
                            لیست گروه‌ها
                          </p>
                        </div>
                        <hr className="mt-0" />
                        <GroupList
                          groupList={groupList}
                          loadingGroups={loadingGroups}
                          setSelectedGroup={setSelectedGroup}
                        />
                      </div>
                    </div>
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

                    <div className="col-md-5 col-lg-6 col-xl-8" style={{ direction: "ltr" }}>
                      {selectedGroup && (
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
                            cursor: "pointer",
                          }}
                          onClick={() => setOpenGroupInfoModal(true)}
                        >
                          <p
                            className="customizedp"
                            style={{
                              fontFamily: "Ios15Medium",
                              fontSize: "22px",
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                              color: "#464c49",
                            }}
                          >
                            {selectedGroup.title}
                          </p>
                        </div>
                      )}

                      <MessageList
                        messages={messages}
                        loadingMessages={loadingMessages}
                        deleteMessage={deleteMessage}
                        selectedGroup={selectedGroup}
                        groupList={groupList}
                        scrollRef={scrollRef}
                      />

                      {selectedGroup !== null && <InputField
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        sendMessage={sendMessage}
                        loading={loading}
                      />}
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
