import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SessionSummaryModal.css";
import { TextField } from "@material-ui/core";


const SessionSummaryModal = ({ PatiantId }) => {

    const [showModal, setShowModal] = useState(false);
    const [sessionSummary, setSessionSummary] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    

    // useEffect(() => {
    //     if (show) {
    //         fetchSessionSummary(PatiantId);
    //     }
    // }, [show, PatiantId]);

    // const fetchSessionSummary = async (id) => {
    //     try {
    //         const token = localStorage.getItem("accessToken");
    //         const response = await axios.get(`https://eniacgroup.ir/backend/sessionSummary/${PatiantId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setSessionSummary(response.data.summary || "خلاصه‌ای موجود نیست.");
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("خطا در دریافت خلاصه جلسه");
    //     }
    // };

    // const saveSessionSummary = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`/api/session-summary/${PatiantId}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ summary }),
    //         });
    //         if (!response.ok) throw new Error("Failed to save session summary.");
    //         alert("Summary saved successfully!");
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };
    console.log(showModal);

    const handleInputChange = (event) => {
        setSessionSummary(event.target.value);
    };

    const handleSaveSummary = () => {
        // اینجا می‌توانید متن خلاصه را ذخیره کنید یا هر کاری که می‌خواهید انجام دهید
        // مثلا ارسال به API یا ذخیره محلی
        console.log("خلاصه ذخیره شد:", sessionSummary);
        setShowSummary(true);
        toast.success("خلاصه جلسه با موفقیت ثبت شد!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    };

    return (
        <>
            <div style={{ fontFamily: "Ios15Medium" }}
                onClick={() => setShowModal(true)}>
                <button
                    className="button-24"
                    role="button"
                    style={{ fontFamily: "Ios15Medium" }}
                >
                    خلاصه
                </button>
            </div>

            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                className="rating-bd_modal modal rating-wrapper_modal"
                centered
                dialogClassName="scrollable-modal"
            >
                <ToastContainer />
                <div
                    className="rating_close_button"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    <IoIosClose className="rating_close_button_icon" />
                </div>
                <Modal.Header className="header-ssm">
                    <Modal.Title className="text-header">خلاصه جلسه</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <p style={{ fontFamily: "Ios15Medium", textAlign: "justify" }}>
                        امروز درباره خاطرات ناراحت کننده بچگیش صحبت کردیم
                    </p> */}
                    {showSummary &&
                        <p style={{ fontFamily: "Ios15Medium", textAlign: "center", color:"#829089" }}>
                        {sessionSummary || "خلاصه‌ای ثبت نشده است."}
                    </p>
                    }

                    <TextField
                        fullWidth
                        multiline
                        autoComplete="off"
                        variant="outlined"
                        onChange={handleInputChange}
                        dir="rtl"
                        InputLabelProps={{
                            dir: "rtl",
                        }}
                        placeholder="خلاصه ای از جلسه..."
                        value={sessionSummary}
                        className="textbox-other"
                        style={{ marginBottom: "10px" }}
                    />
                    <div style={{ fontFamily: "Ios15Medium", textAlign:'center' }}
                        onClick={handleSaveSummary}>
                        <button
                            className="button-24"
                            role="button"
                            style={{ fontFamily: "Ios15Medium" }}
                        >
                            ثبت
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SessionSummaryModal