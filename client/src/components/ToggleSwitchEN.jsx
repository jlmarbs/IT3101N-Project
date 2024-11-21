import React from 'react';
import '../styles/ToggleSwitchEN.css';
function ToggleSwitchEN(){
    return(
        <>
            <label className="toggle_EN" for="myToggle_EN">
                <input className="toggle_input_EN" type="checkbox" id="myToggle_EN"></input>
                <div className="toggle_fill_EN"></div>
            </label>
        </>
    );
}

export default ToggleSwitchEN