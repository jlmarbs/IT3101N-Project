import React from 'react';
import '../styles/Notification.css';
import closeButton from "../assets/close_round_light.png";

import ToggleSwitchEN from '../components/ToggleSwitchEN';
import ToggleSwitchRMN from '../components/ToggleSwitchRMN';

function Notification(props){

    return (props.trigger) ? (
        <>
            <div className="Notification-popup">
                <div className="Notification-inner">
                    <div>
                        <img
                            src={closeButton}
                            className="Notify-close-btn"
                            alt="Close"
                            onClick={() => props.setTrigger(false)}
                        />
                        {props.children}
                        
                    </div>
                    <div className="Notify-form">
                        <center>
                            <h3>NOTIFICATION <br/> SETTINGS</h3>
                        </center>
                        <form>
                            <div className="notify-switch">
                                <div className="notify-switch-inner"><h5>Enable Notifications</h5> </div>
                                <div className="switch-inner"><ToggleSwitchEN/></div>
                            </div>
                            <div className="notify-switch">
                                <div className="notify-switch-inner"><h5>Received Money Notification</h5></div>
                                <div className="switch-inner"><ToggleSwitchRMN/></div>
                            </div>
                            <center>
                                <button className="Notify-from-btn">CONFIRM</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default Notification