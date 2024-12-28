import "./groupchat_styles.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";

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


  const MessageList = ({ messages, loadingMessages, deleteMessage, selectedGroup, groupList, scrollRef }) => (
    <div
      className="pt-3 pe-3"
      id="scrollable-section"
      style={{
        position: "relative",
        height: "400px",
        overflowY: "auto",
      }}
    >
      {loadingMessages && <Spinner />}
      {selectedGroup !== null && !loadingMessages && Object.keys(messages).length === 0 && (
        <p
          className="fs-5 font-custom"
          style={{ position: "absolute", top: "45%", width: "100%", color: "#198754" }}
        >
          !پیامی جهت نمایش وجود ندارد
        </p>
      )}

      
    {selectedGroup === null && !loadingMessages && groupList.length != 0 && (
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

      {!loadingMessages && Object.keys(messages).length > 0 && (
        Object.keys(messages).map((date) => (
          <div key={date}>
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
                      : "groupchat-bg-light"}
                    `}
                    style={{
                      backgroundColor: "rgb(185, 219, 197)",
                      position: "relative",
                      fontFamily: "Ios15Medium",
                      maxWidth: "80%",
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
                          fontSize: "16px",
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
                        fontSize: "16px",
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
                        fontFamily: "Ios15Medium",
                      }}
                    >
                      {toPersianDigits(formatTime(message.createdAt))}
                    </p>
                    <RiDeleteBin6Line
                      className="delete-icon"
                      onClick={() => deleteMessage(message.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
  
  export default MessageList;