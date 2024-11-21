import React from 'react';
import '../styles/AccountRecovery.css';
import closeButton from "../assets/close_round_light.png";

function AccountRecovery(props){

    return (props.trigger) ? (
        <>
            <div className="AccRecovery-popup">
                <div className="AccRecovery-inner">
                    <div>
                        <img
                            src={closeButton}
                            className="accountR-close-btn"
                            alt="Close"
                            onClick={() => props.setTrigger(false)}
                        />
                        {props.children}
                        
                    </div>
                    <div className="accountR-form">
                        <center>
                            <h3>SET ACCOUNT <br/>RECOVERY</h3>
                        </center>
                        <form>
                            <label for="RecEmail">Recovery Email</label><br/>
                            <input type="text" id="RecEmail" name="RecEmail" className="recovery-input"></input><br/>
                            <label for="PhoneNum">Phone Number</label><br/>
                            <input type="text" id="PhoneNum" name="PhoneNum" className="recovery-input"></input><br/>
                            <center>
                                <button className="recovery-from-btn">NEXT</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default AccountRecovery