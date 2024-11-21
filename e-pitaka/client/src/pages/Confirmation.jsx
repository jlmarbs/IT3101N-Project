import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import closeButton from "../assets/close_ring_light.png";
import userprofile from "../assets/user_profile.png";
import "../styles/Confirmation.css";
import axios from "axios";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const userInfoTo = location.state;
  const [userInfoFrom, setUserInfoFrom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lacking, setLacking] = useState(false)

  const handleCloseClick = () => {
    navigate("/e-pitaka/send");
  };

  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/check-username/${userInfoTo.sender}`)
        console.log("userInfoFrom", response.data);
        setUserInfoFrom({
          senderID: response.data.userInfo.id,
          balance: response.data.userInfo.balance
        })  
        if (parseFloat(response.data.userInfo.balance) <= 0 || parseFloat(response.data.userInfo.balance) < parseFloat(userInfoTo.amountSent)) {
          setLacking(true);
        } else {
          setLacking(false)
        }
      } catch (err) {
        console.error("Error fetching sender info:", err);
      } finally {
        setLoading(false)
      }
    }
    fetchSenderInfo()
  }, [userInfoTo.sender])

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/transfer",
        {
          senderID: userInfoFrom.senderID,
          receiverID: userInfoTo.receiverID,
          amount: userInfoTo.amountSent,
          note: userInfoTo.note
        }
      )
      console.log(response.data)
      navigate('/e-pitaka/send/receipt', {
        state: {
          userInfoTo
        }
      })
    } catch (err) {
      console.error("Error transferring money:", err);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className="card confirm-container">
        <div className="card-header line-color confirm-title">
          <div>
            <h1>SEND</h1>
            <p>CONFIRM THE DETAILS BELOW:</p>
          </div>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body confirm-body">
          <div className="user-details">
            <img src={userprofile} className="user-profile" />
            <h4>{userInfoTo.firstName} {userInfoTo.lastName}</h4>
            <h5>{userInfoTo.receiver}</h5>
            <h5>You're about to send</h5>
          </div>
          <div className="amount-section">
            <div className="confirm-leftside">
              <h2>E-PITAKA MONEY:</h2>
              <h3>AMOUNT</h3>
              <h3>TOTAL AMOUNT TO PAY:</h3>
            </div>
            <div className="confirm-rightside">
              <h2>₱ {userInfoFrom.balance}</h2>
              <h3>₱ {userInfoTo.amountSent}</h3>
              <h3>₱ {userInfoTo.amountSent}</h3>
            </div>
          </div>
          <hr className="line-below-amount" />
          <p>Confirmed transactions will not be refunded. Please make sure that the details above are correct.</p>
          <div className="button-container">
            { !lacking ?
              <button
                type="submit"
                className="next-button"
                onClick={handleSend}
                disabled={!userInfoFrom}
              >
                SEND
              </button>
              :
              <button
                className="next-button error"
                disabled
              >
                Insufficient Funds
              </button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
