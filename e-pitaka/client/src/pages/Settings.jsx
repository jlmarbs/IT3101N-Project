import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react';
import "../styles/Settings.css";
import closeButton from "../assets/close_ring_light.png";
import ChangePass from "../Popup/ChangePass";
import AccountRecovery from "../Popup/AccountRecovery";
import Notification from "../Popup/Notification";

import password from "../assets/Key_alt.png"
import recovery from "../assets/User_fill.png"
import notification from "../assets/Bell_pin.png"

function Settings() {
  const [CPbutton, setCPbutton] = useState(false);
  const [ARbutton, setARbutton] = useState(false);
  const [Nbutton, setNbutton] = useState(false);
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/e-pitaka/home");
  };

  return (
    <>
      <div className="card settings-container">
        <div className="card-header line-color">
          <h3>SETTINGS</h3>
          <img
            src={closeButton}
            className="settings-close-button"
            alt="Close"
            onClick={handleCloseClick}
          />
        </div>
        <div className="settings-body">
          <Link onClick={()=> setCPbutton(true)} className="setting-option">
            <img src={password} alt="Change Password" />
            <h4>CHANGE PASSWORD</h4>
          </Link>
          <Link onClick={()=> setARbutton(true)} className="setting-option">
            <img src={recovery} alt="Account Recovery" />
            <h4>SET <br/> ACCOUNT RECOVERY</h4>
          </Link>
          <Link onClick={()=> setNbutton(true)} className="setting-option">
            <img src={notification} alt="Notification Settings" />
            <h4>NOTIFICATION <br/> SETTINGS</h4>
          </Link>

          <ChangePass trigger={CPbutton} setTrigger={setCPbutton}/>
          <AccountRecovery trigger={ARbutton} setTrigger={setARbutton}/>
          <Notification trigger={Nbutton} setTrigger={setNbutton}/>
        </div>
      </div>
    </>
  );
}

export default Settings;
