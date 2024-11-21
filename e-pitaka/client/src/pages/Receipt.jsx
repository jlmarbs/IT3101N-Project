import "../styles/Receipt.css";
import closeButton from "../assets/close_ring_light.png";
import { useNavigate, useLocation } from "react-router-dom";
import userprofile from '../assets/user_profile.png'
import check from '../assets/checkmark.png'

function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfoTo } = location.state;

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };
  return (
    <>
      <div className="card receipt-container">
        <div className="card-header line-color receipt-title">
          <h1>RECEIPT</h1>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body receipt-body">
        <div className="user-details">
            <img src={check} className="check-mark" />
            <img src={userprofile} className="user-profile" />
            <h4>{userInfoTo.firstName} {userInfoTo.lastName}</h4>
            <h5>{userInfoTo.receiver}</h5>
            </div>
            <hr className="line-below-amount"/>
            <div className="amount-section">
              <div className="confirm-leftside">
              <h3>AMOUNT</h3>
              <h3>TOTAL AMOUNT SENT:</h3>
              </div>
              <div className="confirm-rightside">
              <h3>₱ {userInfoTo.amountSent}</h3>
              <h3>₱ {userInfoTo.amountSent}</h3>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Receipt;
