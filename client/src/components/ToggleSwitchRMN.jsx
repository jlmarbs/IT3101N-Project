import React from 'react';
import '../styles/ToggleSwitchRMN.css';
function ToggleSwitchRMN(){
    return(
        <>
            <label className="toggle_RMN" for="myToggle_RMN">
                <input className="toggle_input_RMN" type="checkbox" id="myToggle_RMN"></input>
                <div className="toggle_fill_RMN"></div>
            </label>
        </>
    );
}

export default ToggleSwitchRMN