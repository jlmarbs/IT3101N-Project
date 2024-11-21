import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChangePass.css';
import closeButton from "../assets/close_round_light.png";

function ChangePass(props){

 const [formData, setFormData] = useState({
   currentPassword: '',
   newPassword: '',
   confirmNewPassword: ''
 });

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   const username = localStorage.getItem('username');

   const response = await axios.put(`http://127.0.0.1:3000/change-password/${username}`, {
     currentPassword: formData.currentPassword,
     newPassword: formData.newPassword
   });

   if (response.data.success) {
     alert('Password changed successfully');
   } else {
     alert('Failed to change password');
   }

   setFormData({
     currentPassword: '',
     newPassword: '',
     confirmNewPassword: ''
   });
 };

 return (props.trigger) ? (
   <>
     <div className="ChangePass-popup">
       <div className="ChangePass-inner">
         <div>
           <img
             src={closeButton}
             className="changeP-close-btn"
             alt="Close"
             onClick={() => props.setTrigger(false)}
           />
           {props.children}
         </div>
         <div className="changeP-form">
           <center>
             <h3>CHANGE PASSWORD</h3>
           </center>
           <form onSubmit={handleSubmit}>
             <label htmlFor="CurrentPass">Current Password:</label><br/>
             <input type="password" id="CurrentPass" name="currentPassword" className="change-input" value={formData.currentPassword} onChange={handleChange} /><br/>
             <label htmlFor="NewPass">New Password:</label><br/>
             <input type="password" id="NewPass" name="newPassword" className="change-input" value={formData.newPassword} onChange={handleChange} /><br/>
             <label htmlFor="RetypePass">Retype New Password:</label><br/>
             <input type="password" id="RetypePass" name="confirmNewPassword" className="change-input" value={formData.confirmNewPassword} onChange={handleChange} /><br/>
             <center>
               <button className="change-from-btn" type="submit">RESET PASSWORD</button>
             </center>
           </form>
         </div>
       </div>
     </div>
   </>
 ) : "";
}

export default ChangePass;
