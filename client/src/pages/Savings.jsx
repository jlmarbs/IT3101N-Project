import { React, useEffect, useState } from "react";
import closeButton from "../assets/close_ring_light.png";
import "../styles/Savings.css";
import { useNavigate } from "react-router-dom";
import LineChart from "../components/LineChart";
import axios from "axios";

function Savings() {
  const [total, setTotal] = useState(100000.0);
  const [username, setUsername] = useState('')
  const [summaries, setSummaries] = useState()
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(userData)
  // }, [userData])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername)

    try {
      const userId = await getUserById(storedUsername);
      const summaries = await getSummaries(userId);
      setSummaries(summaries)
    } catch (err) {
      window.alert("Error fetching data")
    }
  }

  const getUserById = async (username) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/check-username/${username}`)
      return response.data.userInfo.id
    } catch (err) {
      console.error(err)
    }
  }

  const getSummaries = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/get-summaries/${userId}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };
  return (
    <>
      <div className="card savings-container">
        <div className="card-header line-color">
          <h3>SAVINGS</h3>
          <img src={closeButton} alt="" onClick={handleCloseClick} />
        </div>
        <div className="card-body savings-body">
          <p>TOTAL SAVINGS:</p>
          { total < 0 ?
            <h3 style={{ color: 'red' }}>₱{total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h3>
            :
            <h3>₱{total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h3>
          }
          <div className="chart">
            <LineChart
              summaries={summaries}
              setTotal={setTotal}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Savings;
