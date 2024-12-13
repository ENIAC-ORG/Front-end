import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./user_management.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDenyIndex, setCurrentDenyIndex] = useState(null);
  const [denialReason, setDenialReason] = useState("");
  const intervalRef = useRef(null);
  const [adminAccessToken, setAdminAccessToken] = useState("");

  const convertToPersianNumbers = (value) => {
    const persianNumbersMap = {
      0: "۰", 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹",
    };

    // Ensure value is a string before applying replace
    return String(value).replace(/[0-9]/g, (char) => persianNumbersMap[char] || char);
  };


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAdminAccessToken();
    console.log("token: ", adminAccessToken);
  }, []);

  useEffect(() => {
    fetchDoctors();
    intervalRef.current = setInterval(fetchDoctors, 5000); 
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getAdminAccessToken = async () => {
    try {
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      const response = await axios("http://46.249.100.141:8070/accounts/Login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: "eniakgroupiust@gmail.com",
          password: "eniac@1403",
        },
      });
      console.log("--------------------"+response.data);
      setAdminAccessToken(response.data.access);
    } catch (error) {
      toast.error("خطا", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAcceptUser = async (userId) => {
    try {
      const response = await axios.post(
        `http://46.249.100.141:8070/DoctorPanel/pending_doctor/accept/${adminAccessToken}/`, 
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status == 200) {
        console.log("User accepted successfully:", response.data);
        toast.success("کاربر با موفقیت تایید شد", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Error: ", error);
        toast.error("خطا در تایید کاربر", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error in handleAcceptUser catch:", error);
      toast.error("مشکلی در تایید کاربر وجود دارد", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDenyUser = async (userId) => {
    try {
      const response = await axios.post(
        `http://eniacgroup.ir:8070//DoctorPanel/pending_doctor/deny/${userId}/`, 
        { message: denialReason },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );
      if (response.status == 200) {
        console.log("User denied successfully:", response.data);
        setUsers((prevUsers) =>
          prevUsers.map((user, i) => {
            if (i === currentDenyIndex) {
              return {
                ...user,
                isApproved: false,
                isDenied: true,
                DenialReason: denialReason,
                condition: `رد شده (${convertToPersianNumbers(user.applicationNum + 1)})`,
                applicationNum: user.applicationNum + 1
              };
            }
            return user;
          })
        );
        toast.success("کاربر با موفقیت رد شد", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("Error: ", response);
        toast.error("خطا در عدم تأیید کاربر", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error in handleDenyUser Catch:", error);
      toast.success("کاربر با موفقیت رد شد", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }

  };



  const handleToggleAction = (e, index, action) => {
    e.stopPropagation();
    e.preventDefault();  

    if (action === "approve") {
      const user = users[index];

      if (!user.isApproved) {
        handleAcceptUser(user.id);  
        setUsers((prevUsers) =>
          prevUsers.map((user, i) =>
            i === index ? { ...user, isApproved: true, isDenied: false, condition: "-" } : user
          )
        );
      }
    } else if (action === "deny") {
      setCurrentDenyIndex(index);
      setDenialReason("");
      setModalOpen(true);
    }
  };


  const handleDenySubmit = () => {
    if (!denialReason.trim()) {
      toast.error("دلیل عدم تایید را وارد کنید", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const userId = users[currentDenyIndex]?.id;
    if (userId) {
      handleDenyUser(userId);
    }
    setModalOpen(false);
  };


  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://eniacgroup.ir:8070//DoctorPanel/pending_doctor", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const doctorsArray = response.data?.data || [];

      if (Array.isArray(doctorsArray) && doctorsArray.length > 0) {
        setUsers((prevUsers) => {
          const updatedUsers = doctorsArray.map((doctor) => {
            const existingUser = prevUsers.find((user) => user.id === doctor.id);

            return {
              id: doctor.id,
              firstname: doctor.firstname,
              lastname: doctor.lastname,
              code: doctor.doctorate_code,
              isApproved: existingUser ? existingUser.isApproved : false,
              isDenied: existingUser ? existingUser.isDenied : false,
              DenialReason: existingUser ? existingUser.DenialReason : "",
              condition: existingUser ? existingUser.condition : "-",
              applicationNum: existingUser ? existingUser.applicationNum : 0
            };
          });

          return updatedUsers;
        });
      } else {
        // If no data or empty array, ensure users state is cleared
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("مشکلی در دریافت داده‌های پزشکان وجود دارد", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Set users to an empty array in case of error
      setUsers([]);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase()) ||
      user.code.includes(search)
  );

  return (
    <>
      <ToastContainer />
      <div className="page-container">
      <h2
        style={{
          textAlign: "center",
          fontFamily: "Ios15Medium",
          fontWeight: "bolder",
          color: "#557C56",  // Text color
          textShadow: "3px 3px 3px #939185", // Black outline
        }}
    > مدیریت کاربران </h2>

        <div className="search-bar"
        >
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="جستجو ..."
          />
        </div>
       <div className="page-container-table">
        <table>
          <thead>
            <tr style={{ backgroundColor: "#9EDF9C", fontFamily: "Ios15Medium" }}>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>نام</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>نام خانوادگی</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>
                شمارۀ نظام پزشکی/روانشناسی
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>عملیات</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", fontFamily: "Ios15Medium", fontSize: "15px" }}
              >
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>
                  {user.firstname}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>
                  {user.lastname}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontFamily: "Ios15Medium" }}>
                  {user.code}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    fontFamily: "Ios15Medium",
                  }}
                >
                  <button
                    onClick={(e) => handleToggleAction(e, index, "approve")}
                    className={`table-button approve ${user.isApproved ? "active" : ""}`}
                  >
                    {user.isApproved ? "تأیید..." : "تأیید "}
                  </button>

                  <button
                    onClick={(e) => handleToggleAction(e, index, "deny")}
                    className="table-button deny"
                  >
                    عدم تأیید
                  </button>
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    fontFamily: "Ios15Medium",
                  }}
                >
                  {user.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div> 
        {modalOpen && (
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
                backgroundColor: "#faeae8",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                textAlign: "center",
                direction: "rtl",
              }}
            >
              <h3 style={{ fontFamily: "Ios15Medium", color: "#982B1C", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>عدم تایید کاربر</h3>
              <textarea
                value={denialReason}
                onChange={(e) => setDenialReason(e.target.value)}
                placeholder="دلیل عدم تایید را وارد کنید."
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
                <button
                  onClick={handleDenySubmit}
                  className="modal-button confirm"
                >
                  ثبت
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="modal-button cancel"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;
