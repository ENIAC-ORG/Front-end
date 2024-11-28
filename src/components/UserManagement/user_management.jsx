import React, { useState } from 'react';
import Swal from "sweetalert2";
import "./user_management.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";



const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { firstname: 'زهرا', lastname: 'عباسیان', code: '665', approved: false, denied: false, denialReason: '' },
    { firstname: 'علی', lastname: 'رضایی', code: '123', approved: false, denied: false, denialReason: '' },
    { firstname: 'هلیا', lastname: 'شمس زاده', code: '999', approved: false, denied: false, denialReason: '' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDenyIndex, setCurrentDenyIndex] = useState(null);
  const [denialReason, setDenialReason] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleAction = (index, action) => {
    if (action === 'approve') {
      setUsers((prevUsers) =>
        prevUsers.map((user, i) => {
          if (i === index) {
            return { ...user, approved: !user.approved, denied: false, denialReason: '' };
          }
          return user;
        })
      );
    } else {
      const user = users[index];
      if (!user.denied) {
        // Only open modal when the button is transitioning to "Denied"
        setCurrentDenyIndex(index);
        setDenialReason('');
        setModalOpen(true);
      } else {
        // Undo deny action
        setUsers((prevUsers) =>
          prevUsers.map((user, i) => {
            if (i === index) {
              return { ...user, denied: false, denialReason: '' };
            }
            return user;
          })
        );
      }
    }
  };

  const handleDenySubmit = () => {
    if (!denialReason.trim()) {
      toast.error(  "دلیل عدم تایید را وارد کنید", {
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

    setUsers((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i === currentDenyIndex) {
          return { ...user, approved: false, denied: true, denialReason };
        }
        return user;
      })
    );

    setModalOpen(false);
    toast.success(  "کاربر با موفقیت رد شد", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(search.toLowerCase()) ||
    user.lastname.toLowerCase().includes(search.toLowerCase()) ||
    user.code.includes(search)
  );

  async function GetAllDoctors(event) {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://127.0.0.1:8000//DoctorPanel/pending_doctor",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);

      if (response.status === 200 || response.status == 204) {
        console.log(response.data);
      }
    } catch (error) {
      console.log("something went wrong: ", error);
      Swal.fire({
        icon: "error",
        title: "!خطا ",
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        height: "18rem",
        confirmButtonText: "تایید",
        customClass: {
          container: "custom-swal-container",
        },
      });
    }
  };


  return (
    <>
    <ToastContainer />
    <div style={{ fontFamily: 'Ios15Medium', width: '100vw', height: '100vh', padding: '20px', backgroundColor: '#D0E8C5', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'Ios15Medium' }}>مدیریت کاربران</h2>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', marginBottom: '20px', width: '100%', maxWidth: '800px', fontFamily: 'Ios15Medium' }}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="جستجو"
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '200px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            outline: 'none',
            fontSize: '16px',
            fontFamily: 'Ios15Medium'
          }}
        />
      </div>

      <table style={{
        width: '90%',
        maxWidth: '800px',
        borderCollapse: 'collapse',
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Ios15Medium'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#9EDF9C', fontFamily: 'Ios15Medium' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>نام</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>نام خانوادگی</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>شمارۀ نظام پزشکی/روانشناسی</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9', fontFamily: 'Ios15Medium' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>{user.firstname}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>{user.lastname}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontFamily: 'Ios15Medium' }}>{user.code}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'center', gap: '10px', fontFamily: 'Ios15Medium' }}>
                <button
                  onClick={() => handleToggleAction(index, 'approve')}
                  style={{
                    backgroundColor: user.approved ? '#28a745' : '#f8f9fa',
                    color: user.approved ? '#fff' : '#000',
                    border: '1px solid #28a745',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontFamily: 'Ios15Medium'
                  }}
                >
                  {user.approved ? 'تایید شده' : 'تایید کردن'}
                </button>
                <button
                  onClick={() => handleToggleAction(index, 'deny')}
                  style={{
                    backgroundColor: user.denied ? '#dc3545' : '#f8f9fa',
                    color: user.denied ? '#fff' : '#000',
                    border: '1px solid #dc3545',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontFamily: 'Ios15Medium'
                  }}
                >
                  {user.denied ? 'رد شده' : 'رد کردن'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={(e) => GetAllDoctors(e)}>داده</button>

      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            width: '400px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            textAlign: 'center',
            direction: 'rtl',
          }}>
            <h3>رد کردن کاربر</h3>
            <textarea
              value={denialReason}
              onChange={(e) => setDenialReason(e.target.value)}
              placeholder="دلیل رد کردن را وارد کنید"
              style={{
                width: '90%',
                height: '100px',
                padding: '8px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleDenySubmit}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              >
                ثبت
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: '#ccc',
                  color: '#000',
                  border: 'none',
                  cursor: 'pointer',
                }}
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
