import "./groupchat_styles.css";
import { ToastContainer, toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";


// Helper function to calculate time difference
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

// Mock groups with Persian messages, different users, and authorId
const mockGroups = [
  {
    id: 1,
    name: "گروه زوج درمانی",
    archived: false,
    messages: [
      { id: 1, content: "سلام، چطورید؟", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
      { id: 2, content: "خوبم، مرسی! شما چطورید؟", authorId: 2, authorName: "زهرا دهقان", timestamp: new Date() },
      { id: 3, content: "!خوبم، متشکرم", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
    ],
  },
  {
    id: 2,
    name: "گروه کودکان",
    archived: false,
    messages: [
      { id: 1, content: "!سلام، وقت بخیر", authorId: 3, authorName: "فاطمه شرح دهی", timestamp: new Date() },
      { id: 2, content: "!وقت شما هم بخیر", authorId: 4, authorName: "زهرا علیزاده", timestamp: new Date() },
    ],
  },
  { id: 3, name: "گروه فردی", archived: true,  messages: [
    { id: 1, content: "سلام، به نظرتون برای اضطراب زیاد بهتره دارو تجویز بشه؟", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
    { id: 2, content: "عوارض دارو از فوایدش خیلی بیشتره! بهتره تا حد امکان سعی کنیم تجویز نشه", authorId: 2, authorName: "زهرا دهقان", timestamp: new Date() },
    { id: 3, content: "!درسته، موافقم", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
  ], },
];

const GroupChat = () => {
  const scrollRef = useRef(null);
  const contextMenuRef = useRef(null);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState(""); // State to handle the group name input
  const [userName, setUserName] = useState("هلیا شمس زاده");
  const [userId, setUserId] = useState(1);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null });
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescriptions, setNewGroupDescriptions] = useState("");
  const [showArchived, setShowArchived] = useState(false); // State for toggling archived groups
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.name);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedGroup?.messages]);

  useEffect(() => {
    // Close the context menu when clicking outside of it
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        closeContextMenu();
      }
    };

    if (contextMenu.visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.visible]);

  const token = "your-token-here"; // Replace with actual token

  // Fetch all groups
  const getAllGroups = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get('http://46.249.100.141:8070/chat/rooms/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        // const commentsArray = response.data.comments || [];
        // if (Array.isArray(commentsArray) && commentsArray.length > 0) {
        //   setComments((prevComments) => {
        //     const updatedComments = commentsArray.map((comment) => {
        //       return {
        //         fullname: comment.patient_name,
        //         date: comment.date,
        //         rating: comment.rating,
        //         comment: comment.comments
        //       };
        //     });

        //     return updatedComments;
        //   });
        // }
        // setAvgRating(response.data.average_score);
        // console.log(comments);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("خطا در بارگذاری گروه‌ها");
    }
  };

  // Fetch messages for the selected group
  const getMessages = async (roomId) => {
    try {
      const response = await axios.get(`/chat/rooms/${roomId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages(response.data); // Set messages for the selected group
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("خطا در بارگذاری پیام‌ها");
    }
  };

  useEffect(() => {
    getAllGroups(); // Get all groups on component mount
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.name);
      getMessages(selectedGroup.id); // Fetch messages when a group is selected
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Create a new group
  const createGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error("نام گروه نمی‌تواند خالی باشد");
      return;
    }
    try {
      const response = await axios.post('/chat/rooms/', {
        name: newGroupName,
        description: newGroupDescriptions
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setGroupList([...groupList, response.data]);
      setNewGroupName(""); // Clear the input after creating the group
      setNewGroupDescriptions("");
      setOpenModal(false); // Close the modal
      toast.success("گروه جدید ایجاد شد");
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("خطا در ایجاد گروه");
    }
  };

  // Delete a group
  const deleteGroup = async (groupId) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این گروه را حذف کنید؟")) {
      try {
        await axios.post(`/chat/rooms/${groupId}/`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setGroupList(groupList.filter(group => group.id !== groupId));
        setSelectedGroup(null);
        toast.success("گروه حذف شد");
      } catch (error) {
        console.error("Error deleting group:", error);
        toast.error("خطا در حذف گروه");
      }
    }
  };

  // Archive a group
  const archiveGroup = async (groupId) => {
    try {
      await axios.post(`/chat/rooms/${groupId}/toggle-visibility/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setGroupList(groupList.map(group =>
        group.id === groupId ? { ...group, archived: !group.archived } : group
      ));
      toast.success("گروه به بایگانی منتقل شد");
    } catch (error) {
      console.error("Error archiving group:", error);
      toast.error("خطا در بایگانی کردن گروه");
    }
  };

  // Update a group
  const updateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error("نام گروه نمی‌تواند خالی باشد");
      return;
    }
    try {
      const response = await axios.put(`/chat/rooms/${selectedGroup.id}/update/`, {
        name: newGroupName,
        description: newGroupDescriptions
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedGroups = groupList.map(group =>
        group.id === selectedGroup.id ? response.data : group
      );
      setGroupList(updatedGroups);
      setSelectedGroup(response.data);
      setNewGroupName(""); // Clear the input after updating the group
      setNewGroupDescriptions("");
      setOpenModal(false);
      toast.success("گروه ویرایش شد");
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("خطا در ویرایش گروه");
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`/chat/rooms/${selectedGroup.id}/messages/`, {
        message: newMessage
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages([...messages, { content: newMessage, authorId: userId, authorName: userName, created_at: new Date() }]);
      setNewMessage(""); // Clear the message input
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("خطا در ارسال پیام");
    }
  };

  // Delete a message
  const deleteMessage = async (messageId) => {
    try {
      await axios.post(`/chat/messages/${messageId}/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessages(messages.filter(message => message.id !== messageId));
      toast.success("پیام حذف شد");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("خطا در حذف پیام");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true); // Open the modal for the group name
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setGroupName(""); // Reset the group name when modal is closed
  };

  const handleInputChange = (e) => {
    setNewGroupName(e.target.value); // Handle input change for group name
  };


  const handleContextMenu = (e, itemType, item) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      target: { itemType, item },
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, target: null });
  };

  const handleContextMenuAction = (action) => {
    if (contextMenu.target) {
      const { itemType, item } = contextMenu.target;
      if (itemType === "group") {
        if (action === "archive") {
          archiveGroup(item.id);
        } else if (action === "delete") {
          deleteGroup(item.id);
        }
      } else if (itemType === "message") {
        if (action === "delete") {
          deleteMessage(item.id);
        }
      }
    }
    closeContextMenu();
  };


  const toggleArchived = () => {
    setShowArchived(!showArchived); // Toggle between showing active and archived groups
  };

  return (
    <>
      <NavBar_SideBar />
      <ToastContainer style={{ width: "450px" }} />
      <section>
        <div className="py-5" align="center" style={{ backgroundColor: "#f0f9f1" }}>
          <div className="row">
            <div className="col-md-12">
              <div id="chat3" style={{ borderRadius: "15px", width: "100%" }}>
                <div className="card-body">
                  <div className="row justify-content-center px-sm-3">
                    <div className="col-md-6 col-lg-5 col-xl-3 mb-4 mb-md-0 rounded-4 customize-chat-side">
                      <div className="py-4">
                        <div className="input-group rounded p-3" dir="rtl">
                          <span title={"ایجاد گروه جدید"} onClick={handleOpenModal} className="cursor-pointer">
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
                          {showArchived ? (
                            <ul className="list-unstyled mb-0">
                              {archivedGroups.map((group) => (
                                <li
                                  className="p-2"
                                  style={{ borderBottom: "1px solid black" }}
                                  key={group.id}
                                  onContextMenu={(e) => handleContextMenu(e, "group", group)}
                                >
                                  <div
                                    onClick={() => setSelectedGroup(group)}
                                    className="d-flex justify-content-between"
                                  >
                                    <div className="d-flex flex-row">
                                      <div className="pt-1">
                                        <p
                                          className="fw-bold mb-0 font-custom"
                                          style={{ color: "#198754" }}
                                        >
                                          {group.name || "گروه جدید"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ul className="list-unstyled mb-0">
                              {groupList.filter(group => !group.archived).map((group) => (
                                <li
                                  className="p-2"
                                  style={{ borderBottom: "1px solid black" }}
                                  key={group.id}
                                  onContextMenu={(e) => handleContextMenu(e, "group", group)}
                                >
                                  <div
                                    onClick={() => setSelectedGroup(group)}
                                    className="d-flex justify-content-between"
                                  >
                                    <div className="d-flex flex-row">
                                      <div className="pt-1">
                                        <p
                                          className="fw-bold mb-0 font-custom"
                                          style={{ color: "#198754" }}
                                        >
                                          {group.name || "گروه جدید"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {/* Toggle Button */}
                        <div
                          onClick={toggleArchived}
                          className="rating-field_modal rating-btn"
                          style={{ width: "96%", marginLeft: "2%" }}
                        >
                          <div className="rating-btn_layer">
                            <input
                              style={{ fontFamily: "Ios15Medium" }}
                              type="submit"
                              value={showArchived ? "نمایش گروه‌های اصلی" : "نمایش گروه‌های آرشیو شده"}
                            />
                          </div>
                        </div>
                        {/* End Toggle Button */}
                      </div>
                    </div>


                    <div className="col-md-5 col-lg-6 col-xl-8">
                      {selectedGroup !== null && selectedGroup.messages && (
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
                            {selectedGroup.messages.map((message) => (
                              <div
                                key={message.id}
                                onContextMenu={(e) => handleContextMenu(e, "message", message)}
                              >
                                {/* Message from user */}
                                <div
                                  className={`d-flex flex-row justify-content-${message.authorId === userId ? "end" : "start"
                                    }`}
                                >
                                  {/* Message Box for Other Users (with their username inside) */}
                                  <div
                                    className={`p-2 mb-1 rounded-3 font-custom ${message.authorId === userId
                                      ? "groupchat-bg-success text-white"
                                      : "groupchat-bg-light"
                                      }`} style={{ backgroundColor: "rgb(185, 219, 197) !important" }}
                                  >
                                    {message.authorId !== userId && (
                                      <p
                                        className="small mb-1 groupchat-text-muted"
                                        style={{
                                          textAlign: "left",
                                          fontWeight: "bold",
                                          color: "#7c7e7c !important"
                                        }}
                                      >
                                        {message.authorName}
                                      </p>
                                    )}
                                    <p
                                      className="small mb-1"
                                      style={{
                                        textAlign: message.authorId === userId ? "left" : "right",
                                      }}
                                    >
                                      {message.content}
                                    </p>
                                  </div>
                                </div>
                              </div>

                            ))}
                          </div>

                          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                            <TextField
                              multiline
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
                                <div onClick={() => sendMessage()}>
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
              }}
            >
              <h3 style={{ fontFamily: "Ios15Medium", color: "rgb(17, 92, 36)", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                ایحاد گروه جدید
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
              <div style={{ marginTop: "20px" }}>
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
