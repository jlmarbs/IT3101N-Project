import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import DropdownProfile from "./DropdownProfile";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <>
      <div className="header">
        <NavLink className="web-logo" to="e-pitaka/home">
          E-PITAKA
        </NavLink>
        <div className="header-right">
          <NavLink className="link" to="e-pitaka/help">
            HELP
          </NavLink>
          <NavLink className="link" to="e-pitaka/about-us">
            ABOUT US
          </NavLink>
          {isLoggedIn ? (
            <div className="menu-container">
              <DropdownProfile handleLogout={handleLogout} />
            </div>
          ) : (
            <NavLink className="link" to="e-pitaka/sign-up">
              SIGN UP
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
