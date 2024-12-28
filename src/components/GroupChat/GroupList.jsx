import "./groupchat_styles.css";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";


  const GroupList = ({ groupList, loadingGroups, setSelectedGroup}) => (
    <div
      style={{
        position: "relative",
        height: "350px",
        width: "90%",
        overflowY: "auto",
      }}
    >
      {loadingGroups && <Spinner />}
      {!loadingGroups && groupList.length === 0 && (
        <p
          className="fs-5 font-custom"
          style={{ position: "absolute", top: "45%", width: "100%", color: "#198754" }}
        >
          گروهی جهت نمایش وجود ندارد!
        </p>
      )}
      {!loadingGroups && groupList.length > 0 && (
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
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex flex-row">
                  <div className="pt-1" style={{ textAlign: "right" }}>
                    <p
                      className="fw-bold mb-0 font-custom"
                      style={{ color: "rgba(47, 47, 47, 0.77)" }}
                    >
                      {group.title || "گروه جدید"}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
  export default GroupList;