import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import closeButton from "../assets/close_ring_light.png";
import TransactionList from "../components/TransactionsList.jsx";
import HistoryPopup from "../components/HistoryPopup.jsx";
import "../styles/History.css";
import axios from "axios";

function History({ username }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [username]);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user-transactions/${username}`
      );

      const list = response.data;
      setTransactions(list);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };

  const handleListItemClick = (transaction) => {
    setPopUpInfo(transaction);
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="card history-container">
        <div className="card-header line-color">
          <h3>HISTORY</h3>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body">
          {transactions.length > 0? <TransactionList
            username={username}
            transactions={transactions}
            handleListItemClick={handleListItemClick}
          />: <p className="empty-history">You have not initiated or received any transactions yet</p>}
        </div>
      </div>

      <HistoryPopup
        username={username}
        popUpInfo={popUpInfo}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
}

export default History;
