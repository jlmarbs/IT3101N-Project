import { useEffect, useState } from "react";

const AdminUserList = ({ userList, handleTransaction }) => {
  const [amounts, setAmounts] = useState([]);

  const handleAmounts = (event, index) => {
    const newAmounts = [...amounts];
    newAmounts[index] = event.target.value;
    setAmounts(newAmounts);
  };

  const handleClick = (id, type, amount, index) => {
    handleTransaction(id, type, amount);
    const resetAmounts = [...amounts];
    resetAmounts[index] = "";
    setAmounts(resetAmounts);
  };

  return (
    <>
      <ul className="user-list">
        {userList.map((user, index) => (
          <li className="user" key={user.Account_ID}>
            <div className="left-side">
              <h4>
                {user.FName} {user.LName}
              </h4>
              <h5>
                {user.Account_ID} | {user.Username}
              </h5>
            </div>
            <div className="right-side">
              <input
                type="number"
                placeholder="Amount"
                className="amount-input"
                value={amounts[index]}
                onChange={(event) => handleAmounts(event, index)}
              />
              <div className="admin-buttons">
                <button
                  className="admin-add"
                  onClick={() =>
                    handleClick(
                      user.Account_ID,
                      "deposit",
                      amounts[index],
                      index
                    )
                  }
                >
                  ADD
                </button>
                <button
                  className="admin-subtract"
                  onClick={() =>
                    handleClick(
                      user.Account_ID,
                      "withdraw",
                      amounts[index],
                      index
                    )
                  }
                >
                  SUBTRACT
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminUserList;
