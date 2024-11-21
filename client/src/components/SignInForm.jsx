import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SignInForm({ handleLogin, setUsername, setUserType}) {
  const navigate = useNavigate();
  const [username, setUsernameLocal] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExists] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleChange = (e, SetFn) => {
    SetFn(e.target.value);
  };

  const handleToken = (token) => {
    localStorage.setItem('token', token)
  }

  useEffect(() => {
    setShowError(false)
  }, [username, password])

  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (!username) {
          return;
        }

        const response = await axios.post(`http://127.0.0.1:3000/check-username/${username}`, {
          password: password,
        });

        console.log(response.data)
        const { usernameExists, userInfo, token} = response.data; //another parameter ,token

        if (usernameExists && userInfo && token) { //another condition && token
          console.log("hi");
          setUsernameLocal(userInfo.username);
          setUserExists(true);
          setUsername(userInfo.username);
          localStorage.setItem("userType", userInfo.user_type);
          setUserType(userInfo.user_type)
          handleToken(token)
        } else {
          console.log("bye");
          setUserExists(false);
        }
      } catch (error) {
        console.error("Error Checking Login:", error);
      }
    };

    checkLogin();
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userExists) {
      setShowError(true)
      console.error("User Doesn't Exist");
      return;
    }
    handleLogin();
    navigate('/e-pitaka/home');
  };

  return (
    <>
      <div className="card mb-3 text-center form-container sign-in-form">
        <form onSubmit={handleSubmit}>
          <h3>SIGN IN</h3>
          <div className="input-area">
            { showError && <p className="login-error">User Doesn't Exist</p> }
            <label>Your Username</label>
            <input
              onChange={(e) => {
                handleChange(e, setUsernameLocal);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="input-area">
            <label>Your Password</label>
            <input
              onChange={(e) => {
                handleChange(e, setPassword);
              }}
              type="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="sign-in-button">
            SIGN IN
          </button>
        </form>
      </div>
    </>
  );
}

export default SignInForm;
