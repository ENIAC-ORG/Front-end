import "./admin_groupchat_styles.css";
import { ToastContainer, toast } from "react-toastify";
import { GrNewWindow } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar_SideBar from "../SidebarNabar/NavBar_SideBar";
import { BiArchive, BiEdit } from "react-icons/bi";
import Footer from "../Footer/Footer";
import axios from "axios";
import io from "socket.io-client";
import { message } from "antd";

// Helper function to format the time (hour and minute) from created_at to Tehran time
function formatTime(date) {
    const d = new Date(date);
    const tehranOffset = 11 * 60;
    const localOffset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() + localOffset + tehranOffset);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
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
    return d.toLocaleDateString('fa-IR', options);
}


const AdminGroupChat = () => {
    const scrollRef = useRef(null);
    const socket = useRef(null); // To hold the socket connection
    const [groupList, setGroupList] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [chosenGroup, setChosenGroup] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(1);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null });
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDescriptions, setNewGroupDescriptions] = useState("");
    const [showArchived, setShowArchived] = useState(false);
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
    const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
    const [messages, setMessages] = useState({});
    const [openGroupInfoModal, setOpenGroupInfoModal] = useState(false);
    const [email, setEmail] = useState("");
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        getAllGroups();
        getUserEmail();
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            // Open WebSocket connection
            socket.current = new WebSocket(`wss://eniacgroup.ir/backend/ws/chat/${selectedGroup.id}/?${email}`);

            socket.current.onopen = () => {
                console.log("WebSocket is connected.");
            };

            socket.current.onmessage = (event) => {
                try {
                    const newMessages = JSON.parse(event.data);
                    // console.log(newMessage.createdAt);
                    console.log("Received Message:", newMessages);
                    getMessages(selectedGroup.id);
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            };


            socket.current.onclose = (event) => {
                console.log("WebSocket connection closed:", event);
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
            const response = await axios.get("https://eniacgroup.ir/backend/chat/get-user-email/", {
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
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("https://eniacgroup.ir/backend/chat/rooms/", {
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
            setLoading(false);
        }
    };

    // Get the messages of the group which the user has clicked on
    const getMessages = async (roomId) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`https://eniacgroup.ir/backend/chat/rooms/${roomId}/messages/`, {
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
            socket.current.send(
                JSON.stringify({
                    email: email,
                    message: newMessage,
                })
            );

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
            const response = await axios.delete(`https://eniacgroup.ir/backend/chat/messages/${messageId}/`, {
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
    const createGroup = async () => {
        if (!newGroupName.trim()) {
            toast.error("نام گروه نمی‌تواند خالی باشد");
            return;
        }
        try {
            const newGroup = { "title": newGroupName, "description": newGroupDescriptions }
            const response = await axios.post(`https://eniacgroup.ir/backend/chat/rooms/`, newGroup, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            getAllGroups();
            setNewGroupName("");
            setNewGroupDescriptions("");
            setOpenCreateGroupModal(false);
            toast.success("گروه جدید ایجاد شد");
        } catch (error) {

        }
    };

    // Archive group by admin
    const archiveGroup = async (groupId) => {
        try {
            console.log(token);
            console.log(groupId);
            const response = await axios.post(`https://eniacgroup.ir/backend/chat/rooms/${groupId}/toggle-visibility/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);
            getAllGroups();
            toast.success("گروه مورد نظر با موفقیت آرشیو شد");
        } catch (error) {
            console.log(error.message);
        }
    };

    // Delete group by admin
    const deleteGroup = async (groupId) => {
        try {
            const response = await axios.delete(`https://eniacgroup.ir/backend/chat/rooms/${groupId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            getAllGroups();
            toast.success("گروه مورد نظر با موفقیت حذف شد");
        } catch (error) {
            console.log(error);
        }
    };

    // Edit group by admin
    const editGroup = async () => {
        if (!newGroupName.trim()) {
            toast.error("نام گروه نمی‌تواند خالی باشد");
            return;
        }
        try {
            const response = await axios.put(`https://eniacgroup.ir/backend/chat/rooms/${chosenGroup.id}/update/`,
                { title: newGroupName, description: newGroupDescriptions }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            getAllGroups();
            setNewGroupName("");
            setNewGroupDescriptions("");
            setOpenEditGroupModal(false);
            toast.success("گروه با موفقیت ویرایش شد");
        } catch (error) {
            console.log(error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setNewGroupName(e.target.value);
    };

    const handleOpenEditGroupModal = (group) => {
        setChosenGroup(group); // Set the group to be edited
        setNewGroupName(group.title); // Set the current name as the default value
        setNewGroupDescriptions(group.descriptions); // Set the current description as the default value
        setOpenEditGroupModal(true); // Open the modal
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
                                                    <span title={"ایجاد گروه جدید"} onClick={() => setOpenCreateGroupModal(true)} className="cursor-pointer" style={{ cursor: "pointer" }}>
                                                        <GrNewWindow className="fs-5" />
                                                    </span>
                                                    <p style={{ fontFamily: "Ios15Medium", textAlign: "center", marginRight: "35%", fontWeight: "bold", fontSize: "18px", color: "#485c2f" }}>لیست گروه‌ها</p>
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
                                                                key={group.id}
                                                                className="p-2 position-relative d-flex align-items-center justify-content-between group-item"
                                                                style={{ borderBottom: "1px solid black" }}
                                                            >
                                                                {/* Group Title */}
                                                                <div
                                                                    className="group-item"
                                                                    style={{ textAlign: "right", cursor: "pointer", flexGrow: 1 }}
                                                                    onClick={() =>
                                                                        setSelectedGroup(group)}
                                                                >
                                                                    <p
                                                                        className="fw-bold mb-0 font-custom"
                                                                        style={{ color: "rgba(47, 47, 47, 0.77)" }}
                                                                    >
                                                                        {toPersianDigits(group.title) || "گروه جدید"}
                                                                    </p>
                                                                </div>

                                                                {/* Icons on Left Side */}
                                                                <div
                                                                    className="icon-container d-flex"
                                                                    style={{
                                                                        display: "none",
                                                                        gap: "10px",
                                                                        marginLeft: "10px", // Space between icons and group title
                                                                    }}
                                                                >
                                                                    <span
                                                                        title="ویرایش"
                                                                        className="text-primary"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleOpenEditGroupModal(group);
                                                                        }}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <BiEdit className="fs-5" />
                                                                    </span>
                                                                    <span
                                                                        title="آرشیو"
                                                                        className="text-secondary"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            // setChosenGroup(group);
                                                                            archiveGroup(group.id);
                                                                        }}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <BiArchive className="fs-5" />
                                                                    </span>
                                                                    <span
                                                                        title="حذف"
                                                                        className="text-danger"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            // setChosenGroup(group);
                                                                            deleteGroup(group.id);
                                                                        }}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        <RiDeleteBin6Line className="fs-5" />
                                                                    </span>
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
                                                        {toPersianDigits(selectedGroup.title)}
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
                                                            {toPersianDigits(selectedGroup.title)}
                                                        </h3>
                                                        <p style={{ fontFamily: "Ios15Medium", textAlign: "right", marginRight: "9%" }}>{selectedGroup.descriptions ? toPersianDigits(selectedGroup.descriptions) : ""}</p>
                                                        <div style={{ marginTop: "10%", fontFamily: "Ios15Medium" }}>
                                                            <button
                                                                onClick={() => setOpenGroupInfoModal(false)}
                                                                className="admin-groupchat-modal-button confirm"
                                                            >
                                                                بستن
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedGroup !== null && Object.keys(messages).length === 0 && (<>
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
                                                </div></>
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
                                                        {Object.keys(messages)
                                                            .sort((a, b) => new Date(a) - new Date(b)) // مرتب‌سازی کلیدهای تاریخ به ترتیب صعودی
                                                            .map((date) => (
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
                                                                                        ? "admin-groupchat-bg-success text-white"
                                                                                        : "admin-groupchat-bg-light"
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
                                                                                            className="small mb-1 admin-groupchat-text-muted"
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
                                                                                        className="admin-delete-icon"
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
                {openCreateGroupModal && (
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
                                <button onClick={createGroup} className="admin-groupchat-modal-button confirm">
                                    ثبت
                                </button>
                                <button onClick={() => setOpenCreateGroupModal(false)} className="admin-groupchat-modal-button cancel">
                                    انصراف
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal for creating a new group */}
                {openEditGroupModal && (
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
                                ویرایش گروه
                            </h3>
                            <textarea
                                value={newGroupName}
                                onChange={handleInputChange}
                                placeholder="نام جدید گروه را وارد کنید."
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
                                placeholder="توضیحات جدید گروه را وارد کنید."
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
                                <button onClick={editGroup} className="admin-groupchat-modal-button confirm">
                                    ثبت
                                </button>
                                <button onClick={() => setOpenEditGroupModal(false)} className="admin-groupchat-modal-button cancel">
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

export default AdminGroupChat;