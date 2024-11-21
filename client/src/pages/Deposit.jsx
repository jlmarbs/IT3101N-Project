import "../styles/Deposit.css";
import closeButton from "../assets/close_ring_light.png";
import { useNavigate } from "react-router-dom";

function Deposit() {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };
  return (
    <>
      <div className="card page-container">
        <div className="card-header line-color page-header">
          <h3>DEPOSIT/WITHDRAW</h3>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body deposit-body">
          <h4>STEP 1:</h4>
          <p>Go to your School's Teller.</p>
          <h4>STEP 2:</h4>
          <p>Enter your username and your amount you want to deposit or withdraw.</p>
          <h4>STEP 3:</h4>
          <p>Wait for the confirmation if the deposit/withdraw is successful.</p>
        </div>
      </div>
    </>
  );
}

export default Deposit;
