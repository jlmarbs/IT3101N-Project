import "../styles/Send.css";
import closeButton from "../assets/close_ring_light.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Send() {
  const [sendTo, setSendTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [exist, setExist] = useState(true);
  const [isYou, setIsYou] = useState(false)
  const [note, setNote] = useState('');

  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };

  const handleChange = (e, setFn) => {
    setFn(e.target.value);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:3000/check-username/${sendTo}`)

      if (!response.data.usernameExists) {
        setExist(false);
        return;
      }
      console.log(response.data)
      const sendFrom = localStorage.getItem("username")
      if (response.data.userInfo.username === sendFrom) {
        setIsYou(true);
        return;
      }

      // Note: find a way to obtain sender and receiver ids
      const userInfo = {
        receiverID: response.data.userInfo.id,
        sender: sendFrom,
        receiver: response.data.userInfo.username,
        amountSent: parseFloat(amount).toFixed(2),
        firstName: response.data.userInfo.firstName,
        lastName: response.data.userInfo.lastName,
        balance: response.data.userInfo.balance,
        note: note  
      }
      // Im pretty much done here (I think) gotta eet dinner brb
      navigate("/e-pitaka/send/confirm", { state: userInfo })
    } catch (e) {
      window.alert(e.message);
    }
  }

  useEffect(() => {
    setExist(true)
    setIsYou(false)
  }, [sendTo])

  return (
    <>
      <div className="card page-container send-box">
        <div className="card-header line-color">
          <h3>SEND</h3>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body send-body">
          <div className="send-form">
            { !exist && <p className="exist">User Doesn't Exist</p> }
            { isYou && <p className="exist">Cannot Send to Yourself</p> }
            <form onSubmit={handleNext}>
              <div className="send-input">
                <label htmlFor="send-to" className="input-label">
                  SEND TO:
                </label>
                <input
                  onChange={(e) => handleChange(e, setSendTo)}
                  type="text"
                  className="input-box"
                  placeholder="Enter username here"
                  required
                />
              </div>
              <div className="send-input">
                <label htmlFor="amount" className="input-label">
                  AMOUNT:
                </label>
                <input
                  onChange={(e) => handleChange(e, setAmount)}
                  type="number"
                  step="any"
                  className="input-box"
                  min={0}
                  required
                />
              </div>
              <div className="send-input">
                <label htmlFor="message" className="input-label">
                  MESSAGE (Optional):
                </label>
                <textarea onChange={(e) => handleChange(e, setNote)} rows="8" className="input-box"></textarea>
              </div>
              <div className="row justify-content-center">
                <button
                  type="submit"
                  className="next-button"
                  // onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Send;
