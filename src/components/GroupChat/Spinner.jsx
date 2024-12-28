import "./groupchat_styles.css";
import "react-toastify/dist/ReactToastify.css";



  const Spinner = () => (
    <div className="spinner" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px"
    }}>
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid #ccc",
          borderTop: "4px solid green",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
    </div>
  );


  export default Spinner;