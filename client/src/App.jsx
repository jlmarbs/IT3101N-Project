import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Help from "./pages/Help";
import Deposit from "./pages/Deposit";
import AboutUs from "./pages/AboutUs";
import Send from "./pages/Send";
import History from "./pages/History";
import Savings from "./pages/Savings";
import Confirmation from "./pages/Confirmation";
import Receipt from "./pages/Receipt";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import UserInfo from "./pages/UserInfo";
import "./App.css";

function App() {
  //temporary
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("userType", userType);
    console.log("userType: ", userType);
    console.log("User is Logged In");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("username", "");
    localStorage.setItem("userType", "");
    console.log("User is Logged Out");
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    const storedUserType = localStorage.getItem("userType");

    if (storedLoginStatus && storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserType(storedUserType);
    }

    console.log({ storedLoginStatus, storedUsername, username, storedUserType });
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("isLoggedIn"))
    console.log(localStorage.getItem("userType"))
    // console.log(localStorage.getItem("isLoggedIn"))
  })

  return (
    <>
      <div className="main-body">
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="e-pitaka/"
              element={
                isLoggedIn ? (
                  <>
                    {userType === "regular" ? (
                      <Home username={username} />
                    ) : (
                      <AdminDashboard />
                    )}
                  </>
                ) : (
                  <SignIn
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setUserType={setUserType}
                  />
                )
              }
            />
            <Route
              path="e-pitaka/sign-up"
              element={
                <SignUp setUserType={setUserType} handleLogin={handleLogin} setUsername={setUsername} />
              }
            />
            <Route
              path="e-pitaka/home"
              element={
                isLoggedIn ? (
                  <>
                    {userType === "regular" ? (
                      <Home username={username} />
                    ) : (
                      <AdminDashboard />
                    )}
                  </>
                ) : (
                  <SignIn
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setUserType={setUserType}
                  />
                )
              }
            />
            <Route path="e-pitaka/about-us" element={<AboutUs />} />
            <Route path="e-pitaka/help" element={<Help />} />

            {userType === "regular" ? (
              <>
                <Route path="e-pitaka/deposit" element={<Deposit />} />
                <Route path="e-pitaka/send" element={<Send />} />
                <Route
                  path="e-pitaka/history"
                  element={<History username={username} />}
                />
                <Route path="e-pitaka/savings" element={<Savings />} />
                <Route
                  path="e-pitaka/send/confirm"
                  element={<Confirmation />}
                />
                <Route path="e-pitaka/send/receipt" element={<Receipt />} />
              </>
            ) : null}
            <Route path="e-pitaka/settings" element={<Settings />} />
            <Route path="e-pitaka/profile" element={<UserInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
