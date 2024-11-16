import React, { useState } from 'react';
import Swal from "sweetalert2";
import "./user_management.css"

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { name: 'زهرا عباسیان', contact: '0999999999', documentApproval: true, medicalApproval: true, documents: null },
    { name: 'علی رضایی', contact: '09123456789', documentApproval: false, medicalApproval: false, documents: null },
    { name: 'هلیا شمس زاده', contact: '09333183898', documentApproval: false, medicalApproval: false, documents: new File([""], "document.pdf") }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', contact: '', documents: null });
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleApproval = (index, field) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => i === index ? { ...user, [field]: !user[field] } : user)
    );
  };

  const handleDeleteUser = (index) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
    setModalOpen(true);
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.contact) {
      if (editIndex !== null) {
        setUsers((prevUsers) =>
          prevUsers.map((user, i) => (i === editIndex ? newUser : user))
        );
        setEditIndex(null);
      } else {
        setUsers([...users, newUser]);
      }
      setNewUser({ name: '', contact: '', documents: null });
      setModalOpen(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "!خطا",
        html: "نام و شماره تماس کاربر را وارد کنید.",
        background: "#473a67",
        color: "#b4b3b3",
        width: "26rem",
        height: "18rem",
        confirmButtonText: "تایید",
        customClass: {
          container: "custom-swal-container",
        },
      })
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Vazir, Arial, sans-serif', width: '100vw', height: '100vh', padding: '20px', backgroundColor: '#D0E8C5', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>مدیریت کاربران</h2>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', marginBottom: '20px', width: '100%', maxWidth: '800px' }}>
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
            fontSize: '16px'
          }}
        />
        <button
          onClick={() => setModalOpen(true)}
          style={{
            backgroundColor: hoveredButton === 'add' ? '#BFF6C3' : '#9EDF9C',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for the button
            fontSize: '16px'
          }}
          onMouseEnter={() => setHoveredButton('add')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          ➕ اضافه کردن کاربر
        </button>
      </div>

      <table style={{ 
        width: '90%', 
        maxWidth: '800px', 
        borderCollapse: 'collapse', 
        textAlign: 'center', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for table
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#9EDF9C' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>نام کاربر</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>شماره تماس</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>تایید پزشک</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>مدارک</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>تایید مدارک</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.contact}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <input type="checkbox" checked={user.medicalApproval} onChange={() => handleToggleApproval(index, 'medicalApproval')} />
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {user.documents ? (
                  <a
                    href={URL.createObjectURL(user.documents)}
                    download={user.documents.name}
                    style={{ textDecoration: 'none', color: '#007bff', cursor: 'pointer' }}
                  >
                    📥 دانلود
                  </a>
                ) : '—'}
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <input type="checkbox" checked={user.documentApproval} onChange={() => handleToggleApproval(index, 'documentApproval')} />
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleEditUser(index)}
                  style={{
                    backgroundColor: hoveredButton === `edit-${index}` ? '#ffb84d' : '#ffcc80',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredButton(`edit-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDeleteUser(index)}
                  style={{
                    backgroundColor: hoveredButton === `delete-${index}` ? '#ff9999' : '#ffcccc',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredButton(`delete-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            width: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            textAlign: 'center', direction: 'rtl'
          }}>
            <h3>{editIndex !== null ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}</h3>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="نام کاربر"
              style={{ width: '90%', padding: '8px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              value={newUser.contact}
              onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
              placeholder="شماره تماس"
              style={{ width: '90%', padding: '8px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
              type="file"
              onChange={(e) => setNewUser({ ...newUser, documents: e.target.files[0] })}
              style={{ width: '100%', margin: '10px 0' }}
            />
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleAddUser}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: hoveredButton === 'save' ? '#c7d9c1' : '#d8e8d0',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '5px'
                }}
                onMouseEnter={() => setHoveredButton('save')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {editIndex !== null ? 'ذخیره' : 'افزودن'}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: hoveredButton === 'cancel' ? '#ff9999' : '#ffcccc',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredButton('cancel')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
