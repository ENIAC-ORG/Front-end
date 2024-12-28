import "./groupchat_styles.css";
import { FaPaperPlane } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

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

  const InputField = ({ newMessage, setNewMessage, sendMessage, loading }) => (
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
          style: { color: "red", width: "100%" },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "darkgreen",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(75, 147, 113)",
            },
          },
          "& .MuiInputBase-input": {
            color: "gray",
          },
        }}
      />
      <a className="ms-3 fs-4 text-success text-decoration-none">
        {loading ? (
          <FaPaperPlane
            onClick={() => {
              sendMessage();
            }}
          />
        ) : (
          <RiSendPlaneFill onClick={sendMessage} title="ارسال پیام" />
        )}
      </a>
    </div>
  );
  
  export default InputField;
  