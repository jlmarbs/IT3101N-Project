import React, { useState, useEffect } from 'react'
import view_hide from '../assets/View_hide.png'
import view from '../assets/view.png'
import axios from 'axios'

const CurrBalance = ({ username }) => {
 const [isHidden, setIsHidden] = useState(false)
 const [imageSrc, setImageSrc] = useState(view)
 const [balance, setBalance] = useState(null)

 useEffect(() => {
  fetchUserBalance()
 }, [username])

 const fetchUserBalance = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log('Token:', token)
    const response = await axios.get(`http://localhost:3000/user-balance/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // {
    //   headers: {
    //     Authorization: `Bearer: ${token}` add this on the ()
    //   }
    // }
    
    const amount = parseFloat(response.data.userBalance).toFixed(2)
    setBalance(amount)
  } catch (error) {
    console.error("Error fetching User Balance:", error)
    setBalance(null)
  }
 }

 return (
   <>
     <div className="card container balance-container">
       <div className="row balance-header">
         <div className="col">
           <h3>CURRENT BALANCE:</h3>
         </div>
         <div className="col-1">
           <button className="hide-button" onClick={() => {
            setIsHidden(!isHidden)
            setImageSrc(prevSrc => prevSrc == view ? view_hide : view)
           }}>
             <img className="img_hide" src={imageSrc} alt="View Hide" />
           </button>
         </div>
       </div>
       <div className="row">
         <p className="balance-value">
           {isHidden ? `₱ ${parseFloat(balance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}` : '₱ ..........'}
         </p>
       </div>
     </div>
   </>
 )
}

export default CurrBalance