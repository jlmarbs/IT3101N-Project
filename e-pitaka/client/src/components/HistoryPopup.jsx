import { useNavigate } from "react-router-dom";
import "../styles/HistoryPopup.css";
import userprofile from "../assets/user_profile.png";
import closeButton from "../assets/Close_round_light.png";

function HistoryPopup({ username, popUpInfo, showPopup, setShowPopup }) {
  const navigate = useNavigate();

  return showPopup ? (
    <>
      <div className="popup">
        <div className="popup-content">
          <div>
            <img
              src={closeButton}
              className="popup-close"
              alt="Close"
              onClick={() => setShowPopup(false)}
            />
          </div>
          {popUpInfo.Transaction_type === "withdraw" ||
          popUpInfo.Transaction_type === "deposit" ? (
            <>
              {popUpInfo.Transaction_type === "deposit" ? (
                <div>
                  <img src={userprofile} className="user-profile" />
                  <h3 className="amount">₱ {popUpInfo.Amount}</h3>
                  <p>
                    You successfully deposited ₱ {popUpInfo.Amount} into your
                    account on {new Date(popUpInfo.Date).toLocaleString()}
                  </p>
                  <hr />
                  <p>For inquiries and concerns, click this <a onClick={() => navigate("/e-pitaka/help")}>link</a></p>
                </div>
              ) : (
                <div>
                  <img src={userprofile} className="user-profile" />
                  <h3 className="amount">₱ {popUpInfo.Amount}</h3>
                  <p>
                    You successfully withdrew ₱ {popUpInfo.Amount} from your
                    account on {new Date(popUpInfo.Date).toLocaleString()}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {popUpInfo.Destination_username !== username ? (
                <div>
                  <img src={userprofile} className="user-profile" />
                  <h3 className="user-fullname">
                    {popUpInfo.Destination_fname ?? "deleted user"} {popUpInfo.Destination_lname ?? ""}
                  </h3>
                  <small className="user-name">
                    {popUpInfo.Destination_username ?? "deleted user"}
                  </small>
                  <h3 className="amount">₱ {popUpInfo.Amount}</h3>
                  <p>
                    You successfully sent ₱ {popUpInfo.Amount} to{" "}
                    {popUpInfo.Destination_fname  ?? "deleted user"} {popUpInfo.Destination_lname  ?? ""}{" "}
                    on {new Date(popUpInfo.Date).toLocaleString()}
                  </p>
                  <hr />
                  <div className="note-container">
                    <h6>Note: {popUpInfo.Message}</h6>
                  </div>
                </div>
              ) : (
                <div>
                  <img src={userprofile} className="user-profile" />
                  <h3 className="user-fullname">
                    {popUpInfo.Source_fname  ?? "deleted user"} {popUpInfo.Source_lname  ?? ""}
                  </h3>
                  <small className="user-name">
                    {popUpInfo.Source_username ?? "deleted user"}
                  </small>
                  <h3 className="amount">₱ {popUpInfo.Amount}</h3>
                  <p>
                    You successfully received ₱ {popUpInfo.Amount} from{" "}
                    {popUpInfo.Source_fname ?? "deleted user"} {popUpInfo.Source_lname ?? ""} on{" "}
                    {new Date(popUpInfo.Date).toLocaleString()}
                  </p>
                  <hr />
                  <div className="note-container">
                    <h6>Note: {popUpInfo.Message}</h6>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    " "
  );
}

export default HistoryPopup;
