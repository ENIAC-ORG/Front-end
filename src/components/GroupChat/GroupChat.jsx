import "./groupchat_styles.css";
import { ToastContainer, toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { TextField } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import Footer from "../Footer/Footer";
import { RiSendPlaneFill } from "react-icons/ri";

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
    name: "گروه اول",
    archived: false,
    messages: [
      { id: 1, content: "سلام، چطورید؟", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
      { id: 2, content: "خوبم، مرسی! شما چطورید؟", authorId: 2, authorName: "زهرا دهقان", timestamp: new Date() },
      { id: 3, content: "خوبم، متشکرم!", authorId: 1, authorName: "هلیا شمس زاده", timestamp: new Date() },
    ],
  },
  {
    id: 2,
    name: "گروه دوم",
    archived: false,
    messages: [
      { id: 1, content: "سلام، وقت بخیر!", authorId: 3, authorName: "فاطمه شرح دهی", timestamp: new Date() },
      { id: 2, content: "وقت شما هم بخیر!", authorId: 4, authorName: "زهرا علیزاده", timestamp: new Date() },
    ],
  },
  { id: 3, name: "گروه سوم", archived: true, messages: [] },
];

const GroupChat = () => {
  const scrollRef = useRef(null);
  const [groupList, setGroupList] = useState(mockGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [userName, setUserName] = useState("هلیا شمس زاده"); // Default user ID
  const [userId, setUserId] = useState(1); // Default user ID for styling

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

  const createGroup = () => {
    if (!groupName.trim()) {
      toast.error("نام گروه نمی‌تواند خالی باشد");
      return;
    }
    const newGroup = {
      id: groupList.length + 1,
      name: groupName,
      archived: false,
      messages: [],
    };
    setGroupList([...groupList, newGroup]);
    setGroupName("");
    toast.success("گروه جدید ایجاد شد");
  };

  const editGroup = () => {
    if (!editGroupName.trim()) {
      toast.error("نام گروه نمی‌تواند خالی باشد");
      return;
    }
    const updatedGroups = groupList.map((group) =>
      group.id === selectedGroup.id ? { ...group, name: editGroupName } : group
    );
    setGroupList(updatedGroups);
    setSelectedGroup({ ...selectedGroup, name: editGroupName });
    toast.success("نام گروه تغییر کرد");
  };

  const archiveGroup = () => {
    const updatedGroups = groupList.map((group) =>
      group.id === selectedGroup.id ? { ...group, archived: true } : group
    );
    setGroupList(updatedGroups);
    setSelectedGroup({ ...selectedGroup, archived: true });
    toast.success("گروه به بایگانی منتقل شد");
  };

  const deleteGroup = () => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این گروه را حذف کنید؟")) {
      const updatedGroups = groupList.filter((group) => group.id !== selectedGroup.id);
      setGroupList(updatedGroups);
      setSelectedGroup(null);
      toast.success("گروه حذف شد");
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMessageObj = {
      id: selectedGroup.messages.length + 1,
      content: newMessage,
      authorId: userId, // Use the current user ID for message styling
      authorName: userName, // Display the author's name
      timestamp: new Date(),
    };
    const updatedGroup = { ...selectedGroup, messages: [...selectedGroup.messages, newMessageObj] };
    setSelectedGroup(updatedGroup);
    setNewMessage("");
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = selectedGroup.messages.filter((msg) => msg.id !== messageId);
    const updatedGroup = { ...selectedGroup, messages: updatedMessages };
    setSelectedGroup(updatedGroup);
    toast.success("پیام حذف شد");
  };

  // Helper function to convert digits to Persian
  function toPersianDigits(str) {
    if (typeof str !== "string") return ""; // Return an empty string if the input is not a string
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/\d/g, (digit) => persianDigits[digit]);
  }

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
                  <div className="row justify-content-center px-sm-3 ">
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
                            width: "90%",
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
                              !هنوز مکالمه ای شروع نکرده اید
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
                                  <div className="pt-4">
                                    <p className="small mb-1 font-custom" dir="rtl">
                                      {toPersianDigits(group.createTime)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
  
                    <div className="col-md-5 col-lg-6 col-xl-8 ">
                      {selectedGroup !== null && (
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
                              <div key={message.id}>
                                {/* Message from user */}
                                <div
                                  className={`d-flex flex-row justify-content-${
                                    message.authorId === userId ? "end" : "start"
                                  }`}
                                >
                                  {/* Message Box for Other Users (with their username inside) */}
                                  <div
                                    className={`p-2 mb-1 rounded-3 font-custom ${
                                      message.authorId === userId
                                        ? "bg-success text-white"
                                        : "bg-light"
                                    }`}
                                  >
                                    {message.authorId !== userId && (
                                      <p
                                        className="small mb-1 text-muted"
                                        style={{
                                          textAlign: "right",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {message.authorName}
                                      </p>
                                    )}
                                    <p
                                      className="small mb-1"
                                      style={{
                                        textAlign:
                                          message.authorId === userId ? "right" : "left",
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
      </section>
    </>
  );
};

export default GroupChat;
