import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import axios from "axios";
import AdminUserList from "../components/AdminUserList";

function AdminDashboard() {
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user-list`);

      const list = response.data;
      setUserList(list);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const search = (data) => {
    return data.filter((item) => item.Username.includes(searchInput));
  }

  const handleTransaction = async (id, type, amount) => {
    try{
        const response = await axios.post(
            "http://127.0.0.1:3000/api/admin-transfer",
            {
              amount: amount,
              transaction_type: type,
              account_id: id
            }
        )
        console.log(response.data)
    } catch (err){
        console.error("Error transferring money:", err);
    }
  }

  return (
    <div className="card page-container">
      <div className="card-header line-color">
        <h3>ADMIN DASHBOARD</h3>
      </div>
      <div className="card-body">
        <div className="search-container">
          <input type="text" className="form-control search-bar" placeholder="search for username" onChange={(event) => setSearchInput(event.target.value)}/>
        </div>
        <h3>USERS</h3>
        <hr className="line-below-amount" />
        <AdminUserList userList={search(userList)} handleTransaction= {handleTransaction}/>
      </div>
    </div>
  );
}

export default AdminDashboard;
