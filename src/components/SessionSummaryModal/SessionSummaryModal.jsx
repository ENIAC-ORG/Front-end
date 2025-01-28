import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SessionSummaryModal.css";
import { TextField } from "@material-ui/core";


const SessionSummaryModal = ({ PatiantId, MyDate, ReservationId }) => {

    const [showModal, setShowModal] = useState(false);
    const [sessionSummary, setSessionSummary] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [savedSummary, setSavedSummary] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSaveSummary = async () => {
        if (!sessionSummary.trim()) {
            toast.error("لطفاً خلاصه جلسه را وارد کنید!", {
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

        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const apiUrl = `https://eniacgroup.ir/backend/reserve/feedback/${ReservationId}/`;

            const response = await axios.post(
                apiUrl,
                { feedback: sessionSummary },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log(response);
            
            if (response.status === 200 || response.status === 201) {
                setSavedSummary(sessionSummary);
                toast.success("خلاصه جلسه با موفقیت ثبت شد!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("مشکلی در ثبت خلاصه جلسه پیش آمد!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.", {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setSessionSummary(event.target.value);
    };

    // const handleSaveSummary = () => {
    //     setSavedSummary(sessionSummary);
    //     // اینجا می‌توانید متن خلاصه را ذخیره کنید یا هر کاری که می‌خواهید انجام دهید
    //     // مثلا ارسال به API یا ذخیره محلی
    //     // console.log("خلاصه ذخیره شد:", sessionSummary);
    //     setShowSummary(true);
    //     toast.success("خلاصه جلسه با موفقیت ثبت شد!", {
    //         position: "bottom-left",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // };

    const today = new Date().toISOString().split('T')[0];

    // console.log(showSummary);

    return (
        <>
            <div style={{ fontFamily: "Ios15Medium" }}
                onClick={() => setShowModal(true)}>
                <button
                    className="button-summary"
                    role="button"
                    style={{ fontFamily: "Ios15Medium", cursor: MyDate === today ? "pointer" : "not-allowed" }}
                    disabled={MyDate !== today}
                    title={MyDate !== today ? "ثبت خلاصه جلسه فقط در روزِ نوبتِ رزرو شده فعال است." : ""}
                >
                    ثبت خلاصه
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
                    {savedSummary ? (
                        <p style={{ fontFamily: "Ios15Medium", textAlign: "center", color: "#829089" }}>
                            {savedSummary}
                        </p>
                    ) : (
                        <p style={{ fontFamily: "Ios15Medium", textAlign: "center", color: "#829089" }}>
                            "خلاصه‌ای ثبت نشده است."
                        </p>)
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
                    <div style={{ fontFamily: "Ios15Medium", textAlign: 'center' }}
                        onClick={handleSaveSummary}
                        disabled={loading}>
                        <button
                            className="button-24"
                            role="button"
                            style={{ fontFamily: "Ios15Medium" }}
                        >
                            {loading ? "در حال ثبت..." : "ثبت"}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SessionSummaryModal