import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import closeButton from "../assets/close_ring_light.png";
import userprofile from "../assets/user_profile.png";
import "../styles/UserInfo.css";
import axios from "axios";

function UserInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.patch(`http://127.0.0.1:3000/edit-user/${user?.username}`, editedUser);
      setEditMode(false);
  
      const response = await axios.get(`http://127.0.0.1:3000/check-username/${user?.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 200) {
        setUser(response.data.userInfo)
        setEditMode(false)
      } else {
        console.error(response.data.error || "Failed to fetch updated user information");
      }
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/check-username/${localStorage.getItem(
            "username"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data.userInfo);
        } else {
          console.error(
            response.data.error || "Failed to fetch user information"
          );
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("username", "");
    // localStorage.setItem("userType", "");
    console.log("User is Logged Out");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/delete-user/${user.username}`)
      console.log(response.data)
      if (response.data.success) {
        handleLogout()
        navigate('/e-pitaka/home')
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="card profile-container">
        <div className="card-header line-color profile-title">
          <div>
            <h3>USER PROFILE</h3>
          </div>
          <img
            src={closeButton}
            className="close-button"
            onClick={handleCloseClick}
          />
        </div>
        <div className="card-body profile-body">
          <div className="user-details">
            <img src={userprofile} className="user-profile" />
            <hr />
          </div>
          {user && (
            <div className="profile-section">
              <div className="confirm-leftside">
                <h3>First Name</h3>
                <h3>Last Name</h3>
                <h3>Username</h3>
              </div>
              <div className="confirm-rightside">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={editedUser.firstName}
                      className="fname-input"
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedUser.lastName}
                      className="lname-input"
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                    <h3>{user.username}</h3>
                  </>
                ) : (
                  <>
                    <h3>{user.firstName}</h3>
                    <h3>{user.lastName}</h3>
                    <h3>{user.username}</h3>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="button-container">
            {editMode ? (
              <button
                type="button"
                className="edit-button"
                onClick={handleSaveClick}
              >
                SAVE
              </button>
            ) : (
              <button
                type="button"
                className="edit-button"
                onClick={handleEditClick}
              >
                EDIT
              </button>
            )}
          </div>
          <div className="button-container">
            <button onClick={handleDelete} type="submit" className="delete-button">
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo